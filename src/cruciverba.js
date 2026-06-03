const crux = {
    nomeA: 'GIOCATORE 1',
    nomeB: 'GIOCATORE 2',
    durata: 60,

    timeA: 60,
    timeB: 60,
    turno: 'A',
    domande: [],
    idx: 0,
    rivelate: [],
    _codaPriorita: [],

    _timerInterval: null,
    _rivelaInterval: null,
    _lastTick: 0,
    _recognition: null,
    _ascoltando: false,
    _cambioInCorso: false,

    _timerAEl: null,
    _timerBEl: null,
    _cardAEl: null,
    _cardBEl: null,
    _nomeAEl: null,
    _nomeBEl: null,
    _statoAEl: null,
    _statoBEl: null,
    _defEl: null,
    _defLabelEl: null,
    _tilesEl: null,
    _voiceStatusEl: null,

    _norm(s) {
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
    },

    _formatTime(ms) {
        let totalCs = Math.floor(ms / 10);
        let cs = totalCs % 100;
        let s = Math.floor(totalCs / 100);
        return `${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
    },

    reset() {
        clearInterval(this._timerInterval);
        clearInterval(this._rivelaInterval);
        this._fermaVoce();
        this._timerInterval = null;
        this._rivelaInterval = null;
        this._recognition = null;
        this._ascoltando = false;
        this._cambioInCorso = false;
        this.timeA = this.durata * 1000;
        this.timeB = this.durata * 1000;
        this._lastTick = 0;
        this.turno = 'A';
        this.domande = [];
        this.idx = 0;
        this.rivelate = [];
        this._codaPriorita = [];
        this._timerAEl = null;
        this._timerBEl = null;
        this._cardAEl = null;
        this._cardBEl = null;
        this._nomeAEl = null;
        this._nomeBEl = null;
        this._statoAEl = null;
        this._statoBEl = null;
        this._defEl = null;
        this._defLabelEl = null;
        this._tilesEl = null;
        this._voiceStatusEl = null;
    },

    setup() {
        grafica._statusBar("← TORNA AL MENU", "L'EREDITÀ · CRUCIVERBA", () => {
            crux.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bgGlow = document.createElement("div");
        bgGlow.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 1400px; height: 1400px;
            background: radial-gradient(circle, rgba(80,40,200,0.08) 0%, transparent 60%);
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
        title.innerHTML = "L'EREDIT&Agrave; &ndash; CRUCIVERBA";
        title.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 58px; font-weight: 800; color: #f0c800;
            text-align: center; letter-spacing: 5px; line-height: 1; margin-bottom: 14px;
        `;

        let subtitle = document.createElement("p");
        subtitle.innerHTML = "Imposta i due sfidanti e premi inizia per cominciare la partita.";
        subtitle.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 22px;
            color: rgba(255,255,255,0.45); text-align: center; margin-bottom: 44px;
        `;

        let nameRow = document.createElement("div");
        nameRow.style.cssText = `display: flex; gap: 32px;`;

        let col1 = document.createElement("div"); col1.style.flex = "1";
        let col2 = document.createElement("div"); col2.style.flex = "1";

        let lbl1 = grafica._label("GIOCATORE 1");
        let inp1 = grafica._input("text", "Es. Mario");
        inp1.id = "cruxNome1";
        inp1.value = (this.nomeA !== "GIOCATORE 1") ? this.nomeA : "";

        let lbl2 = grafica._label("GIOCATORE 2");
        let inp2 = grafica._input("text", "Es. Laura");
        inp2.id = "cruxNome2";
        inp2.value = (this.nomeB !== "GIOCATORE 2") ? this.nomeB : "";

        col1.appendChild(lbl1); col1.appendChild(inp1);
        col2.appendChild(lbl2); col2.appendChild(inp2);
        nameRow.appendChild(col1); nameRow.appendChild(col2);

        let durLbl = grafica._label("DURATA TIMER PER GIOCATORE (SEC)");
        let durInp = grafica._input("number", "60");
        durInp.id = "cruxDurata";
        durInp.value = this.durata;
        durInp.min = "10"; durInp.max = "300";

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
        startBtn.addEventListener('click', () => crux._avviaPartita());

        let hint = document.createElement("p");
        hint.innerHTML = "Scorciatoia: Invio per confermare risposta corretta durante il gioco";
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
        let n1 = (document.getElementById("cruxNome1").value.trim() || "GIOCATORE 1").toUpperCase();
        let n2 = (document.getElementById("cruxNome2").value.trim() || "GIOCATORE 2").toUpperCase();
        let dur = parseInt(document.getElementById("cruxDurata").value) || 60;

        this.nomeA = n1;
        this.nomeB = n2;
        this.durata = dur;
        this.timeA = dur * 1000;
        this.timeB = dur * 1000;
        this.turno = 'A';

        let shuffled = [...croceDomande];
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.domande = shuffled;
        this.idx = 0;

        grafica.puliscifield();
        this._renderGioco();
        main.current = "CruciGioco";
        this._nuovaParola();
        this._avviaTimer();
        this._avviaVoce();
    },

    _renderGioco() {
        grafica._statusBar("← TORNA AL MENU", "L'EREDITÀ · CRUCIVERBA", () => {
            crux.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        let bg = document.createElement("div");
        bg.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(ellipse at 25% 15%, rgba(80,40,200,0.14) 0%, transparent 55%),
                        radial-gradient(ellipse at 75% 85%, rgba(240,200,0,0.04) 0%, transparent 45%);
            pointer-events: none;
        `;
        field.appendChild(bg);

        let timerArea = document.createElement("div");
        timerArea.style.cssText = `
            position: absolute; top: 80px; left: 60px; right: 60px;
            display: flex; gap: 40px;
        `;

        this._cardAEl = this._buildTimerCard(this.nomeA, this.timeA, this.turno === 'A');
        this._timerAEl = this._cardAEl.querySelector('.crux-timer');
        this._nomeAEl  = this._cardAEl.querySelector('.crux-nome');
        this._statoAEl = this._cardAEl.querySelector('.crux-stato');

        this._cardBEl = this._buildTimerCard(this.nomeB, this.timeB, this.turno === 'B');
        this._timerBEl = this._cardBEl.querySelector('.crux-timer');
        this._nomeBEl  = this._cardBEl.querySelector('.crux-nome');
        this._statoBEl = this._cardBEl.querySelector('.crux-stato');

        timerArea.appendChild(this._cardAEl);
        timerArea.appendChild(this._cardBEl);
        field.appendChild(timerArea);

        let mainArea = document.createElement("div");
        mainArea.style.cssText = `
            position: absolute; top: 320px; left: 100px; right: 100px;
            display: flex; flex-direction: column; align-items: center; gap: 42px;
        `;

        let defBox = document.createElement("div");
        defBox.style.cssText = `
            width: 100%;
            background: rgba(255,255,255,0.06);
            border: 2px solid rgba(255,255,255,0.12);
            border-radius: 20px; padding: 30px 60px;
            text-align: center;
        `;
        this._defLabelEl = document.createElement("div");
        this._defLabelEl.innerHTML = "DEFINIZIONE &middot; TURNO DI " + this.nomeA;
        this._defLabelEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 20px; letter-spacing: 5px; color: rgba(255,255,255,0.4);
            margin-bottom: 14px; text-transform: uppercase;
        `;
        this._defEl = document.createElement("div");
        this._defEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 52px; font-weight: 800; color: white;
            letter-spacing: 2px; line-height: 1.2;
        `;
        defBox.appendChild(this._defLabelEl);
        defBox.appendChild(this._defEl);

        this._tilesEl = document.createElement("div");
        this._tilesEl.style.cssText = `
            display: flex; gap: 14px; align-items: center; justify-content: center;
            flex-wrap: wrap; min-height: 96px;
        `;

        let bottomRow = document.createElement("div");
        bottomRow.style.cssText = `
            display: flex; align-items: center; gap: 44px; margin-top: 6px;
        `;

        this._voiceStatusEl = document.createElement("div");
        this._voiceStatusEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 24px; letter-spacing: 3px; color: rgba(255,255,255,0.38);
        `;
        this._voiceStatusEl.innerHTML = "🎤 IN ASCOLTO...";

        let correttoBtn = document.createElement("button");
        correttoBtn.innerHTML = "&#10003;&nbsp; CORRETTO";
        correttoBtn.title = "Clicca quando il giocatore dà la risposta giusta";
        correttoBtn.style.cssText = `
            background: rgba(34,204,102,0.12);
            border: 2px solid rgba(34,204,102,0.45);
            color: #22cc66;
            border-radius: 14px; padding: 18px 56px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 32px; font-weight: 700; letter-spacing: 3px;
            cursor: pointer;
            transition: background 0.15s, transform 0.12s;
        `;
        correttoBtn.addEventListener('mouseenter', () => {
            correttoBtn.style.background = 'rgba(34,204,102,0.28)';
            correttoBtn.style.transform = 'scale(1.04)';
        });
        correttoBtn.addEventListener('mouseleave', () => {
            correttoBtn.style.background = 'rgba(34,204,102,0.12)';
            correttoBtn.style.transform = 'scale(1)';
        });
        correttoBtn.addEventListener('click', () => crux._confermaCorrecto());

        bottomRow.appendChild(this._voiceStatusEl);
        bottomRow.appendChild(correttoBtn);

        mainArea.appendChild(defBox);
        mainArea.appendChild(this._tilesEl);
        mainArea.appendChild(bottomRow);
        field.appendChild(mainArea);
    },

    _buildTimerCard(nome, time, attivo) {
        let card = document.createElement("div");
        card.style.cssText = `
            flex: 1;
            background: ${attivo ? 'rgba(240,200,0,0.08)' : 'rgba(255,255,255,0.04)'};
            border: 2px solid ${attivo ? 'rgba(240,200,0,0.65)' : 'rgba(255,255,255,0.1)'};
            border-radius: 20px; padding: 28px 40px;
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            transition: border-color 0.35s, background 0.35s;
        `;

        let nomeEl = document.createElement("div");
        nomeEl.classList.add('crux-nome');
        nomeEl.innerHTML = nome;
        nomeEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 30px; font-weight: 600; letter-spacing: 4px;
            color: ${attivo ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'};
            transition: color 0.35s;
        `;

        let timerEl = document.createElement("div");
        timerEl.classList.add('crux-timer');
        timerEl.innerHTML = this._formatTime(time);
        timerEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 80px; font-weight: 800; line-height: 1; letter-spacing: 2px;
            color: ${attivo ? '#f0c800' : 'rgba(255,255,255,0.22)'};
            text-shadow: ${attivo ? '0 0 40px rgba(240,200,0,0.4)' : 'none'};
            transition: color 0.35s, text-shadow 0.35s;
            font-variant-numeric: tabular-nums;
        `;

        let statoEl = document.createElement("div");
        statoEl.classList.add('crux-stato');
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
        this._statoBEl.innerHTML       = attB ? "TURNO ATTIVO" : "IN ATTESA";
        this._statoBEl.style.color     = attB ? '#f0c800' : 'rgba(255,255,255,0.28)';
        this._statoBEl.style.background= attB ? 'rgba(240,200,0,0.14)' : 'transparent';
        this._statoBEl.style.border    = `1px solid ${attB ? 'rgba(240,200,0,0.4)' : 'transparent'}`;

        if (this._defLabelEl) {
            let nomeAttivo = this.turno === 'A' ? this.nomeA : this.nomeB;
            this._defLabelEl.innerHTML = "DEFINIZIONE &middot; TURNO DI " + nomeAttivo;
        }
    },

    _nuovaParola() {
        if (this.idx >= this.domande.length) this.idx = 0;
        let dom = this.domande[this.idx];
        this.idx++;
        this.rivelate = [];

        // Indici di tutte le lettere non-spazio
        let tuttiIndici = [];
        for (let i = 0; i < dom.sol.length; i++) {
            if (dom.sol[i] !== ' ') tuttiIndici.push(i);
        }
        let lettereTotali = tuttiIndici.length;

        // Quante lettere rivelare subito (sempre lasciando almeno 1 nascosta)
        let iniziali = lettereTotali <= 5 ? 1 : lettereTotali <= 8 ? 2 : 3;
        let inizialiSicuri = Math.min(iniziali, lettereTotali - 1);

        // Mescola completamente a caso — nessuna priorità
        for (let i = tuttiIndici.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [tuttiIndici[i], tuttiIndici[j]] = [tuttiIndici[j], tuttiIndici[i]];
        }

        // Rivela le prime N posizioni dal pool mescolato
        for (let i = 0; i < inizialiSicuri; i++) {
            this.rivelate.push(tuttiIndici[i]);
        }

        if (this._defEl) this._defEl.innerHTML = dom.def;
        this._renderTiles(dom.sol);

        clearInterval(this._rivelaInterval);
        this._rivelaInterval = setInterval(() => crux._rivela(dom.sol), 2000);
    },

    _tileSize(len) {
        if (len <= 5)  return 96;
        if (len <= 7)  return 88;
        if (len <= 9)  return 80;
        if (len <= 11) return 70;
        return 60;
    },

    _renderTiles(sol) {
        if (!this._tilesEl) return;
        this._tilesEl.innerHTML = "";
        let size = this._tileSize(sol.length);
        let fontSize = Math.round(size * 0.52);

        for (let i = 0; i < sol.length; i++) {
            let ch = sol[i];
            if (ch === ' ') {
                let spacer = document.createElement("div");
                spacer.style.cssText = `width: ${Math.round(size * 0.5)}px; height: ${size}px;`;
                this._tilesEl.appendChild(spacer);
                continue;
            }
            let revealed = this.rivelate.includes(i);
            let tile = document.createElement("div");
            tile.style.cssText = `
                width: ${size}px; height: ${size}px;
                background: ${revealed ? '#f0c800' : 'rgba(255,255,255,0.07)'};
                border: 2px solid ${revealed ? '#f0c800' : 'rgba(255,255,255,0.2)'};
                border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                font-family: 'Barlow Condensed', sans-serif;
                font-size: ${fontSize}px; font-weight: 800;
                color: ${revealed ? '#1a0a3c' : 'rgba(255,255,255,0.18)'};
                transition: background 0.3s, color 0.3s, border-color 0.3s;
            `;
            tile.innerHTML = revealed ? ch : '&middot;';
            this._tilesEl.appendChild(tile);
        }
    },

    _rivela(sol) {
        // Calcola gli indici ancora nascosti in tempo reale — nessuno stato da sincronizzare
        let nascosti = [];
        for (let i = 0; i < sol.length; i++) {
            if (sol[i] !== ' ' && !this.rivelate.includes(i)) nascosti.push(i);
        }

        // Blocca quando rimane 1 sola lettera: l'ultima tile resta sempre nascosta
        if (nascosti.length <= 1) {
            clearInterval(this._rivelaInterval);
            return;
        }

        // Sceglie una posizione casuale tra quelle ancora nascoste
        let pick = Math.floor(Math.random() * nascosti.length);
        this.rivelate.push(nascosti[pick]);
        this._renderTiles(sol);
    },

    _avviaTimer() {
        clearInterval(this._timerInterval);
        this._lastTick = performance.now();
        this._timerInterval = setInterval(() => crux._tick(), 50);
    },

    _tick() {
        if (main.current !== 'CruciGioco') return;
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
                if (this.timeA <= 0) this._fineGioco('A');
            }
        } else {
            if (this.timeB > 0) {
                this.timeB = Math.max(0, this.timeB - delta);
                if (this._timerBEl) {
                    this._timerBEl.innerHTML = this._formatTime(this.timeB);
                    if (this.timeB <= 15000) this._timerBEl.classList.add('timer-low');
                    else this._timerBEl.classList.remove('timer-low');
                }
                if (this.timeB <= 0) this._fineGioco('B');
            }
        }
    },

    _confermaCorrecto() {
        if (main.current !== 'CruciGioco') return;
        if (this._cambioInCorso) return;
        this._cambioInCorso = true;

        // Ferma subito la voce per evitare che risultati residui riattivino il metodo
        this._fermaVoce();

        // Blocca il timer all'istante esatto
        clearInterval(this._timerInterval);
        this._timerInterval = null;

        let timerEl = this.turno === 'A' ? this._timerAEl : this._timerBEl;
        if (timerEl) {
            timerEl.style.transition = 'color 0.1s';
            timerEl.style.color = '#22cc66';
            timerEl.style.textShadow = '0 0 40px rgba(34,204,102,0.6)';
            setTimeout(() => {
                timerEl.style.color = '';
                timerEl.style.textShadow = '';
            }, 300);
        }
        setTimeout(() => crux._cambioTurno(), 350);
    },

    _cambioTurno() {
        clearInterval(this._rivelaInterval);
        this.turno = this.turno === 'A' ? 'B' : 'A';
        this._aggiornaCardsVisual();
        this._nuovaParola();
        // Riavvia il timer per il nuovo giocatore
        this._avviaTimer();
        // Riavvia l'ascolto solo ora, dopo aver caricato la nuova parola e il nuovo turno
        this._cambioInCorso = false;
        this._avviaVoce();
    },

    _avviaVoce() {
        let SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            if (this._voiceStatusEl) this._voiceStatusEl.innerHTML = "🎤 Voce non supportata";
            return;
        }
        this._fermaVoce();
        let rec = new SR();
        rec.lang = 'it-IT';
        // continuous:false è molto più affidabile su mobile (Android/iOS fermano il continuous dopo pochi secondi)
        rec.continuous = false;
        rec.interimResults = true;
        rec.maxAlternatives = 5;

        // CRITICO: assegna PRIMA di start() — evita la race condition dove onend scatta
        // prima dell'assegnazione e il guard this._recognition === rec fallisce per sempre
        this._recognition = rec;

        rec.onstart = () => {
            this._ascoltando = true;
            if (this._voiceStatusEl) this._voiceStatusEl.innerHTML = "🎤 IN ASCOLTO...";
        };

        rec.onresult = (e) => {
            if (main.current !== 'CruciGioco') return;
            let dom = this.domande[this.idx - 1];
            if (!dom) return;
            let sol = this._norm(dom.sol);
            if (!sol) return;

            for (let i = e.resultIndex; i < e.results.length; i++) {
                let isFinal = e.results[i].isFinal;
                for (let j = 0; j < e.results[i].length; j++) {
                    let raw = e.results[i][j].transcript;

                    // Controlla la trascrizione intera normalizzata
                    let detto = this._norm(raw);
                    if (this._matchesSolution(detto, sol, isFinal)) {
                        crux._confermaCorrecto();
                        return;
                    }

                    // Controlla ogni singola parola (gestisce "il PAROLA", "un PAROLA", ecc.)
                    let parole = raw.trim().split(/\s+/);
                    for (let parola of parole) {
                        let normParola = this._norm(parola);
                        if (normParola.length >= 3 && this._matchesSolution(normParola, sol, isFinal)) {
                            crux._confermaCorrecto();
                            return;
                        }
                    }
                }
            }
        };

        rec.onerror = (ev) => {
            if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
                if (this._voiceStatusEl) this._voiceStatusEl.innerHTML = "🎤 Microfono non autorizzato";
                // Non riavviare se il microfono è negato
                this._recognition = null;
            }
            // Tutti gli altri errori (no-speech, network, aborted…) vengono gestiti da onend
        };

        rec.onend = () => {
            this._ascoltando = false;
            // Riavvia solo se questo rec è ancora quello attivo (non sostituito da _fermaVoce)
            if (main.current === 'CruciGioco' && this._recognition === rec) {
                // 150ms: abbastanza lungo da evitare "already started", abbastanza corto da non perdere parole
                setTimeout(() => {
                    if (main.current === 'CruciGioco' && this._recognition === rec) {
                        this._avviaVoce();
                    }
                }, 150);
            }
        };

        try {
            rec.start();
        } catch (e) {
            // Se start() fallisce, azzera per permettere il prossimo tentativo
            this._recognition = null;
        }
    },

    // Matching flessibile: esatto, contains, o fuzzy (solo su risultati finali)
    _matchesSolution(testo, sol, isFinal) {
        if (!testo || !sol) return false;
        if (testo === sol || testo.includes(sol)) return true;
        if (isFinal) {
            // Fuzzy: tolleranza errori in base alla lunghezza della soluzione
            let maxDist = sol.length <= 5 ? 1 : sol.length <= 9 ? 2 : 3;
            if (this._levenshtein(testo, sol) <= maxDist) return true;
            // L'utente ha detto una versione abbreviata di una parola lunga
            if (testo.length >= 4 && sol.startsWith(testo) && testo.length >= sol.length - 2) return true;
        }
        return false;
    },

    // Distanza di Levenshtein per il fuzzy matching
    _levenshtein(a, b) {
        if (Math.abs(a.length - b.length) > 4) return 99;
        let m = a.length, n = b.length;
        let prev = Array.from({length: n + 1}, (_, j) => j);
        let curr = new Array(n + 1);
        for (let i = 1; i <= m; i++) {
            curr[0] = i;
            for (let j = 1; j <= n; j++) {
                curr[j] = a[i-1] === b[j-1]
                    ? prev[j-1]
                    : 1 + Math.min(prev[j], curr[j-1], prev[j-1]);
            }
            [prev, curr] = [curr, prev];
        }
        return prev[n];
    },

    _fermaVoce() {
        if (this._recognition) {
            try { this._recognition.abort(); } catch (e) {}
            this._recognition = null;
        }
        this._ascoltando = false;
    },

    _fineGioco(perdente) {
        clearInterval(this._timerInterval);
        clearInterval(this._rivelaInterval);
        this._fermaVoce();
        main.current = 'CruciRisultato';

        let vincitore    = perdente === 'A' ? this.nomeB : this.nomeA;
        let perdenteName = perdente === 'A' ? this.nomeA : this.nomeB;
        let tempoRim     = perdente === 'A' ? this.timeB : this.timeA;

        let overlay = document.createElement("div");
        overlay.classList.add('overlay');
        overlay.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(8,0,22,0.94);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 26px;
            z-index: 200;
        `;

        let icon = document.createElement("div");
        icon.innerHTML = "🏆";
        icon.style.cssText = `font-size: 100px; line-height: 1;`;

        let titleEl = document.createElement("div");
        titleEl.innerHTML = "TEMPO SCADUTO!";
        titleEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 100px; font-weight: 800; letter-spacing: 6px;
            color: #f0c800;
            text-shadow: 0 0 60px rgba(240,200,0,0.45);
            line-height: 1;
        `;

        let subEl = document.createElement("div");
        subEl.innerHTML = `<strong>${perdenteName}</strong> ha esaurito il tempo &mdash; vince <strong>${vincitore}</strong>!`;
        subEl.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 34px;
            color: rgba(255,255,255,0.65); text-align: center;
        `;

        let timeBox = document.createElement("div");
        timeBox.style.cssText = `
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            background: rgba(240,200,0,0.1); border: 2px solid rgba(240,200,0,0.35);
            border-radius: 20px; padding: 26px 80px; margin-top: 6px;
        `;
        let timeLbl = document.createElement("div");
        timeLbl.innerHTML = "TEMPO RIMANENTE DI " + vincitore;
        timeLbl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 20px; font-weight: 600; letter-spacing: 5px;
            color: rgba(255,255,255,0.45);
        `;
        let timeVal = document.createElement("div");
        timeVal.innerHTML = this._formatTime(tempoRim);
        timeVal.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 88px; font-weight: 800; color: #f0c800;
            letter-spacing: 6px; line-height: 1;
            text-shadow: 0 0 40px rgba(240,200,0,0.4);
        `;
        timeBox.appendChild(timeLbl);
        timeBox.appendChild(timeVal);

        let backBtn = document.createElement("button");
        backBtn.innerHTML = "TORNA AL MENU &nbsp;&rarr;";
        backBtn.style.cssText = `
            background: #f0c800; color: #1a0a3c;
            border: none; border-radius: 14px; padding: 26px 70px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 36px; font-weight: 800; letter-spacing: 3px;
            cursor: pointer; margin-top: 10px;
        `;
        backBtn.classList.add('btn-primary');
        backBtn.addEventListener('click', () => {
            crux.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        overlay.appendChild(icon);
        overlay.appendChild(titleEl);
        overlay.appendChild(subEl);
        overlay.appendChild(timeBox);
        overlay.appendChild(backBtn);
        field.appendChild(overlay);
    }
};
