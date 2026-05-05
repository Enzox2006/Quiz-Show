const TOTAL_QUESTIONS = 21;

const main = {
    current: "Home",
    montepremi: 100000,
    durata: 150,
    time: 150,
    nomeGiocatore: "CONCORRENTE",
}

let intervalId = null;
let domande = [];
let currentIndex = 0;
let streak = 0;

let timert = null;
let topNomeEl = null;
let topMontepremiEl = null;
let topProgressoEl = null;
let domtext = null;
let answ1text = null;
let answ2text = null;
let answ1cont = null;
let answ2cont = null;
let dots = [];
let streakNumEl = null;

const tool = {
    shuffle() {
        for (let i = 0; i < quest.length; i++) {
            let j = Math.floor(Math.random() * (quest.length - i)) + i;
            [quest[i], quest[j]] = [quest[j], quest[i]];
        }
    },

    startGame() {
        tool.shuffle();
        domande = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            domande.push(quest[i]);
        }
        currentIndex = 0;
        streak = 0;
        grafica.scriviquest();
    },

    updateTimer() {
        if (main.time > 0) {
            main.time--;
            let mins = Math.floor(main.time / 60);
            let secs = main.time % 60;
            if (timert) {
                timert.innerHTML = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                if (main.time <= 30) {
                    timert.classList.add('timer-low');
                }
            }
        } else {
            tool.pauseTimer();
            grafica.showResult(false);
        }
    },

    startTimer() {
        if (!intervalId) {
            intervalId = setInterval(tool.updateTimer, 1000);
        }
    },

    pauseTimer() {
        clearInterval(intervalId);
        intervalId = null;
    },

    checkrisposta(choice) {
        if (main.current !== 'Gioco') return;
        if (domande[currentIndex].giusta === choice) {
            grafica.giusto();
        } else {
            grafica.sbagliato();
        }
    },

    formatMontepremi(val) {
        return val.toLocaleString('it-IT') + ' €';
    },

    resetGameState() {
        tool.pauseTimer();
        intervalId = null;
        currentIndex = 0;
        streak = 0;
        domande = [];
        dots = [];
        timert = null;
        topNomeEl = null;
        topMontepremiEl = null;
        topProgressoEl = null;
        domtext = null;
        answ1text = null;
        answ2text = null;
        answ1cont = null;
        answ2cont = null;
        streakNumEl = null;
    }
}
