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
    }
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
