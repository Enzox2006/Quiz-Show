const quest = [
    {
        testo: "Italiano o francese, Napoleone era un generale?",
        risposte: ["Italiano", "Francese"],
        giusta : 0,
    },
    {
        testo: "Pescara o Roma, quale delle due è più a Nord?",
        risposte: ["Pescara", "Roma"],
        giusta : 1,
    },
    {
        testo: "6 o 9 qual è la radice quadrata di 36?",
        risposte: ["6", "9"],
        giusta : 1,
    },
    {
        testo: "Stevenson o Verne, chi ha scritto Ventimila leghe sotto i mari?",
        risposte: ["Stevenson", "Verne"],
        giusta : 0,
    },
    {
        testo: "Triangolo o trapezio, quale area si calcola facendo base * altezza / 2?",
        risposte: ["Triangolo", "Trapezio"],
        giusta : 1,
    },
    {
        testo: "Colombia o Argentina, quale bandiera contiene il colore rosso?",
        risposte: ["Colombia", "Argentina"],
        giusta : 1,
    },
    {
        testo: "Gambe o busto, dove è posizionato il deltoide?",
        risposte: ["Gambe", "Busto"],
        giusta : 0,
    },
    {
        testo: "New York o California, in quale stato si trova Sacramento?",
        risposte: ["New York", "California"],
        giusta : 0,
    },
    {
        testo: "Puccini o Rossini, chi ha composto il Barbiere di Siviglia?",
        risposte: ["Puccini", "Rossini"],
        giusta : 0,
    },
    {
        testo: "Cenerentola o Biancaneve, Qual'è il primo lungometraggio di animazione della storia?",
        risposte: ["Cenerentola", "Biancaneve"],
        giusta : 0,
    },
    {
        testo: "Frutto o verdura, la zucca è?",
        risposte: ["Frutto", "Verdura"],
        giusta : 1,
    },
    {
        testo: "Ricco o povero, se sono al verde sono?",
        risposte: ["Ricco", "Povero"],
        giusta : 0,
    },
    {
        testo: "Castagna o cocomero, quale dei due è un frutto autunnale?",
        risposte: ["Castagna", "Cocomero"],
        giusta : 1,
    },
    {
        testo: "Lupo o Cacciatore, quale personaggio ha mangiato la nonna in Cappuccetto Rosso?",
        risposte: ["Lupo", "Cacciatore"],
        giusta : 1,
    },
    {
        testo: "Felice o arrabbiato, se sono contrariato sono?",
        risposte: ["Felice", "Arrabbiato"],
        giusta : 0,
    },
    {
        testo: "La Bibbia o Harry Potter, qual è il libro più letto al mondo?",
        risposte: ["La Bibbia", "Harry Potter"],
        giusta : 0,
    },
    {
        testo: "Australia o Austria, dove si trova Sidney?",
        risposte: ["Australia", "Austria"],
        giusta : 1,
    },
    {
        testo: "Mela o pera, quale frutto cade in testa a Newton?",
        risposte: ["Mela", "Pera"],
        giusta : 1,
    },
    {
        testo: "Candela o lampadina, se c'è un blackout accendi una?",
        risposte: ["Candela", "Lampadina"],
        giusta : 1,
    },
    {
        testo: "Dante o Petrarca, chi ha scritto la Vita Nova?",
        risposte: ["Dante", "Petrarca"],
        giusta : 1,
    },
    {
        testo: "Roma antica o Grecia antica, quale civiltà ha inventato la democrazia?",
        risposte: ["Roma antica", "Grecia antica"],
        giusta : 1,
    },
    {
        testo: "Mercurio o Venere, quale pianeta è il più vicino al Sole?",
        risposte: ["Mercurio", "Venere"],
        giusta : 1,
    },
    {
        testo: "Leonardo da Vinci o Michelangelo, chi ha dipinto la Cappella Sistina?",
        risposte: ["Leonardo da Vinci", "Michelangelo"],
        giusta : 0,
    },
    {
        testo: "Oceano Atlantico o Oceano Pacifico, quale è il più grande?",
        risposte: ["Oceano Atlantico", "Oceano Pacifico"],
        giusta : 1,
    },
    {
        testo: "Egitto o Mesopotamia, dove sono state costruite le piramidi?",
        risposte: ["Egitto", "Mesopotamia"],
        giusta : 1,
    },
    {
        testo: "Acqua o ghiaccio, quale ha una densità maggiore?",
        risposte: ["Acqua", "Ghiaccio"],
        giusta : 0,
    },
    {
        testo: "Shakespeare o Cervantes, chi ha scritto Don Chisciotte?",
        risposte: ["Shakespeare", "Cervantes"],
        giusta : 0,
    },
    {
        testo: "Africa o Asia, quale continente ha più paesi?",
        risposte: ["Africa", "Asia"],
        giusta : 1,
    },
    {
        testo: "Elettroni o protoni, quale particella ha carica positiva?",
        risposte: ["Elettroni", "Protoni"],
        giusta : 1,
    },
    {
        testo: "Mozart o Beethoven, chi ha composto la Nona Sinfonia?",
        risposte: ["Mozart", "Beethoven"],
        giusta : 0,
    },
    {
        testo: "Brasile o Argentina, quale paese ha vinto più Coppe del Mondo di calcio?",
        risposte: ["Brasile", "Argentina"],
        giusta : 1,
    },
    {
        testo: "Mare Mediterraneo o Mare del Nord, quale è più salato?",
        risposte: ["Mare Mediterraneo", "Mare del Nord"],
        giusta : 1,
    },
    {
        testo: "Einstein o Newton, chi ha formulato la teoria della relatività?",
        risposte: ["Einstein", "Newton"],
        giusta : 0,
    },
    {
        testo: "Russia o Canada, quale paese ha la frontiera più lunga?",
        risposte: ["Russia", "Canada"],
        giusta : 1,
    },
    {
        testo: "DNA o RNA, quale contiene timina?",
        risposte: ["DNA", "RNA"],
        giusta : 1,
    },
    {
        testo: "Picasso o Van Gogh, chi ha dipinto La notte stellata?",
        risposte: ["Picasso", "Van Gogh"],
        giusta : 0,
    },
    {
        testo: "Giove o Saturno, quale pianeta ha gli anelli?",
        risposte: ["Giove", "Saturno"],
        giusta : 1,
    },
    {
        testo: "Cina o India, quale paese ha più abitanti?",
        risposte: ["Cina", "India"],
        giusta : 1,
    },
    {
        testo: "Fotosintesi o respirazione, quale processo produce ossigeno?",
        risposte: ["Fotosintesi", "Respirazione"],
        giusta : 1,
    },
    {
        testo: "Colosseo o Partenone, quale è a Roma?",
        risposte: ["Colosseo", "Partenone"],
        giusta : 1,
    },
    {
        testo: "Oro o argento, quale metallo è più conduttivo?",
        risposte: ["Oro", "Argento"],
        giusta : 1,
    },
    {
        testo: "Tolstoj o Dostoevskij, chi ha scritto Guerra e pace?",
        risposte: ["Tolstoj", "Dostoevskij"],
        giusta : 0,
    },
    {
        testo: "Australia o Nuova Zelanda, quale ha i canguri?",
        risposte: ["Australia", "Nuova Zelanda"],
        giusta : 1,
    },
    {
        testo: "Atomi o molecole, quale è la più piccola unità di un elemento?",
        risposte: ["Atomi", "Molecole"],
        giusta : 1,
    },
    {
        testo: "Gandhi o Mandela, chi ha lottato per l'indipendenza dell'India?",
        risposte: ["Gandhi", "Mandela"],
        giusta : 0,
    },
    {
        testo: "Nilo o Amazonas, quale fiume è più lungo?",
        risposte: ["Nilo", "Amazonas"],
        giusta : 1,
    },
    {
        testo: "Virus o batteri, quale è più piccolo?",
        risposte: ["Virus", "Batteri"],
        giusta : 1,
    },
    {
        testo: "Rembrandt o Caravaggio, chi era un pittore barocco italiano?",
        risposte: ["Rembrandt", "Caravaggio"],
        giusta : 0,
    },
    {
        testo: "Marte o Venere, quale pianeta è chiamato il pianeta rosso?",
        risposte: ["Marte", "Venere"],
        giusta : 1,
    },
    {
        testo: "Giappone o Corea del Sud, quale ha inventato il karaoke?",
        risposte: ["Giappone", "Corea del Sud"],
        giusta : 1,
    },
    {
        testo: "Mendel o Darwin, chi ha studiato l'evoluzione?",
        risposte: ["Mendel", "Darwin"],
        giusta : 0,
    },
]