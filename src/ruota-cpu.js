const ruotaCpu = {

    slots: [],
    difficolta: 'media',
    _pollTimer: null,
    _cpuActing: false,
    _velBooked: [],

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
    // Evita che il poll riparta mentre la transizione è ancora in un setTimeout interno.
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
        if (!this._è(t)) return;

        if      (s === 'RuotaGioco')   this._azioneGioco();
        else if (s === 'RuotaLettera') this._azioneLettera();
        else if (s === 'RuotaVocale')  this._azioneVocale();
        else if (s === 'RuotaFinale')  this._azioneFinale();
    },

    // ── La Velocissima ──────────────────────────────────────────────────
    _velCheck() {
        // Blocca se un bot sta già rispondendo (evita prenotazioni multiple simultanee)
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
                // Timeout lungo: l'intera sequenza prenota→risposta→avanzaManche dura ~6-8s
                this._releaseWhenStateChanges('RuotaTermometro', 12000);
            }, this._delay(400));
            break;
        }
    },

    _handleVelocissima(playerIdx) {
        // Il timer è già stato fermato da _velocissimaPrenota prima di chiamare questo metodo
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
                    // _cpuActing e _velAnswering rilasciati da _releaseWhenStateChanges
                    // quando _avanzaManche cambia main.current
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
                            // rilasciato da _releaseWhenStateChanges
                        } else {
                            ruota._velocissima_resumeTimer();
                            // stato resta RuotaTermometro: rilasciamo manualmente
                            this._velAnswering = false;
                            this._cpuActing = false;
                        }
                    }, 1400);
                }
            }, this._delay(1500));
        }, 900);
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
        let sogliaSol = this.difficolta === 'difficile' ? 0.42 :
                        this.difficolta === 'media'     ? 0.62 : 0.84;

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

    // ── Gira la ruota (con animazione visibile) ─────────────────────────
    _azioneSpin() {
        if (!this._è(ruota.turno) || main.current !== 'RuotaGioco') {
            this._cpuActing = false; return;
        }
        ruota._giraRuotaBot((sp, idx) => {
            if (!this._è(ruota.turno)) { this._cpuActing = false; return; }
            ruota._dopoRuota(sp, idx);
            this._postAction();
            // Tieni _cpuActing=true finché la schermata consonante si apre;
            // evita che il poll giri di nuovo la ruota nel frattempo.
            this._releaseWhenStateChanges('RuotaSpin', 6000);
        });
    },

    // ── Scelta consonante (RuotaLettera) ────────────────────────────────
    _azioneLettera() {
        this._cpuActing = true;
        let isRaddoppia = ruota._tipoAzione === 'raddoppia';
        setTimeout(() => {
            if (main.current !== 'RuotaLettera' || !this._è(ruota.turno)) {
                this._cpuActing = false; return;
            }
            let l = this._scegliConsonante();
            ruota._showToast(`🤖 ${ruota._nomeTurno()} sceglie: ${l}`, ruota.COLORS[ruota.turno], 900);
            setTimeout(() => {
                if (main.current !== 'RuotaLettera') { this._cpuActing = false; return; }
                ruota._confermaCons(l, isRaddoppia);
                this._postAction();
                // NON rilasciare subito: _confermaCons cambia stato via setTimeout interno.
                // Aspettiamo che main.current esca da RuotaLettera.
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

    // ── Soluzione (mostra la risposta prima di confermare) ───────────────
    _azioneSoluzione() {
        let corretta = ruota.fraseCorrente?.frase.toUpperCase() || '';
        let risposta = this._rispostaFrase(corretta);
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
        let sogliaSol = this.difficolta === 'difficile' ? 0.48 :
                        this.difficolta === 'media'     ? 0.68 : 0.84;

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
};
