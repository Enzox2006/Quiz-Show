const intesa = {
    nomeA: 'SQUADRA 1',
    nomeB: 'SQUADRA 2',
    durata: 90,

    timeA: 90000,
    timeB: 90000,
    turno: 'A',
    punteggioA: 0,
    punteggioB: 0,
    passatiA: 0,
    passatiB: 0,
    domande: [],
    idx: 0,

    _timerInterval: null,
    _lastTick: 0,
    _faseFinale: false,

    _inPausa: false,
    _timerAEl: null,
    _timerBEl: null,
    _cardAEl: null,
    _cardBEl: null,
    _nomeAEl: null,
    _nomeBEl: null,
    _statoAEl: null,
    _statoBEl: null,
    _scoreAEl: null,
    _scoreBEl: null,
    _parolaEl: null,
    _pausaBtnEl: null,
    _parolaBoxEl: null,

    _formatTime(ms) {
        let totalS = Math.ceil(ms / 1000);
        let m = Math.floor(totalS / 60);
        let s = totalS % 60;
        return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    },

    reset() {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this._lastTick = 0;
        this._faseFinale = false;
        this.timeA = this.durata * 1000;
        this.timeB = this.durata * 1000;
        this.turno = 'A';
        this.punteggioA = 0;
        this.punteggioB = 0;
        this.passatiA = 0;
        this.passatiB = 0;
        this.domande = [];
        this.idx = 0;
        this._inPausa = false;
        this._timerAEl = null;
        this._timerBEl = null;
        this._cardAEl = null;
        this._cardBEl = null;
        this._nomeAEl = null;
        this._nomeBEl = null;
        this._statoAEl = null;
        this._statoBEl = null;
        this._scoreAEl = null;
        this._scoreBEl = null;
        this._parolaEl = null;
        this._pausaBtnEl = null;
        this._parolaBoxEl = null;
    },

    setup() {
        grafica._statusBar("← TORNA AL MENU", "REAZIONE · INTESA VINCENTE", () => {
            intesa.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bgGlow = document.createElement("div");
        bgGlow.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 1400px; height: 1400px;
            background: radial-gradient(circle, rgba(200,40,80,0.07) 0%, transparent 60%);
            pointer-events: none;
        `;
        field.appendChild(bgGlow);

        let card = document.createElement("div");
        card.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            background: rgba(8, 0, 25, 0.88);
            border: 2px solid rgba(240,200,0,0.28);
            border-radius: 26px; padding: 68px 84px 60px;
        `;
        card.classList.add('slide-up');

        let title = document.createElement("h2");
        title.innerHTML = "REAZIONE &ndash; INTESA VINCENTE";
        title.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 52px; font-weight: 800; color: #f0c800;
            text-align: center; letter-spacing: 4px; line-height: 1; margin-bottom: 14px;
        `;

        let subtitle = document.createElement("p");
        subtitle.innerHTML = "Imposta le due squadre e premi inizia. Una parola alla volta, chi indovina segna un punto.";
        subtitle.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 22px;
            color: rgba(255,255,255,0.45); text-align: center; margin-bottom: 44px;
        `;

        let nameRow = document.createElement("div");
        nameRow.style.cssText = `display: flex; gap: 32px;`;

        let col1 = document.createElement("div"); col1.style.flex = "1";
        let col2 = document.createElement("div"); col2.style.flex = "1";

        let lbl1 = grafica._label("SQUADRA 1");
        let inp1 = grafica._input("text", "Es. Campioni");
        inp1.id = "intesaNome1";
        inp1.value = (this.nomeA !== "SQUADRA 1") ? this.nomeA : "";

        let lbl2 = grafica._label("SQUADRA 2");
        let inp2 = grafica._input("text", "Es. Sfidanti");
        inp2.id = "intesaNome2";
        inp2.value = (this.nomeB !== "SQUADRA 2") ? this.nomeB : "";

        col1.appendChild(lbl1); col1.appendChild(inp1);
        col2.appendChild(lbl2); col2.appendChild(inp2);
        nameRow.appendChild(col1); nameRow.appendChild(col2);

        let durLbl = grafica._label("TEMPO PER SQUADRA (SEC)");
        let durInp = grafica._input("number", "90");
        durInp.id = "intesaDurata";
        durInp.value = this.durata;
        durInp.min = "30"; durInp.max = "300";

        let startBtn = document.createElement("button");
        startBtn.innerHTML = "&#9654; INIZIA PARTITA";
        startBtn.style.cssText = `
            width: 100%; background: #f0c800; color: #1a0a3c;
            border: none; border-radius: 14px; padding: 30px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 38px; font-weight: 800; letter-spacing: 3px;
            cursor: pointer; margin-top: 42px;
            box-shadow: 0 8px 40px rgba(240,200,0,0.3);
        `;
        startBtn.classList.add('btn-primary');
        startBtn.addEventListener('click', () => intesa._avviaPartita());

        let hint = document.createElement("p");
        hint.innerHTML = "Scorciatoie: Invio o Spazio = Indovinato &nbsp;·&nbsp; P = Passa";
        hint.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 20px;
            color: rgba(255,255,255,0.28); text-align: center; margin-top: 22px;
        `;

        card.appendChild(title);
        card.appendChild(subtitle);
        card.appendChild(nameRow);
        card.appendChild(durLbl);
        card.appendChild(durInp);
        card.appendChild(startBtn);
        card.appendChild(hint);
        field.appendChild(card);

        setTimeout(() => inp1.focus(), 100);
    },

    _avviaPartita() {
        let n1 = (document.getElementById("intesaNome1").value.trim() || "SQUADRA 1").toUpperCase();
        let n2 = (document.getElementById("intesaNome2").value.trim() || "SQUADRA 2").toUpperCase();
        let dur = parseInt(document.getElementById("intesaDurata").value) || 90;

        this.nomeA = n1;
        this.nomeB = n2;
        this.durata = dur;
        this.timeA = dur * 1000;
        this.timeB = dur * 1000;
        this.turno = 'A';
        this.punteggioA = 0;
        this.punteggioB = 0;
        this.passatiA = 0;
        this.passatiB = 0;

        let shuffled = [...intesaDomande];
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.domande = shuffled;
        this.idx = Math.floor(Math.random() * shuffled.length);

        grafica.puliscifield();
        this._renderGioco();
        main.current = "IntesaGioco";
        this._avviaTimer();
    },

    _renderGioco() {
        grafica._statusBar("← MENU", "REAZIONE · INTESA VINCENTE", () => {
            intesa.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bg = document.createElement("div");
        bg.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(ellipse at 25% 15%, rgba(200,40,80,0.10) 0%, transparent 55%),
                        radial-gradient(ellipse at 75% 85%, rgba(240,200,0,0.04) 0%, transparent 45%);
            pointer-events: none;
        `;
        field.appendChild(bg);

        let wrapper = document.createElement("div");
        wrapper.style.cssText = `
            position: absolute; top: 64px; left: 0; right: 0; bottom: 0;
            display: flex; flex-direction: column;
            padding: 28px 60px 36px;
            gap: 24px;
        `;

        let timerArea = document.createElement("div");
        timerArea.style.cssText = `
            display: flex; gap: 40px; flex-shrink: 0;
        `;

        this._cardAEl = this._buildTimerCard(this.nomeA, this.timeA, this.punteggioA, this.turno === 'A');
        this._timerAEl = this._cardAEl.querySelector('.int-timer');
        this._nomeAEl  = this._cardAEl.querySelector('.int-nome');
        this._statoAEl = this._cardAEl.querySelector('.int-stato');
        this._scoreAEl = this._cardAEl.querySelector('.int-score');

        this._cardBEl = this._buildTimerCard(this.nomeB, this.timeB, this.punteggioB, this.turno === 'B');
        this._timerBEl = this._cardBEl.querySelector('.int-timer');
        this._nomeBEl  = this._cardBEl.querySelector('.int-nome');
        this._statoBEl = this._cardBEl.querySelector('.int-stato');
        this._scoreBEl = this._cardBEl.querySelector('.int-score');

        timerArea.appendChild(this._cardAEl);
        timerArea.appendChild(this._cardBEl);

        let gameArea = document.createElement("div");
        gameArea.style.cssText = `
            flex: 1; display: flex; flex-direction: column; gap: 24px; min-height: 0;
        `;

        let parolaBox = document.createElement("div");
        parolaBox.style.cssText = `
            flex: 1; min-height: 0;
            background: rgba(255,255,255,0.06);
            border: 2px solid rgba(240,200,0,0.22);
            border-radius: 24px; padding: 0 60px;
            display: flex; align-items: center; justify-content: center;
        `;

        this._parolaEl = document.createElement("div");
        this._parolaEl.innerHTML = this.domande[this.idx] || "";
        this._parolaEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 110px; font-weight: 800; color: #f0c800;
            letter-spacing: 6px; line-height: 1;
            text-shadow: 0 0 60px rgba(240,200,0,0.35);
            word-break: break-word; text-align: center;
            transition: transform 0.15s, opacity 0.15s;
        `;

        this._parolaBoxEl = parolaBox;
        parolaBox.appendChild(this._parolaEl);

        let btnRow = document.createElement("div");
        btnRow.style.cssText = `
            display: flex; gap: 24px; flex-shrink: 0; height: 130px;
        `;

        let indovinatoBtn = document.createElement("button");
        indovinatoBtn.innerHTML = "&#10003;&nbsp; INDOVINATO";
        indovinatoBtn.style.cssText = `
            flex: 3; height: 100%;
            background: rgba(34,204,102,0.12);
            border: 2px solid rgba(34,204,102,0.5);
            color: #22cc66;
            border-radius: 18px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 44px; font-weight: 800; letter-spacing: 4px;
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
        `;
        indovinatoBtn.addEventListener('mouseenter', () => {
            indovinatoBtn.style.background = 'rgba(34,204,102,0.28)';
            indovinatoBtn.style.transform = 'scale(1.02)';
        });
        indovinatoBtn.addEventListener('mouseleave', () => {
            indovinatoBtn.style.background = 'rgba(34,204,102,0.12)';
            indovinatoBtn.style.transform = 'scale(1)';
        });
        indovinatoBtn.addEventListener('click', () => intesa._indovinato());

        let passaBtn = document.createElement("button");
        passaBtn.innerHTML = "&#8594;&nbsp; PASSA";
        passaBtn.style.cssText = `
            flex: 1.5; height: 100%;
            background: rgba(255,255,255,0.05);
            border: 2px solid rgba(255,255,255,0.2);
            color: rgba(255,255,255,0.55);
            border-radius: 18px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 44px; font-weight: 700; letter-spacing: 3px;
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
        `;
        passaBtn.addEventListener('mouseenter', () => {
            passaBtn.style.background = 'rgba(255,255,255,0.12)';
            passaBtn.style.transform = 'scale(1.02)';
        });
        passaBtn.addEventListener('mouseleave', () => {
            passaBtn.style.background = 'rgba(255,255,255,0.05)';
            passaBtn.style.transform = 'scale(1)';
        });
        passaBtn.addEventListener('click', () => intesa._passa());

        this._pausaBtnEl = document.createElement("button");
        this._pausaBtnEl.innerHTML = "&#9646;&#9646;&nbsp; PAUSA";
        this._pausaBtnEl.style.cssText = `
            width: 230px; height: 100%;
            background: rgba(255,200,0,0.07);
            border: 2px solid rgba(255,200,0,0.28);
            color: rgba(255,200,0,0.7);
            border-radius: 18px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 32px; font-weight: 700; letter-spacing: 3px;
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
            flex-shrink: 0;
        `;
        this._pausaBtnEl.addEventListener('mouseenter', () => {
            this._pausaBtnEl.style.background = 'rgba(255,200,0,0.16)';
        });
        this._pausaBtnEl.addEventListener('mouseleave', () => {
            if (!this._inPausa) this._pausaBtnEl.style.background = 'rgba(255,200,0,0.07)';
        });
        this._pausaBtnEl.addEventListener('click', () => intesa._togglePausa());

        btnRow.appendChild(indovinatoBtn);
        btnRow.appendChild(passaBtn);
        btnRow.appendChild(this._pausaBtnEl);

        gameArea.appendChild(parolaBox);
        gameArea.appendChild(btnRow);
        wrapper.appendChild(timerArea);
        wrapper.appendChild(gameArea);
        field.appendChild(wrapper);
    },

    _buildTimerCard(nome, time, score, attivo) {
        let card = document.createElement("div");
        card.style.cssText = `
            flex: 1;
            background: ${attivo ? 'rgba(240,200,0,0.08)' : 'rgba(255,255,255,0.04)'};
            border: 2px solid ${attivo ? 'rgba(240,200,0,0.65)' : 'rgba(255,255,255,0.1)'};
            border-radius: 20px; padding: 24px 40px;
            display: flex; flex-direction: column; align-items: center; gap: 4px;
            transition: border-color 0.35s, background 0.35s;
        `;

        let nomeEl = document.createElement("div");
        nomeEl.classList.add('int-nome');
        nomeEl.innerHTML = nome;
        nomeEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 28px; font-weight: 700; letter-spacing: 4px;
            color: ${attivo ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'};
            transition: color 0.35s;
        `;

        let timerEl = document.createElement("div");
        timerEl.classList.add('int-timer');
        timerEl.innerHTML = this._formatTime(time);
        timerEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 72px; font-weight: 800; line-height: 1; letter-spacing: 2px;
            color: ${attivo ? '#f0c800' : 'rgba(255,255,255,0.22)'};
            text-shadow: ${attivo ? '0 0 40px rgba(240,200,0,0.4)' : 'none'};
            transition: color 0.35s, text-shadow 0.35s;
            font-variant-numeric: tabular-nums;
        `;

        let scoreEl = document.createElement("div");
        scoreEl.classList.add('int-score');
        scoreEl.innerHTML = `${score} PT`;
        scoreEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 30px; font-weight: 700; letter-spacing: 2px;
            color: ${attivo ? '#f0c800' : 'rgba(255,255,255,0.28)'};
            transition: color 0.35s;
        `;

        let statoEl = document.createElement("div");
        statoEl.classList.add('int-stato');
        statoEl.innerHTML = attivo ? "TURNO ATTIVO" : "IN ATTESA";
        statoEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 18px; font-weight: 600; letter-spacing: 4px;
            color: ${attivo ? '#f0c800' : 'rgba(255,255,255,0.28)'};
            background: ${attivo ? 'rgba(240,200,0,0.14)' : 'transparent'};
            border: 1px solid ${attivo ? 'rgba(240,200,0,0.4)' : 'transparent'};
            border-radius: 20px; padding: 4px 20px;
            transition: color 0.35s, background 0.35s, border-color 0.35s;
        `;

        card.appendChild(nomeEl);
        card.appendChild(timerEl);
        card.appendChild(scoreEl);
        card.appendChild(statoEl);
        return card;
    },

    _aggiornaCardsVisual() {
        let attA = this.turno === 'A';

        this._cardAEl.style.background = attA ? 'rgba(240,200,0,0.08)' : 'rgba(255,255,255,0.04)';
        this._cardAEl.style.border     = `2px solid ${attA ? 'rgba(240,200,0,0.65)' : 'rgba(255,255,255,0.1)'}`;
        this._nomeAEl.style.color      = attA ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)';
        this._timerAEl.style.color     = attA ? '#f0c800' : 'rgba(255,255,255,0.22)';
        this._timerAEl.style.textShadow= attA ? '0 0 40px rgba(240,200,0,0.4)' : 'none';
        this._scoreAEl.style.color     = attA ? '#f0c800' : 'rgba(255,255,255,0.28)';
        this._statoAEl.innerHTML       = attA ? "TURNO ATTIVO" : "IN ATTESA";
        this._statoAEl.style.color     = attA ? '#f0c800' : 'rgba(255,255,255,0.28)';
        this._statoAEl.style.background= attA ? 'rgba(240,200,0,0.14)' : 'transparent';
        this._statoAEl.style.border    = `1px solid ${attA ? 'rgba(240,200,0,0.4)' : 'transparent'}`;

        let attB = !attA;
        this._cardBEl.style.background = attB ? 'rgba(240,200,0,0.08)' : 'rgba(255,255,255,0.04)';
        this._cardBEl.style.border     = `2px solid ${attB ? 'rgba(240,200,0,0.65)' : 'rgba(255,255,255,0.1)'}`;
        this._nomeBEl.style.color      = attB ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)';
        this._timerBEl.style.color     = attB ? '#f0c800' : 'rgba(255,255,255,0.22)';
        this._timerBEl.style.textShadow= attB ? '0 0 40px rgba(240,200,0,0.4)' : 'none';
        this._scoreBEl.style.color     = attB ? '#f0c800' : 'rgba(255,255,255,0.28)';
        this._statoBEl.innerHTML       = attB ? "TURNO ATTIVO" : "IN ATTESA";
        this._statoBEl.style.color     = attB ? '#f0c800' : 'rgba(255,255,255,0.28)';
        this._statoBEl.style.background= attB ? 'rgba(240,200,0,0.14)' : 'transparent';
        this._statoBEl.style.border    = `1px solid ${attB ? 'rgba(240,200,0,0.4)' : 'transparent'}`;
    },

    _avviaTimer() {
        clearInterval(this._timerInterval);
        this._lastTick = performance.now();
        this._timerInterval = setInterval(() => intesa._tick(), 50);
    },

    _tick() {
        if (main.current !== 'IntesaGioco') return;
        let now = performance.now();
        let delta = now - this._lastTick;
        this._lastTick = now;

        if (this.turno === 'A') {
            if (this.timeA > 0) {
                this.timeA = Math.max(0, this.timeA - delta);
                if (this._timerAEl) {
                    this._timerAEl.innerHTML = this._formatTime(this.timeA);
                    if (this.timeA <= 15000) this._timerAEl.classList.add('timer-low');
                    else this._timerAEl.classList.remove('timer-low');
                }
                if (this.timeA <= 0) this._fineturno();
            }
        } else {
            if (this.timeB > 0) {
                this.timeB = Math.max(0, this.timeB - delta);
                if (this._timerBEl) {
                    this._timerBEl.innerHTML = this._formatTime(this.timeB);
                    if (this.timeB <= 15000) this._timerBEl.classList.add('timer-low');
                    else this._timerBEl.classList.remove('timer-low');
                }
                if (this.timeB <= 0) this._fineturno();
            }
        }
    },

    _nextParola() {
        this.idx++;
        if (this.idx >= this.domande.length) this.idx = 0;
        if (this._parolaEl) {
            this._parolaEl.style.transform = 'scale(0.85)';
            this._parolaEl.style.opacity = '0';
            this._parolaEl.style.transition = 'transform 0.15s, opacity 0.15s';
            setTimeout(() => {
                this._parolaEl.innerHTML = this.domande[this.idx];
                this._parolaEl.style.transform = 'scale(1)';
                this._parolaEl.style.opacity = '1';
            }, 150);
        }
    },

    _flashParola(color) {
        if (!this._parolaEl) return;
        let orig = this._parolaEl.style.color;
        this._parolaEl.style.transition = 'color 0.1s';
        this._parolaEl.style.color = color;
        setTimeout(() => {
            this._parolaEl.style.color = '#f0c800';
        }, 400);
    },

    _indovinato() {
        if (main.current !== 'IntesaGioco') return;
        this._flashParola('#22cc66');

        if (this.turno === 'A') {
            this.punteggioA++;
            if (this._scoreAEl) this._scoreAEl.innerHTML = `${this.punteggioA} PT`;
        } else {
            this.punteggioB++;
            if (this._scoreBEl) this._scoreBEl.innerHTML = `${this.punteggioB} PT`;
        }
        setTimeout(() => intesa._nextParola(), 300);
    },

    _passa() {
        if (main.current !== 'IntesaGioco') return;
        this._flashParola('rgba(255,255,255,0.45)');
        if (this.turno === 'A') this.passatiA++;
        else this.passatiB++;
        setTimeout(() => intesa._nextParola(), 200);
    },

    _togglePausa() {
        if (main.current !== 'IntesaGioco') return;
        if (this._inPausa) {
            this._inPausa = false;
            this._lastTick = performance.now();
            this._timerInterval = setInterval(() => intesa._tick(), 50);
            if (this._pausaBtnEl) {
                this._pausaBtnEl.innerHTML = "&#9646;&#9646;&nbsp; PAUSA";
                this._pausaBtnEl.style.background = 'rgba(255,200,0,0.07)';
                this._pausaBtnEl.style.borderColor = 'rgba(255,200,0,0.28)';
                this._pausaBtnEl.style.color = 'rgba(255,200,0,0.7)';
            }
            if (this._parolaBoxEl) {
                this._parolaBoxEl.style.borderColor = 'rgba(240,200,0,0.22)';
            }
        } else {
            this._inPausa = true;
            clearInterval(this._timerInterval);
            this._timerInterval = null;
            if (this._pausaBtnEl) {
                this._pausaBtnEl.innerHTML = "&#9654;&nbsp; RIPRENDI";
                this._pausaBtnEl.style.background = 'rgba(255,200,0,0.20)';
                this._pausaBtnEl.style.borderColor = 'rgba(255,200,0,0.65)';
                this._pausaBtnEl.style.color = '#f0c800';
            }
            if (this._parolaBoxEl) {
                this._parolaBoxEl.style.borderColor = 'rgba(255,200,0,0.55)';
            }
        }
    },

    _fineturno() {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this._inPausa = false;

        if (!this._faseFinale) {
            this._faseFinale = true;
            this._schermoCambioTurno();
        } else {
            this._finePartita();
        }
    },

    _schermoCambioTurno() {
        main.current = "IntesaTurnoAttesa";
        let nomeAppena = this.turno === 'A' ? this.nomeA : this.nomeB;
        let punteggioAppena = this.turno === 'A' ? this.punteggioA : this.punteggioB;
        let nomeProssimo = this.turno === 'A' ? this.nomeB : this.nomeA;

        this.turno = this.turno === 'A' ? 'B' : 'A';

        grafica.puliscifield();

        grafica._statusBar("← MENU", "REAZIONE · INTESA VINCENTE", () => {
            intesa.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bg = document.createElement("div");
        bg.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(ellipse at 50% 40%, rgba(240,200,0,0.08) 0%, transparent 65%);
            pointer-events: none;
        `;
        field.appendChild(bg);

        let wrap = document.createElement("div");
        wrap.style.cssText = `
            position: absolute; top: 64px; left: 0; right: 0; bottom: 0;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 48px; padding: 40px 120px;
        `;
        wrap.classList.add('slide-up');

        let tagEl = document.createElement("div");
        tagEl.innerHTML = "FINE 1° TURNO";
        tagEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 28px; font-weight: 700; letter-spacing: 8px;
            color: rgba(255,255,255,0.38);
        `;

        let scoreBox = document.createElement("div");
        scoreBox.style.cssText = `
            background: rgba(240,200,0,0.08);
            border: 2px solid rgba(240,200,0,0.35);
            border-radius: 24px; padding: 44px 80px;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            min-width: 500px;
        `;
        let sNome = document.createElement("div");
        sNome.innerHTML = nomeAppena;
        sNome.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 38px; font-weight: 700; letter-spacing: 5px; color: white;
        `;
        let sScore = document.createElement("div");
        sScore.innerHTML = `${punteggioAppena}`;
        sScore.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 120px; font-weight: 800; line-height: 1; color: #f0c800;
            text-shadow: 0 0 60px rgba(240,200,0,0.45);
        `;
        let sLabel = document.createElement("div");
        sLabel.innerHTML = "PUNTI";
        sLabel.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 24px; letter-spacing: 6px; color: rgba(240,200,0,0.6);
        `;
        scoreBox.appendChild(sNome);
        scoreBox.appendChild(sScore);
        scoreBox.appendChild(sLabel);

        let proLabel = document.createElement("div");
        proLabel.innerHTML = `Ora tocca a <strong>${nomeProssimo}</strong>`;
        proLabel.style.cssText = `
            font-family: 'Barlow', sans-serif;
            font-size: 34px; color: rgba(255,255,255,0.55);
            text-align: center;
        `;
        proLabel.querySelector('strong').style.cssText = `
            color: white; font-weight: 700;
        `;

        let avviaBtn = document.createElement("button");
        avviaBtn.innerHTML = "AVVIA 2° TURNO &nbsp;&#9654;";
        avviaBtn.style.cssText = `
            background: #f0c800; color: #1a0a3c;
            border: none; border-radius: 18px; padding: 32px 100px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 48px; font-weight: 800; letter-spacing: 4px;
            cursor: pointer;
            box-shadow: 0 8px 50px rgba(240,200,0,0.4);
            margin-top: 10px;
        `;
        avviaBtn.classList.add('btn-primary');
        avviaBtn.addEventListener('click', () => intesa._iniziaSecondoTurno());

        let hint = document.createElement("p");
        hint.innerHTML = "Premi Invio per avviare il turno";
        hint.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 20px;
            color: rgba(255,255,255,0.22); text-align: center; margin: 0;
        `;

        wrap.appendChild(tagEl);
        wrap.appendChild(scoreBox);
        wrap.appendChild(proLabel);
        wrap.appendChild(avviaBtn);
        wrap.appendChild(hint);
        field.appendChild(wrap);
    },

    _iniziaSecondoTurno() {
        grafica.puliscifield();
        this._renderGioco();
        main.current = "IntesaGioco";
        this._avviaTimer();
    },

    _finePartita() {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        main.current = "IntesaRisultato";

        grafica.puliscifield();

        grafica._statusBar("← MENU", "REAZIONE · INTESA VINCENTE", () => {
            intesa.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bg = document.createElement("div");
        bg.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(ellipse at 50% 30%, rgba(240,200,0,0.10) 0%, transparent 65%);
            pointer-events: none;
        `;
        field.appendChild(bg);

        let vincitore = this.punteggioA > this.punteggioB ? this.nomeA :
                        this.punteggioB > this.punteggioA ? this.nomeB : null;

        let wrap = document.createElement("div");
        wrap.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 1100px;
            display: flex; flex-direction: column; align-items: center; gap: 50px;
        `;
        wrap.classList.add('slide-up');

        let trophyEl = document.createElement("div");
        trophyEl.innerHTML = vincitore ? "🏆" : "🤝";
        trophyEl.style.cssText = `font-size: 110px; line-height: 1;`;

        let titleEl = document.createElement("div");
        titleEl.innerHTML = vincitore ? `${vincitore} VINCE!` : "PAREGGIO!";
        titleEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 110px; font-weight: 800; color: #f0c800;
            letter-spacing: 8px; text-align: center; line-height: 1;
            text-shadow: 0 0 80px rgba(240,200,0,0.5);
        `;

        let scoreRow = document.createElement("div");
        scoreRow.style.cssText = `
            display: flex; gap: 60px; width: 100%;
        `;

        let makeScoreCard = (nome, punti, passati, isWinner) => {
            let c = document.createElement("div");
            c.style.cssText = `
                flex: 1;
                background: ${isWinner ? 'rgba(240,200,0,0.10)' : 'rgba(255,255,255,0.04)'};
                border: 2px solid ${isWinner ? 'rgba(240,200,0,0.6)' : 'rgba(255,255,255,0.12)'};
                border-radius: 22px; padding: 44px;
                display: flex; flex-direction: column; align-items: center; gap: 10px;
            `;
            let n = document.createElement("div");
            n.innerHTML = nome;
            n.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 34px; font-weight: 700; letter-spacing: 4px;
                color: ${isWinner ? 'white' : 'rgba(255,255,255,0.55)'};
            `;
            let p = document.createElement("div");
            p.innerHTML = punti;
            p.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 100px; font-weight: 800; line-height: 1;
                color: ${isWinner ? '#f0c800' : 'rgba(255,255,255,0.3)'};
                text-shadow: ${isWinner ? '0 0 40px rgba(240,200,0,0.45)' : 'none'};
            `;
            let pl = document.createElement("div");
            pl.innerHTML = "PUNTI";
            pl.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 22px; letter-spacing: 5px;
                color: ${isWinner ? 'rgba(240,200,0,0.7)' : 'rgba(255,255,255,0.25)'};
            `;
            let pa = document.createElement("div");
            pa.innerHTML = `${passati} PASSATE`;
            pa.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 20px; letter-spacing: 3px; margin-top: 8px;
                color: rgba(255,255,255,0.28);
            `;
            c.appendChild(n); c.appendChild(p); c.appendChild(pl); c.appendChild(pa);
            return c;
        };

        let winA = vincitore === this.nomeA || (!vincitore);
        let winB = vincitore === this.nomeB || (!vincitore);
        scoreRow.appendChild(makeScoreCard(this.nomeA, this.punteggioA, this.passatiA, winA && vincitore === this.nomeA));
        scoreRow.appendChild(makeScoreCard(this.nomeB, this.punteggioB, this.passatiB, winB && vincitore === this.nomeB));

        let restartBtn = document.createElement("button");
        restartBtn.innerHTML = "↩ NUOVA PARTITA";
        restartBtn.style.cssText = `
            background: #f0c800; color: #1a0a3c;
            border: none; border-radius: 14px; padding: 26px 80px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 36px; font-weight: 800; letter-spacing: 3px;
            cursor: pointer;
            box-shadow: 0 8px 40px rgba(240,200,0,0.3);
        `;
        restartBtn.classList.add('btn-primary');
        restartBtn.addEventListener('click', () => {
            intesa.reset();
            grafica.puliscifield();
            intesa.setup();
            main.current = "IntesaSetup";
        });

        wrap.appendChild(trophyEl);
        wrap.appendChild(titleEl);
        wrap.appendChild(scoreRow);
        wrap.appendChild(restartBtn);
        field.appendChild(wrap);
    }
};
