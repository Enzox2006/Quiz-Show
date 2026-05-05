const grafica = {

    puliscifield() {
        while (field.firstChild) {
            field.removeChild(field.firstChild);
        }
    },

    _statusBar(leftText, rightText) {
        let bar = document.createElement("div");
        bar.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; height: 64px;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 60px;
            background: rgba(0,0,0,0.25);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            z-index: 10;
        `;
        let makeSpan = (txt) => {
            let s = document.createElement("span");
            s.innerHTML = txt;
            s.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 22px; font-weight: 600;
                color: rgba(255,255,255,0.4);
                letter-spacing: 3px; text-transform: uppercase;
            `;
            return s;
        };
        bar.appendChild(makeSpan(leftText));
        bar.appendChild(makeSpan(rightText));
        field.appendChild(bar);
    },

    home() {
        this._statusBar("● ON AIR · STUDIO 1", "GIOCHI");

        let bgGlow = document.createElement("div");
        bgGlow.style.cssText = `
            position: absolute; top: 0; left: 50%; transform: translateX(-50%);
            width: 1400px; height: 700px;
            background: radial-gradient(ellipse at 50% 0%, rgba(240,200,0,0.08) 0%, transparent 70%);
            pointer-events: none;
        `;
        field.appendChild(bgGlow);

        let titleWrap = document.createElement("div");
        titleWrap.style.cssText = `
            position: absolute; top: ${Math.round(fieldHeight * 100/1080)}px; left: 0; right: 0; text-align: center;
        `;

        let title = document.createElement("h1");
        title.innerHTML = "GIOCHI";
        title.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 160px; font-weight: 800;
            color: #f0c800; letter-spacing: 10px; line-height: 1;
            text-shadow: 0 0 80px rgba(240,200,0,0.35), 0 0 30px rgba(240,200,0,0.2);
            margin: 0;
        `;

        let subtitle = document.createElement("p");
        subtitle.innerHTML = "Scegli il gioco. Premi il tasto. Le luci dello studio sono tutte per te.";
        subtitle.style.cssText = `
            font-family: 'Barlow', sans-serif;
            font-size: 28px; color: rgba(255,255,255,0.5);
            margin-top: 18px; letter-spacing: 0.5px;
        `;

        titleWrap.appendChild(title);
        titleWrap.appendChild(subtitle);
        field.appendChild(titleWrap);

        let cardsRow = document.createElement("div");
        cardsRow.style.cssText = `
            position: absolute; top: ${Math.round(fieldHeight * 460/1080)}px; left: 0; right: 0;
            display: flex; justify-content: center; gap: 50px; padding: 0 180px;
        `;

        let card1 = this._gameCard({
            label: "GIOCO",
            gameName: "FINALE",
            gameTitle: "AVANTI UN ALTRO",
            desc: "21 risposte sbagliate consecutive contro il tempo. Il gioco classico: scegli sempre la risposta SBAGLIATA.",
            btnText: "ENTRA IN STUDIO →",
            active: true,
            accentColor: "#f0c800",
            onClick: () => {
                grafica.puliscifield();
                grafica.setup();
                main.current = "Setup";
            }
        });

        let card2 = this._gameCard({
            label: "GIOCO",
            gameName: "L'EREDITÀ",
            gameTitle: "CRUCIVERBA",
            desc: "Due sfidanti, due timer, una parola da indovinare con le lettere che si svelano una a una. Chi resiste vince.",
            btnText: "PROSSIMAMENTE",
            active: false,
            accentColor: "#f0c800",
        });

        let card3 = this._gameCard({
            label: "GIOCO",
            gameName: "REAZIONE",
            gameTitle: "INTESA VINCENTE",
            desc: "La sfida a coppie con le parole-indizio. Preparati, il gioco è in arrivo!",
            btnText: "PROSSIMAMENTE",
            active: false,
            accentColor: "#f0c800",
        });

        cardsRow.appendChild(card1);
        cardsRow.appendChild(card2);
        cardsRow.appendChild(card3);
        field.appendChild(cardsRow);

        let footer = document.createElement("div");
        footer.innerHTML = "Pensato per giocare · 16:9 · Full Screen";
        footer.style.cssText = `
            position: absolute; bottom: 28px; left: 0; right: 0; text-align: center;
            font-family: 'Barlow', sans-serif; font-size: 20px;
            color: rgba(255,255,255,0.25); letter-spacing: 2px;
        `;
        field.appendChild(footer);
    },

    _gameCard({ label, gameName, gameTitle, desc, btnText, active, accentColor, onClick }) {
        let card = document.createElement("div");
        card.style.cssText = `
            flex: 1; max-width: 520px;
            background: rgba(255,255,255,0.04);
            border: 2px solid ${active ? 'rgba(240,200,0,0.35)' : 'rgba(255,255,255,0.08)'};
            border-radius: 22px; padding: 50px 44px 44px;
            display: flex; flex-direction: column; gap: 16px;
            position: relative; overflow: hidden;
        `;
        if (active) {
            card.classList.add('card-hover');
            card.addEventListener('click', onClick);
        } else {
            card.classList.add('coming-soon-card');
        }

        let glow = document.createElement("div");
        glow.style.cssText = `
            position: absolute; top: -80px; left: -80px;
            width: 280px; height: 280px;
            background: radial-gradient(circle, ${active ? 'rgba(240,200,0,0.12)' : 'rgba(80,40,180,0.08)'} 0%, transparent 70%);
            pointer-events: none;
        `;
        card.appendChild(glow);

        let labelEl = document.createElement("span");
        labelEl.innerHTML = label;
        labelEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 20px; font-weight: 600; letter-spacing: 4px;
            color: rgba(255,255,255,0.35);
        `;

        let gameNameEl = document.createElement("div");
        gameNameEl.innerHTML = gameName;
        gameNameEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 56px; font-weight: 800; color: white;
            letter-spacing: 2px; line-height: 1;
        `;

        let gameTitleEl = document.createElement("div");
        gameTitleEl.innerHTML = gameTitle;
        gameTitleEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 30px; font-weight: 700;
            color: ${accentColor}; letter-spacing: 1px; line-height: 1;
        `;

        let descEl = document.createElement("p");
        descEl.innerHTML = desc;
        descEl.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 22px;
            color: rgba(255,255,255,0.55); line-height: 1.55; flex: 1; margin-top: 6px;
        `;

        let btn = document.createElement("div");
        btn.innerHTML = btnText;
        btn.style.cssText = `
            background: ${active ? '#f0c800' : 'rgba(255,255,255,0.08)'};
            color: ${active ? '#1a0a3c' : 'rgba(255,255,255,0.35)'};
            border-radius: 12px; padding: 22px 28px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 26px; font-weight: 700; letter-spacing: 2px; text-align: center;
            cursor: ${active ? 'pointer' : 'default'};
            margin-top: 10px;
        `;
        if (active) btn.classList.add('btn-primary');

        card.appendChild(labelEl);
        card.appendChild(gameNameEl);
        card.appendChild(gameTitleEl);
        card.appendChild(descEl);
        card.appendChild(btn);
        return card;
    },

    setup() {
        this._statusBar("← TORNA AL MENU", "AVANTI UN ALTRO");

        let bgGlow = document.createElement("div");
        bgGlow.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 1200px; height: 1200px;
            background: radial-gradient(circle, rgba(240,200,0,0.06) 0%, transparent 60%);
            pointer-events: none;
        `;
        field.appendChild(bgGlow);

        let card = document.createElement("div");
        card.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 920px;
            background: rgba(8, 0, 25, 0.88);
            border: 2px solid rgba(240,200,0,0.28);
            border-radius: 26px; padding: 72px 84px 60px;
        `;
        card.classList.add('slide-up');

        let title = document.createElement("h2");
        title.innerHTML = "FINALE AVANTI UN ALTRO";
        title.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 64px; font-weight: 800; color: #f0c800;
            text-align: center; letter-spacing: 5px; line-height: 1; margin-bottom: 14px;
        `;

        let subtitle = document.createElement("p");
        subtitle.innerHTML = "Imposta il concorrente e premi inizia. 21 risposte sbagliate, contro il tempo.";
        subtitle.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 23px;
            color: rgba(255,255,255,0.45); text-align: center; margin-bottom: 48px;
        `;

        let nomeLabel = this._label("NOME CONCORRENTE");
        let nomeInput = this._input("text", "Es. Mario Rossi");
        nomeInput.id = "setupNome";
        nomeInput.value = main.nomeGiocatore !== "CONCORRENTE" ? main.nomeGiocatore : "";

        let row = document.createElement("div");
        row.style.cssText = `display: flex; gap: 28px; margin-top: 28px;`;

        let colM = document.createElement("div");
        colM.style.flex = "1";
        let monteLabel = this._label("MONTEPREMI (€)");
        let monteInput = this._input("number", "100000");
        monteInput.id = "setupMontepremi";
        monteInput.value = main.montepremi;
        monteInput.min = "0";
        colM.appendChild(monteLabel);
        colM.appendChild(monteInput);

        let colT = document.createElement("div");
        colT.style.flex = "1";
        let durLabel = this._label("DURATA TIMER (SEC)");
        let durInput = this._input("number", "150");
        durInput.id = "setupDurata";
        durInput.value = main.durata;
        durInput.min = "10";
        durInput.max = "600";
        colT.appendChild(durLabel);
        colT.appendChild(durInput);

        row.appendChild(colM);
        row.appendChild(colT);

        let startBtn = document.createElement("button");
        startBtn.innerHTML = "INIZIA IL FINALE &nbsp;→";
        startBtn.style.cssText = `
            width: 100%; background: #f0c800; color: #1a0a3c;
            border: none; border-radius: 14px; padding: 30px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 38px; font-weight: 800; letter-spacing: 3px;
            cursor: pointer; margin-top: 42px;
            box-shadow: 0 8px 40px rgba(240,200,0,0.3);
        `;
        startBtn.classList.add('btn-primary');
        startBtn.addEventListener('click', () => { grafica._startFromSetup(); });

        let hint = document.createElement("p");
        hint.innerHTML = "Scorciatoie: A&nbsp;/&nbsp;1 risposta sinistra &nbsp;·&nbsp; B&nbsp;/&nbsp;2 risposta destra &nbsp;·&nbsp; Spazio pausa";
        hint.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 20px;
            color: rgba(255,255,255,0.28); text-align: center; margin-top: 24px;
        `;

        card.appendChild(title);
        card.appendChild(subtitle);
        card.appendChild(nomeLabel);
        card.appendChild(nomeInput);
        card.appendChild(row);
        card.appendChild(startBtn);
        card.appendChild(hint);
        field.appendChild(card);

        setTimeout(() => nomeInput.focus(), 100);
    },

    _label(text) {
        let el = document.createElement("div");
        el.innerHTML = text;
        el.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 20px; font-weight: 600; letter-spacing: 3px;
            color: rgba(255,255,255,0.4); margin-bottom: 10px; margin-top: 20px;
        `;
        return el;
    },

    _input(type, placeholder) {
        let el = document.createElement("input");
        el.type = type;
        el.placeholder = placeholder;
        el.style.cssText = `
            width: 100%;
            background: rgba(255,255,255,0.07);
            border: 2px solid rgba(255,255,255,0.18);
            border-radius: 10px; padding: 20px 24px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 34px; font-weight: 600; color: white;
            transition: border-color 0.2s;
        `;
        el.addEventListener('focus', () => { el.style.borderColor = '#f0c800'; });
        el.addEventListener('blur',  () => { el.style.borderColor = 'rgba(255,255,255,0.18)'; });
        return el;
    },

    _startFromSetup() {
        let nomeVal    = (document.getElementById("setupNome").value.trim() || "CONCORRENTE").toUpperCase();
        let monteVal   = parseInt(document.getElementById("setupMontepremi").value) || 100000;
        let durVal     = parseInt(document.getElementById("setupDurata").value)     || 150;

        main.nomeGiocatore = nomeVal;
        main.montepremi    = monteVal;
        main.durata        = durVal;
        main.time          = durVal;

        grafica.puliscifield();
        grafica.gioco();
        main.current = "Gioco";
        tool.startGame();
        tool.startTimer();
    },

    gioco() {
        let topBarH = Math.round(fieldHeight * 110/1080);
        let botBarH = Math.round(fieldHeight * 190/1080);
        let topBar = document.createElement("div");
        topBar.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; height: ${topBarH}px;
            display: flex; gap: 20px; padding: 18px 30px;
            background: rgba(0,0,0,0.35);
            border-bottom: 1px solid rgba(255,255,255,0.08);
        `;

        topNomeEl       = this._topInfoCard("CONCORRENTE", main.nomeGiocatore);
        topMontepremiEl = this._topInfoCard("MONTEPREMI", tool.formatMontepremi(main.montepremi));
        topProgressoEl  = this._topInfoCard("PROGRESSO", `0 / ${TOTAL_QUESTIONS}`);

        topBar.appendChild(topNomeEl.container);
        topBar.appendChild(topMontepremiEl.container);
        topBar.appendChild(topProgressoEl.container);
        field.appendChild(topBar);

        // Middle area: flex column between top bar and bottom bar
        let middleArea = document.createElement("div");
        middleArea.style.cssText = `
            position: absolute; top: ${topBarH}px; left: 0; right: 0; bottom: ${botBarH}px;
            display: flex; flex-direction: column;
            align-items: center; justify-content: space-between;
            padding: 20px 130px 24px;
        `;

        // Timer block
        let timerSection = document.createElement("div");
        timerSection.style.cssText = `
            display: flex; flex-direction: column; align-items: center; gap: 0;
        `;

        let timerLabel = document.createElement("div");
        timerLabel.innerHTML = "TEMPO RIMASTO";
        timerLabel.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 22px; font-weight: 600; letter-spacing: 6px;
            color: rgba(255,255,255,0.4);
        `;

        let mins0 = Math.floor(main.time / 60);
        let secs0 = main.time % 60;
        timert = document.createElement("div");
        timert.innerHTML = `${String(mins0).padStart(2,'0')}:${String(secs0).padStart(2,'0')}`;
        timert.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 130px; font-weight: 800; color: #f0c800;
            line-height: 1; letter-spacing: 6px;
            text-shadow: 0 0 40px rgba(240,200,0,0.4);
        `;

        timerSection.appendChild(timerLabel);
        timerSection.appendChild(timert);

        // Question + answers block (grouped together, no gap between them)
        let qaBlock = document.createElement("div");
        qaBlock.style.cssText = `
            width: 100%; display: flex; flex-direction: column; gap: 16px;
        `;

        let scegliPill = document.createElement("div");
        scegliPill.innerHTML = "SCEGLI LA RISPOSTA SBAGLIATA";
        scegliPill.style.cssText = `
            align-self: center;
            background: rgba(240,200,0,0.12);
            border: 1px solid rgba(240,200,0,0.38);
            border-radius: 30px; padding: 10px 44px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 22px; font-weight: 600; letter-spacing: 4px; color: #f0c800;
            white-space: nowrap;
        `;

        let domcont = document.createElement("div");
        domcont.style.cssText = `
            width: 100%;
            background: rgba(255,255,255,0.06);
            border: 2px solid rgba(255,255,255,0.14);
            border-radius: 18px; padding: 24px 60px;
            display: flex; align-items: center; justify-content: center;
        `;
        domtext = document.createElement("div");
        domtext.innerHTML = "";
        domtext.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 50px; font-weight: 700; color: white;
            text-align: center; letter-spacing: 1px; line-height: 1.25;
            word-break: break-word; white-space: normal;
        `;
        domcont.appendChild(domtext);

        let answRow = document.createElement("div");
        answRow.style.cssText = `width: 100%; display: flex; gap: 36px;`;

        answ1cont = this._answerBtn("A");
        answ1text  = answ1cont.querySelector(".answ-text");
        answ1cont.addEventListener('click', () => { tool.checkrisposta(0); });

        answ2cont = this._answerBtn("B");
        answ2text  = answ2cont.querySelector(".answ-text");
        answ2cont.addEventListener('click', () => { tool.checkrisposta(1); });

        answRow.appendChild(answ1cont);
        answRow.appendChild(answ2cont);

        qaBlock.appendChild(scegliPill);
        qaBlock.appendChild(domcont);
        qaBlock.appendChild(answRow);

        middleArea.appendChild(timerSection);
        middleArea.appendChild(qaBlock);
        field.appendChild(middleArea);

        let bottomBar = document.createElement("div");
        bottomBar.style.cssText = `
            position: absolute; bottom: 0; left: 0; right: 0; height: ${botBarH}px;
            background: rgba(0,0,0,0.3);
            border-top: 1px solid rgba(255,255,255,0.08);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 18px;
        `;

        let streakRow = document.createElement("div");
        streakRow.style.cssText = `
            display: flex; align-items: center; gap: 16px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 26px; font-weight: 600; letter-spacing: 3px;
            color: rgba(255,255,255,0.4);
        `;
        let streakLabel = document.createElement("span");
        streakLabel.innerHTML = "RISPOSTE CONSECUTIVE";
        streakNumEl = document.createElement("span");
        streakNumEl.id = "streakNum";
        streakNumEl.innerHTML = `0`;
        streakNumEl.style.cssText = `
            font-size: 34px; font-weight: 800; color: #f0c800;
        `;
        let streakSlash = document.createElement("span");
        streakSlash.innerHTML = `/ ${TOTAL_QUESTIONS}`;
        streakRow.appendChild(streakLabel);
        streakRow.appendChild(streakNumEl);
        streakRow.appendChild(streakSlash);

        let dotsRow = document.createElement("div");
        dotsRow.style.cssText = `display: flex; gap: 10px; align-items: center;`;

        dots = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            let dot = document.createElement("div");
            let isLast = i === TOTAL_QUESTIONS - 1;
            dot.style.cssText = `
                width: ${isLast ? '30px' : '22px'};
                height: ${isLast ? '30px' : '22px'};
                border-radius: 50%;
                background: rgba(255,255,255,0.18);
                border: 2px solid rgba(255,255,255,0.28);
                transition: background 0.25s, border-color 0.25s, transform 0.25s;
            `;
            dots.push(dot);
            dotsRow.appendChild(dot);
        }

        bottomBar.appendChild(streakRow);
        bottomBar.appendChild(dotsRow);
        field.appendChild(bottomBar);
    },

    _answerBtn(letter) {
        let cont = document.createElement("div");
        cont.style.cssText = `
            flex: 1; min-height: 135px;
            background: rgba(255,255,255,0.05);
            border: 2px solid rgba(255,255,255,0.18);
            border-radius: 18px;
            display: flex; align-items: center; justify-content: center; gap: 22px;
            cursor: pointer; padding: 20px 30px;
        `;
        cont.classList.add('answer-btn');

        let letterEl = document.createElement("span");
        letterEl.innerHTML = letter;
        letterEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 34px; font-weight: 700; color: rgba(255,255,255,0.28);
            min-width: 28px;
        `;

        let textEl = document.createElement("div");
        textEl.classList.add('answ-text');
        textEl.innerHTML = "";
        textEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 50px; font-weight: 700; color: white; letter-spacing: 1px;
            text-align: center; word-break: break-word; white-space: normal;
            line-height: 1.15; max-width: 700px;
        `;

        cont.appendChild(letterEl);
        cont.appendChild(textEl);
        return cont;
    },

    _topInfoCard(label, value) {
        let container = document.createElement("div");
        container.style.cssText = `
            flex: 1; background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px; padding: 10px 24px;
            display: flex; flex-direction: column; justify-content: center;
        `;
        let labelEl = document.createElement("div");
        labelEl.innerHTML = label;
        labelEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 18px; font-weight: 600; letter-spacing: 3px;
            color: rgba(255,255,255,0.38);
        `;
        let valueEl = document.createElement("div");
        valueEl.innerHTML = value;
        valueEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 42px; font-weight: 800; color: white; letter-spacing: 1px;
        `;
        container.appendChild(labelEl);
        container.appendChild(valueEl);
        return { container, valueEl };
    },

    scriviquest() {
        if (!domtext) return;
        domtext.innerHTML  = domande[currentIndex].testo;
        answ1text.innerHTML = domande[currentIndex].risposte[0];
        answ2text.innerHTML = domande[currentIndex].risposte[1];
    },

    giusto() {
        if (streak < TOTAL_QUESTIONS) {
            let dot = dots[streak];
            dot.style.background    = '#22cc66';
            dot.style.borderColor   = '#22cc66';
            dot.style.transform     = 'scale(1.2)';
            dot.classList.add('dot-pop');
            setTimeout(() => dot.classList.remove('dot-pop'), 350);
        }
        streak++;
        currentIndex++;

        if (streakNumEl) streakNumEl.innerHTML = streak;
        if (topProgressoEl) topProgressoEl.valueEl.innerHTML = `${streak} / ${TOTAL_QUESTIONS}`;

        if (streak === TOTAL_QUESTIONS) {
            tool.pauseTimer();
            setTimeout(() => grafica.showResult(true), 400);
        } else {
            this.scriviquest();
        }
    },

    sbagliato() {
        if (streak < TOTAL_QUESTIONS) {
            let dot = dots[streak];
            dot.style.background  = '#ff4444';
            dot.style.borderColor = '#ff4444';
            dot.classList.add('dot-shake');
            setTimeout(() => dot.classList.remove('dot-shake'), 350);
        }

        setTimeout(() => {
            for (let i = 0; i < TOTAL_QUESTIONS; i++) {
                dots[i].style.background    = 'rgba(255,255,255,0.18)';
                dots[i].style.borderColor   = 'rgba(255,255,255,0.28)';
                dots[i].style.transform     = 'scale(1)';
            }
        }, 550);

        streak = 0;
        currentIndex = 0;

        if (streakNumEl) streakNumEl.innerHTML = "0";
        if (topProgressoEl) topProgressoEl.valueEl.innerHTML = `0 / ${TOTAL_QUESTIONS}`;

        setTimeout(() => this.scriviquest(), 150);
    },

    showResult(win) {
        tool.pauseTimer();
        main.current = "Risultato";

        let timeLeft = main.time;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        let timeStr = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

        let overlay = document.createElement("div");
        overlay.classList.add('overlay');
        overlay.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(8,0,22,0.94);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 22px;
            z-index: 200;
        `;

        let icon = document.createElement("div");
        icon.innerHTML = win ? "🏆" : "⏱";
        icon.style.cssText = `font-size: 100px; line-height: 1;`;

        let titleEl = document.createElement("div");
        titleEl.innerHTML = win ? "COMPLIMENTI!" : "TEMPO SCADUTO!";
        titleEl.style.cssText = `
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 108px; font-weight: 800; letter-spacing: 6px;
            color: ${win ? '#f0c800' : '#ff6644'};
            text-shadow: 0 0 60px ${win ? 'rgba(240,200,0,0.45)' : 'rgba(255,100,68,0.45)'};
            line-height: 1;
        `;

        let subEl = document.createElement("div");
        subEl.innerHTML = win
            ? `<strong>${main.nomeGiocatore}</strong> ha completato tutte le ${TOTAL_QUESTIONS} domande!`
            : `<strong>${main.nomeGiocatore}</strong> si è fermato a <strong>${streak}</strong> risposte consecutive`;
        subEl.style.cssText = `
            font-family: 'Barlow', sans-serif; font-size: 32px;
            color: rgba(255,255,255,0.65); letter-spacing: 0.5px; text-align: center;
        `;

        if (win) {
            let timeBox = document.createElement("div");
            timeBox.style.cssText = `
                display: flex; flex-direction: column; align-items: center; gap: 6px;
                background: rgba(240,200,0,0.1); border: 2px solid rgba(240,200,0,0.35);
                border-radius: 20px; padding: 28px 80px; margin-top: 8px;
            `;
            let timeLabel = document.createElement("div");
            timeLabel.innerHTML = "TEMPO RIMANENTE";
            timeLabel.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 22px; font-weight: 600; letter-spacing: 5px;
                color: rgba(255,255,255,0.45);
            `;
            let timeVal = document.createElement("div");
            timeVal.innerHTML = timeStr;
            timeVal.style.cssText = `
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 90px; font-weight: 800; color: #f0c800;
                letter-spacing: 6px; line-height: 1;
                text-shadow: 0 0 40px rgba(240,200,0,0.4);
            `;
            let timeNote = document.createElement("div");
            timeNote.innerHTML = `su ${main.durata} secondi totali`;
            timeNote.style.cssText = `
                font-family: 'Barlow', sans-serif; font-size: 22px;
                color: rgba(255,255,255,0.35); margin-top: 4px;
            `;
            timeBox.appendChild(timeLabel);
            timeBox.appendChild(timeVal);
            timeBox.appendChild(timeNote);
            overlay.appendChild(icon);
            overlay.appendChild(titleEl);
            overlay.appendChild(subEl);
            overlay.appendChild(timeBox);
        } else {
            overlay.appendChild(icon);
            overlay.appendChild(titleEl);
            overlay.appendChild(subEl);
        }

        let backBtn = document.createElement("button");
        backBtn.innerHTML = "TORNA AL MENU &nbsp;→";
        backBtn.style.cssText = `
            background: ${win ? '#f0c800' : 'rgba(255,255,255,0.1)'};
            color: ${win ? '#1a0a3c' : 'white'};
            border: ${win ? 'none' : '2px solid rgba(255,255,255,0.25)'};
            border-radius: 14px; padding: 26px 70px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 36px; font-weight: 800; letter-spacing: 3px;
            cursor: pointer; margin-top: 12px;
        `;
        backBtn.classList.add('btn-primary');
        backBtn.addEventListener('click', () => {
            tool.resetGameState();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        });

        overlay.appendChild(backBtn);
        field.appendChild(overlay);
    }
}
