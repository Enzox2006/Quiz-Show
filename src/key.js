const Step = {
    "Home": {
        D() { window.location.href = '/download.html'; }
    },

    "Setup": {
        Enter() {
            grafica._startFromSetup();
        }
    },

    "Gioco": {
        " "() {
            tool.pauseTimer();
            main.current = "Pausa";
        },
        a() { tool.checkrisposta(0); },
        A() { tool.checkrisposta(0); },
        "1"() { tool.checkrisposta(0); },
        b() { tool.checkrisposta(1); },
        B() { tool.checkrisposta(1); },
        "2"() { tool.checkrisposta(1); },
    },

    "Pausa": {
        " "() {
            tool.startTimer();
            main.current = "Gioco";
        },
        p() {
            tool.startTimer();
            main.current = "Gioco";
        }
    },

    "Risultato": {
        Enter() {
            tool.resetGameState();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        }
    },

    "CruciSetup": {
        Enter() { crux._avviaPartita(); }
    },

    "CruciGioco": {
        Enter() { crux._confermaCorrecto(); },
        " "() { crux._confermaCorrecto(); },
    },

    "CruciRisultato": {
        Enter() {
            crux.reset();
            grafica.puliscifield();
            grafica.home();
            main.current = "Home";
        }
    },

    "IntesaSetup": {
        Enter() { intesa._avviaPartita(); }
    },

    "IntesaGioco": {
        Enter() { intesa._indovinato(); },
        " "()   { intesa._togglePausa(); },
        p()     { intesa._passa(); },
        P()     { intesa._passa(); },
    },

    "IntesaTurnoAttesa": {
        Enter() { intesa._iniziaSecondoTurno(); },
        " "()   { intesa._iniziaSecondoTurno(); },
    },

    "IntesaRisultato": {
        Enter() {
            intesa.reset();
            grafica.puliscifield();
            intesa.setup();
            main.current = "IntesaSetup";
        }
    },

    "RuotaSetup": {
        Enter() { ruota._avviaPartita(); }
    },

    "RuotaManche": {
        Enter() { ruota._startManche(); },
        " "()   { ruota._startManche(); },
    },

    "RuotaGioco": {
        g()    { ruota._giraRuota(); },
        G()    { ruota._giraRuota(); },
        v()    { ruota._apriCompraVocale(); },
        V()    { ruota._apriCompraVocale(); },
        s()    { ruota._apriSoluzione(); },
        S()    { ruota._apriSoluzione(); },
    },

    "RuotaVittoriaRound": {
        Enter() {
            ruota.manche++;
            if (ruota.manche <= 4) ruota._iniziaManche();
            else ruota._verdetto();
        }
    },

    "RuotaVerdetto": {
        Enter() {
            ruota.reset();
            grafica.puliscifield();
            ruota.setup();
            main.current = "RuotaSetup";
        }
    },

    "RuotaFinale": {
        g()  { ruota._giraRuotaFinale(); },
        G()  { ruota._giraRuotaFinale(); },
        v()  { ruota._apriCompraVocale(); },
        V()  { ruota._apriCompraVocale(); },
        s()  { ruota._apriSoluzione(); },
        S()  { ruota._apriSoluzione(); },
        p()  { ruota._prossimoTurnoGong(); },
        P()  { ruota._prossimoTurnoGong(); },
    },
}

grafica.home();
main.current = "Home";

function control(event) {
    let key = event.key;
    let state = main.current;
    if (Step[state] && key in Step[state]) {
        event.preventDefault();
        Step[state][key]();
    }
}

document.addEventListener("keydown", control);
