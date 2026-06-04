const ruotaCpu = {

    slots: [],
    difficolta: 'media',
    _pollTimer: null,
    _cpuActing: false,
    _velBooked: [],
    _velAnswering: false,

    FREQ_CONS: ['R','S','T','N','L','M','C','D','P','B','V','G','F','H','Z','J','K','Q','W','X','Y'],
    FREQ_VOC: ['A','E','I','O','U'],

    reset() {
        this.slots = [];
        this._cpuActing = false;
        this._velBooked = [];
        this._velAnswering = false;
        if (this._pollTimer) { clearInterval(this._pollTimer); this._pollTimer = null; }
    },

    attiva(slots, difficolta) {
        this.reset();
        this.slots = [...slots];
        this.difficolta = difficolta || 'media';
        this._pollTimer = setInterval(() => this._tick(), 400);
    },

    _è(idx) { return this.slots.includes(idx); },

    _delay(base) {
        let factor = this.difficolta === 'difficile' ? 0.5 : this.difficolta === 'facile' ? 1.6 : 1;
        return Math.round((base || 1200) * factor + Math.random() * 300);
    },

    // Aspetta che main.current esca dallo stato `fromState` prima di liberare il lock.
    _releaseWhenStateChanges(fromState, timeout) {
        let w = 0;
        let chk = setInterval(() => {
            w += 100;
            if (main.current !== fromState || w > (timeout || 4000)) {
                clearInterval(chk);
                this._velAnswering = false;
                this._cpuActing = false;
            }
        }, 100);
    },

    _postAction() {
        if (typeof ruotaOnline !== 'undefined' && ruotaOnline.codiceStanza && ruotaOnline.mioIdx === 0) {
            setTimeout(() => ruotaOnline._broadcastGameState('gioco'), 350);
        }
    },

    _tick() {
        if (this._cpuActing) return;
        let s = main.current;
        let t = ruota.turno;

        if (s === 'RuotaTermometro') { this._velCheck(); return; }
        if (s === 'RuotaTriplete')   { this._triletteCheck(); return; }

        // Bonus "Se la Sai Raddoppi": solo per il vincitore della manche
        if ((s === 'RuotaBonusSel' || s === 'RuotaBonusGioco') &&
            typeof ruota._raddoppioVincitore !== 'undefined' &&
            this._è(ruota._raddoppioVincitore)) {
            if      (s === 'RuotaBonusSel')  this._azioneBonusSel();
            else if (s === 'RuotaBonusGioco') this._azioneBonusGioco();
            return;
        }

        if (!this._è(t)) return;

        if      (s === 'RuotaGioco')   this._azioneGioco();
        else if (s === 'RuotaLettera') this._azioneLettera();
        else if (s === 'RuotaVocale')  this._azioneVocale();
        else if (s === 'RuotaFinale')  this._azioneFinale();
    },

    // ── La Velocissima ──────────────────────────────────────────────────
    _velCheck() {
        if (this._velAnswering) return;
        if (!ruota._velPosizioniLettere || !ruota._velPosizioniLettere.length) return;
        let total = ruota._velPosizioniLettere.length;
        let revealed = ruota._velIdx || 0;
        let pct = revealed / total;
        let threshold = this.difficolta === 'difficile' ? 0.12 :
                        this.difficolta === 'media'     ? 0.28 : 0.50;
        if (pct < threshold) return;

        for (let idx of this.slots) {
            if (this._velBooked.includes(idx)) continue;
            if ((ruota._termometroEliminate || []).includes(idx)) continue;
            this._velBooked.push(idx);
            this._velAnswering = true;
            this._cpuActing = true;
            setTimeout(() => {
                if (main.current !== 'RuotaTermometro') {
                    this._velAnswering = false; this._cpuActing = false; return;
                }
                ruota._velocissimaPrenota(idx);
                this._releaseWhenStateChanges('RuotaTermometro', 12000);
            }, this._delay(400));
            break;
        }
    },

    _handleVelocissima(playerIdx) {
        let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
        let risposta = this._rispostaFrase(corretta);
        ruota._showToast(`🤖 ${ruota._nomeG(playerIdx)} si prenota!`, ruota.COLORS[playerIdx], 1200);
        setTimeout(() => {
            ruota._showToast(`🤖 ${ruota._nomeG(playerIdx)}: "${risposta}"`, ruota.COLORS[playerIdx], 2200);
            setTimeout(() => {
                if (risposta === corretta) {
                    ruota._playCorrectSolution();
                    ruota.punteggioGioco[playerIdx] += 1000;
                    ruota.turnoIniziale = playerIdx; ruota.turno = playerIdx;
                    ruota._showToast(`${ruota._nomeG(playerIdx)} vince La Velocissima! +1.000 €`, '#22cc66');
                    let _m = ruota.manche;
                    ruota._queueTimeout(() => { this._postAction(); ruota._avanzaManche(_m); }, 2000);
                } else {
                    ruota._playWrongSolution();
                    ruota._termometroEliminate.push(playerIdx);
                    ruota._showToast(`${ruota._nomeG(playerIdx)} — Sbagliato!`, '#ff4444');
                    ruota._queueTimeout(() => {
                        let btn = document.getElementById(`vel-btn-${playerIdx}`);
                        if (btn) { btn.style.opacity = '0.25'; btn.style.pointerEvents = 'none'; }
                        if (ruota._termometroEliminate.length >= 3) {
                            ruota._showToast('Tutti eliminati!', '#888');
                            let _m2 = ruota.manche;
                            ruota._queueTimeout(() => ruota._mostraFraseNascosta(() => ruota._avanzaManche(_m2)), 1500);
                        } else {
                            ruota._velocissima_resumeTimer();
                            this._velAnswering = false;
                            this._cpuActing = false;
                        }
                    }, 1400);
                }
            }, this._delay(1500));
        }, 900);
    },

    // ── Il Triplete ─────────────────────────────────────────────────────
    _triletteCheck() {
        if (ruota._trilettePrenotatoDa >= 0) return;
        if (!ruota._trillettePosizioni || !ruota._trillettePosizioni.length) return;
        let total = ruota._trillettePosizioni.length;
        let revealed = ruota._triletteRevIdx || 0;
        let pct = revealed / total;
        let threshold = this.difficolta === 'difficile' ? 0.30 :
                        this.difficolta === 'media'     ? 0.50 : 0.72;
        if (pct < threshold) return;

        for (let idx of this.slots) {
            if ((ruota._triletteEliminate || []).includes(idx)) continue;
            this._cpuActing = true;
            ruota._trilettePrenotatoDa = idx;
            clearInterval(ruota._triletteTimer); ruota._triletteTimer = null;
            // Dim all prenota buttons
            for (let j = 0; j < 3; j++) {
                let pb = document.getElementById(`triplete-prenota-${j}`);
                if (pb) { pb.style.opacity='0.3'; pb.style.pointerEvents='none'; }
            }
            ruota._showToast(`🤖 ${ruota._nomeG(idx)} si prenota!`, ruota.COLORS[idx], 900);
            setTimeout(() => {
                if (main.current !== 'RuotaTriplete') { this._cpuActing = false; return; }
                this._handleTriplete(idx);
            }, this._delay(500));
            break;
        }
    },

    _handleTriplete(idx) {
        let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
        let risposta = this._rispostaFrase(corretta);
        ruota._showToast(`🤖 ${ruota._nomeG(idx)}: "${risposta}"`, ruota.COLORS[idx], 2200);
        setTimeout(() => {
            if (risposta === corretta) {
                ruota._confermaTriplete(true, idx);
            } else {
                // Risposta sbagliata: logica identica a onSbagliata
                ruota._triletteEliminate.push(idx);
                ruota._trilettePrenotatoDa = -1;
                for (let j = 0; j < 3; j++) {
                    if ((ruota._triletteEliminate || []).includes(j)) continue;
                    let pb = document.getElementById(`triplete-prenota-${j}`);
                    if (pb && !this._è(j)) {
                        pb.style.opacity = '1'; pb.style.pointerEvents = 'auto';
                    }
                }
                ruota._triletteResume();
            }
            this._cpuActing = false;
        }, this._delay(1500));
    },

    // ── Turno principale (RuotaGioco) ───────────────────────────────────
    _azioneGioco() {
        this._cpuActing = true;
        let frase = ruota.fraseCorrente?.frase || '';
        let scoperte = 0;
        for (let i = 0; i < frase.length; i++) {
            if ((ruota.fraseLettereScoperte || [])[i] || !/[A-Z]/i.test(frase[i])) scoperte++;
        }
        let pct = frase.length > 0 ? scoperte / frase.length : 0;

        // Manche 6 pre-gong: il bot preme il GONG non appena ha abbastanza lettere visibili
        if (ruota.manche === 6 && !ruota.faseGong) {
            if (pct >= 0.25) {
                setTimeout(() => {
                    if (main.current !== 'RuotaGioco' || ruota.faseGong) { this._cpuActing = false; return; }
                    ruota._giraRuotaFinale();
                    this._cpuActing = false;
                }, this._delay(800));
                return;
            }
        }
        // Soglie più conservative: il bot non tenta prima che siano visibili abbastanza lettere
        let sogliaSol = this.difficolta === 'difficile' ? 0.72 :
                        this.difficolta === 'media'     ? 0.80 : 0.90;

        let tutteVoc = ruota._tutteVocaliRivelate ? ruota._tutteVocaliRivelate() : true;
        let tutteConRiv = ruota._tutteConsonantiRivelate ? ruota._tutteConsonantiRivelate() : false;
        let canVocale = !tutteVoc && ruota.punteggioRound[ruota.turno] >= 500 && !ruota.attesaLettera;
        let wantsVocale = canVocale && pct >= 0.3 && Math.random() < 0.35;

        setTimeout(() => {
            if (main.current !== 'RuotaGioco' || !this._è(ruota.turno)) {
                this._cpuActing = false; return;
            }
            if (pct >= sogliaSol && Math.random() < 0.85) {
                this._azioneSoluzione();
            } else if (tutteConRiv || wantsVocale) {
                this._azioneCompraVocale();
            } else {
                this._azioneSpin();
            }
        }, this._delay());
    },

    // ── Gira la ruota ───────────────────────────────────────────────────
    _azioneSpin() {
        if (!this._è(ruota.turno) || main.current !== 'RuotaGioco') {
            this._cpuActing = false; return;
        }
        ruota._giraRuotaBot((sp, idx) => {
            if (!this._è(ruota.turno)) { this._cpuActing = false; return; }
            ruota._dopoRuota(sp, idx);
            this._postAction();
            this._releaseWhenStateChanges('RuotaSpin', 6000);
        });
    },

    // ── Scelta consonante (RuotaLettera) ────────────────────────────────
    // Quando faseGong è true usa _confermaConsGong invece di _confermaCons
    _azioneLettera() {
        this._cpuActing = true;
        let isRaddoppia = ruota._tipoAzione === 'raddoppia';
        let isGong = ruota.faseGong === true;
        setTimeout(() => {
            if (main.current !== 'RuotaLettera' || !this._è(ruota.turno)) {
                this._cpuActing = false; return;
            }
            let l = this._scegliConsonante();
            ruota._showToast(`🤖 ${ruota._nomeTurno()} sceglie: ${l}`, ruota.COLORS[ruota.turno], 900);
            setTimeout(() => {
                if (main.current !== 'RuotaLettera') { this._cpuActing = false; return; }
                if (isGong) {
                    ruota._confermaConsGong(l);
                } else {
                    ruota._confermaCons(l, isRaddoppia);
                }
                this._postAction();
                this._releaseWhenStateChanges('RuotaLettera');
            }, 700);
        }, this._delay(700));
    },

    // ── Acquisto vocale (RuotaVocale) ───────────────────────────────────
    _azioneVocale() {
        this._cpuActing = true;
        setTimeout(() => {
            if (main.current !== 'RuotaVocale' || !this._è(ruota.turno)) {
                this._cpuActing = false; return;
            }
            let v = this._scegliVocale();
            ruota._showToast(`🤖 ${ruota._nomeTurno()} sceglie la vocale: ${v}`, ruota.COLORS[ruota.turno], 900);
            setTimeout(() => {
                if (main.current !== 'RuotaVocale') { this._cpuActing = false; return; }
                ruota._confermaVocale(v);
                this._postAction();
                this._releaseWhenStateChanges('RuotaVocale');
            }, 700);
        }, this._delay(700));
    },

    _azioneCompraVocale() {
        ruota._showToast(`🤖 ${ruota._nomeTurno()} compra una vocale…`, ruota.COLORS[ruota.turno], 900);
        setTimeout(() => {
            if (!this._è(ruota.turno)) { this._cpuActing = false; return; }
            ruota._apriCompraVocale();
            this._releaseWhenStateChanges('RuotaGioco');
        }, 800);
    },

    // ── Soluzione — costruisce la risposta solo dalle lettere rivelate ───
    _azioneSoluzione() {
        let risposta = this._rispostaFraseGioco();
        let corretta = (ruota.fraseCorrente?.frase || '').toUpperCase();
        let statoCorrente = main.current;
        ruota._showToast(`🤖 ${ruota._nomeTurno()} prova: "${risposta}"`, ruota.COLORS[ruota.turno], 2500);
        setTimeout(() => {
            if (!this._è(ruota.turno)) { this._cpuActing = false; return; }
            clearInterval(ruota._gongTimer);
            if (risposta === corretta) {
                ruota._playCorrectSolution();
                for (let i = 0; i < ruota.fraseLettereScoperte.length; i++) ruota.fraseLettereScoperte[i] = true;
                ruota._vinceRound(ruota.turno);
            } else {
                ruota._playWrongSolution();
                ruota._showToast('Sbagliato!', '#ff4444', 1000);
                if (ruota.faseGong) {
                    setTimeout(() => ruota._prossimoTurnoGong(), 1200);
                } else {
                    setTimeout(() => ruota._passaTurno(), 1200);
                }
            }
            this._postAction();
            this._releaseWhenStateChanges(statoCorrente);
        }, this._delay(2200));
    },

    // ── Finale / Gong (RuotaFinale) ─────────────────────────────────────
    _azioneFinale() {
        this._cpuActing = true;
        let frase = ruota.fraseCorrente?.frase || '';
        let scoperte = 0;
        for (let i = 0; i < frase.length; i++) {
            if ((ruota.fraseLettereScoperte || [])[i] || !/[A-Z]/i.test(frase[i])) scoperte++;
        }
        let pct = frase.length > 0 ? scoperte / frase.length : 0;
        let sogliaSol = this.difficolta === 'difficile' ? 0.72 :
                        this.difficolta === 'media'     ? 0.80 : 0.90;

        // Finestra post-consonante nel Gong (5 secondi per dare la soluzione).
        // Il bot tenta solo se ha abbastanza lettere visibili, altrimenti lascia scadere il timer.
        if (ruota.faseGong && ruota._gongSolWindow) {
            setTimeout(() => {
                if (main.current !== 'RuotaFinale') { this._cpuActing = false; return; }
                if (pct >= sogliaSol) {
                    this._azioneSoluzione();
                } else {
                    this._cpuActing = false; // lascia scadere i 5 secondi
                }
            }, this._delay(600));
            return;
        }

        setTimeout(() => {
            if (main.current !== 'RuotaFinale' || !this._è(ruota.turno)) {
                this._cpuActing = false; return;
            }
            if (pct >= sogliaSol) {
                this._azioneSoluzione();
            } else if (!(ruota._tutteConsonantiRivelate ? ruota._tutteConsonantiRivelate() : false)) {
                clearInterval(ruota._gongTimer);
                ruota._apriChiamataConsonanteGong();
                this._releaseWhenStateChanges('RuotaFinale');
            } else if (!(ruota._tutteVocaliRivelate ? ruota._tutteVocaliRivelate() : true)) {
                clearInterval(ruota._gongTimer);
                ruota._apriCompraVocale();
                this._releaseWhenStateChanges('RuotaFinale');
            } else {
                this._azioneSoluzione();
            }
        }, this._delay(800));
    },

    // ── Se la Sai Raddoppi — Selezione lettere (RuotaBonusSel) ──────────
    _azioneBonusSel() {
        this._cpuActing = true;
        let frase = (ruota.fraseCorrente?.frase || '').toUpperCase();
        let CONS = 'BCDFGHJKLMNPQRSTVWXYZ';
        let VOCI = 'AEIOU';
        let consFq = {}, vocFq = {};
        for (let c of frase) {
            if (CONS.includes(c)) consFq[c] = (consFq[c] || 0) + 1;
            if (VOCI.includes(c)) vocFq[c] = (vocFq[c] || 0) + 1;
        }
        let cons = Object.keys(consFq).sort((a, b) => consFq[b] - consFq[a]).slice(0, 4);
        for (let c of this.FREQ_CONS) {
            if (cons.length >= 4) break;
            if (!cons.includes(c)) cons.push(c);
        }
        let voc = Object.keys(vocFq).sort((a, b) => vocFq[b] - vocFq[a])[0] || 'A';

        setTimeout(() => {
            if (main.current !== 'RuotaBonusSel') { this._cpuActing = false; return; }
            let v = ruota._raddoppioVincitore;
            ruota._showToast(
                `🤖 ${ruota._nomeG(v)} sceglie: ${cons.join(' ')} + ${voc}`,
                ruota.COLORS[v], 2200
            );
            setTimeout(() => {
                if (main.current !== 'RuotaBonusSel') { this._cpuActing = false; return; }
                ruota._raddoppioConsSel = [...cons];
                ruota._raddoppioVocaleSel = voc;
                ruota._confermaBonusLettere();
                this._releaseWhenStateChanges('RuotaBonusSel');
            }, 1500);
        }, this._delay(1000));
    },

    // ── Se la Sai Raddoppi — Gioco con countdown (RuotaBonusGioco) ──────
    _azioneBonusGioco() {
        this._cpuActing = true;
        let corretta = (ruota.fraseCorrente?.frase || '').toUpperCase();
        let acc = this.difficolta === 'difficile' ? 0.96 :
                  this.difficolta === 'media'     ? 0.82 : 0.55;
        let maxWait = Math.max(500, ((ruota._raddoppioSecondi || 15) - 3) * 1000);
        let thinkTime = Math.min(this._delay(2500), maxWait);

        setTimeout(() => {
            if (main.current !== 'RuotaBonusGioco') { this._cpuActing = false; return; }
            clearInterval(ruota._raddoppioTimer);
            let v = ruota._raddoppioVincitore;
            if (Math.random() < acc) {
                ruota._showToast(`🤖 ${ruota._nomeG(v)}: "${corretta}"`, ruota.COLORS[v], 2000);
                setTimeout(() => {
                    ruota._bonusCorretta();
                    this._releaseWhenStateChanges('RuotaBonusGioco');
                }, 1500);
            } else {
                let sbagliata = this._rispostaFrase(corretta);
                ruota._showToast(`🤖 ${ruota._nomeG(v)}: "${sbagliata}"`, ruota.COLORS[v], 2000);
                setTimeout(() => {
                    ruota._bonusErrata();
                    this._releaseWhenStateChanges('RuotaBonusGioco');
                }, 1500);
            }
        }, thinkTime);
    },

    // ── Helpers ─────────────────────────────────────────────────────────
    _scegliConsonante() {
        let rivelate = ruota.lettereRivelate || new Set();
        if (this.difficolta !== 'facile') {
            for (let c of this.FREQ_CONS) if (!rivelate.has(c)) return c;
        }
        let disp = this.FREQ_CONS.filter(c => !rivelate.has(c));
        return disp.length ? disp[Math.floor(Math.random() * disp.length)] : this.FREQ_CONS[0];
    },

    _scegliVocale() {
        let rivelate = ruota.lettereRivelate || new Set();
        for (let v of this.FREQ_VOC) if (!rivelate.has(v)) return v;
        return 'A';
    },

    // Usata per La Velocissima, Il Triplete e Il Bonus (giochi di prenotazione)
    // dove l'accuratezza è intenzionalmente legata alla difficoltà
    _rispostaFrase(corretta) {
        let acc = this.difficolta === 'difficile' ? 0.97 :
                  this.difficolta === 'media'     ? 0.85 : 0.60;
        if (Math.random() < acc) return corretta;
        let arr = corretta.split('');
        let alphaIdx = arr.map((c, i) => /[A-Z]/.test(c) ? i : -1).filter(i => i >= 0);
        if (alphaIdx.length) {
            let ri = alphaIdx[Math.floor(Math.random() * alphaIdx.length)];
            arr[ri] = arr[ri] === 'A' ? 'E' : 'A';
        }
        return arr.join('');
    },

    // Usata per la soluzione nel gioco principale e nel Gong:
    // il bot costruisce la risposta SOLO dalle lettere rivelate sul tabellone.
    // Le lettere non ancora scoperte vengono sostituite con lettere improbabili,
    // quindi il bot non può "indovinare" la frase se troppe lettere sono nascoste.
    _rispostaFraseGioco() {
        let frase = (ruota.fraseCorrente?.frase || '').toUpperCase();
        let scoperte = ruota.fraseLettereScoperte || [];
        let arr = frase.split('');
        let SUBS = ['Q','X','Z','K','W','J','Y'];
        for (let i = 0; i < arr.length; i++) {
            if (!/[A-Z]/.test(arr[i])) continue;
            if (scoperte[i]) continue;
            arr[i] = SUBS[Math.floor(Math.random() * SUBS.length)];
        }
        return arr.join('');
    },
};
