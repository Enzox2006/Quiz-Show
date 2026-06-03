const ruotaOnline = {

    socket: null,
    mioIdx: -1,
    codiceStanza: null,
    nomiGiocatori: [],
    _spinCallback: null,
    _patchedRuota: false,
    _lastWheelBroadcast: 0,

    _connetti() {
        if (this.socket && this.socket.connected) return this.socket;
        this.socket = io(window.SOCKET_SERVER_URL || '');
        this._bindEvents();
        return this.socket;
    },

    _bindEvents() {
        const s = this.socket;
        const self = this;

        s.on('stanza_creata', ({ codice, idx, giocatori }) => {
            self.codiceStanza = codice;
            self.mioIdx = idx;
            self._renderLobby(giocatori, true);
        });

        s.on('stanza_entrata', ({ codice, idx, giocatori }) => {
            self.codiceStanza = codice;
            self.mioIdx = idx;
            self._renderLobby(giocatori, false);
        });

        s.on('aggiorna_lobby', ({ giocatori }) => {
            self.nomiGiocatori = giocatori.map(g => g.nome);
            self._aggiornaListaLobby(giocatori);
        });

        s.on('partita_iniziata', ({ nomi }) => {
            self.nomiGiocatori = nomi;
            ruota.reset();
            ruota.nomi = [...nomi];
            grafica.puliscifield();
            if (!self._patchedRuota) {
                self._patchRuotaPerOnline();
                self._patchedRuota = true;
            }
            ruota._avviaPartita();
            main.current = 'RuotaGioco';
        });

        s.on('azione', ({ tipo, dati, da }) => {
            if (da === self.mioIdx) return;
            self._eseguiAzione(tipo, dati);
        });

        s.on('spin_result', ({ spiccioIdx, rotazioneFinale, da }) => {
            if (da === self.mioIdx) return;
            if (self._spinCallback) {
                self._spinCallback(spiccioIdx, rotazioneFinale);
                self._spinCallback = null;
            }
        });

        s.on('sync_stato', (stato) => {
            self._applicaStatoERendera(stato);
        });

        s.on('wheel_rotation', ({ r }) => {
            if (self._liveWheelCanvas) {
                self._liveWheelRotation = r;
            }
        });

        s.on('errore', ({ msg }) => {
            ruota._showToast('⚠ ' + msg, '#ff4444');
        });

        s.on('giocatore_uscito', ({ giocatori }) => {
            ruota._showToast('Un giocatore ha abbandonato la stanza.', '#ff8800');
            self._aggiornaListaLobby(giocatori);
        });
    },

    // ── Patch delle funzioni di ruota per la modalità online ──────────

    _patchRuotaPerOnline() {
        const self = this;
        ruota._onlineSkipFrase = false;
        ruota._onlineSoppressiAzioni = false;

        // ─ 1. Salta selezione frase quando stato è già sincronizzato ──
        const orig_nuovaFraseManche = ruota._nuovaFraseManche.bind(ruota);
        ruota._nuovaFraseManche = function () {
            if (ruota._onlineSkipFrase) return;
            orig_nuovaFraseManche();
        };

        const orig_nuovaFrase = ruota._nuovaFrase.bind(ruota);
        ruota._nuovaFrase = function (pool) {
            if (ruota._onlineSkipFrase) return;
            orig_nuovaFrase(pool);
        };

        // ─ 2. _iniziaManche: INIZIA solo per l'host ────────────────────
        const orig_iniziaManche = ruota._iniziaManche.bind(ruota);
        ruota._iniziaManche = function () {
            orig_iniziaManche();
            if (self.mioIdx !== 0) {
                const btns = Array.from(field.querySelectorAll('button'));
                const btn = btns.find(b => b.innerHTML.includes('INIZIA'));
                if (btn) {
                    btn.innerHTML = "⏳ In attesa dell'host...";
                    btn.style.background = 'rgba(255,255,255,0.05)';
                    btn.style.color = 'rgba(255,255,255,0.3)';
                    btn.style.pointerEvents = 'none';
                    btn.style.cursor = 'default';
                    btn.style.boxShadow = 'none';
                }
            }
        };

        // ─ 3. _startManche: host avvia + broadcast ────────────────────
        const orig_startManche = ruota._startManche.bind(ruota);
        ruota._startManche = function () {
            if (ruota._onlineSkipFrase) {
                ruota._onlineSkipFrase = false;
                orig_startManche();
                return;
            }
            if (self.mioIdx !== 0) return;
            orig_startManche();
            setTimeout(() => self._broadcastGameState(), 200);
        };

        // ─ 4. _velocissima: solo host controlla il timer ──────────────
        const orig_velocissima = ruota._velocissima.bind(ruota);
        ruota._velocissima = function () {
            if (ruota._onlineSkipFrase) {
                const savedPos = ruota._velPosizioniLettere ? [...ruota._velPosizioniLettere] : [];
                const savedIdx = ruota._velIdx || 0;
                orig_velocissima();
                // Ferma il timer locale — solo l'host lo gestisce
                clearInterval(ruota._termometroTimer);
                ruota._termometroTimer = null;
                ruota._velPosizioniLettere = savedPos;
                ruota._velIdx = savedIdx;
                ruota._onlineSkipFrase = false;
                self._fixVelocissimaBtns();
                if (self.mioIdx === 0) self._startVelTimerHost();
                return;
            }
            orig_velocissima();
            // Ferma il timer avviato da orig — l'host usa la versione sincronizzata
            clearInterval(ruota._termometroTimer);
            ruota._termometroTimer = null;
            self._fixVelocissimaBtns();
            if (self.mioIdx === 0) {
                setTimeout(() => self._broadcastGameState('velocissima'), 250);
                self._startVelTimerHost();
            }
        };

        // ─ 4b. _velocissima_resumeTimer: solo host ────────────────────
        ruota._velocissima_resumeTimer = function () {
            if (self.mioIdx !== 0) return;
            self._startVelTimerHost();
        };

        // ─ 5. _prossimaTriplete: fix bottoni + broadcast ───────────────
        const orig_prossimaTriplete = ruota._prossimaTriplete.bind(ruota);
        ruota._prossimaTriplete = function () {
            if (ruota._onlineSkipFrase) {
                ruota._onlineSkipFrase = false;
            }
            orig_prossimaTriplete();
            self._fixTrilettePrenotaBtns();
            if (!ruota._onlineSoppressiAzioni && self.socket) {
                setTimeout(() => self._broadcastGameState('triplete'), 200);
            }
        };

        // ─ 6. _renderGioco: block UI + broadcast stato ─────────────────
        const orig_renderGioco = ruota._renderGioco.bind(ruota);
        ruota._renderGioco = function () {
            orig_renderGioco();
            self._applicaBloccoUI();
            if (!ruota._onlineSoppressiAzioni && self.socket && self.mioIdx >= 0) {
                setTimeout(() => self._broadcastGameState('gioco'), 80);
            }
        };

        // ─ 7. _apriChiamataLettera: block UI per non-attivi ───────────
        const orig_apriChiamataLettera = ruota._apriChiamataLettera.bind(ruota);
        ruota._apriChiamataLettera = function (isRaddoppia) {
            orig_apriChiamataLettera(isRaddoppia);
            if (ruota.turno !== self.mioIdx) {
                self._applicaBloccoUI();
            }
        };

        // ─ 8. _apriCompraVocale: block UI per non-attivi ──────────────
        const orig_apriCompraVocale = ruota._apriCompraVocale.bind(ruota);
        ruota._apriCompraVocale = function () {
            orig_apriCompraVocale();
            if (ruota.turno !== self.mioIdx) {
                self._applicaBloccoUI();
            }
        };

        // ─ 9. _confermaCons: solo giocatore attivo, broadcast immediato ──
        const orig_confermaCons = ruota._confermaCons.bind(ruota);
        ruota._confermaCons = function (lettera, isRaddoppia) {
            if (!ruota._onlineSoppressiAzioni && ruota.turno !== self.mioIdx) return;
            orig_confermaCons(lettera, isRaddoppia);
            if (!ruota._onlineSoppressiAzioni && self.socket) {
                self.inviaAzione('lettera_cons', { lettera, isRaddoppia });
            }
        };

        // ─ 10. _confermaVocale: solo giocatore attivo, broadcast immediato
        const orig_confermaVocale = ruota._confermaVocale.bind(ruota);
        ruota._confermaVocale = function (vocale) {
            if (!ruota._onlineSoppressiAzioni && ruota.turno !== self.mioIdx) return;
            orig_confermaVocale(vocale);
            if (!ruota._onlineSoppressiAzioni && self.socket) {
                self.inviaAzione('lettera_voc', { vocale });
            }
        };

        // ─ 10b. _dopoRuota: spettatori vedono la schermata lettere (disabilitata) ─
        const orig_dopoRuota = ruota._dopoRuota.bind(ruota);
        ruota._dopoRuota = function (sp, idx) {
            if (ruota.turno !== self.mioIdx) {
                // Imposta stato (necessario per _confermaCons remota)
                if (sp.tipo === 'jolly') {
                    ruota._jollyIdx = idx; ruota.valoreRuota = 200;
                    ruota.attesaLettera = true; ruota._tipoAzione = 'jolly';
                } else if (sp.tipo === 'express') {
                    ruota._expressTurn = true; ruota.valoreRuota = 500;
                    ruota.attesaLettera = true; ruota._tipoAzione = 'euro';
                } else if (sp.tipo === 'raddoppia') {
                    ruota._raddoppiaIdx = idx;
                    ruota.attesaLettera = true; ruota._tipoAzione = 'raddoppia';
                } else if (sp.tipo === 'bancarotta' || sp.tipo === 'passa' || sp.tipo === 'jackpot') {
                    ruota.attesaLettera = false;
                } else {
                    ruota.valoreRuota = sp.valore;
                    ruota.attesaLettera = true; ruota._tipoAzione = 'euro';
                }
                // Toast con il valore girato
                let msg = sp.tipo === 'bancarotta' ? '💥 BANCAROTTA!' :
                          sp.tipo === 'passa'      ? 'PASSA' :
                          sp.tipo === 'jolly'      ? '🃏 JOLLY!' :
                          sp.tipo === 'jackpot'    ? '💰 JACKPOT!' :
                          sp.tipo === 'express'    ? '🚄 EXPRESS!' :
                          sp.tipo === 'raddoppia'  ? '✖2 RADDOPPIA!' : sp.label;
                let col = sp.tipo === 'bancarotta' ? '#ff4444' :
                          sp.tipo === 'passa'      ? '#888888' :
                          (sp.tipo === 'jolly' || sp.tipo === 'express' || sp.tipo === 'raddoppia') ? '#a855f7' : '#f0c800';
                ruota._showToast(msg, col);
                // Se richiede una lettera: apri la schermata lettere (disabilitata)
                // Guard: solo se attesaLettera è ancora true al momento del timeout
                if (ruota.attesaLettera) {
                    const isRadd = sp.tipo === 'raddoppia';
                    setTimeout(() => {
                        if (ruota.attesaLettera && main.current === 'RuotaSpin') {
                            ruota._apriChiamataLettera(isRadd);
                            self._applicaBloccoUI();
                        }
                    }, 1200);
                } else {
                    // BANCAROTTA/PASSA/JACKPOT: torna a gioco e aspetta sync
                    // Sopprimiamo il broadcast perché lo stato verrà inviato dal giocatore attivo
                    setTimeout(() => {
                        if (main.current === 'RuotaSpin') {
                            grafica.puliscifield();
                            ruota._onlineSoppressiAzioni = true;
                            ruota._renderGioco();
                            ruota._onlineSoppressiAzioni = false;
                            main.current = 'RuotaGioco';
                        }
                    }, 1200);
                }
                return;
            }
            orig_dopoRuota(sp, idx);
        };

        // ─ 11. _velocissimaPrenota: versione online ────────────────────
        const orig_velocissimaPrenota = ruota._velocissimaPrenota.bind(ruota);
        ruota._velocissimaPrenota = function (playerIdx) {
            if (!ruota._onlineSoppressiAzioni) {
                // Blocca click su bottoni altrui
                if (playerIdx !== self.mioIdx) return;
                // Avvia protocollo online
                self._velocissimaPrenota_online(playerIdx);
                return;
            }
            // Ricevuto da remoto: mostra overlay attesa
            orig_velocissimaPrenota.__skip = true;
            self._mostraAttesaVelocissima(playerIdx);
        };

        // ─ 12. _giraRuota: versione online ────────────────────────────
        ruota._giraRuota = function () {
            if (ruota.turno !== self.mioIdx) return;
            self._giraRuotaOnline();
        };

        // ─ 13. _passaTurno: solo il giocatore attivo lo esegue ────────
        // Bug fix: gli spettatori ricevevano la chiamata a _confermaCons
        // via _eseguiAzione, che internamente chiamava _passaTurno dopo 2s
        // tramite _chiedeJolly/onNonUsa. Questo faceva avanzare ruota.turno
        // in modo errato sul dispositivo dello spettatore, disabilitando i tasti.
        const orig_passaTurno = ruota._passaTurno.bind(ruota);
        ruota._passaTurno = function () {
            if (ruota.turno !== self.mioIdx) return; // spettatori aspettano sync_stato
            orig_passaTurno();
        };

        // ─ 14. _chiedeJolly: dialog solo per il giocatore attivo ──────
        // Bug fix: il dialog del Jolly compariva su tutti i dispositivi.
        // Gli spettatori devono solo attendere la sync_stato dall'host.
        const orig_chiedeJolly = ruota._chiedeJolly.bind(ruota);
        ruota._chiedeJolly = function (msgEvento, colorEvento, onUsa, onNonUsa) {
            if (ruota.turno !== self.mioIdx) {
                // Non sono il giocatore attivo: salta il dialog, esegui onNonUsa
                // (che ora è sicura grazie al patch di _passaTurno)
                onNonUsa();
                return;
            }
            orig_chiedeJolly(msgEvento, colorEvento, onUsa, onNonUsa);
        };
    },

    // ── Fix bottoni prenota velocissima ─────────────────────────────

    _fixVelocissimaBtns() {
        for (let i = 0; i < 3; i++) {
            let btn = document.getElementById(`vel-btn-${i}`);
            if (!btn) continue;
            if (i !== this.mioIdx) {
                btn.style.opacity = '0.3';
                btn.style.pointerEvents = 'none';
                btn.innerHTML = `${ruota._nomeG(i)} &mdash; ATTENDI`;
            }
        }
    },

    // ── Fix bottoni prenota triplete ─────────────────────────────────

    _fixTrilettePrenotaBtns() {
        const self = this;
        let allBtns = Array.from(field.querySelectorAll('button'));
        let prenotaBtns = allBtns.filter(b => b.innerHTML.includes('PRENOTA'));
        prenotaBtns.forEach((btn, i) => {
            if (i !== self.mioIdx) {
                btn.style.opacity = '0.3';
                btn.style.pointerEvents = 'none';
            } else {
                // Aggiungi capture listener per intercettare e broadcast
                btn.addEventListener('click', () => {
                    // Broadcast che stiamo prenotando
                    if (!ruota._trilettePrenotatoDa || ruota._trilettePrenotatoDa < 0) {
                        self.inviaAzione('prenota_trip', { tipo: 'prenota', idx: i });
                    }
                }, true);
            }
        });
    },

    // ── Timer velocissima centralizzato (solo host) ─────────────────

    _startVelTimerHost() {
        const self = this;
        clearInterval(ruota._termometroTimer);
        ruota._termometroTimer = setInterval(() => {
            if (ruota._velIdx >= ruota._velPosizioniLettere.length) {
                clearInterval(ruota._termometroTimer);
                ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato! Prossima manche.", "#888");
                let _m = ruota.manche;
                ruota._queueTimeout(() => ruota._avanzaManche(_m), 2500);
                return;
            }
            let pos = ruota._velPosizioniLettere[ruota._velIdx++];
            ruota.fraseLettereScoperte[pos] = true;
            // Broadcast la lettera a tutti gli altri client
            self.inviaAzione('vel_lettera', {
                pos,
                velIdx: ruota._velIdx,
                fraseLettereScoperte: [...ruota.fraseLettereScoperte]
            });
            let tab = document.getElementById("ruota-tabellone");
            if (tab) tab.replaceWith(ruota._buildTabellone());
            if (ruota._tutteScoperte()) {
                clearInterval(ruota._termometroTimer);
                ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato! Prossima manche.", "#888");
                let _m = ruota.manche;
                ruota._queueTimeout(() => ruota._avanzaManche(_m), 2500);
            }
        }, 2000);
    },

    // ── Protocollo velocissima prenota online ───────────────────────

    _velocissimaPrenota_online(playerIdx) {
        if (ruota._termometroEliminate.includes(playerIdx)) return;
        clearInterval(ruota._termometroTimer);

        // Broadcast: sto prenotando
        this.inviaAzione('prenota_vel', { tipo: 'prenota', idx: playerIdx });

        // Mostra overlay con input (versione online)
        let overlay = document.createElement("div");
        overlay.id = "vel-overlay";
        overlay.style.cssText = `position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(10,0,24,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:500;padding:16px 80px;`;
        let titolo = document.createElement("div");
        titolo.innerHTML = `${ruota._nomeG(playerIdx)} &mdash; DAI LA SOLUZIONE`;
        titolo.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;color:${ruota.COLORS[playerIdx]};letter-spacing:3px;`;
        let tabEl = ruota._buildTabellone();
        let sc = Math.min(0.68, window.innerWidth * 0.78 / 1100);
        tabEl.style.transform = `scale(${sc})`;
        tabEl.style.transformOrigin = 'top center';
        tabEl.style.marginBottom = Math.round((sc - 1) * 260) + 'px';
        let inp = document.createElement("input");
        inp.type = "text"; inp.placeholder = "Scrivi la frase...";
        inp.style.cssText = `background:rgba(255,255,255,0.07);border:2px solid ${ruota.COLORS[playerIdx]}88;border-radius:14px;padding:24px 36px;font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;color:white;outline:none;width:100%;box-sizing:border-box;text-transform:uppercase;`;
        let btnRow = document.createElement("div");
        btnRow.style.cssText = `display:flex;gap:20px;width:100%;`;
        let okBtn = document.createElement("button");
        okBtn.innerHTML = "✓ CONFERMA";
        okBtn.style.cssText = `flex:2;background:rgba(34,204,102,0.12);color:#22cc66;border:2px solid rgba(34,204,102,0.5);border-radius:14px;padding:22px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;cursor:pointer;`;
        let annullaBtn = document.createElement("button");
        annullaBtn.innerHTML = "← ANNULLA";
        annullaBtn.style.cssText = `flex:1;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:22px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:700;cursor:pointer;`;

        const self = this;

        annullaBtn.addEventListener('click', () => {
            overlay.remove();
            self.inviaAzione('prenota_vel', { tipo: 'annulla', velIdx: ruota._velIdx });
            ruota._velocissima_resumeTimer();
        });

        const doCheck = () => {
            let risposta = inp.value.trim().toUpperCase();
            let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
            if (risposta === corretta) {
                ruota.punteggioGioco[playerIdx] += 1000;
                ruota.turnoIniziale = playerIdx; ruota.turno = playerIdx;
                overlay.remove();
                ruota._showToast(`${ruota._nomeG(playerIdx)} vince La Velocissima! +1.000 €`, "#22cc66");
                self.inviaAzione('prenota_vel', { tipo: 'ok', idx: playerIdx, punti: ruota.punteggioGioco[playerIdx] });
                let _mv = ruota.manche;
                ruota._queueTimeout(() => ruota._avanzaManche(_mv), 2000);
            } else {
                ruota._termometroEliminate.push(playerIdx);
                ruota._showToast("Sbagliato!", "#ff4444");
                self.inviaAzione('prenota_vel', {
                    tipo: 'sbagliato',
                    idx: playerIdx,
                    velIdx: ruota._velIdx,
                    eliminate: [...ruota._termometroEliminate]
                });
                ruota._queueTimeout(() => {
                    overlay.remove();
                    let btn = document.getElementById(`vel-btn-${playerIdx}`);
                    if (btn) { btn.style.opacity = '0.25'; btn.style.pointerEvents = 'none'; }
                    if (ruota._termometroEliminate.length >= 3) {
                        ruota._showToast("Tutti eliminati! Prossima manche.", "#888");
                        let _mv2 = ruota.manche;
                        ruota._queueTimeout(() => ruota._avanzaManche(_mv2), 2000);
                        self.inviaAzione('prenota_vel', { tipo: 'tutti_eliminati' });
                    } else {
                        ruota._velocissima_resumeTimer();
                    }
                }, 1400);
            }
        };

        okBtn.addEventListener('click', doCheck);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') doCheck(); });
        btnRow.appendChild(okBtn); btnRow.appendChild(annullaBtn);
        overlay.appendChild(titolo); overlay.appendChild(tabEl); overlay.appendChild(inp); overlay.appendChild(btnRow);
        field.appendChild(overlay);
        ruota._applyMobileKeyboardFix(overlay, tabEl);
        setTimeout(() => inp.focus(), 80);
    },

    _mostraAttesaVelocissima(idx) {
        let existing = document.getElementById("vel-overlay");
        if (existing) existing.remove();
        clearInterval(ruota._termometroTimer);

        let overlay = document.createElement("div");
        overlay.id = "vel-overlay";
        overlay.style.cssText = `position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(10,0,24,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:500;`;
        let tab = ruota._buildTabellone();
        let sc = Math.min(0.6, window.innerWidth * 0.72 / 1100);
        tab.style.transform = `scale(${sc})`;
        tab.style.transformOrigin = 'top center';
        tab.style.marginBottom = Math.round((sc - 1) * 260) + 'px';
        let nome = document.createElement("div");
        nome.innerHTML = `<strong style="color:${ruota.COLORS[idx]}">${ruota._nomeG(idx)}</strong>`;
        nome.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:64px;font-weight:800;text-align:center;`;
        let sub = document.createElement("div");
        sub.innerHTML = "sta rispondendo...";
        sub.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:32px;color:rgba(255,255,255,0.45);letter-spacing:4px;`;
        overlay.appendChild(tab);
        overlay.appendChild(nome);
        overlay.appendChild(sub);
        field.appendChild(overlay);
    },

    // ── Azioni dal server ────────────────────────────────────────────

    _eseguiAzione(tipo, dati) {
        ruota._onlineSoppressiAzioni = true;
        try {
            switch (tipo) {
                case 'lettera_cons': {
                    // Highlight lettera scelta sulla griglia spettatore
                    if (main.current === 'RuotaLettera') {
                        let btn = field.querySelector(`button[data-lettera="${dati.lettera}"]`);
                        if (btn) {
                            btn.style.background = 'rgba(240,200,0,0.35)';
                            btn.style.borderColor = '#f0c800';
                            btn.style.color = '#f0c800';
                            btn.style.opacity = '1';
                            btn.style.transform = 'scale(1.12)';
                            btn.style.transition = 'all 0.15s';
                        }
                    }
                    ruota._confermaCons(dati.lettera, dati.isRaddoppia);
                    break;
                }
                case 'lettera_voc': {
                    // Highlight vocale scelta
                    if (main.current === 'RuotaVocale') {
                        let btn = Array.from(field.querySelectorAll('button')).find(b => b.innerHTML === dati.vocale);
                        if (btn) {
                            btn.style.background = 'rgba(240,200,0,0.35)';
                            btn.style.borderColor = '#f0c800';
                            btn.style.color = '#f0c800';
                            btn.style.opacity = '1';
                            btn.style.transform = 'scale(1.12)';
                            btn.style.transition = 'all 0.15s';
                        }
                    }
                    ruota._confermaVocale(dati.vocale);
                    break;
                }
                case 'spin_start':
                    this._renderSpettatoreRuota();
                    break;
                case 'vel_lettera':
                    if (dati.fraseLettereScoperte) ruota.fraseLettereScoperte = dati.fraseLettereScoperte;
                    if (dati.velIdx !== undefined) ruota._velIdx = dati.velIdx;
                    { let tab = document.getElementById("ruota-tabellone"); if (tab) tab.replaceWith(ruota._buildTabellone()); }
                    break;
                case 'prenota_vel':
                    this._gestisciPrenotaVel(dati);
                    break;
                case 'prenota_trip':
                    this._gestisciPrenotaTrip(dati);
                    break;
            }
        } finally {
            ruota._onlineSoppressiAzioni = false;
        }
    },

    _gestisciPrenotaVel(dati) {
        if (dati.tipo === 'prenota') {
            this._mostraAttesaVelocissima(dati.idx);
        } else if (dati.tipo === 'ok') {
            let ov = document.getElementById("vel-overlay");
            if (ov) ov.remove();
            if (dati.punti !== undefined) ruota.punteggioGioco[dati.idx] = dati.punti;
            // Solo l'host avanza alla manche successiva e broadcast lo stato
            if (this.mioIdx === 0) {
                ruota.turnoIniziale = dati.idx;
                ruota.turno = dati.idx;
                let _mv = ruota.manche;
                ruota._queueTimeout(() => ruota._avanzaManche(_mv), 2000);
            }
        } else if (dati.tipo === 'tutti_eliminati') {
            let ov = document.getElementById("vel-overlay");
            if (ov) ov.remove();
            // Solo l'host avanza alla manche successiva e broadcast lo stato
            if (this.mioIdx === 0) {
                let _mv = ruota.manche;
                ruota._queueTimeout(() => ruota._avanzaManche(_mv), 2000);
            }
        } else if (dati.tipo === 'sbagliato') {
            let ov = document.getElementById("vel-overlay");
            if (ov) ov.remove();
            if (dati.eliminate) ruota._termometroEliminate = dati.eliminate;
            let btn = document.getElementById(`vel-btn-${dati.idx}`);
            if (btn) { btn.style.opacity = '0.25'; btn.style.pointerEvents = 'none'; }
            if (dati.velIdx !== undefined) ruota._velIdx = dati.velIdx;
            if ((ruota._termometroEliminate || []).length < 3) {
                ruota._velocissima_resumeTimer();
            }
        } else if (dati.tipo === 'annulla') {
            let ov = document.getElementById("vel-overlay");
            if (ov) ov.remove();
            if (dati.velIdx !== undefined) ruota._velIdx = dati.velIdx;
            ruota._velocissima_resumeTimer();
        }
    },

    _gestisciPrenotaTrip(dati) {
        if (dati.tipo === 'prenota') {
            // Ferma timer e mostra attesa
            if (ruota._triletteTimer) { clearInterval(ruota._triletteTimer); ruota._triletteTimer = null; }
            let existing = document.getElementById("triplete-overlay");
            if (existing) existing.remove();
            let overlay = document.createElement("div");
            overlay.id = "triplete-overlay";
            overlay.style.cssText = `position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.93);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:50;`;
            let nome = document.createElement("div");
            nome.innerHTML = `<strong style="color:${ruota.COLORS[dati.idx]}">${ruota._nomeG(dati.idx)}</strong>`;
            nome.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:64px;font-weight:800;text-align:center;`;
            let sub = document.createElement("div");
            sub.innerHTML = "sta rispondendo...";
            sub.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:30px;color:rgba(255,255,255,0.45);letter-spacing:4px;`;
            overlay.appendChild(nome); overlay.appendChild(sub);
            field.appendChild(overlay);
        } else if (dati.tipo === 'sbagliato') {
            let ov = document.getElementById("triplete-overlay");
            if (ov) ov.remove();
            // Lo stato aggiornato arriverà via sync_stato (da _prossimaTriplete patch)
        }
    },

    inviaAzione(tipo, dati) {
        if (!this.socket) return;
        this.socket.emit('azione', { tipo, dati });
    },

    inviaSpinResult(spiccioIdx, rotazioneFinale) {
        if (!this.socket) return;
        this.socket.emit('spin_result', { spiccioIdx, rotazioneFinale });
    },

    aspettaSpinResult(cb) {
        this._spinCallback = cb;
    },

    // ── Serializzazione e broadcast stato ───────────────────────────

    _broadcastGameState(schermata) {
        if (!this.socket) return;
        // Determina schermata automaticamente se non specificata
        let sch = schermata;
        if (!sch) {
            if (ruota.manche === 0) sch = 'velocissima';
            else if (ruota.manche === 5) sch = 'triplete';
            else sch = 'gioco';
        }
        const stato = {
            fraseCorrente: ruota.fraseCorrente,
            fraseArray: ruota.fraseArray ? [...ruota.fraseArray] : [],
            fraseLettereScoperte: ruota.fraseLettereScoperte ? [...ruota.fraseLettereScoperte] : [],
            lettereRivelate: [...ruota.lettereRivelate],
            turno: ruota.turno,
            manche: ruota.manche,
            sottomanche: ruota.sottomanche || 0,
            punteggioGioco: [...ruota.punteggioGioco],
            punteggioRound: [...ruota.punteggioRound],
            jolly: [...ruota.jolly],
            valoreRuota: ruota.valoreRuota,
            attesaLettera: ruota.attesaLettera,
            faseGong: ruota.faseGong,
            _tipoAzione: ruota._tipoAzione,
            _mancheJackpot: ruota._mancheJackpot,
            _mancheExpress: ruota._mancheExpress,
            _expressTurn: ruota._expressTurn,
            jackpot_pool: ruota.jackpot_pool,
            SPICCHI: JSON.parse(JSON.stringify(ruota.SPICCHI)),
            nomi: [...ruota.nomi],
            _velPosizioniLettere: ruota._velPosizioniLettere ? [...ruota._velPosizioniLettere] : [],
            _velIdx: ruota._velIdx || 0,
            _triletteCategoria: ruota._triletteCategoria || '',
            schermata: sch
        };
        this.socket.emit('sync_stato', stato);
    },

    _applicaStatoERendera(stato) {
        ruota.fraseCorrente = stato.fraseCorrente;
        ruota.fraseArray = stato.fraseArray || [];
        ruota.fraseLettereScoperte = stato.fraseLettereScoperte || [];
        ruota.lettereRivelate = new Set(stato.lettereRivelate || []);
        ruota.turno = stato.turno;
        ruota.manche = stato.manche;
        ruota.sottomanche = stato.sottomanche || 0;
        ruota.punteggioGioco = stato.punteggioGioco;
        ruota.punteggioRound = stato.punteggioRound;
        ruota.jolly = stato.jolly;
        ruota.valoreRuota = stato.valoreRuota;
        ruota.attesaLettera = stato.attesaLettera;
        ruota.faseGong = stato.faseGong;
        ruota._tipoAzione = stato._tipoAzione;
        ruota._mancheJackpot = stato._mancheJackpot;
        ruota._mancheExpress = stato._mancheExpress;
        ruota._expressTurn = stato._expressTurn;
        ruota.jackpot_pool = stato.jackpot_pool;
        ruota.SPICCHI = stato.SPICCHI;
        ruota.nomi = stato.nomi || ruota.nomi;
        ruota._velPosizioniLettere = stato._velPosizioniLettere || [];
        ruota._velIdx = stato._velIdx || 0;
        ruota._triletteCategoria = stato._triletteCategoria || '';
        ruota._categorieUsate = ruota._categorieUsate || [];
        ruota._computeGriglia();

        ruota._onlineSkipFrase = true;
        ruota._onlineSoppressiAzioni = true;

        grafica.puliscifield();
        // Rimuovi eventuali overlay attivi
        let ov = document.getElementById("vel-overlay");
        if (ov) ov.remove();
        let ov2 = document.getElementById("triplete-overlay");
        if (ov2) ov2.remove();

        switch (stato.schermata) {
            case 'velocissima':
                ruota._velocissima();
                break;
            case 'triplete':
                ruota._prossimaTriplete();
                break;
            case 'gioco':
            default:
                ruota._renderGioco();
                main.current = 'RuotaGioco';
                break;
        }

        ruota._onlineSoppressiAzioni = false;
        ruota._onlineSkipFrase = false;
    },

    // ── UI Overlay online (blocco turni) ────────────────────────────

    _applicaBloccoUI() {
        if (this.mioIdx < 0) return;
        const isMio = ruota.turno === this.mioIdx;

        if (!isMio) {
            const btns = field.querySelectorAll('button');
            btns.forEach(b => {
                b.style.opacity = '0.25';
                b.style.pointerEvents = 'none';
            });
        }

        // Nessun banner in fondo — il turno è già visibile nel pannello destra
        // Sulla schermata lettere/vocale: chip compatto nella status bar
        const isLetterScreen = main.current === 'RuotaLettera' || main.current === 'RuotaVocale';
        let chip = document.getElementById('online-turno-chip');
        if (!isMio && isLetterScreen) {
            const nomeAttivo = ruota.nomi[ruota.turno] || `Giocatore ${ruota.turno + 1}`;
            const colore = ruota.COLORS[ruota.turno];
            if (!chip) {
                chip = document.createElement('div');
                chip.id = 'online-turno-chip';
                chip.style.cssText = `position:fixed;top:12px;right:90px;background:rgba(10,0,30,0.88);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:4px 14px;z-index:9999;font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.7);white-space:nowrap;`;
                document.body.appendChild(chip);
            }
            chip.innerHTML = `Turno: <strong style="color:${colore}">${nomeAttivo}</strong>`;
        } else {
            if (chip) chip.remove();
        }
    },

    // ── Gira Ruota Online (giocatore attivo) ───────────────────────

    _giraRuotaOnline() {
        if (ruota.attesaLettera) return;
        main.current = "RuotaSpin";
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU", "RUOTA DELLA FORTUNA", () => {});

        const FW = fieldWidth;
        const FH = fieldHeight;
        const avFH = FH - 64;
        const naturalH = FW / 2;
        const minBottom = 110;
        const visibleWheelH = Math.min(naturalH, avFH - minBottom);
        const bottomH = avFH - visibleWheelH;

        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;height:${avFH}px;overflow:hidden;`;

        let wheelWrap = document.createElement("div");
        wheelWrap.style.cssText = `position:absolute;top:0;left:0;width:${FW}px;height:${visibleWheelH}px;overflow:hidden;`;
        let canvas = document.createElement("canvas");
        canvas.width = FW; canvas.height = FW;
        canvas.style.cssText = `position:absolute;top:0;left:0;width:${FW}px;height:${FW}px;cursor:grab;touch-action:none;`;
        wheelWrap.appendChild(canvas);

        let bottomPanel = document.createElement("div");
        bottomPanel.style.cssText = `position:absolute;top:${visibleWheelH}px;left:0;right:0;height:${bottomH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;`;

        let hintEl = document.createElement("div");
        hintEl.innerHTML = "↔  Trascina la ruota per farla girare";
        hintEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:36px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-align:center;`;

        let risultatoEl = document.createElement("div");
        risultatoEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:80px;font-weight:800;color:#f0c800;letter-spacing:4px;text-align:center;line-height:1;`;

        let continuaBtn = document.createElement("button");
        continuaBtn.innerHTML = "CONTINUA";
        continuaBtn.style.cssText = `background:#f0c800;color:#1a0a3c;border:none;border-radius:16px;padding:18px 120px;font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:4px;cursor:pointer;display:none;`;

        bottomPanel.appendChild(hintEl);
        bottomPanel.appendChild(risultatoEl);
        bottomPanel.appendChild(continuaBtn);
        wrap.appendChild(wheelWrap);
        wrap.appendChild(bottomPanel);
        field.appendChild(wrap);

        let rotation = ruota._lastRotation;
        ruota._disegnaRuota(canvas, rotation);

        const TOTAL_PEGS = ruota.SPICCHI.length * 3;
        const PEG_IMPULSE = 0.000058;
        let lastPeg = -1;

        const getPeg = (rot) => {
            let norm = ((-rot) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            return Math.floor(norm * TOTAL_PEGS / (Math.PI * 2)) % TOTAL_PEGS;
        };

        let isDragging = false, lastAngle = 0, velocity = 0, lastTime = 0, spinDone = false;

        const getPoint = (e) => e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
        const getAngleAt = (pt) => {
            let rect = canvas.getBoundingClientRect();
            return Math.atan2(pt.y - (rect.top + rect.height / 2), pt.x - (rect.left + rect.width / 2));
        };

        const cleanup = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchend', onEnd);
            window.removeEventListener('blur', onEnd);
            canvas.style.cursor = 'grab';
            document.body.style.userSelect = '';
        };

        const tryTick = (rot, vel) => {
            let curPeg = getPeg(rot);
            if (curPeg !== lastPeg) { lastPeg = curPeg; ruota._playTick(Math.abs(vel)); }
        };

        const self = this;

        const emitRotation = (r) => {
            let now = Date.now();
            if (now - self._lastWheelBroadcast > 50) {
                self._lastWheelBroadcast = now;
                if (self.socket) self.socket.emit('wheel_rotation', { r });
            }
        };

        const onStart = (e) => {
            if (spinDone) return;
            ruota._resumeAudio();
            ruota._playSwoosh();
            e.preventDefault();
            isDragging = true; velocity = 0; lastTime = performance.now();
            lastAngle = getAngleAt(getPoint(e));
            canvas.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            window.addEventListener('blur', onEnd);
            // Avvisa gli altri che la ruota sta girando
            self.inviaAzione('spin_start', {});
        };

        const onMove = (e) => {
            if (!isDragging || spinDone) return;
            e.preventDefault();
            let pt = getPoint(e);
            let curAngle = getAngleAt(pt);
            let delta = curAngle - lastAngle;
            while (delta > Math.PI) delta -= 2 * Math.PI;
            while (delta < -Math.PI) delta += 2 * Math.PI;
            if (delta < 0) delta = 0;
            let now = performance.now(), dt = now - lastTime;
            if (dt > 0) velocity = delta / dt;
            rotation += delta;
            ruota._disegnaRuota(canvas, rotation);
            tryTick(rotation, velocity);
            emitRotation(rotation);
            lastAngle = curAngle; lastTime = now;
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false; canvas.style.cursor = 'grab';
            if (Math.abs(velocity) < 0.003) {
                ruota._showToast("Troppo lento! Trascina più velocemente.", "#ff8800");
                return;
            }
            spinDone = true; hintEl.innerHTML = "";
            cleanup();
            let vel = velocity, prevTime = performance.now();
            lastPeg = getPeg(rotation);
            const animate = (now) => {
                let dt = Math.min(now - prevTime, 50); prevTime = now;
                vel *= Math.pow(0.9990, dt / 16.67);
                rotation += vel * dt;
                let curPeg = getPeg(rotation);
                if (curPeg !== lastPeg) {
                    lastPeg = curPeg;
                    vel = Math.max(0, vel - PEG_IMPULSE);
                    ruota._playTick(Math.abs(vel));
                }
                ruota._disegnaRuota(canvas, rotation);
                emitRotation(rotation);
                if (Math.abs(vel) > 0.00003) { requestAnimationFrame(animate); }
                else {
                    let n = ruota.SPICCHI.length, sliceAngle = (Math.PI * 2) / n;
                    let normalized = ((-rotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
                    let spiccioVincente = Math.floor(normalized / sliceAngle) % n;
                    let sp = ruota.SPICCHI[spiccioVincente];
                    risultatoEl.innerHTML = sp.label;
                    ruotaOnline.inviaSpinResult(spiccioVincente, rotation);
                    let flashCount = 0;
                    const flashWin = () => {
                        ruota._disegnaRuota(canvas, rotation);
                        let ctx2 = canvas.getContext('2d');
                        let cx2 = canvas.width / 2, cy2 = canvas.height / 2, R2 = cx2 * 0.93;
                        let sa = (-Math.PI / 2) + rotation + spiccioVincente * sliceAngle;
                        ctx2.save();
                        ctx2.shadowBlur = 60; ctx2.shadowColor = 'rgba(255,255,200,0.95)';
                        ctx2.globalAlpha = 0.38 * (1 - flashCount / 3);
                        ctx2.beginPath(); ctx2.moveTo(cx2, cy2);
                        ctx2.arc(cx2, cy2, R2, sa, sa + sliceAngle); ctx2.closePath();
                        ctx2.fillStyle = '#ffffff'; ctx2.fill();
                        ctx2.restore();
                        flashCount++;
                        if (flashCount < 4) setTimeout(flashWin, 160);
                        else { continuaBtn.style.display = 'block'; }
                    };
                    ruota._lastRotation = rotation;
                    flashWin();
                    continuaBtn.onclick = () => ruota._dopoRuota(sp, spiccioVincente);
                }
            };
            prevTime = performance.now();
            requestAnimationFrame(animate);
        };

        canvas.addEventListener('mousedown', onStart);
        canvas.addEventListener('touchstart', onStart, { passive: false });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
        document.addEventListener('pointercancel', cleanup);
    },

    // ── Vista spettatore durante lo spin (con ruota live) ──────────

    _renderSpettatoreRuota() {
        grafica.puliscifield();
        grafica._statusBar("● ONLINE", "RUOTA DELLA FORTUNA", () => {});

        const self = this;
        // Usa le coordinate VIRTUALI del field (1920 × fieldHeight)
        const W   = fieldWidth;   // sempre 1920
        const H   = fieldHeight;  // adattato all'aspect ratio reale
        const avH = H - 64;

        const nomeGiocante = ruota.nomi[ruota.turno] || `Giocatore ${ruota.turno + 1}`;
        const colore = ruota.COLORS[ruota.turno];

        // ── Dimensioni naturali tabellone ─────────────────────────────
        const tabNatW = 14 * ruota.CELL_W + 13 * ruota.CELL_GAP;
        const tabNatH = 4  * ruota.CELL_H + 3  * ruota.CELL_GAP;

        // ── Clipper: contiene il tabellone scalato con dimensioni corrette
        //    Il parent vede solo tabScaledW × tabScaledH — zero spazio fantasma
        const makeTabClipper = (maxW, maxH) => {
            const sc = Math.min(maxW / tabNatW, maxH / tabNatH, 0.99);
            const sw = Math.round(tabNatW * sc);
            const sh = Math.round(tabNatH * sc);
            const clip = document.createElement("div");
            clip.style.cssText = `width:${sw}px;height:${sh}px;overflow:hidden;flex-shrink:0;`;
            const el = ruota._buildTabellone();
            el.style.transform = `scale(${sc})`;
            el.style.transformOrigin = 'top left';
            clip.appendChild(el);
            return { clip, sw, sh };
        };

        // ── Canvas ruota ──────────────────────────────────────────────
        const makeWheel = (diam) => {
            const c = document.createElement("canvas");
            c.width = diam * 2; c.height = diam * 2;
            c.style.cssText = `width:${diam}px;height:${diam}px;flex-shrink:0;`;
            return c;
        };

        // ── Label giocatore ───────────────────────────────────────────
        const makeLabel = (fs) => {
            const el = document.createElement("div");
            el.innerHTML =
                `<strong style="color:${colore}">${nomeGiocante}</strong><br>` +
                `<span style="font-size:${Math.round(fs * 0.58)}px;color:rgba(255,255,255,0.42)">sta girando la ruota</span>`;
            el.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:${fs}px;font-weight:700;text-align:center;line-height:1.35;flex-shrink:0;`;
            return el;
        };

        // Il field è sempre landscape (field.js mostra "ruota dispositivo" in portrait)
        // W = fieldWidth = 1920, H = fieldHeight (dipende dall'aspect ratio reale)

        // Split: 60% tabellone sinistra / 40% ruota destra
        const rightW = Math.round(W * 0.40);  // ~768px
        const leftW  = W - rightW;            // ~1152px
        const pad    = 20;

        const tabMaxW = leftW - pad * 2;
        const tabMaxH = Math.round(avH * 0.80);
        const { clip: tabClip } = makeTabClipper(tabMaxW, tabMaxH);

        const catBanner = ruota._buildCatBanner(ruota.fraseCorrente ? ruota.fraseCorrente.categoria : '');
        catBanner.style.cssText += 'flex-shrink:0;margin-top:10px;';

        const leftPanel = document.createElement("div");
        leftPanel.style.cssText = `flex:0 0 ${leftW}px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${pad}px;gap:0;overflow:hidden;box-sizing:border-box;`;
        leftPanel.appendChild(tabClip);
        leftPanel.appendChild(catBanner);

        // Ruota: si adatta al pannello destro, max 80% altezza
        const wheelDiam = Math.min(rightW - 30, Math.round(avH * 0.80));
        let smallCanvas = makeWheel(wheelDiam);

        const labelFs = Math.max(24, Math.min(48, Math.round(rightW / 14)));
        const rightPanel = document.createElement("div");
        rightPanel.style.cssText = `flex:0 0 ${rightW}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:16px 12px;border-left:1px solid rgba(255,255,255,0.07);overflow:hidden;box-sizing:border-box;`;
        rightPanel.appendChild(makeLabel(labelFs));
        rightPanel.appendChild(smallCanvas);

        const wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;overflow:hidden;display:flex;flex-direction:row;align-items:stretch;`;
        wrap.appendChild(leftPanel);
        wrap.appendChild(rightPanel);

        field.appendChild(wrap);

        // ── Animazione ruota live ─────────────────────────────────────
        self._liveWheelCanvas   = smallCanvas;
        self._liveWheelRotation = ruota._lastRotation;
        let animating = true;
        const animateSmall = () => {
            ruota._disegnaRuota(smallCanvas, self._liveWheelRotation);
            if (animating) requestAnimationFrame(animateSmall);
        };
        animateSmall();

        self.aspettaSpinResult((spiccioIdx, rotazioneFinale) => {
            animating = false;
            self._liveWheelCanvas = null;
            ruota._lastRotation = rotazioneFinale;
            const sp = ruota.SPICCHI[spiccioIdx];
            ruota._dopoRuota(sp, spiccioIdx);
        });
    },

    // ── Schermate Lobby ─────────────────────────────────────────────

    mostraSceltaModalita() {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU", "RUOTA DELLA FORTUNA", () => {
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:40px;`;

        let title = document.createElement("div");
        title.innerHTML = "SCEGLI MODALITÀ";
        title.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:60px;font-weight:800;letter-spacing:6px;color:white;`;

        let sub = document.createElement("div");
        sub.innerHTML = "Come vuoi giocare alla Ruota della Fortuna?";
        sub.style.cssText = `font-family:'Barlow',sans-serif;font-size:24px;color:rgba(255,255,255,0.4);margin-top:-20px;`;

        let cards = document.createElement("div");
        cards.style.cssText = `display:flex;gap:40px;`;

        const makeCard = (icon, titolo, desc, onClick) => {
            let card = document.createElement("div");
            card.style.cssText = `width:420px;background:rgba(255,255,255,0.04);border:2px solid rgba(240,200,0,0.3);border-radius:22px;padding:48px 40px;display:flex;flex-direction:column;align-items:center;gap:20px;cursor:pointer;transition:border-color 0.2s;`;
            card.addEventListener('mouseenter', () => card.style.borderColor = 'rgba(240,200,0,0.8)');
            card.addEventListener('mouseleave', () => card.style.borderColor = 'rgba(240,200,0,0.3)');
            card.addEventListener('click', onClick);
            let ic = document.createElement("div"); ic.innerHTML = icon; ic.style.cssText = `font-size:72px;`;
            let t = document.createElement("div"); t.innerHTML = titolo;
            t.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;color:#f0c800;letter-spacing:2px;text-align:center;`;
            let d = document.createElement("div"); d.innerHTML = desc;
            d.style.cssText = `font-family:'Barlow',sans-serif;font-size:20px;color:rgba(255,255,255,0.5);text-align:center;line-height:1.5;`;
            let btn = document.createElement("div"); btn.innerHTML = "SELEZIONA →";
            btn.style.cssText = `background:#f0c800;color:#1a0a3c;border-radius:12px;padding:16px 48px;font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:2px;margin-top:8px;`;
            card.appendChild(ic); card.appendChild(t); card.appendChild(d); card.appendChild(btn);
            return card;
        };

        let cardLocale = makeCard("🖥️", "LOCALE", "Tutto sullo stesso schermo.<br>3 giocatori, un dispositivo.", () => {
            grafica.puliscifield(); ruota.setup(); main.current = "RuotaSetup";
        });
        let cardOnline = makeCard("🌐", "ONLINE", "Ogni giocatore usa il suo<br>dispositivo in tempo reale.", () => {
            ruotaOnline._connetti(); ruotaOnline._renderEntraLobby();
        });

        cards.appendChild(cardLocale); cards.appendChild(cardOnline);
        wrap.appendChild(title); wrap.appendChild(sub); wrap.appendChild(cards);
        field.appendChild(wrap);
        main.current = "RuotaScelta";
    },

    _renderEntraLobby() {
        grafica.puliscifield();
        grafica._statusBar("← INDIETRO", "RUOTA ONLINE", () => { ruotaOnline.mostraSceltaModalita(); });

        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;padding:40px;`;

        let title = document.createElement("div"); title.innerHTML = "RUOTA ONLINE";
        title.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:60px;font-weight:800;letter-spacing:6px;color:#f0c800;`;

        const mkLabel = (txt) => {
            let el = document.createElement("div"); el.innerHTML = txt;
            el.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,0.4);align-self:flex-start;max-width:700px;width:100%;`;
            return el;
        };

        let nomeInput = document.createElement("input");
        nomeInput.type = "text"; nomeInput.placeholder = "Es. MARIO"; nomeInput.maxLength = 20;
        nomeInput.style.cssText = `width:100%;max-width:700px;background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.18);border-radius:14px;padding:20px 24px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:700;color:white;outline:none;box-sizing:border-box;text-transform:uppercase;`;
        nomeInput.addEventListener('focus', () => nomeInput.style.borderColor = '#f0c800');
        nomeInput.addEventListener('blur', () => nomeInput.style.borderColor = 'rgba(255,255,255,0.18)');
        nomeInput.addEventListener('input', () => nomeInput.value = nomeInput.value.toUpperCase());

        let divider = document.createElement("div");
        divider.style.cssText = `display:flex;align-items:center;gap:20px;max-width:700px;width:100%;`;
        let l1 = document.createElement("div"); l1.style.cssText = `flex:1;height:1px;background:rgba(255,255,255,0.12);`;
        let orText = document.createElement("div"); orText.innerHTML = "OPPURE";
        orText.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:18px;letter-spacing:4px;color:rgba(255,255,255,0.3);`;
        let l2 = document.createElement("div"); l2.style.cssText = `flex:1;height:1px;background:rgba(255,255,255,0.12);`;
        divider.appendChild(l1); divider.appendChild(orText); divider.appendChild(l2);

        let codiceInput = document.createElement("input");
        codiceInput.type = "text"; codiceInput.placeholder = "Es. 4821"; codiceInput.maxLength = 4;
        codiceInput.style.cssText = `width:100%;max-width:700px;background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.18);border-radius:14px;padding:20px 24px;font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:800;color:#f0c800;outline:none;box-sizing:border-box;letter-spacing:16px;text-align:center;`;
        codiceInput.addEventListener('focus', () => codiceInput.style.borderColor = '#f0c800');
        codiceInput.addEventListener('blur', () => codiceInput.style.borderColor = 'rgba(255,255,255,0.18)');
        codiceInput.addEventListener('input', () => { codiceInput.value = codiceInput.value.replace(/\D/g, ''); });

        let btnRow = document.createElement("div"); btnRow.style.cssText = `display:flex;gap:20px;max-width:700px;width:100%;`;

        let btnCrea = document.createElement("button");
        btnCrea.innerHTML = "✦ CREA STANZA";
        btnCrea.style.cssText = `flex:1;background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px;font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;letter-spacing:2px;cursor:pointer;`;
        btnCrea.addEventListener('click', () => {
            let nome = nomeInput.value.trim() || 'GIOCATORE 1';
            ruotaOnline.socket.emit('crea_stanza', { nome });
        });

        let btnEntra = document.createElement("button");
        btnEntra.innerHTML = "→ ENTRA";
        btnEntra.style.cssText = `flex:1;background:rgba(255,255,255,0.06);color:white;border:2px solid rgba(255,255,255,0.18);border-radius:14px;padding:24px;font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;letter-spacing:2px;cursor:pointer;`;
        btnEntra.addEventListener('click', () => {
            let nome = nomeInput.value.trim() || 'GIOCATORE';
            let codice = codiceInput.value.trim();
            if (codice.length !== 4) { ruota._showToast('Inserisci un codice di 4 cifre.', '#ff8800'); return; }
            ruotaOnline.socket.emit('entra_stanza', { codice, nome });
        });

        btnRow.appendChild(btnCrea); btnRow.appendChild(btnEntra);
        wrap.appendChild(title);
        wrap.appendChild(mkLabel("IL TUO NOME")); wrap.appendChild(nomeInput);
        wrap.appendChild(divider);
        wrap.appendChild(mkLabel("CODICE STANZA (per entrare)")); wrap.appendChild(codiceInput);
        wrap.appendChild(btnRow);
        field.appendChild(wrap);
        main.current = "RuotaLobbyEntra";
        setTimeout(() => nomeInput.focus(), 100);
    },

    _renderLobby(giocatori, isHost) {
        this.nomiGiocatori = giocatori.map(g => g.nome);
        grafica.puliscifield();
        grafica._statusBar("● ONLINE", "RUOTA DELLA FORTUNA", () => {});

        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;padding:40px;`;

        let title = document.createElement("div"); title.innerHTML = "STANZA D'ATTESA";
        title.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:6px;color:white;`;

        let codiceBox = document.createElement("div");
        codiceBox.style.cssText = `background:rgba(240,200,0,0.08);border:2px solid rgba(240,200,0,0.4);border-radius:18px;padding:20px 80px;text-align:center;`;
        let codiceLabel2 = document.createElement("div"); codiceLabel2.innerHTML = "CODICE STANZA";
        codiceLabel2.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:20px;letter-spacing:5px;color:rgba(255,255,255,0.35);margin-bottom:4px;`;
        let codiceNum = document.createElement("div"); codiceNum.innerHTML = `#${this.codiceStanza}`;
        codiceNum.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:72px;font-weight:800;color:#f0c800;letter-spacing:12px;line-height:1;`;
        codiceBox.appendChild(codiceLabel2); codiceBox.appendChild(codiceNum);

        let sub = document.createElement("div"); sub.innerHTML = "Condividi il codice con gli altri giocatori";
        sub.style.cssText = `font-family:'Barlow',sans-serif;font-size:22px;color:rgba(255,255,255,0.35);`;

        let listaWrap = document.createElement("div"); listaWrap.id = "lobby-lista";
        listaWrap.style.cssText = `display:flex;gap:24px;`;
        this._buildListaGiocatori(listaWrap, giocatori);

        let attesaEl = document.createElement("div"); attesaEl.id = "lobby-attesa";
        attesaEl.style.cssText = `font-family:'Barlow',sans-serif;font-size:22px;color:rgba(255,255,255,0.35);`;
        attesaEl.innerHTML = giocatori.length < 3 ? `In attesa di ${3 - giocatori.length} giocatore/i...` : '';

        let btnIniziaWrap = document.createElement("div"); btnIniziaWrap.id = "lobby-inizia-wrap";
        if (isHost) {
            let btnInzia = document.createElement("button"); btnInzia.id = "lobby-inizia-btn";
            btnInzia.innerHTML = "INIZIA PARTITA ▶";
            let pronto = giocatori.length >= 3;
            btnInzia.style.cssText = `background:${pronto ? '#f0c800' : 'rgba(255,255,255,0.1)'};color:${pronto ? '#1a0a3c' : 'rgba(255,255,255,0.25)'};border:none;border-radius:16px;padding:26px 110px;font-family:'Barlow Condensed',sans-serif;font-size:42px;font-weight:800;letter-spacing:4px;cursor:${pronto ? 'pointer' : 'default'};pointer-events:${pronto ? 'auto' : 'none'};`;
            btnInzia.addEventListener('click', () => { ruotaOnline.socket.emit('inizia_partita'); });
            btnIniziaWrap.appendChild(btnInzia);
        } else {
            let waitMsg = document.createElement("div");
            waitMsg.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:28px;color:rgba(255,255,255,0.35);letter-spacing:3px;`;
            waitMsg.innerHTML = "In attesa che l'host avvii la partita...";
            btnIniziaWrap.appendChild(waitMsg);
        }

        wrap.appendChild(title); wrap.appendChild(codiceBox); wrap.appendChild(sub);
        wrap.appendChild(listaWrap); wrap.appendChild(attesaEl); wrap.appendChild(btnIniziaWrap);
        field.appendChild(wrap);
        main.current = "RuotaLobby";
    },

    _buildListaGiocatori(container, giocatori) {
        container.innerHTML = '';
        const slotColors = ['#ff4466', '#4488ff', '#22cc88'];
        for (let i = 0; i < 3; i++) {
            let g = giocatori[i];
            let slot = document.createElement("div");
            slot.style.cssText = `width:240px;background:rgba(255,255,255,0.04);border:2px solid ${g ? slotColors[i] + '66' : 'rgba(255,255,255,0.08)'};border-radius:16px;padding:28px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;`;
            let numEl = document.createElement("div"); numEl.innerHTML = `P${i + 1}`;
            numEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;letter-spacing:4px;color:${slotColors[i]};opacity:${g ? '1' : '0.3'};`;
            let nomeEl = document.createElement("div"); nomeEl.innerHTML = g ? g.nome : '—';
            nomeEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;color:${g ? 'white' : 'rgba(255,255,255,0.2)'};text-align:center;`;
            let badge = document.createElement("div");
            badge.innerHTML = g ? (g.idx === 0 ? '👑 HOST' : '✓ PRONTO') : 'IN ATTESA';
            badge.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;letter-spacing:2px;color:${g ? slotColors[i] : 'rgba(255,255,255,0.15)'};`;
            if (g && g.idx === this.mioIdx) {
                slot.style.borderColor = slotColors[i];
                slot.style.background = `rgba(${i === 0 ? '255,68,102' : i === 1 ? '68,136,255' : '34,204,136'},0.08)`;
            }
            slot.appendChild(numEl); slot.appendChild(nomeEl); slot.appendChild(badge);
            container.appendChild(slot);
        }
    },

    _aggiornaListaLobby(giocatori) {
        this.nomiGiocatori = giocatori.map(g => g.nome);
        let lista = document.getElementById("lobby-lista");
        if (lista) this._buildListaGiocatori(lista, giocatori);
        let attesa = document.getElementById("lobby-attesa");
        if (attesa) attesa.innerHTML = giocatori.length < 3 ? `In attesa di ${3 - giocatori.length} giocatore/i...` : '';
        let btnInzia = document.getElementById("lobby-inizia-btn");
        if (btnInzia) {
            let pronto = giocatori.length >= 3;
            btnInzia.style.background = pronto ? '#f0c800' : 'rgba(255,255,255,0.1)';
            btnInzia.style.color = pronto ? '#1a0a3c' : 'rgba(255,255,255,0.25)';
            btnInzia.style.cursor = pronto ? 'pointer' : 'default';
            btnInzia.style.pointerEvents = pronto ? 'auto' : 'none';
        }
    }
};
