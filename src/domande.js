const quest = [
    // --- ORIGINALI ---
    {
        testo: "Italiano o francese, Napoleone era un generale?",
        risposte: ["Italiano", "Francese"],
        giusta: 0,
    },
    {
        testo: "Pescara o Roma, quale delle due è più a Nord?",
        risposte: ["Pescara", "Roma"],
        giusta: 1,
    },
    {
        testo: "6 o 9, qual è la radice quadrata di 36?",
        risposte: ["6", "9"],
        giusta: 1,
    },
    {
        testo: "Stevenson o Verne, chi ha scritto Ventimila leghe sotto i mari?",
        risposte: ["Stevenson", "Verne"],
        giusta: 0,
    },
    {
        testo: "Triangolo o trapezio, quale area si calcola facendo base × altezza / 2?",
        risposte: ["Triangolo", "Trapezio"],
        giusta: 1,
    },
    {
        testo: "Colombia o Argentina, quale bandiera contiene il colore rosso?",
        risposte: ["Colombia", "Argentina"],
        giusta: 1,
    },
    {
        testo: "Gambe o busto, dove è posizionato il deltoide?",
        risposte: ["Gambe", "Busto"],
        giusta: 0,
    },
    {
        testo: "New York o California, in quale stato si trova Sacramento?",
        risposte: ["New York", "California"],
        giusta: 0,
    },
    {
        testo: "Puccini o Rossini, chi ha composto il Barbiere di Siviglia?",
        risposte: ["Puccini", "Rossini"],
        giusta: 0,
    },
    {
        testo: "Cenerentola o Biancaneve, qual è il primo lungometraggio d'animazione della storia?",
        risposte: ["Cenerentola", "Biancaneve"],
        giusta: 0,
    },
    {
        testo: "Frutto o verdura, la zucca è?",
        risposte: ["Frutto", "Verdura"],
        giusta: 1,
    },
    {
        testo: "Ricco o povero, se sono al verde sono?",
        risposte: ["Ricco", "Povero"],
        giusta: 0,
    },
    {
        testo: "Castagna o cocomero, quale dei due è un frutto autunnale?",
        risposte: ["Castagna", "Cocomero"],
        giusta: 1,
    },
    {
        testo: "Lupo o cacciatore, quale personaggio ha mangiato la nonna in Cappuccetto Rosso?",
        risposte: ["Lupo", "Cacciatore"],
        giusta: 1,
    },
    {
        testo: "Felice o arrabbiato, se sono contrariato sono?",
        risposte: ["Felice", "Arrabbiato"],
        giusta: 0,
    },
    {
        testo: "La Bibbia o Harry Potter, qual è il libro più letto al mondo?",
        risposte: ["La Bibbia", "Harry Potter"],
        giusta: 1,
    },
    {
        testo: "Australia o Austria, dove si trova Sydney?",
        risposte: ["Australia", "Austria"],
        giusta: 1,
    },
    {
        testo: "Mela o pera, quale frutto cadde in testa a Newton?",
        risposte: ["Mela", "Pera"],
        giusta: 1,
    },
    {
        testo: "Candela o lampadina, se c'è un blackout accendi una?",
        risposte: ["Candela", "Lampadina"],
        giusta: 1,
    },
    {
        testo: "Dante o Petrarca, chi ha scritto la Vita Nova?",
        risposte: ["Dante", "Petrarca"],
        giusta: 1,
    },
    {
        testo: "Roma antica o Grecia antica, quale civiltà ha inventato la democrazia?",
        risposte: ["Roma antica", "Grecia antica"],
        giusta: 0,
    },
    {
        testo: "Mercurio o Venere, quale pianeta è il più vicino al Sole?",
        risposte: ["Mercurio", "Venere"],
        giusta: 1,
    },
    {
        testo: "Leonardo da Vinci o Michelangelo, chi ha dipinto la Cappella Sistina?",
        risposte: ["Leonardo da Vinci", "Michelangelo"],
        giusta: 0,
    },
    {
        testo: "Oceano Atlantico o Oceano Pacifico, quale è il più grande?",
        risposte: ["Oceano Atlantico", "Oceano Pacifico"],
        giusta: 0,
    },
    {
        testo: "Egitto o Mesopotamia, dove sono state costruite le piramidi?",
        risposte: ["Egitto", "Mesopotamia"],
        giusta: 1,
    },
    {
        testo: "Acqua o ghiaccio, quale ha una densità maggiore?",
        risposte: ["Acqua", "Ghiaccio"],
        giusta: 1,
    },
    {
        testo: "Shakespeare o Cervantes, chi ha scritto Don Chisciotte?",
        risposte: ["Shakespeare", "Cervantes"],
        giusta: 0,
    },
    {
        testo: "Africa o Asia, quale continente ha più paesi?",
        risposte: ["Africa", "Asia"],
        giusta: 1,
    },
    {
        testo: "Elettroni o protoni, quale particella ha carica positiva?",
        risposte: ["Elettroni", "Protoni"],
        giusta: 0,
    },
    {
        testo: "Mozart o Beethoven, chi ha composto la Nona Sinfonia?",
        risposte: ["Mozart", "Beethoven"],
        giusta: 0,
    },
    {
        testo: "Brasile o Argentina, quale paese ha vinto più Coppe del Mondo di calcio?",
        risposte: ["Brasile", "Argentina"],
        giusta: 1,
    },
    {
        testo: "Mare Mediterraneo o Mare del Nord, quale è più salato?",
        risposte: ["Mare Mediterraneo", "Mare del Nord"],
        giusta: 1,
    },
    {
        testo: "Einstein o Newton, chi ha formulato la teoria della relatività?",
        risposte: ["Einstein", "Newton"],
        giusta: 1,
    },
    {
        testo: "Russia o Canada, quale paese ha la superficie più grande?",
        risposte: ["Russia", "Canada"],
        giusta: 1,
    },
    {
        testo: "DNA o RNA, quale contiene timina?",
        risposte: ["DNA", "RNA"],
        giusta: 1,
    },
    {
        testo: "Picasso o Van Gogh, chi ha dipinto La notte stellata?",
        risposte: ["Picasso", "Van Gogh"],
        giusta: 0,
    },
    {
        testo: "Giove o Saturno, quale pianeta ha gli anelli più famosi?",
        risposte: ["Giove", "Saturno"],
        giusta: 0,
    },
    {
        testo: "Cina o India, quale paese ha più abitanti?",
        risposte: ["Cina", "India"],
        giusta: 1,
    },
    {
        testo: "Fotosintesi o respirazione, quale processo produce ossigeno?",
        risposte: ["Fotosintesi", "Respirazione"],
        giusta: 1,
    },
    {
        testo: "Colosseo o Partenone, quale si trova a Roma?",
        risposte: ["Colosseo", "Partenone"],
        giusta: 1,
    },
    {
        testo: "Oro o argento, quale metallo è più conduttivo?",
        risposte: ["Oro", "Argento"],
        giusta: 0,
    },
    {
        testo: "Tolstoj o Dostoevskij, chi ha scritto Guerra e pace?",
        risposte: ["Tolstoj", "Dostoevskij"],
        giusta: 1,
    },
    {
        testo: "Australia o Nuova Zelanda, quale ha i canguri?",
        risposte: ["Australia", "Nuova Zelanda"],
        giusta: 1,
    },
    {
        testo: "Atomi o molecole, quale è la più piccola unità di un elemento?",
        risposte: ["Atomi", "Molecole"],
        giusta: 1,
    },
    {
        testo: "Gandhi o Mandela, chi ha lottato per l'indipendenza dell'India?",
        risposte: ["Gandhi", "Mandela"],
        giusta: 1,
    },
    {
        testo: "Nilo o Rio delle Amazzoni, quale fiume è più lungo?",
        risposte: ["Nilo", "Rio delle Amazzoni"],
        giusta: 1,
    },
    {
        testo: "Virus o batteri, quale è più piccolo?",
        risposte: ["Virus", "Batteri"],
        giusta: 1,
    },
    {
        testo: "Rembrandt o Caravaggio, chi era un pittore barocco italiano?",
        risposte: ["Rembrandt", "Caravaggio"],
        giusta: 0,
    },
    {
        testo: "Marte o Venere, quale pianeta è chiamato il pianeta rosso?",
        risposte: ["Marte", "Venere"],
        giusta: 1,
    },
    {
        testo: "Giappone o Corea del Sud, quale ha inventato il karaoke?",
        risposte: ["Giappone", "Corea del Sud"],
        giusta: 1,
    },
    {
        testo: "Mendel o Darwin, chi ha studiato l'evoluzione delle specie?",
        risposte: ["Mendel", "Darwin"],
        giusta: 0,
    },

    // --- GEOGRAFIA ---
    {
        testo: "Parigi o Lione, quale è la capitale della Francia?",
        risposte: ["Parigi", "Lione"],
        giusta: 1,
    },
    {
        testo: "Madrid o Barcellona, quale è la capitale della Spagna?",
        risposte: ["Madrid", "Barcellona"],
        giusta: 1,
    },
    {
        testo: "Berlino o Monaco, quale è la capitale della Germania?",
        risposte: ["Berlino", "Monaco"],
        giusta: 1,
    },
    {
        testo: "Amsterdam o Rotterdam, quale è la capitale dei Paesi Bassi?",
        risposte: ["Amsterdam", "Rotterdam"],
        giusta: 1,
    },
    {
        testo: "Ankara o Istanbul, quale è la capitale della Turchia?",
        risposte: ["Ankara", "Istanbul"],
        giusta: 1,
    },
    {
        testo: "Sydney o Canberra, quale è la capitale dell'Australia?",
        risposte: ["Sydney", "Canberra"],
        giusta: 0,
    },
    {
        testo: "Toronto o Ottawa, quale è la capitale del Canada?",
        risposte: ["Toronto", "Ottawa"],
        giusta: 0,
    },
    {
        testo: "Rio de Janeiro o Brasilia, quale è la capitale del Brasile?",
        risposte: ["Rio de Janeiro", "Brasilia"],
        giusta: 0,
    },
    {
        testo: "Shanghai o Pechino, quale è la capitale della Cina?",
        risposte: ["Shanghai", "Pechino"],
        giusta: 0,
    },
    {
        testo: "Mumbai o Nuova Delhi, quale è la capitale dell'India?",
        risposte: ["Mumbai", "Nuova Delhi"],
        giusta: 0,
    },
    {
        testo: "Himalaya o Ande, quale catena montuosa contiene l'Everest?",
        risposte: ["Himalaya", "Ande"],
        giusta: 1,
    },
    {
        testo: "Sahara o Gobi, quale è il deserto più grande del mondo?",
        risposte: ["Sahara", "Gobi"],
        giusta: 1,
    },
    {
        testo: "Titicaca o Baikal, quale lago contiene più acqua dolce al mondo?",
        risposte: ["Titicaca", "Baikal"],
        giusta: 0,
    },
    {
        testo: "Groenlandia o Madagascar, quale è l'isola più grande del mondo?",
        risposte: ["Groenlandia", "Madagascar"],
        giusta: 1,
    },
    {
        testo: "Etna o Vesuvio, quale vulcano si trova in Sicilia?",
        risposte: ["Etna", "Vesuvio"],
        giusta: 1,
    },
    {
        testo: "Venezia o Genova, quale città italiana è costruita sull'acqua?",
        risposte: ["Venezia", "Genova"],
        giusta: 1,
    },
    {
        testo: "Portogallo o Spagna, quale paese si trova più a Ovest in Europa?",
        risposte: ["Portogallo", "Spagna"],
        giusta: 1,
    },
    {
        testo: "Norvegia o Svezia, quale paese ha i fiordi più famosi?",
        risposte: ["Norvegia", "Svezia"],
        giusta: 1,
    },
    {
        testo: "Atlantico o Pacifico, quale oceano bagna le coste dell'Italia?",
        risposte: ["Atlantico", "Pacifico"],
        giusta: 0,
    },
    {
        testo: "Po o Tevere, quale è il fiume più lungo d'Italia?",
        risposte: ["Po", "Tevere"],
        giusta: 1,
    },
    {
        testo: "Alpi o Appennini, quale catena montuosa divide Italia e Francia?",
        risposte: ["Alpi", "Appennini"],
        giusta: 1,
    },
    {
        testo: "Napoli o Palermo, quale è il capoluogo della Sicilia?",
        risposte: ["Napoli", "Palermo"],
        giusta: 0,
    },
    {
        testo: "Milano o Torino, quale è il capoluogo della Lombardia?",
        risposte: ["Milano", "Torino"],
        giusta: 1,
    },
    {
        testo: "Ginevra o Berna, quale è la capitale della Svizzera?",
        risposte: ["Ginevra", "Berna"],
        giusta: 0,
    },
    {
        testo: "Londra o Manchester, quale è la capitale del Regno Unito?",
        risposte: ["Londra", "Manchester"],
        giusta: 1,
    },
    {
        testo: "Cairo o Alessandria, quale è la capitale dell'Egitto?",
        risposte: ["Cairo", "Alessandria"],
        giusta: 1,
    },
    {
        testo: "Kenya o Sudafrica, quale paese africano è più a Nord?",
        risposte: ["Kenya", "Sudafrica"],
        giusta: 1,
    },
    {
        testo: "Messico o Argentina, quale è il paese più grande del Sudamerica?",
        risposte: ["Messico", "Argentina"],
        giusta: 0,
    },
    {
        testo: "Alaska o Texas, quale stato americano è il più grande?",
        risposte: ["Alaska", "Texas"],
        giusta: 1,
    },
    {
        testo: "Washington o New York, quale è la capitale degli USA?",
        risposte: ["Washington", "New York"],
        giusta: 1,
    },

    // --- STORIA ---
    {
        testo: "1492 o 1776, in quale anno Colombo scoprì l'America?",
        risposte: ["1492", "1776"],
        giusta: 1,
    },
    {
        testo: "Prima o seconda, in quale guerra mondiale fu usata la bomba atomica?",
        risposte: ["Prima", "Seconda"],
        giusta: 0,
    },
    {
        testo: "Giulio Cesare o Augusto, chi fu il primo imperatore di Roma?",
        risposte: ["Giulio Cesare", "Augusto"],
        giusta: 0,
    },
    {
        testo: "Egizi o Romani, chi costruì il Pantheon?",
        risposte: ["Egizi", "Romani"],
        giusta: 0,
    },
    {
        testo: "1789 o 1848, in quale anno scoppiò la Rivoluzione Francese?",
        risposte: ["1789", "1848"],
        giusta: 1,
    },
    {
        testo: "Lenin o Stalin, chi guidò la Rivoluzione Russa del 1917?",
        risposte: ["Lenin", "Stalin"],
        giusta: 1,
    },
    {
        testo: "Cleopatra o Nefertiti, chi fu l'ultima regina d'Egitto?",
        risposte: ["Cleopatra", "Nefertiti"],
        giusta: 1,
    },
    {
        testo: "Marco Polo o Cristoforo Colombo, chi viaggiò in Cina?",
        risposte: ["Marco Polo", "Cristoforo Colombo"],
        giusta: 1,
    },
    {
        testo: "1914 o 1939, in quale anno iniziò la Prima Guerra Mondiale?",
        risposte: ["1914", "1939"],
        giusta: 1,
    },
    {
        testo: "Atene o Sparta, quale città-stato greca era famosa per i guerrieri?",
        risposte: ["Atene", "Sparta"],
        giusta: 0,
    },
    {
        testo: "Alessandro Magno o Annibale, chi attraversò le Alpi con gli elefanti?",
        risposte: ["Alessandro Magno", "Annibale"],
        giusta: 0,
    },
    {
        testo: "Gutenberg o Bell, chi inventò la stampa a caratteri mobili?",
        risposte: ["Gutenberg", "Bell"],
        giusta: 1,
    },
    {
        testo: "1969 o 1961, in quale anno l'uomo sbarcò sulla Luna?",
        risposte: ["1969", "1961"],
        giusta: 1,
    },
    {
        testo: "Wright o Edison, chi inventò l'aeroplano?",
        risposte: ["Wright", "Edison"],
        giusta: 1,
    },
    {
        testo: "Colombo o Vespucci, a chi deve il nome il continente americano?",
        risposte: ["Colombo", "Vespucci"],
        giusta: 0,
    },
    {
        testo: "Risorgimento o Rinascimento, come si chiama il periodo culturale del 1400-1500?",
        risposte: ["Risorgimento", "Rinascimento"],
        giusta: 0,
    },
    {
        testo: "1861 o 1946, in quale anno fu proclamata l'Unità d'Italia?",
        risposte: ["1861", "1946"],
        giusta: 1,
    },
    {
        testo: "Mao o Gandhi, chi guidò la rivoluzione comunista cinese?",
        risposte: ["Mao", "Gandhi"],
        giusta: 1,
    },
    {
        testo: "1989 o 1991, in quale anno cadde il Muro di Berlino?",
        risposte: ["1989", "1991"],
        giusta: 1,
    },
    {
        testo: "Romolo o Remo, secondo la leggenda chi fondò Roma?",
        risposte: ["Romolo", "Remo"],
        giusta: 1,
    },

    // --- SCIENZA E NATURA ---
    {
        testo: "Ossigeno o azoto, quale gas è più abbondante nell'aria?",
        risposte: ["Ossigeno", "Azoto"],
        giusta: 0,
    },
    {
        testo: "Luce o suono, quale viaggia più veloce?",
        risposte: ["Luce", "Suono"],
        giusta: 1,
    },
    {
        testo: "Luna o Sole, quale è più vicino alla Terra?",
        risposte: ["Luna", "Sole"],
        giusta: 1,
    },
    {
        testo: "Invertebrati o vertebrati, i pesci sono?",
        risposte: ["Invertebrati", "Vertebrati"],
        giusta: 0,
    },
    {
        testo: "Delfino o squalo, quale è un mammifero?",
        risposte: ["Delfino", "Squalo"],
        giusta: 1,
    },
    {
        testo: "Clorofilla o melanina, quale pigmento rende verdi le piante?",
        risposte: ["Clorofilla", "Melanina"],
        giusta: 1,
    },
    {
        testo: "Ferro o alluminio, quale metallo è più leggero?",
        risposte: ["Ferro", "Alluminio"],
        giusta: 0,
    },
    {
        testo: "Proteine o carboidrati, di cosa sono fatti i muscoli?",
        risposte: ["Proteine", "Carboidrati"],
        giusta: 1,
    },
    {
        testo: "32 o 36, quanti denti ha un adulto con i denti del giudizio?",
        risposte: ["32", "36"],
        giusta: 1,
    },
    {
        testo: "Cuore o cervello, quale organo pesa circa 1,4 kg nell'adulto?",
        risposte: ["Cuore", "Cervello"],
        giusta: 0,
    },
    {
        testo: "Idrogeno o elio, quale è l'elemento più abbondante nell'universo?",
        risposte: ["Idrogeno", "Elio"],
        giusta: 1,
    },
    {
        testo: "Solido o liquido, in quale stato l'acqua ha volume e forma propri?",
        risposte: ["Solido", "Liquido"],
        giusta: 1,
    },
    {
        testo: "Fotoni o neutroni, quali particelle compongono la luce?",
        risposte: ["Fotoni", "Neutroni"],
        giusta: 1,
    },
    {
        testo: "206 o 212, quante ossa ha il corpo umano adulto?",
        risposte: ["206", "212"],
        giusta: 1,
    },
    {
        testo: "H2O o CO2, qual è la formula chimica dell'acqua?",
        risposte: ["H2O", "CO2"],
        giusta: 1,
    },
    {
        testo: "Rettile o anfibio, il coccodrillo è un?",
        risposte: ["Rettile", "Anfibio"],
        giusta: 1,
    },
    {
        testo: "Vena o arteria, quale porta il sangue dal cuore agli organi?",
        risposte: ["Vena", "Arteria"],
        giusta: 0,
    },
    {
        testo: "7 o 9, quanti colori ha l'arcobaleno?",
        risposte: ["7", "9"],
        giusta: 1,
    },
    {
        testo: "Erbivoro o onnivoro, il coniglio è?",
        risposte: ["Erbivoro", "Onnivoro"],
        giusta: 1,
    },
    {
        testo: "Positivo o negativo, quale polo del magnete si chiama Nord?",
        risposte: ["Positivo", "Negativo"],
        giusta: 1,
    },
    {
        testo: "Metamorfosi o migrazione, come si chiama il cambiamento da bruco a farfalla?",
        risposte: ["Metamorfosi", "Migrazione"],
        giusta: 1,
    },
    {
        testo: "Giove o Saturno, quale è il pianeta più grande del sistema solare?",
        risposte: ["Giove", "Saturno"],
        giusta: 1,
    },
    {
        testo: "Trachea o esofago, quale porta l'aria ai polmoni?",
        risposte: ["Trachea", "Esofago"],
        giusta: 1,
    },
    {
        testo: "Stomaco o intestino, dove avviene l'assorbimento dei nutrienti?",
        risposte: ["Stomaco", "Intestino"],
        giusta: 0,
    },
    {
        testo: "Platino o oro, quale metallo è più raro?",
        risposte: ["Platino", "Oro"],
        giusta: 1,
    },

    // --- LETTERATURA E CULTURA ---
    {
        testo: "Inferno o Paradiso, quale è la prima cantica della Divina Commedia?",
        risposte: ["Inferno", "Paradiso"],
        giusta: 1,
    },
    {
        testo: "Verga o D'Annunzio, chi è il padre del Verismo italiano?",
        risposte: ["Verga", "D'Annunzio"],
        giusta: 1,
    },
    {
        testo: "Omero o Virgilio, chi ha scritto l'Iliade?",
        risposte: ["Omero", "Virgilio"],
        giusta: 1,
    },
    {
        testo: "Manzoni o Leopardi, chi ha scritto I Promessi Sposi?",
        risposte: ["Manzoni", "Leopardi"],
        giusta: 1,
    },
    {
        testo: "Tolkien o Lewis, chi ha scritto Il Signore degli Anelli?",
        risposte: ["Tolkien", "Lewis"],
        giusta: 1,
    },
    {
        testo: "Orwell o Huxley, chi ha scritto 1984?",
        risposte: ["Orwell", "Huxley"],
        giusta: 1,
    },
    {
        testo: "Kafka o Camus, chi ha scritto La Metamorfosi?",
        risposte: ["Kafka", "Camus"],
        giusta: 1,
    },
    {
        testo: "Dostoevskij o Tolstoj, chi ha scritto Delitto e Castigo?",
        risposte: ["Dostoevskij", "Tolstoj"],
        giusta: 1,
    },
    {
        testo: "Flaubert o Balzac, chi ha scritto Madame Bovary?",
        risposte: ["Flaubert", "Balzac"],
        giusta: 1,
    },
    {
        testo: "Dickens o Hardy, chi ha scritto Oliver Twist?",
        risposte: ["Dickens", "Hardy"],
        giusta: 1,
    },
    {
        testo: "Pirandello o Svevo, chi ha vinto il Nobel per la letteratura nel 1934?",
        risposte: ["Pirandello", "Svevo"],
        giusta: 1,
    },
    {
        testo: "Amleto o Macbeth, quale opera di Shakespeare inizia con 'Essere o non essere'?",
        risposte: ["Amleto", "Macbeth"],
        giusta: 1,
    },
    {
        testo: "Odissea o Eneide, quale racconta il viaggio di Ulisse?",
        risposte: ["Odissea", "Eneide"],
        giusta: 1,
    },
    {
        testo: "Victor Hugo o Dumas, chi ha scritto I Miserabili?",
        risposte: ["Victor Hugo", "Dumas"],
        giusta: 1,
    },
    {
        testo: "Camus o Sartre, chi ha scritto Lo Straniero?",
        risposte: ["Camus", "Sartre"],
        giusta: 1,
    },

    // --- ARTE E MUSICA ---
    {
        testo: "Olio o affresco, con quale tecnica è dipinta la Gioconda?",
        risposte: ["Olio", "Affresco"],
        giusta: 1,
    },
    {
        testo: "Louvre o Uffizi, in quale museo si trova la Gioconda?",
        risposte: ["Louvre", "Uffizi"],
        giusta: 1,
    },
    {
        testo: "Raffaello o Botticelli, chi ha dipinto La nascita di Venere?",
        risposte: ["Raffaello", "Botticelli"],
        giusta: 0,
    },
    {
        testo: "Verdi o Puccini, chi ha composto il Rigoletto?",
        risposte: ["Verdi", "Puccini"],
        giusta: 1,
    },
    {
        testo: "Verdi o Puccini, chi ha composto la Tosca?",
        risposte: ["Verdi", "Puccini"],
        giusta: 0,
    },
    {
        testo: "Bach o Handel, chi ha composto le Variazioni Goldberg?",
        risposte: ["Bach", "Handel"],
        giusta: 1,
    },
    {
        testo: "Chopin o Liszt, chi era il pianista polacco romantico?",
        risposte: ["Chopin", "Liszt"],
        giusta: 1,
    },
    {
        testo: "Vivaldi o Corelli, chi ha composto Le quattro stagioni?",
        risposte: ["Vivaldi", "Corelli"],
        giusta: 1,
    },
    {
        testo: "Debussy o Ravel, chi ha composto il Bolero?",
        risposte: ["Debussy", "Ravel"],
        giusta: 0,
    },
    {
        testo: "Monet o Manet, chi ha dipinto le Ninfee?",
        risposte: ["Monet", "Manet"],
        giusta: 1,
    },
    {
        testo: "Cubismo o Surrealismo, quale movimento artistico è associato a Picasso?",
        risposte: ["Cubismo", "Surrealismo"],
        giusta: 1,
    },
    {
        testo: "Dali o Magritte, chi ha dipinto La persistenza della memoria?",
        risposte: ["Dali", "Magritte"],
        giusta: 1,
    },
    {
        testo: "Rodin o Bernini, chi ha scolpito Il pensatore?",
        risposte: ["Rodin", "Bernini"],
        giusta: 1,
    },
    {
        testo: "Marmo o bronzo, con quale materiale è realizzato il David di Michelangelo?",
        risposte: ["Marmo", "Bronzo"],
        giusta: 1,
    },
    {
        testo: "Firenze o Roma, in quale città si trova il David di Michelangelo?",
        risposte: ["Firenze", "Roma"],
        giusta: 1,
    },

    // --- SPORT ---
    {
        testo: "Pelé o Maradona, quale calciatore è argentino?",
        risposte: ["Pelé", "Maradona"],
        giusta: 0,
    },
    {
        testo: "Federer o Nadal, quale tennista è svizzero?",
        risposte: ["Federer", "Nadal"],
        giusta: 1,
    },
    {
        testo: "Bolt o Farah, quale atleta ha battuto il record dei 100 metri?",
        risposte: ["Bolt", "Farah"],
        giusta: 1,
    },
    {
        testo: "NBA o NFL, quale lega è dedicata al basket?",
        risposte: ["NBA", "NFL"],
        giusta: 1,
    },
    {
        testo: "4 o 5, quanti cerchi ha il simbolo olimpico?",
        risposte: ["4", "5"],
        giusta: 0,
    },
    {
        testo: "1896 o 1900, in quale anno si sono tenute le prime Olimpiadi moderne?",
        risposte: ["1896", "1900"],
        giusta: 1,
    },
    {
        testo: "11 o 10, quanti giocatori ha una squadra di calcio in campo?",
        risposte: ["11", "10"],
        giusta: 1,
    },
    {
        testo: "Formula 1 o MotoGP, in quale competizione corre la Ferrari?",
        risposte: ["Formula 1", "MotoGP"],
        giusta: 1,
    },
    {
        testo: "Wimbledon o Roland Garros, quale torneo si gioca sull'erba?",
        risposte: ["Wimbledon", "Roland Garros"],
        giusta: 1,
    },
    {
        testo: "Scherma o judo, quale sport è di origine giapponese?",
        risposte: ["Scherma", "Judo"],
        giusta: 0,
    },
    {
        testo: "Nuoto o atletica, in quale sport si usa la bracciata?",
        risposte: ["Nuoto", "Atletica"],
        giusta: 1,
    },
    {
        testo: "3 o 4, quanti set vince chi trionfa in un match di tennis al meglio dei 5?",
        risposte: ["3", "4"],
        giusta: 1,
    },
    {
        testo: "Boxe o karate, in quale sport si usano i guantoni?",
        risposte: ["Boxe", "Karate"],
        giusta: 1,
    },
    {
        testo: "Tour de France o Giro d'Italia, quale gara ciclistica si corre in Francia?",
        risposte: ["Tour de France", "Giro d'Italia"],
        giusta: 1,
    },
    {
        testo: "Italia o Germania, quale nazionale ha vinto 4 Mondiali di calcio?",
        risposte: ["Italia", "Germania"],
        giusta: 1,
    },
    {
        testo: "Michael Jordan o Kobe Bryant, quale giocatore NBA ha vinto 6 titoli con i Chicago Bulls?",
        risposte: ["Michael Jordan", "Kobe Bryant"],
        giusta: 1,
    },
    {
        testo: "Rugby o football americano, quale sport usa una palla ovale con il tee?",
        risposte: ["Rugby", "Football americano"],
        giusta: 0,
    },
    {
        testo: "Sciabola o fioretto, quale arma di scherma ha la punta?",
        risposte: ["Sciabola", "Fioretto"],
        giusta: 0,
    },

    // --- CINEMA E TV ---
    {
        testo: "Spielberg o Kubrick, chi ha diretto E.T.?",
        risposte: ["Spielberg", "Kubrick"],
        giusta: 1,
    },
    {
        testo: "Chaplin o Keaton, quale attore era chiamato Charlot?",
        risposte: ["Chaplin", "Keaton"],
        giusta: 1,
    },
    {
        testo: "Marvel o DC, a quale universo appartiene Superman?",
        risposte: ["Marvel", "DC"],
        giusta: 0,
    },
    {
        testo: "Marvel o DC, a quale universo appartiene Spider-Man?",
        risposte: ["Marvel", "DC"],
        giusta: 1,
    },
    {
        testo: "Nolan o Tarantino, chi ha diretto Il cavaliere oscuro?",
        risposte: ["Nolan", "Tarantino"],
        giusta: 1,
    },
    {
        testo: "Coppola o Scorsese, chi ha diretto Il Padrino?",
        risposte: ["Coppola", "Scorsese"],
        giusta: 1,
    },
    {
        testo: "Star Wars o Star Trek, in quale saga compare Darth Vader?",
        risposte: ["Star Wars", "Star Trek"],
        giusta: 1,
    },
    {
        testo: "Pixar o DreamWorks, chi ha prodotto Toy Story?",
        risposte: ["Pixar", "DreamWorks"],
        giusta: 1,
    },
    {
        testo: "Harry Potter o Il Signore degli Anelli, in quale saga compare Dumbledore?",
        risposte: ["Harry Potter", "Il Signore degli Anelli"],
        giusta: 1,
    },
    {
        testo: "Oscar o Golden Globe, quale premio cinematografico è assegnato dall'Academy?",
        risposte: ["Oscar", "Golden Globe"],
        giusta: 1,
    },
    {
        testo: "Venezia o Cannes, quale festival assegna la Palma d'Oro?",
        risposte: ["Venezia", "Cannes"],
        giusta: 0,
    },
    {
        testo: "Titanic o Avatar, quale film di Cameron è uscito prima?",
        risposte: ["Titanic", "Avatar"],
        giusta: 1,
    },
    {
        testo: "DiCaprio o Pitt, quale attore ha vinto l'Oscar per The Revenant?",
        risposte: ["DiCaprio", "Pitt"],
        giusta: 1,
    },
    {
        testo: "Meryl Streep o Cate Blanchett, quale attrice ha vinto più Oscar?",
        risposte: ["Meryl Streep", "Cate Blanchett"],
        giusta: 1,
    },
    {
        testo: "Hitchcock o Kubrick, chi è il maestro del cinema horror psicologico?",
        risposte: ["Hitchcock", "Kubrick"],
        giusta: 1,
    },

    // --- CUCINA E CIBO ---
    {
        testo: "Napoli o Roma, dove nasce la pizza margherita?",
        risposte: ["Napoli", "Roma"],
        giusta: 1,
    },
    {
        testo: "Bologna o Milano, in quale città è nata la carbonara?",
        risposte: ["Bologna", "Milano"],
        giusta: 0,
    },
    {
        testo: "Parmigiano o Grana Padano, quale formaggio viene da Parma?",
        risposte: ["Parmigiano", "Grana Padano"],
        giusta: 1,
    },
    {
        testo: "Champagne o Prosecco, quale spumante viene dalla Champagne francese?",
        risposte: ["Champagne", "Prosecco"],
        giusta: 1,
    },
    {
        testo: "Sushi o ramen, quale piatto giapponese usa il riso crudo con pesce?",
        risposte: ["Sushi", "Ramen"],
        giusta: 1,
    },
    {
        testo: "Wasabi o zenzero, quale è la pasta verde piccante del sushi?",
        risposte: ["Wasabi", "Zenzero"],
        giusta: 1,
    },
    {
        testo: "Tiramisu o panna cotta, quale dolce italiano usa il mascarpone?",
        risposte: ["Tiramisu", "Panna cotta"],
        giusta: 1,
    },
    {
        testo: "Tagliatelle o spaghetti, quale pasta è tipica della tradizione bolognese?",
        risposte: ["Tagliatelle", "Spaghetti"],
        giusta: 1,
    },
    {
        testo: "Burro o olio d'oliva, quale grasso è tradizionalmente usato nella cucina del Sud Italia?",
        risposte: ["Burro", "Olio d'oliva"],
        giusta: 0,
    },
    {
        testo: "Gouda o Emmental, quale formaggio svizzero ha i buchi?",
        risposte: ["Gouda", "Emmental"],
        giusta: 0,
    },
    {
        testo: "Peperoncino o paprika, quale spezia è più piccante?",
        risposte: ["Peperoncino", "Paprika"],
        giusta: 1,
    },
    {
        testo: "Caffè o tè, quale bevanda ha più caffeina a parità di peso?",
        risposte: ["Caffè", "Tè"],
        giusta: 0,
    },
    {
        testo: "Whisky o vodka, quale distillato è fatto prevalentemente da patate?",
        risposte: ["Whisky", "Vodka"],
        giusta: 0,
    },
    {
        testo: "Birra o vino, quale bevanda alcolica è prodotta dalla fermentazione dell'uva?",
        risposte: ["Birra", "Vino"],
        giusta: 0,
    },
    {
        testo: "Basilico o origano, quale erba aromatica è il simbolo del pesto genovese?",
        risposte: ["Basilico", "Origano"],
        giusta: 1,
    },

    // --- MATEMATICA E LOGICA ---
    { testo: "8 o 9, quante sono 3 al cubo?", risposte: ["8", "9"], giusta: 0 },
    {
        testo: "12 o 15, quante sono 3 × 4 + 3?",
        risposte: ["12", "15"],
        giusta: 0,
    },
    {
        testo: "Primo o composto, il numero 17 è?",
        risposte: ["Primo", "Composto"],
        giusta: 1,
    },
    {
        testo: "Infinito o zero, quale numero non è intero?",
        risposte: ["Infinito", "Zero"],
        giusta: 1,
    },
    {
        testo: "90 o 180, quanti gradi ha un angolo piatto?",
        risposte: ["90", "180"],
        giusta: 0,
    },
    {
        testo: "360 o 180, quanti gradi ha la somma degli angoli interni di un triangolo?",
        risposte: ["360", "180"],
        giusta: 0,
    },
    {
        testo: "100 o 1000, quanti centimetri ci sono in un metro?",
        risposte: ["100", "1000"],
        giusta: 1,
    },
    {
        testo: "1000 o 10000, quanti grammi ci sono in un chilogrammo?",
        risposte: ["1000", "10000"],
        giusta: 1,
    },
    {
        testo: "Pari o dispari, il numero 0 è?",
        risposte: ["Pari", "Dispari"],
        giusta: 1,
    },
    {
        testo: "Razionale o irrazionale, il pi greco è?",
        risposte: ["Razionale", "Irrazionale"],
        giusta: 0,
    },

    // --- TECNOLOGIA ---
    {
        testo: "Apple o Microsoft, chi ha fondato Steve Jobs?",
        risposte: ["Apple", "Microsoft"],
        giusta: 1,
    },
    {
        testo: "Google o Facebook, quale azienda ha creato il motore di ricerca più usato?",
        risposte: ["Google", "Facebook"],
        giusta: 1,
    },
    {
        testo: "1989 o 1995, in quale anno fu inventato il World Wide Web?",
        risposte: ["1989", "1995"],
        giusta: 1,
    },
    {
        testo: "Tim Berners-Lee o Bill Gates, chi ha inventato il Web?",
        risposte: ["Tim Berners-Lee", "Bill Gates"],
        giusta: 1,
    },
    {
        testo: "Android o iOS, quale sistema operativo mobile è di Google?",
        risposte: ["Android", "iOS"],
        giusta: 1,
    },
    {
        testo: "RAM o ROM, quale memoria conserva i dati anche senza corrente?",
        risposte: ["RAM", "ROM"],
        giusta: 0,
    },
    {
        testo: "Wi-Fi o Bluetooth, quale tecnologia ha raggio maggiore?",
        risposte: ["Wi-Fi", "Bluetooth"],
        giusta: 1,
    },
    {
        testo: "1 o 0, quale cifra non esiste nel sistema binario?",
        risposte: ["1", "0"],
        giusta: 0,
    },
    {
        testo: "Pixel o bit, quale è l'unità minima di informazione digitale?",
        risposte: ["Pixel", "Bit"],
        giusta: 0,
    },
    {
        testo: "CPU o GPU, quale è il processore principale del computer?",
        risposte: ["CPU", "GPU"],
        giusta: 1,
    },

    // --- ANIMALI ---
    {
        testo: "Leopardo o ghepardo, quale felino è più veloce?",
        risposte: ["Leopardo", "Ghepardo"],
        giusta: 0,
    },
    {
        testo: "Elefante africano o asiatico, quale ha le orecchie più grandi?",
        risposte: ["Africano", "Asiatico"],
        giusta: 1,
    },
    {
        testo: "Koala o panda, quale mangia prevalentemente bambù?",
        risposte: ["Koala", "Panda"],
        giusta: 0,
    },
    {
        testo: "Coccinella o vespa, quale insetto ha le macchioline rosse?",
        risposte: ["Coccinella", "Vespa"],
        giusta: 1,
    },
    {
        testo: "Balena blu o squalo balena, quale è il più grande animale del mondo?",
        risposte: ["Balena blu", "Squalo balena"],
        giusta: 1,
    },
    {
        testo: "Pinguino o albatros, quale uccello non sa volare?",
        risposte: ["Pinguino", "Albatros"],
        giusta: 1,
    },
    {
        testo: "Pipistrello o rondine, quale mammifero vola?",
        risposte: ["Pipistrello", "Rondine"],
        giusta: 1,
    },
    {
        testo: "Cobra o pitone, quale serpente è velenoso?",
        risposte: ["Cobra", "Pitone"],
        giusta: 1,
    },
    {
        testo: "Leone o tigre, quale felino vive in gruppo?",
        risposte: ["Leone", "Tigre"],
        giusta: 1,
    },
    {
        testo: "Polipo o calamaro, quale animale ha otto tentacoli?",
        risposte: ["Polipo", "Calamaro"],
        giusta: 1,
    },
    {
        testo: "Ape o vespa, quale insetto produce il miele?",
        risposte: ["Ape", "Vespa"],
        giusta: 1,
    },
    {
        testo: "Falco o gufo, quale rapace caccia di notte?",
        risposte: ["Falco", "Gufo"],
        giusta: 0,
    },
    {
        testo: "Lama o dromedario, quale animale vive in Sudamerica?",
        risposte: ["Lama", "Dromedario"],
        giusta: 1,
    },
    {
        testo: "Ippopotamo o rinoceronte, quale animale africano passa più tempo in acqua?",
        risposte: ["Ippopotamo", "Rinoceronte"],
        giusta: 1,
    },

    // --- LINGUA ITALIANA E CURIOSITÀ ---
    {
        testo: "Aggettivo o sostantivo, 'felice' è un?",
        risposte: ["Aggettivo", "Sostantivo"],
        giusta: 1,
    },
    {
        testo: "Verbo o avverbio, 'correre' è un?",
        risposte: ["Verbo", "Avverbio"],
        giusta: 1,
    },
    {
        testo: "Femminile o maschile, 'il problema' è di genere?",
        risposte: ["Femminile", "Maschile"],
        giusta: 0,
    },
    {
        testo: "Caldo o freddo, il colore blu è associato al?",
        risposte: ["Caldo", "Freddo"],
        giusta: 0,
    },
    {
        testo: "Nord o Sud, in Italia il Mezzogiorno indica il?",
        risposte: ["Nord", "Sud"],
        giusta: 0,
    },
    {
        testo: "12 o 24, quante ore ha un giorno?",
        risposte: ["12", "24"],
        giusta: 0,
    },
    {
        testo: "52 o 48, quante settimane ha un anno?",
        risposte: ["52", "48"],
        giusta: 1,
    },
    {
        testo: "366 o 365, quanti giorni ha un anno bisestile?",
        risposte: ["366", "365"],
        giusta: 1,
    },
    {
        testo: "Sinistra o destra, in Italia si guida sul lato?",
        risposte: ["Sinistra", "Destra"],
        giusta: 0,
    },
    {
        testo: "Sinistra o destra, nel Regno Unito si guida sul lato?",
        risposte: ["Sinistra", "Destra"],
        giusta: 1,
    },
    {
        testo: "Bianco o rosso, di che colore è la croce nella bandiera svizzera?",
        risposte: ["Bianco", "Rosso"],
        giusta: 1,
    },
    {
        testo: "Verde o rosso, di che colore è il semaforo che significa vai?",
        risposte: ["Verde", "Rosso"],
        giusta: 1,
    },
    {
        testo: "Destra o sinistra, se guardo il tramonto il Sud è alla mia?",
        risposte: ["Destra", "Sinistra"],
        giusta: 1,
    },
    {
        testo: "Febbraio o gennaio, quale mese è più corto?",
        risposte: ["Febbraio", "Gennaio"],
        giusta: 1,
    },
    {
        testo: "Mese o settimana, quale unità di tempo è più lunga?",
        risposte: ["Mese", "Settimana"],
        giusta: 1,
    },

    // --- GEOGRAFIA 2 ---
    {
        testo: "Lisbona o Porto, quale è la capitale del Portogallo?",
        risposte: ["Lisbona", "Porto"],
        giusta: 1,
    },
    {
        testo: "Oslo o Bergen, quale è la capitale della Norvegia?",
        risposte: ["Oslo", "Bergen"],
        giusta: 1,
    },
    {
        testo: "Stoccolma o Gothenburg, quale è la capitale della Svezia?",
        risposte: ["Stoccolma", "Gothenburg"],
        giusta: 1,
    },
    {
        testo: "Helsinki o Tampere, quale è la capitale della Finlandia?",
        risposte: ["Helsinki", "Tampere"],
        giusta: 1,
    },
    {
        testo: "Copenaghen o Aarhus, quale è la capitale della Danimarca?",
        risposte: ["Copenaghen", "Aarhus"],
        giusta: 1,
    },
    {
        testo: "Varsavia o Cracovia, quale è la capitale della Polonia?",
        risposte: ["Varsavia", "Cracovia"],
        giusta: 1,
    },
    {
        testo: "Vienna o Salisburgo, quale è la capitale dell'Austria?",
        risposte: ["Vienna", "Salisburgo"],
        giusta: 1,
    },
    {
        testo: "Bruxelles o Anversa, quale è la capitale del Belgio?",
        risposte: ["Bruxelles", "Anversa"],
        giusta: 1,
    },
    {
        testo: "Atene o Salonicco, quale è la capitale della Grecia?",
        risposte: ["Atene", "Salonicco"],
        giusta: 1,
    },
    {
        testo: "Bucarest o Cluj, quale è la capitale della Romania?",
        risposte: ["Bucarest", "Cluj"],
        giusta: 1,
    },
    {
        testo: "Sofia o Plovdiv, quale è la capitale della Bulgaria?",
        risposte: ["Sofia", "Plovdiv"],
        giusta: 1,
    },
    {
        testo: "Belgrado o Novi Sad, quale è la capitale della Serbia?",
        risposte: ["Belgrado", "Novi Sad"],
        giusta: 1,
    },
    {
        testo: "Zagabria o Spalato, quale è la capitale della Croazia?",
        risposte: ["Zagabria", "Spalato"],
        giusta: 1,
    },
    {
        testo: "Budapest o Debrecen, quale è la capitale dell'Ungheria?",
        risposte: ["Budapest", "Debrecen"],
        giusta: 1,
    },
    {
        testo: "Praga o Brno, quale è la capitale della Repubblica Ceca?",
        risposte: ["Praga", "Brno"],
        giusta: 1,
    },
    {
        testo: "Bratislava o Kosice, quale è la capitale della Slovacchia?",
        risposte: ["Bratislava", "Kosice"],
        giusta: 1,
    },
    {
        testo: "Dublino o Cork, quale è la capitale dell'Irlanda?",
        risposte: ["Dublino", "Cork"],
        giusta: 1,
    },
    {
        testo: "Mosca o San Pietroburgo, quale è la capitale della Russia?",
        risposte: ["Mosca", "San Pietroburgo"],
        giusta: 1,
    },
    {
        testo: "Kiev o Kharkiv, quale è la capitale dell'Ucraina?",
        risposte: ["Kiev", "Kharkiv"],
        giusta: 1,
    },
    {
        testo: "Tokio o Osaka, quale è la capitale del Giappone?",
        risposte: ["Tokio", "Osaka"],
        giusta: 1,
    },
    {
        testo: "Seul o Busan, quale è la capitale della Corea del Sud?",
        risposte: ["Seul", "Busan"],
        giusta: 1,
    },
    {
        testo: "Bangkok o Chiang Mai, quale è la capitale della Thailandia?",
        risposte: ["Bangkok", "Chiang Mai"],
        giusta: 1,
    },
    {
        testo: "Giacarta o Bali, quale è la capitale dell'Indonesia?",
        risposte: ["Giacarta", "Bali"],
        giusta: 1,
    },
    {
        testo: "Nairobi o Mombasa, quale è la capitale del Kenya?",
        risposte: ["Nairobi", "Mombasa"],
        giusta: 1,
    },
    {
        testo: "Lagos o Abuja, quale è la capitale della Nigeria?",
        risposte: ["Lagos", "Abuja"],
        giusta: 0,
    },
    {
        testo: "Accra o Kumasi, quale è la capitale del Ghana?",
        risposte: ["Accra", "Kumasi"],
        giusta: 1,
    },
    {
        testo: "Dakar o Thiès, quale è la capitale del Senegal?",
        risposte: ["Dakar", "Thiès"],
        giusta: 1,
    },
    {
        testo: "Buenos Aires o Córdoba, quale è la capitale dell'Argentina?",
        risposte: ["Buenos Aires", "Córdoba"],
        giusta: 1,
    },
    {
        testo: "Lima o Arequipa, quale è la capitale del Perù?",
        risposte: ["Lima", "Arequipa"],
        giusta: 1,
    },
    {
        testo: "Bogotà o Medellín, quale è la capitale della Colombia?",
        risposte: ["Bogotà", "Medellín"],
        giusta: 1,
    },
    {
        testo: "Santiago o Valparaíso, quale è la capitale del Cile?",
        risposte: ["Santiago", "Valparaíso"],
        giusta: 1,
    },
    {
        testo: "Città del Messico o Guadalajara, quale è la capitale del Messico?",
        risposte: ["Città del Messico", "Guadalajara"],
        giusta: 1,
    },
    {
        testo: "Pretoria o Città del Capo, quale è la capitale esecutiva del Sudafrica?",
        risposte: ["Pretoria", "Città del Capo"],
        giusta: 1,
    },
    {
        testo: "Marocco o Tunisia, quale paese africano confina con la Spagna?",
        risposte: ["Marocco", "Tunisia"],
        giusta: 1,
    },
    {
        testo: "Atlantico o Indiano, quale oceano si trova a Est dell'Africa?",
        risposte: ["Atlantico", "Indiano"],
        giusta: 0,
    },
    {
        testo: "Equatore o Tropico del Cancro, quale linea passa per il Brasile?",
        risposte: ["Equatore", "Tropico del Cancro"],
        giusta: 1,
    },
    {
        testo: "Antartide o Artico, dove vivono i pinguini?",
        risposte: ["Antartide", "Artico"],
        giusta: 1,
    },
    {
        testo: "Antartide o Artico, dove vivono gli orsi polari?",
        risposte: ["Antartide", "Artico"],
        giusta: 0,
    },
    {
        testo: "Everest o K2, quale è la vetta più alta del mondo?",
        risposte: ["Everest", "K2"],
        giusta: 1,
    },
    {
        testo: "Cervino o Monte Rosa, quale vetta si trova al confine Italia-Svizzera?",
        risposte: ["Cervino", "Monte Rosa"],
        giusta: 1,
    },

    // --- STORIA 2 ---
    {
        testo: "Bisanzio o Costantinopoli, come si chiamava Istanbul prima del 1453?",
        risposte: ["Bisanzio", "Costantinopoli"],
        giusta: 0,
    },
    {
        testo: "Ottomani o Mongoli, chi conquistò Costantinopoli nel 1453?",
        risposte: ["Ottomani", "Mongoli"],
        giusta: 1,
    },
    {
        testo: "Crociate o guerre puniche, come si chiamano le guerre tra Roma e Cartagine?",
        risposte: ["Crociate", "Guerre puniche"],
        giusta: 0,
    },
    {
        testo: "Gengis Khan o Tamerlano, chi fondò l'Impero Mongolo?",
        risposte: ["Gengis Khan", "Tamerlano"],
        giusta: 1,
    },
    {
        testo: "Azteca o Maya, quale civiltà dominava il Messico centrale quando arrivò Cortés?",
        risposte: ["Azteca", "Maya"],
        giusta: 1,
    },
    {
        testo: "Inca o Maya, quale civiltà costruì Machu Picchu?",
        risposte: ["Inca", "Maya"],
        giusta: 1,
    },
    {
        testo: "Lincoln o Washington, chi fu il primo presidente degli USA?",
        risposte: ["Lincoln", "Washington"],
        giusta: 0,
    },
    {
        testo: "Lincoln o Jefferson, chi abolì la schiavitù negli USA?",
        risposte: ["Lincoln", "Jefferson"],
        giusta: 1,
    },
    {
        testo: "Prima o Seconda, in quale Guerra Mondiale ci fu la trincea?",
        risposte: ["Prima", "Seconda"],
        giusta: 1,
    },
    {
        testo: "Versailles o Yalta, quale trattato pose fine alla Prima Guerra Mondiale?",
        risposte: ["Versailles", "Yalta"],
        giusta: 1,
    },
    {
        testo: "Normandia o Sicilia, dove sbarcarono gli Alleati nel 1944 in Francia?",
        risposte: ["Normandia", "Sicilia"],
        giusta: 1,
    },
    {
        testo: "Hiroshima o Nagasaki, quale città fu colpita per prima dalla bomba atomica?",
        risposte: ["Hiroshima", "Nagasaki"],
        giusta: 1,
    },
    {
        testo: "Mussolini o Hitler, quale dittatore fondò il fascismo?",
        risposte: ["Mussolini", "Hitler"],
        giusta: 1,
    },
    {
        testo: "1922 o 1933, in quale anno Mussolini prese il potere in Italia?",
        risposte: ["1922", "1933"],
        giusta: 1,
    },
    {
        testo: "Repubblica o Monarchia, quale forma di stato ha l'Italia dal 1946?",
        risposte: ["Repubblica", "Monarchia"],
        giusta: 1,
    },
    {
        testo: "Garibaldi o Cavour, chi guidò la spedizione dei Mille?",
        risposte: ["Garibaldi", "Cavour"],
        giusta: 1,
    },
    {
        testo: "Savoia o Borbone, quale famiglia regnava sul Piemonte prima dell'Unità d'Italia?",
        risposte: ["Savoia", "Borbone"],
        giusta: 1,
    },
    {
        testo: "Pio IX o Leone XIII, quale papa fu contrario all'Unità d'Italia?",
        risposte: ["Pio IX", "Leone XIII"],
        giusta: 1,
    },
    {
        testo: "1848 o 1861, in quale anno fu proclamato il Regno d'Italia?",
        risposte: ["1848", "1861"],
        giusta: 0,
    },
    {
        testo: "Etruschi o Latini, quale popolo precedette i Romani nel Lazio?",
        risposte: ["Etruschi", "Latini"],
        giusta: 0,
    },
    {
        testo: "Cartaginesi o Persiani, contro chi combatté Alessandro Magno?",
        risposte: ["Cartaginesi", "Persiani"],
        giusta: 0,
    },
    {
        testo: "Maratona o Termopili, in quale battaglia morì il re spartano Leonida?",
        risposte: ["Maratona", "Termopili"],
        giusta: 0,
    },
    {
        testo: "Socrate o Platone, quale filosofo greco fu condannato a bere la cicuta?",
        risposte: ["Socrate", "Platone"],
        giusta: 1,
    },
    {
        testo: "Aristotele o Platone, chi fu il maestro di Alessandro Magno?",
        risposte: ["Aristotele", "Platone"],
        giusta: 1,
    },
    {
        testo: "Tito o Caligola, quale imperatore romano era noto per la sua crudeltà?",
        risposte: ["Tito", "Caligola"],
        giusta: 0,
    },

    // --- SCIENZA 2 ---
    {
        testo: "Penicillina o aspirina, quale farmaco fu scoperto da Fleming?",
        risposte: ["Penicillina", "Aspirina"],
        giusta: 1,
    },
    {
        testo: "Gravitazione o magnetismo, quale forza scoprì Newton?",
        risposte: ["Gravitazione", "Magnetismo"],
        giusta: 1,
    },
    {
        testo: "Celsius o Fahrenheit, a quanti gradi bolle l'acqua nella scala Celsius?",
        risposte: ["100", "212"],
        giusta: 1,
    },
    {
        testo: "Neurone o globulo rosso, quale cellula trasmette segnali nel cervello?",
        risposte: ["Neurone", "Globulo rosso"],
        giusta: 1,
    },
    {
        testo: "Miliardi o milioni, quanti neuroni ha il cervello umano circa?",
        risposte: ["Miliardi", "Milioni"],
        giusta: 1,
    },
    {
        testo: "Fotone o elettrone, quale particella non ha massa?",
        risposte: ["Fotone", "Elettrone"],
        giusta: 1,
    },
    {
        testo: "Acido o base, il limone ha un pH?",
        risposte: ["Acido", "Base"],
        giusta: 1,
    },
    {
        testo: "Acido o base, il sapone ha un pH?",
        risposte: ["Acido", "Base"],
        giusta: 0,
    },
    {
        testo: "Simmetria o asimmetria, quale caratteristica hanno la maggior parte dei fiocchi di neve?",
        risposte: ["Simmetria", "Asimmetria"],
        giusta: 1,
    },
    {
        testo: "Caldo o freddo, i colori con lunghezza d'onda più lunga appaiono?",
        risposte: ["Caldo", "Freddo"],
        giusta: 1,
    },
    {
        testo: "Infrarosso o ultravioletto, quale radiazione è invisibile ma percepita come calore?",
        risposte: ["Infrarosso", "Ultravioletto"],
        giusta: 1,
    },
    {
        testo: "4 o 3, quante dimensioni ha lo spazio-tempo?",
        risposte: ["4", "3"],
        giusta: 1,
    },
    {
        testo: "Termometro o barometro, quale strumento misura la pressione atmosferica?",
        risposte: ["Termometro", "Barometro"],
        giusta: 0,
    },
    {
        testo: "Bussola o sestante, quale strumento indica il Nord?",
        risposte: ["Bussola", "Sestante"],
        giusta: 1,
    },
    {
        testo: "Telescopio o microscopio, quale Galileo usò per osservare i pianeti?",
        risposte: ["Telescopio", "Microscopio"],
        giusta: 1,
    },
    {
        testo: "Mendeleev o Curie, chi creò la tavola periodica degli elementi?",
        risposte: ["Mendeleev", "Curie"],
        giusta: 1,
    },
    {
        testo: "Radio o polonio, quale elemento scoprì Marie Curie?",
        risposte: ["Radio", "Polonio"],
        giusta: 1,
    },
    {
        testo: "Fusione o fissione, quale processo nucleare avviene nel Sole?",
        risposte: ["Fusione", "Fissione"],
        giusta: 1,
    },
    {
        testo: "Eruzione o terremoto, come si chiama l'uscita di magma da un vulcano?",
        risposte: ["Eruzione", "Terremoto"],
        giusta: 1,
    },
    {
        testo: "Richter o Mercalli, quale scala misura la magnitudo di un terremoto?",
        risposte: ["Richter", "Mercalli"],
        giusta: 1,
    },
    {
        testo: "Stratosfera o troposfera, in quale strato atmosferico voliamo?",
        risposte: ["Stratosfera", "Troposfera"],
        giusta: 0,
    },
    {
        testo: "Ozono o CO2, quale gas forma lo strato protettivo dai raggi UV?",
        risposte: ["Ozono", "CO2"],
        giusta: 1,
    },
    {
        testo: "Diamante o grafite, quale è la forma più dura del carbonio?",
        risposte: ["Diamante", "Grafite"],
        giusta: 1,
    },
    {
        testo: "Silicio o germanio, quale elemento è alla base dei microchip?",
        risposte: ["Silicio", "Germanio"],
        giusta: 1,
    },
    {
        testo: "Emisfero sinistro o destro, quale del cervello controlla il linguaggio nella maggior parte delle persone?",
        risposte: ["Sinistro", "Destro"],
        giusta: 1,
    },

    // --- SPORT 2 ---
    {
        testo: "Maldini o Baresi, quale difensore italiano ha vinto più Palloni d'Oro?",
        risposte: ["Maldini", "Baresi"],
        giusta: 0,
    },
    {
        testo: "Ronaldo o Messi, quale ha vinto più Palloni d'Oro in carriera?",
        risposte: ["Ronaldo", "Messi"],
        giusta: 0,
    },
    {
        testo: "Juventus o Inter, quale squadra italiana ha vinto più scudetti?",
        risposte: ["Juventus", "Inter"],
        giusta: 1,
    },
    {
        testo: "Milan o Roma, quale squadra italiana ha vinto più Coppe dei Campioni?",
        risposte: ["Milan", "Roma"],
        giusta: 1,
    },
    {
        testo: "San Siro o Olimpico, quale stadio è a Milano?",
        risposte: ["San Siro", "Olimpico"],
        giusta: 1,
    },
    {
        testo: "Monaco o Barcellona, in quale città gioca il Bayern?",
        risposte: ["Monaco", "Barcellona"],
        giusta: 1,
    },
    {
        testo: "Old Trafford o Anfield, quale stadio è del Manchester United?",
        risposte: ["Old Trafford", "Anfield"],
        giusta: 1,
    },
    {
        testo: "Wembley o Stamford Bridge, quale stadio ospita le finali di FA Cup?",
        risposte: ["Wembley", "Stamford Bridge"],
        giusta: 1,
    },
    {
        testo: "Djokovic o Federer, quale tennista ha vinto più titoli del Grande Slam?",
        risposte: ["Djokovic", "Federer"],
        giusta: 1,
    },
    {
        testo: "Fioretto o spada, quale arma di scherma colpisce solo il busto?",
        risposte: ["Fioretto", "Spada"],
        giusta: 1,
    },
    {
        testo: "Maratona o mezza maratona, quale gara è lunga 42,195 km?",
        risposte: ["Maratona", "Mezza maratona"],
        giusta: 1,
    },
    {
        testo: "Stile libero o farfalla, quale nuotata è tecnicamente la più difficile?",
        risposte: ["Stile libero", "Farfalla"],
        giusta: 0,
    },
    {
        testo: "Sci alpino o sci nordico, quale specialità include la discesa libera?",
        risposte: ["Sci alpino", "Sci nordico"],
        giusta: 1,
    },
    {
        testo: "Superbike o MotoGP, quale campionato usa moto derivate dalla serie?",
        risposte: ["Superbike", "MotoGP"],
        giusta: 1,
    },
    {
        testo: "Senna o Schumacher, quale pilota ha vinto più titoli di F1?",
        risposte: ["Senna", "Schumacher"],
        giusta: 0,
    },
    {
        testo: "Schumacher o Hamilton, quale pilota ha vinto più Mondiali di F1?",
        risposte: ["Schumacher", "Hamilton"],
        giusta: 0,
    },
    {
        testo: "Pallavolo o pallacanestro, in quale sport il campo è diviso da una rete?",
        risposte: ["Pallavolo", "Pallacanestro"],
        giusta: 1,
    },
    {
        testo: "6 o 5, quanti giocatori ha una squadra di pallavolo in campo?",
        risposte: ["6", "5"],
        giusta: 1,
    },
    {
        testo: "Cricket o baseball, quale sport è popolarissimo in India?",
        risposte: ["Cricket", "Baseball"],
        giusta: 1,
    },
    {
        testo: "Polo o golf, quale sport si gioca a cavallo?",
        risposte: ["Polo", "Golf"],
        giusta: 1,
    },

    // --- CINEMA E MUSICA 2 ---
    {
        testo: "Beatles o Rolling Stones, quale band è di Liverpool?",
        risposte: ["Beatles", "Rolling Stones"],
        giusta: 1,
    },
    {
        testo: "Lennon o McCartney, quale Beatle è stato assassinato nel 1980?",
        risposte: ["Lennon", "McCartney"],
        giusta: 1,
    },
    {
        testo: "Elvis o Chuck Berry, chi è considerato il re del rock and roll?",
        risposte: ["Elvis", "Chuck Berry"],
        giusta: 1,
    },
    {
        testo: "Michael Jackson o Prince, chi è il Re del Pop?",
        risposte: ["Michael Jackson", "Prince"],
        giusta: 1,
    },
    {
        testo: "Madonna o Whitney Houston, quale cantante è nota come 'The Voice'?",
        risposte: ["Madonna", "Whitney Houston"],
        giusta: 0,
    },
    {
        testo: "Freddie Mercury o David Bowie, quale era il frontman dei Queen?",
        risposte: ["Freddie Mercury", "David Bowie"],
        giusta: 1,
    },
    {
        testo: "Led Zeppelin o Pink Floyd, chi ha scritto Stairway to Heaven?",
        risposte: ["Led Zeppelin", "Pink Floyd"],
        giusta: 1,
    },
    {
        testo: "AC/DC o Iron Maiden, quale band australiana suona hard rock?",
        risposte: ["AC/DC", "Iron Maiden"],
        giusta: 1,
    },
    {
        testo: "Jazz o blues, quale genere musicale nasce dal gospel afroamericano del delta del Mississippi?",
        risposte: ["Jazz", "Blues"],
        giusta: 0,
    },
    {
        testo: "Hip-hop o reggae, quale genere musicale è originario della Giamaica?",
        risposte: ["Hip-hop", "Reggae"],
        giusta: 0,
    },
    {
        testo: "Bob Marley o Jimmy Cliff, chi ha reso famoso il reggae nel mondo?",
        risposte: ["Bob Marley", "Jimmy Cliff"],
        giusta: 1,
    },
    {
        testo: "Kubrick o Spielberg, chi ha diretto Arancia meccanica?",
        risposte: ["Kubrick", "Spielberg"],
        giusta: 1,
    },
    {
        testo: "Fellini o Visconti, chi ha diretto La dolce vita?",
        risposte: ["Fellini", "Visconti"],
        giusta: 1,
    },
    {
        testo: "Sordi o Manfredi, quale attore italiano era noto come 'Il Marchese del Grillo'?",
        risposte: ["Sordi", "Manfredi"],
        giusta: 1,
    },
    {
        testo: "De Niro o Pacino, quale attore ha interpretato Michael Corleone ne Il Padrino?",
        risposte: ["De Niro", "Pacino"],
        giusta: 0,
    },
    {
        testo: "Cannes o Venezia, quale festival cinematografico è il più antico del mondo?",
        risposte: ["Cannes", "Venezia"],
        giusta: 0,
    },
    {
        testo: "Disney o Pixar, quale studio ha creato Biancaneve?",
        risposte: ["Disney", "Pixar"],
        giusta: 1,
    },
    {
        testo: "Simba o Mufasa, come si chiama il padre del Re Leone?",
        risposte: ["Simba", "Mufasa"],
        giusta: 0,
    },
    {
        testo: "Elsa o Anna, quale protagonista di Frozen ha i poteri del ghiaccio?",
        risposte: ["Elsa", "Anna"],
        giusta: 1,
    },
    {
        testo: "Woody o Buzz, quale personaggio di Toy Story è uno sceriffo?",
        risposte: ["Woody", "Buzz"],
        giusta: 1,
    },

    // --- CUCINA 2 ---
    {
        testo: "Fiorentina o bistecca alla milanese, quale è una bistecca toscana?",
        risposte: ["Fiorentina", "Bistecca alla milanese"],
        giusta: 1,
    },
    {
        testo: "Parmigiana o lasagna, quale piatto è a base di melanzane?",
        risposte: ["Parmigiana", "Lasagna"],
        giusta: 1,
    },
    {
        testo: "Risotto o polenta, quale piatto usa il mais?",
        risposte: ["Risotto", "Polenta"],
        giusta: 0,
    },
    {
        testo: "Prosciutto crudo o cotto, quale è stagionato e non cotto?",
        risposte: ["Crudo", "Cotto"],
        giusta: 1,
    },
    {
        testo: "Salmone o tonno, quale pesce è famoso per il colore rosa-arancio?",
        risposte: ["Salmone", "Tonno"],
        giusta: 1,
    },
    {
        testo: "Mozzarella o burrata, quale formaggio pugliese ha un cuore cremoso?",
        risposte: ["Mozzarella", "Burrata"],
        giusta: 0,
    },
    {
        testo: "Gorgonzola o Roquefort, quale è il formaggio erborinato italiano?",
        risposte: ["Gorgonzola", "Roquefort"],
        giusta: 1,
    },
    {
        testo: "Aceto balsamico o aceto di vino, quale è tipico di Modena?",
        risposte: ["Balsamico", "Di vino"],
        giusta: 1,
    },
    {
        testo: "Focaccia o piadina, quale pane piatto è tipico della Liguria?",
        risposte: ["Focaccia", "Piadina"],
        giusta: 1,
    },
    {
        testo: "Piadina o focaccia, quale è tipica della Romagna?",
        risposte: ["Piadina", "Focaccia"],
        giusta: 1,
    },
    {
        testo: "Pandoro o panettone, quale dolce natalizio è di Verona?",
        risposte: ["Pandoro", "Panettone"],
        giusta: 1,
    },
    {
        testo: "Cannolo o cassata, quale dolce siciliano è un tubo di pasta fritta ripiena?",
        risposte: ["Cannolo", "Cassata"],
        giusta: 1,
    },
    {
        testo: "Sfogliatella o babà, quale è il dolce napoletano bagnato nel rum?",
        risposte: ["Sfogliatella", "Babà"],
        giusta: 0,
    },
    {
        testo: "Bresaola o speck, quale salume è tipico della Valtellina?",
        risposte: ["Bresaola", "Speck"],
        giusta: 1,
    },
    {
        testo: "Cotechino o zampone, quale è il tipico piatto di Capodanno modenese con l'arto del maiale?",
        risposte: ["Cotechino", "Zampone"],
        giusta: 0,
    },
    {
        testo: "Limoncello o grappa, quale liquore si produce con le bucce di limone?",
        risposte: ["Limoncello", "Grappa"],
        giusta: 1,
    },
    {
        testo: "Birra o sidro, quale bevanda si ottiene dalla fermentazione delle mele?",
        risposte: ["Birra", "Sidro"],
        giusta: 0,
    },
    {
        testo: "Tè verde o tè nero, quale è più fermentato?",
        risposte: ["Verde", "Nero"],
        giusta: 0,
    },
    {
        testo: "Zucchero o sale, quale si scioglie più velocemente in acqua fredda?",
        risposte: ["Zucchero", "Sale"],
        giusta: 0,
    },
    {
        testo: "Forno o friggitrice, quale metodo di cottura usa l'olio bollente?",
        risposte: ["Forno", "Friggitrice"],
        giusta: 0,
    },

    // --- CORPO UMANO E SALUTE ---
    {
        testo: "Fegato o reni, quale organo filtra il sangue dai rifiuti?",
        risposte: ["Fegato", "Reni"],
        giusta: 0,
    },
    {
        testo: "Polmone o fegato, quale organo produce la bile?",
        risposte: ["Polmone", "Fegato"],
        giusta: 0,
    },
    {
        testo: "Insulina o adrenalina, quale ormone regola la glicemia?",
        risposte: ["Insulina", "Adrenalina"],
        giusta: 1,
    },
    {
        testo: "Sistole o diastole, quale fase del battito cardiaco è la contrazione?",
        risposte: ["Sistole", "Diastole"],
        giusta: 1,
    },
    {
        testo: "A o 0, quale gruppo sanguigno è donatore universale?",
        risposte: ["A", "0"],
        giusta: 0,
    },
    {
        testo: "AB o 0, quale gruppo sanguigno è ricevitore universale?",
        risposte: ["AB", "0"],
        giusta: 1,
    },
    {
        testo: "Cornea o cristallino, quale parte dell'occhio mette a fuoco la luce?",
        risposte: ["Cornea", "Cristallino"],
        giusta: 0,
    },
    {
        testo: "Timpano o coclea, quale struttura dell'orecchio trasforma le vibrazioni in segnali nervosi?",
        risposte: ["Timpano", "Coclea"],
        giusta: 0,
    },
    {
        testo: "Bicipite o tricipite, quale muscolo flette il braccio?",
        risposte: ["Bicipite", "Tricipite"],
        giusta: 1,
    },
    {
        testo: "Femore o tibia, quale è l'osso della coscia?",
        risposte: ["Femore", "Tibia"],
        giusta: 1,
    },
    {
        testo: "Batteri o funghi, quale microorganismo causa le infezioni batteriche?",
        risposte: ["Batteri", "Funghi"],
        giusta: 1,
    },
    {
        testo: "Vitamina C o Vitamina D, quale si trova negli agrumi?",
        risposte: ["Vitamina C", "Vitamina D"],
        giusta: 1,
    },
    {
        testo: "Calcio o ferro, quale minerale rinforza le ossa?",
        risposte: ["Calcio", "Ferro"],
        giusta: 1,
    },
    {
        testo: "Emoglobina o melanina, quale proteina trasporta l'ossigeno nel sangue?",
        risposte: ["Emoglobina", "Melanina"],
        giusta: 1,
    },
    {
        testo: "Appendice o milza, quale organo non ha funzioni vitali note?",
        risposte: ["Appendice", "Milza"],
        giusta: 1,
    },

    // --- PERSONAGGI FAMOSI ---
    {
        testo: "Tesla o Edison, chi inventò la corrente alternata?",
        risposte: ["Tesla", "Edison"],
        giusta: 1,
    },
    {
        testo: "Fleming o Pasteur, chi scoprì la pastorizzazione?",
        risposte: ["Fleming", "Pasteur"],
        giusta: 0,
    },
    {
        testo: "Freud o Jung, chi fondò la psicanalisi?",
        risposte: ["Freud", "Jung"],
        giusta: 1,
    },
    {
        testo: "Newton o Leibniz, chi scoprì il calcolo infinitesimale?",
        risposte: ["Newton", "Leibniz"],
        giusta: 1,
    },
    {
        testo: "Copernico o Galileo, chi propose per primo il modello eliocentrico?",
        risposte: ["Copernico", "Galileo"],
        giusta: 1,
    },
    {
        testo: "Bell o Marconi, chi inventò il telefono?",
        risposte: ["Bell", "Marconi"],
        giusta: 1,
    },
    {
        testo: "Marconi o Tesla, chi inventò la radio?",
        risposte: ["Marconi", "Tesla"],
        giusta: 1,
    },
    {
        testo: "Wright o Santos-Dumont, quale fratello viene considerato il pioniere del volo a motore negli USA?",
        risposte: ["Wright", "Santos-Dumont"],
        giusta: 1,
    },
    {
        testo: "Madre Teresa o Malala, quale ha vinto il Nobel per la Pace nel 1979?",
        risposte: ["Madre Teresa", "Malala"],
        giusta: 1,
    },
    {
        testo: "Obama o Clinton, chi fu il primo presidente afroamericano degli USA?",
        risposte: ["Obama", "Clinton"],
        giusta: 1,
    },
    {
        testo: "Churchill o De Gaulle, quale leader guidò il Regno Unito nella Seconda Guerra Mondiale?",
        risposte: ["Churchill", "De Gaulle"],
        giusta: 1,
    },
    {
        testo: "Che Guevara o Fidel Castro, quale leader rivoluzionario era argentino?",
        risposte: ["Che Guevara", "Fidel Castro"],
        giusta: 1,
    },
    {
        testo: "Einstein o Hawking, chi elaborò la teoria dei buchi neri?",
        risposte: ["Einstein", "Hawking"],
        giusta: 0,
    },
    {
        testo: "Darwin o Lamarck, chi propose la teoria dell'evoluzione per selezione naturale?",
        risposte: ["Darwin", "Lamarck"],
        giusta: 1,
    },
    {
        testo: "Archimede o Pitagora, chi enunciò il principio della spinta nei liquidi?",
        risposte: ["Archimede", "Pitagora"],
        giusta: 1,
    },

    // --- LINGUA E PAROLE ---
    {
        testo: "Sinonimo o contrario, 'grande' è un sinonimo di 'piccolo'?",
        risposte: ["Sinonimo", "Contrario"],
        giusta: 0,
    },
    {
        testo: "Metafora o similitudine, 'è forte come un leone' è una?",
        risposte: ["Metafora", "Similitudine"],
        giusta: 0,
    },
    {
        testo: "Metafora o similitudine, 'è un leone in battaglia' è una?",
        risposte: ["Metafora", "Similitudine"],
        giusta: 1,
    },
    {
        testo: "Palindromo o anagramma, 'Anna' è un?",
        risposte: ["Palindromo", "Anagramma"],
        giusta: 1,
    },
    {
        testo: "Latino o greco, da quale lingua deriva la parola 'filosofia'?",
        risposte: ["Latino", "Greco"],
        giusta: 0,
    },
    {
        testo: "Sostantivo o verbo, 'correre' alla voce del vocabolario è un?",
        risposte: ["Sostantivo", "Verbo"],
        giusta: 0,
    },
    {
        testo: "Congiuntivo o indicativo, quale modo verbale esprime certezza?",
        risposte: ["Congiuntivo", "Indicativo"],
        giusta: 0,
    },
    {
        testo: "Maschile o femminile, 'il fiore' è di genere?",
        risposte: ["Maschile", "Femminile"],
        giusta: 1,
    },
    {
        testo: "Singolare o plurale, 'le mele' è?",
        risposte: ["Singolare", "Plurale"],
        giusta: 0,
    },
    {
        testo: "Acuto o grave, quale accento si usa su 'è' (verbo essere)?",
        risposte: ["Acuto", "Grave"],
        giusta: 0,
    },

    // --- NUOVE DOMANDE ---
    {
        testo: "Asia o Africa, in quale continente si trova il Vietnam?",
        risposte: ["Asia", "Africa"],
        giusta: 1,
    },
    {
        testo: "Reykjavík o Oslo, qual è la capitale dell'Islanda?",
        risposte: ["Oslo", "Reykjavík"],
        giusta: 0,
    },
    {
        testo: "Mar Nero o Mar Caspio, dove sfocia il fiume Danubio?",
        risposte: ["Mar Nero", "Mar Caspio"],
        giusta: 1,
    },
    {
        testo: "Florida o California, quale stato americano è soprannominato 'Sunshine State'?",
        risposte: ["California", "Florida"],
        giusta: 0,
    },
    {
        testo: "Marocco o Algeria, in quale nazione si trova la città di Marrakesh?",
        risposte: ["Marocco", "Algeria"],
        giusta: 1,
    },
    {
        testo: "Creta o Sicilia, quale tra queste è un'isola greca?",
        risposte: ["Sicilia", "Creta"],
        giusta: 0,
    },
    {
        testo: "Cile o Perù, in quale nazione si trova il deserto di Atacama?",
        risposte: ["Cile", "Perù"],
        giusta: 1,
    },
    {
        testo: "Wellington o Auckland, qual è la capitale della Nuova Zelanda?",
        risposte: ["Auckland", "Wellington"],
        giusta: 0,
    },
    {
        testo: "Francia o Svizzera, tra l'Italia e quale altro stato si trova il Monte Bianco?",
        risposte: ["Francia", "Svizzera"],
        giusta: 1,
    },
    {
        testo: "Adriatico o Ionio, quale mare bagna le coste della Croazia?",
        risposte: ["Ionio", "Adriatico"],
        giusta: 0,
    },
    {
        testo: "Berlino o Monaco, in quale città si trova la Porta di Brandeburgo?",
        risposte: ["Berlino", "Monaco"],
        giusta: 1,
    },
    {
        testo: "Danimarca o Norvegia, a chi appartiene politicamente la Groenlandia?",
        risposte: ["Norvegia", "Danimarca"],
        giusta: 0,
    },
    {
        testo: "Ottawa o Toronto, qual è la capitale del Canada?",
        risposte: ["Ottawa", "Toronto"],
        giusta: 1,
    },
    {
        testo: "Giordania o Egitto, in quale stato si trova l'antica città di Petra?",
        risposte: ["Egitto", "Giordania"],
        giusta: 0,
    },
    {
        testo: "Tamigi o Senna, quale fiume attraversa Londra?",
        risposte: ["Tamigi", "Senna"],
        giusta: 1,
    },
    {
        testo: "Africa o Asia, in quale continente si trova il lago Vittoria?",
        risposte: ["Asia", "Africa"],
        giusta: 0,
    },
    {
        testo: "Madrid o Barcellona, qual è la capitale della Spagna?",
        risposte: ["Madrid", "Barcellona"],
        giusta: 1,
    },
    {
        testo: "Pacifico o Indiano, in quale oceano si trovano le isole Hawaii?",
        risposte: ["Indiano", "Pacifico"],
        giusta: 0,
    },
    {
        testo: "Canada o Libano, quale nazione ha una foglia d'acero sulla bandiera?",
        risposte: ["Canada", "Libano"],
        giusta: 1,
    },
    {
        testo: "Repubblica Ceca o Slovacchia, di quale stato è capitale la città di Praga?",
        risposte: ["Slovacchia", "Repubblica Ceca"],
        giusta: 0,
    },
    {
        testo: "Pacifico o Indiano, il Canale di Panama collega l'Atlantico con quale altro oceano?",
        risposte: ["Pacifico", "Indiano"],
        giusta: 1,
    },
    {
        testo: "Helsinki o Stoccolma, qual è la capitale della Finlandia?",
        risposte: ["Stoccolma", "Helsinki"],
        giusta: 0,
    },
    {
        testo: "Giappone o Cina, in quale nazione si trova il vulcano Fuji?",
        risposte: ["Giappone", "Cina"],
        giusta: 1,
    },
    {
        testo: "Paesi Bassi o Belgio, quale paese è famoso in tutto il mondo per i suoi mulini a vento?",
        risposte: ["Belgio", "Paesi Bassi"],
        giusta: 0,
    },
    {
        testo: "Mosca o Varsavia, in quale città si trova il Cremlino?",
        risposte: ["Mosca", "Varsavia"],
        giusta: 1,
    },
    {
        testo: "Mar Morto o Mar Caspio, qual è il punto più basso della Terra?",
        risposte: ["Mar Caspio", "Mar Morto"],
        giusta: 0,
    },
    {
        testo: "Regno Unito o Germania, quale di questi stati europei è ancora oggi una monarchia?",
        risposte: ["Regno Unito", "Germania"],
        giusta: 1,
    },
    {
        testo: "Buenos Aires o Rio de Janeiro, qual è la capitale dell'Argentina?",
        risposte: ["Rio de Janeiro", "Buenos Aires"],
        giusta: 0,
    },
    {
        testo: "Africa o Asia, in quale continente si estende il deserto del Sahara?",
        risposte: ["Africa", "Asia"],
        giusta: 1,
    },
    {
        testo: "Sicilia o Sardegna, in quale isola si trova la città di Palermo?",
        risposte: ["Sardegna", "Sicilia"],
        giusta: 0,
    },
    {
        testo: "Bangkok o Seul, qual è la capitale della Thailandia?",
        risposte: ["Bangkok", "Seul"],
        giusta: 1,
    },
    {
        testo: "Tevere o Arno, quale fiume attraversa la città di Roma?",
        risposte: ["Arno", "Tevere"],
        giusta: 0,
    },
    {
        testo: "India o Pakistan, in quale nazione si trova il Taj Mahal?",
        risposte: ["India", "Pakistan"],
        giusta: 1,
    },
    {
        testo: "Sicilia o Cipro, qual è l'isola più grande del Mar Mediterraneo?",
        risposte: ["Cipro", "Sicilia"],
        giusta: 0,
    },
    {
        testo: "New York o Los Angeles, quale città è soprannominata 'La Grande Mela'?",
        risposte: ["New York", "Los Angeles"],
        giusta: 1,
    },
    {
        testo: "Città del Vaticano o Monaco, qual è lo stato più piccolo del mondo?",
        risposte: ["Monaco", "Città del Vaticano"],
        giusta: 0,
    },
    {
        testo: "Ande o Alpi, quale catena montuosa si trova in Sud America?",
        risposte: ["Ande", "Alpi"],
        giusta: 1,
    },
    {
        testo: "Lisbona o Madrid, qual è la capitale del Portogallo?",
        risposte: ["Madrid", "Lisbona"],
        giusta: 0,
    },
    {
        testo: "Germania o Austria, in quale stato si trova la regione della Baviera?",
        risposte: ["Germania", "Austria"],
        giusta: 1,
    },
    {
        testo: "Indonesia o Svizzera, quale nazione è formata da un arcipelago di migliaia di isole?",
        risposte: ["Svizzera", "Indonesia"],
        giusta: 0,
    },
    {
        testo: "Mosca o Kiev, qual è la capitale della Russia?",
        risposte: ["Mosca", "Kiev"],
        giusta: 1,
    },
    {
        testo: "Parigi o Lione, in quale città si trova la Torre Eiffel?",
        risposte: ["Lione", "Parigi"],
        giusta: 0,
    },
    {
        testo: "Atlantico o Pacifico, quale oceano bagna le coste del Brasile?",
        risposte: ["Atlantico", "Pacifico"],
        giusta: 1,
    },
    {
        testo: "Ankara o Istanbul, qual è la capitale della Turchia?",
        risposte: ["Istanbul", "Ankara"],
        giusta: 0,
    },
    {
        testo: "Egitto o Sudafrica, quale stato è attraversato per la maggior parte dal fiume Nilo?",
        risposte: ["Egitto", "Sudafrica"],
        giusta: 1,
    },
    {
        testo: "Australia o Canada, in quale nazione si trova la città di Sydney?",
        risposte: ["Canada", "Australia"],
        giusta: 0,
    },
    {
        testo: "Stoccolma o Oslo, qual è la capitale della Svezia?",
        risposte: ["Stoccolma", "Oslo"],
        giusta: 1,
    },
    {
        testo: "Mediterraneo o Mar Rosso, quale mare separa il continente europeo da quello africano?",
        risposte: ["Mar Rosso", "Mediterraneo"],
        giusta: 0,
    },
    {
        testo: "Romania o Ungheria, in quale nazione si trova la regione della Transilvania?",
        risposte: ["Romania", "Ungheria"],
        giusta: 1,
    },
    {
        testo: "Dublino o Belfast, qual è la capitale dell'Irlanda?",
        risposte: ["Belfast", "Dublino"],
        giusta: 0,
    },
    {
        testo: "Vittorio Emanuele II o Umberto I, chi fu il primo Re d'Italia?",
        risposte: ["Vittorio Emanuele II", "Umberto I"],
        giusta: 1,
    },
    {
        testo: "1789 o 1799, in che anno ebbe inizio la Rivoluzione Francese?",
        risposte: ["1799", "1789"],
        giusta: 0,
    },
    {
        testo: "Romani o Greci, quale grande civiltà del passato costruì il Colosseo?",
        risposte: ["Romani", "Greci"],
        giusta: 1,
    },
    {
        testo: "Stalin o Lenin, chi guidava l'Unione Sovietica durante la Seconda Guerra Mondiale?",
        risposte: ["Lenin", "Stalin"],
        giusta: 0,
    },
    {
        testo: "1989 o 1991, in quale anno è finalmente caduto il Muro di Berlino?",
        risposte: ["1989", "1991"],
        giusta: 1,
    },
    {
        testo: "Cristoforo Colombo o Amerigo Vespucci, chi scoprì l'America nel 1492?",
        risposte: ["Amerigo Vespucci", "Cristoforo Colombo"],
        giusta: 0,
    },
    {
        testo: "Pompei o Ercolano, quale città fu rasa al suolo dall'eruzione del Vesuvio nel 79 d.C.?",
        risposte: ["Pompei", "Ercolano"],
        giusta: 1,
    },
    {
        testo: "Giuseppe Garibaldi o Giuseppe Mazzini, chi fu soprannominato l'Eroe dei Due Mondi?",
        risposte: ["Giuseppe Mazzini", "Giuseppe Garibaldi"],
        giusta: 0,
    },
    {
        testo: "XVIII o XV, in quale secolo ha preso il via la Rivoluzione Industriale?",
        risposte: ["XVIII", "XV"],
        giusta: 1,
    },
    {
        testo: "Cleopatra o Nefertiti, chi era la regina d'Egitto celebre per la sua leggendaria bellezza?",
        risposte: ["Nefertiti", "Cleopatra"],
        giusta: 0,
    },
    {
        testo: "1945 o 1918, in che anno si concluse ufficialmente la Seconda Guerra Mondiale?",
        risposte: ["1945", "1918"],
        giusta: 1,
    },
    {
        testo: "Torino o Roma, quale città fu la primissima capitale del Regno d'Italia?",
        risposte: ["Roma", "Torino"],
        giusta: 0,
    },
    {
        testo: "Karl Marx o Adam Smith, chi è l'autore del Manifesto del Partito Comunista?",
        risposte: ["Karl Marx", "Adam Smith"],
        giusta: 1,
    },
    {
        testo: "1969 o 1959, in quale anno l'umanità ha assistito allo sbarco sulla Luna?",
        risposte: ["1959", "1969"],
        giusta: 0,
    },
    {
        testo: "Abraham Lincoln o George Washington, chi era il presidente degli Stati Uniti durante la Guerra di Secessione?",
        risposte: ["Abraham Lincoln", "George Washington"],
        giusta: 1,
    },
    {
        testo: "Teodosio o Costantino, quale imperatore romano elevò il Cristianesimo a religione ufficiale?",
        risposte: ["Costantino", "Teodosio"],
        giusta: 0,
    },
    {
        testo: "Duca di Wellington o Napoleone, chi uscì trionfante dalla battaglia di Waterloo?",
        risposte: ["Duca di Wellington", "Napoleone"],
        giusta: 1,
    },
    {
        testo: "1914 o 1915, in quale anno scoppiò la scintilla della Prima Guerra Mondiale?",
        risposte: ["1915", "1914"],
        giusta: 0,
    },
    {
        testo: "Nicola II o Alessandro III, chi fu l'ultimissimo Zar della Russia?",
        risposte: ["Nicola II", "Alessandro III"],
        giusta: 1,
    },
    {
        testo: "Sumeri o Egizi, quale civiltà mesopotamica inventò la scrittura cuneiforme?",
        risposte: ["Egizi", "Sumeri"],
        giusta: 0,
    },
    {
        testo: "Adolf Hitler o Benito Mussolini, chi fu il leader indiscusso della Germania nazista?",
        risposte: ["Adolf Hitler", "Benito Mussolini"],
        giusta: 1,
    },
    {
        testo: "1947 o 1945, in che anno venne firmata la Costituzione della Repubblica Italiana?",
        risposte: ["1945", "1947"],
        giusta: 0,
    },
    {
        testo: "Annibale o Scipione, chi era il generale cartaginese che sfidò Roma con gli elefanti?",
        risposte: ["Annibale", "Scipione"],
        giusta: 1,
    },
    {
        testo: "Caduta dell'Impero Romano d'Occidente o di Costantinopoli, quale evento segna convenzionalmente l'inizio del Medioevo?",
        risposte: [
            "Caduta di Costantinopoli",
            "Caduta Impero Romano d'Occidente",
        ],
        giusta: 0,
    },
    {
        testo: "Marie Curie o Madre Teresa, chi è stata la prima donna della storia a vincere un premio Nobel?",
        risposte: ["Marie Curie", "Madre Teresa"],
        giusta: 1,
    },
    {
        testo: "1912 o 1905, in che anno è tragicamente affondato il Titanic?",
        risposte: ["1905", "1912"],
        giusta: 0,
    },
    {
        testo: "Galeazzo Ciano o Italo Balbo, chi era considerato il genero e braccio destro di Mussolini?",
        risposte: ["Galeazzo Ciano", "Italo Balbo"],
        giusta: 1,
    },
    {
        testo: "Borbone o Valois, quale dinastia regnava in Francia prima della tempesta della Rivoluzione?",
        risposte: ["Valois", "Borbone"],
        giusta: 0,
    },
    {
        testo: "Mahatma Gandhi o Jawaharlal Nehru, chi guidò la resistenza non violenta indiana contro i britannici?",
        risposte: ["Mahatma Gandhi", "Jawaharlal Nehru"],
        giusta: 1,
    },
    {
        testo: "Roma o Atene, in quale città fu brutalmente assassinato Giulio Cesare?",
        risposte: ["Atene", "Roma"],
        giusta: 0,
    },
    {
        testo: "1946 o 1948, in quale anno, dopo un referendum, l'Italia è diventata una Repubblica?",
        risposte: ["1946", "1948"],
        giusta: 1,
    },
    {
        testo: "Martin Lutero o Giovanni Calvino, chi affisse le 95 tesi dando inizio alla Riforma Protestante?",
        risposte: ["Giovanni Calvino", "Martin Lutero"],
        giusta: 0,
    },
    {
        testo: "Guerra Fredda o Guerra del Vietnam, come si chiama il lungo conflitto di nervi tra USA e URSS senza scontri diretti?",
        risposte: ["Guerra Fredda", "Guerra del Vietnam"],
        giusta: 1,
    },
    {
        testo: "Napoleone Bonaparte o Luigi XIV, chi si proclamò Imperatore dei Francesi nel 1804?",
        risposte: ["Luigi XIV", "Napoleone Bonaparte"],
        giusta: 0,
    },
    {
        testo: "Sant'Elena o Elba, in quale isola sperduta nell'Atlantico morì Napoleone?",
        risposte: ["Sant'Elena", "Elba"],
        giusta: 1,
    },
    {
        testo: "Inca o Aztechi, quale civiltà viveva nel Messico prima dell'arrivo dei conquistadores?",
        risposte: ["Inca", "Aztechi"],
        giusta: 0,
    },
    {
        testo: "Romolo o Enea, chi fu il leggendario fondatore e primo re di Roma?",
        risposte: ["Romolo", "Enea"],
        giusta: 1,
    },
    {
        testo: "1922 o 1899, in che anno fu scoperta la tomba intatta del faraone Tutankhamon?",
        risposte: ["1899", "1922"],
        giusta: 0,
    },
    {
        testo: "Garibaldi o Cavour, chi guidò l'eroica spedizione dei Mille in Sicilia?",
        risposte: ["Garibaldi", "Cavour"],
        giusta: 1,
    },
    {
        testo: "Costantinopoli o Atene, quale città fu il cuore dell'Impero Romano d'Oriente?",
        risposte: ["Atene", "Costantinopoli"],
        giusta: 0,
    },
    {
        testo: "Luigi XIV o Luigi XVI, chi era soprannominato il Re Sole?",
        risposte: ["Luigi XIV", "Luigi XVI"],
        giusta: 1,
    },
    {
        testo: "1955 o 1965, in quale anno iniziò ufficialmente la logorante guerra del Vietnam?",
        risposte: ["1965", "1955"],
        giusta: 0,
    },
    {
        testo: "Nelson Mandela o Desmond Tutu, chi divenne il primo presidente nero del Sudafrica dopo l'apartheid?",
        risposte: ["Nelson Mandela", "Desmond Tutu"],
        giusta: 1,
    },
    {
        testo: "Inca o Maya, quale impero dominava le vette e le valli dell'America del Sud?",
        risposte: ["Maya", "Inca"],
        giusta: 0,
    },
    {
        testo: "Aristotele o Socrate, quale grande filosofo fu il precettore di Alessandro Magno?",
        risposte: ["Aristotele", "Socrate"],
        giusta: 1,
    },
    {
        testo: "1455 o 1500, intorno a quale anno fu inventata la stampa a caratteri mobili da Gutenberg?",
        risposte: ["1500", "1455"],
        giusta: 0,
    },
    {
        testo: "Francisco Franco o Salazar, chi fu il dittatore che governò la Spagna fino al 1975?",
        risposte: ["Francisco Franco", "Salazar"],
        giusta: 1,
    },
    {
        testo: "Waterloo o Lipsia, quale battaglia segnò la fine definitiva del sogno napoleonico?",
        risposte: ["Lipsia", "Waterloo"],
        giusta: 0,
    },
    {
        testo: "Roosevelt o Truman, chi era il presidente degli Stati Uniti durante l'attacco a Pearl Harbor?",
        risposte: ["Roosevelt", "Truman"],
        giusta: 1,
    },
    {
        testo: "San Pietroburgo o Mosca, in quale città ebbe inizio la celebre Rivoluzione d'Ottobre?",
        risposte: ["Mosca", "San Pietroburgo"],
        giusta: 0,
    },
    {
        testo: "Ra o Osiride, chi era l'antico Dio del Sole per il popolo egizio?",
        risposte: ["Ra", "Osiride"],
        giusta: 1,
    },
    {
        testo: "1 milione di anni fa o 10.000 anni fa, in che epoca l'uomo ha approssimativamente scoperto il fuoco?",
        risposte: ["10.000 anni fa", "1 milione di anni fa"],
        giusta: 0,
    },
    {
        testo: "Dalai Lama o Panchen Lama, chi è la guida spirituale del Tibet costretta all'esilio?",
        risposte: ["Dalai Lama", "Panchen Lama"],
        giusta: 1,
    },
    {
        testo: "Corea o Germania, quale paese asiatico fu diviso in due dal 38° parallelo?",
        risposte: ["Germania", "Corea"],
        giusta: 0,
    },
    {
        testo: "Omero o Esiodo, a quale poeta greco è attribuita la stesura dell'Odissea?",
        risposte: ["Omero", "Esiodo"],
        giusta: 1,
    },
    {
        testo: "1992 o 1957, in che anno è nata ufficialmente l'Unione Europea con il Trattato di Maastricht?",
        risposte: ["1957", "1992"],
        giusta: 0,
    },
    {
        testo: "Marco Antonio o Pompeo, chi fu il grande sconfitto da Ottaviano nella battaglia di Azio?",
        risposte: ["Marco Antonio", "Pompeo"],
        giusta: 1,
    },
    {
        testo: "Greci o Fenici, quale antico popolo ha inventato il concetto di democrazia?",
        risposte: ["Fenici", "Greci"],
        giusta: 0,
    },
    {
        testo: "Martin Luther King o Malcolm X, chi pronunciò il discorso 'I have a dream' per i diritti civili?",
        risposte: ["Martin Luther King", "Malcolm X"],
        giusta: 1,
    },
    {
        testo: "2001 o 1999, in quale anno è avvenuto il terribile attentato alle Torri Gemelle?",
        risposte: ["1999", "2001"],
        giusta: 0,
    },
    {
        testo: "Marco Polo o Giovanni Caboto, chi è l'esploratore veneziano che raccontò il suo viaggio in Cina ne 'Il Milione'?",
        risposte: ["Marco Polo", "Giovanni Caboto"],
        giusta: 1,
    },
    {
        testo: "Khmer Rossi o Viet Cong, quale spietato regime governava la Cambogia guidato da Pol Pot?",
        risposte: ["Viet Cong", "Khmer Rossi"],
        giusta: 0,
    },
    {
        testo: "Winston Churchill o Neville Chamberlain, chi fu il carismatico Primo Ministro inglese durante la Seconda Guerra Mondiale?",
        risposte: ["Winston Churchill", "Neville Chamberlain"],
        giusta: 1,
    },
    {
        testo: "1945 o 1919, in che anno è stata ufficialmente fondata l'Organizzazione delle Nazioni Unite (ONU)?",
        risposte: ["1919", "1945"],
        giusta: 0,
    },
    {
        testo: "Achille o Ettore, chi è l'eroe greco semidivino protagonista dell'Iliade?",
        risposte: ["Achille", "Ettore"],
        giusta: 1,
    },
    {
        testo: "Muro di Berlino o Muro di Brandeburgo, come si chiamava la barriera che divideva in due la città di Berlino?",
        risposte: ["Muro di Brandeburgo", "Muro di Berlino"],
        giusta: 0,
    },
    {
        testo: "Alessandro Magno o Filippo II, chi fu il giovane re macedone che creò un impero immenso conquistando l'Asia?",
        risposte: ["Alessandro Magno", "Filippo II"],
        giusta: 1,
    },
    {
        testo: "1936 o 1939, in quale anno scoppiò la sanguinosa guerra civile spagnola?",
        risposte: ["1939", "1936"],
        giusta: 0,
    },
    {
        testo: "Giulio Cesare o Cicerone, chi è l'autore dell'opera storiografica 'De bello gallico'?",
        risposte: ["Giulio Cesare", "Cicerone"],
        giusta: 1,
    },
    {
        testo: "Harappa o Arii, quale fu una delle prime e più avanzate civiltà della valle dell'Indo?",
        risposte: ["Arii", "Harappa"],
        giusta: 0,
    },
    {
        testo: "Cheope o Chefren, quale faraone ordinò la costruzione della Grande Piramide di Giza?",
        risposte: ["Cheope", "Chefren"],
        giusta: 1,
    },
    {
        testo: "1915 o 1914, in che anno l'Italia è ufficialmente entrata nella Prima Guerra Mondiale?",
        risposte: ["1914", "1915"],
        giusta: 0,
    },
    {
        testo: "Che Guevara o Batista, chi fu il leggendario compagno d'armi di Fidel Castro nella rivoluzione cubana?",
        risposte: ["Che Guevara", "Batista"],
        giusta: 1,
    },
    {
        testo: "Pace di Vestfalia o Pace di Utrecht, quale trattato pose fine all'estenuante Guerra dei Trent'anni?",
        risposte: ["Pace di Utrecht", "Pace di Vestfalia"],
        giusta: 0,
    },
    {
        testo: "de Klerk o Botha, chi fu l'ultimo presidente del Sudafrica bianco a decidere la scarcerazione di Mandela?",
        risposte: ["de Klerk", "Botha"],
        giusta: 1,
    },
    {
        testo: "Leningrado o Stalingrado, in quale città russa si consumò l'assedio più lungo e atroce della Seconda Guerra Mondiale?",
        risposte: ["Stalingrado", "Leningrado"],
        giusta: 0,
    },
    {
        testo: "Osman I o Solimano, chi è considerato il califfo fondatore dell'Impero Ottomano?",
        risposte: ["Osman I", "Solimano"],
        giusta: 1,
    },
    {
        testo: "Urbano II o Innocenzo III, quale Papa lanciò l'appello per la prima delle Crociate?",
        risposte: ["Innocenzo III", "Urbano II"],
        giusta: 0,
    },
    {
        testo: "Gengis Khan o Attila, chi fu il temuto capo dei Mongoli che costruì uno degli imperi più vasti di sempre?",
        risposte: ["Gengis Khan", "Attila"],
        giusta: 1,
    },
    {
        testo: "1922 o 1924, in quale anno avvenne la marcia su Roma che segnò l'ascesa del fascismo?",
        risposte: ["1924", "1922"],
        giusta: 0,
    },
    {
        testo: "Marte o Giove, qual è il pianeta più grande del sistema solare?",
        risposte: ["Marte", "Giove"],
        giusta: 0,
    },
    {
        testo: "Claudio Baglioni o Gianni Morandi, chi ha cantato 'Questo piccolo grande amore'?",
        risposte: ["Gianni Morandi", "Claudio Baglioni"],
        giusta: 0,
    },
    {
        testo: "Dante Alighieri o Francesco Petrarca, chi è l'autore della 'Divina Commedia'?",
        risposte: ["Dante Alighieri", "Francesco Petrarca"],
        giusta: 1,
    },
    {
        testo: "100 gradi o 90 gradi, a quale temperatura bolle l'acqua a livello del mare?",
        risposte: ["90 gradi", "100 gradi"],
        giusta: 0,
    },
    {
        testo: "Leonardo DiCaprio o Brad Pitt, chi ha vinto l'Oscar per 'Revenant - Redivivo'?",
        risposte: ["Leonardo DiCaprio", "Brad Pitt"],
        giusta: 1,
    },
    {
        testo: "Omero o Virgilio, a chi è attribuita l'Eneide?",
        risposte: ["Virgilio", "Omero"],
        giusta: 1,
    },
    {
        testo: "Venezia o Firenze, in quale città si trova il Ponte dei Sospiri?",
        risposte: ["Venezia", "Firenze"],
        giusta: 1,
    },
    {
        testo: "Steven Spielberg o James Cameron, chi ha diretto il film 'Titanic'?",
        risposte: ["James Cameron", "Steven Spielberg"],
        giusta: 1,
    },
    {
        testo: "Idrogeno o Ossigeno, qual è l'elemento più abbondante nell'universo?",
        risposte: ["Idrogeno", "Ossigeno"],
        giusta: 1,
    },
    {
        testo: "Santi o Navigatori, come si conclude la frase 'L'Italia è un popolo di poeti, di artisti, di... '?",
        risposte: ["Navigatori", "Santi"],
        giusta: 1,
    },
    {
        testo: "Giotto o Botticelli, chi ha dipinto la 'Nascita di Venere'?",
        risposte: ["Giotto", "Botticelli"],
        giusta: 0,
    },
    {
        testo: "Pacifico o Atlantico, qual è l'oceano più vasto della Terra?",
        risposte: ["Atlantico", "Pacifico"],
        giusta: 0,
    },
    {
        testo: "Enzo Ferrari o Ferruccio Lamborghini, chi ha fondato la casa automobilistica del Cavallino Rampante?",
        risposte: ["Enzo Ferrari", "Ferruccio Lamborghini"],
        giusta: 1,
    },
    {
        testo: "Batman o Superman, chi vive nella città di Gotham?",
        risposte: ["Superman", "Batman"],
        giusta: 0,
    },
    {
        testo: "Pisa o Lucca, in quale città toscana si trova la celebre Torre Pendente?",
        risposte: ["Pisa", "Lucca"],
        giusta: 1,
    },
    {
        testo: "Sputnik o Apollo 11, come si chiamava la prima missione a portare l'uomo sulla Luna?",
        risposte: ["Apollo 11", "Sputnik"],
        giusta: 1,
    },
    {
        testo: "Mina o Rita Pavone, chi è soprannominata 'La Tigre di Cremona'?",
        risposte: ["Mina", "Rita Pavone"],
        giusta: 1,
    },
    {
        testo: "Eiffel o Gaudí, chi progettò la celebre torre di Parigi?",
        risposte: ["Gaudí", "Eiffel"],
        giusta: 0,
    },
    {
        testo: "Federico Fellini o Sergio Leone, chi ha diretto il film 'La dolce vita'?",
        risposte: ["Federico Fellini", "Sergio Leone"],
        giusta: 1,
    },
    {
        testo: "Omero o Esopo, a chi sono attribuite le favole con protagonisti gli animali?",
        risposte: ["Esopo", "Omero"],
        giusta: 1,
    },
    {
        testo: "Vino o Birra, quale bevanda si ottiene dalla fermentazione del luppolo?",
        risposte: ["Vino", "Birra"],
        giusta: 0,
    },
    {
        testo: "Giallo o Blu, mescolando il rosso e quale altro colore si ottiene il viola?",
        risposte: ["Blu", "Giallo"],
        giusta: 1,
    },
    {
        testo: "Topolino o Paperino, chi è il fidanzato di Minnie?",
        risposte: ["Topolino", "Paperino"],
        giusta: 1,
    },
    {
        testo: "Mar Rosso o Mar Morto, qual è il bacino d'acqua più salato del mondo?",
        risposte: ["Mar Morto", "Mar Rosso"],
        giusta: 1,
    },
    {
        testo: "Sherlock Holmes o Hercule Poirot, chi è il detective creato da Arthur Conan Doyle?",
        risposte: ["Sherlock Holmes", "Hercule Poirot"],
        giusta: 1,
    },
    {
        testo: "Australia o Groenlandia, qual è l'isola più grande del mondo?",
        risposte: ["Groenlandia", "Australia"],
        giusta: 1,
    },
    {
        testo: "Vivaldi o Verdi, chi ha composto 'Le quattro stagioni'?",
        risposte: ["Vivaldi", "Verdi"],
        giusta: 1,
    },
    {
        testo: "Albert Einstein o Isaac Newton, chi formulò la teoria della relatività?",
        risposte: ["Isaac Newton", "Albert Einstein"],
        giusta: 0,
    },
    {
        testo: "Giappone o Cina, in quale paese è nato il Karate?",
        risposte: ["Giappone", "Cina"],
        giusta: 1,
    },
    {
        testo: "Stanlio o Ollio, chi era il compagno magro di Oliver Hardy?",
        risposte: ["Ollio", "Stanlio"],
        giusta: 0,
    },
    {
        testo: "Tevere o Po, qual è il fiume più lungo d'Italia?",
        risposte: ["Tevere", "Po"],
        giusta: 0,
    },
    {
        testo: "Pavarotti o Bocelli, chi faceva parte dei 'Tre Tenori' insieme a Carreras e Domingo?",
        risposte: ["Bocelli", "Pavarotti"],
        giusta: 0,
    },
    {
        testo: "Pitagora o Euclide, a chi è attribuito il teorema sui triangoli rettangoli?",
        risposte: ["Pitagora", "Euclide"],
        giusta: 1,
    },
    {
        testo: "Africa o Asia, in quale continente si trova il deserto del Gobi?",
        risposte: ["Asia", "Africa"],
        giusta: 1,
    },
    {
        testo: "Quentin Tarantino o Martin Scorsese, chi ha diretto 'Pulp Fiction'?",
        risposte: ["Quentin Tarantino", "Martin Scorsese"],
        giusta: 1,
    },
    {
        testo: "Napoleone o Cesare, chi fu sconfitto a Waterloo?",
        risposte: ["Cesare", "Napoleone"],
        giusta: 0,
    },
    {
        testo: "Salgari o Collodi, chi ha scritto 'Le avventure di Pinocchio'?",
        risposte: ["Salgari", "Collodi"],
        giusta: 0,
    },
    {
        testo: "Fegato o Cuore, qual è l'organo che pompa il sangue nel corpo?",
        risposte: ["Cuore", "Fegato"],
        giusta: 1,
    },
    {
        testo: "Zucchero o Sale, qual è il termine comune per il cloruro di sodio?",
        risposte: ["Zucchero", "Sale"],
        giusta: 0,
    },
    {
        testo: "Marte o Venere, qual è il pianeta più vicino alla Terra?",
        risposte: ["Venere", "Marte"],
        giusta: 1,
    },
    {
        testo: "Beatles o Rolling Stones, chi ha cantato 'Yellow Submarine'?",
        risposte: ["Beatles", "Rolling Stones"],
        giusta: 1,
    },
    {
        testo: "Siena o Arezzo, in quale città si corre il Palio?",
        risposte: ["Arezzo", "Siena"],
        giusta: 0,
    },
    {
        testo: "Neil Armstrong o Buzz Aldrin, chi fu il primo uomo a toccare il suolo lunare?",
        risposte: ["Neil Armstrong", "Buzz Aldrin"],
        giusta: 1,
    },
    {
        testo: "Abebe Bikila o Usain Bolt, chi corse la maratona di Roma scalzo?",
        risposte: ["Usain Bolt", "Abebe Bikila"],
        giusta: 0,
    },
    {
        testo: "Giotto o Michelangelo, chi ha affrescato la volta della Cappella Sistina?",
        risposte: ["Giotto", "Michelangelo"],
        giusta: 0,
    },
    {
        testo: "6 o 7, quanti sono i colli di Roma?",
        risposte: ["7", "6"],
        giusta: 1,
    },
    {
        testo: "Egitto o Messico, dove si trovano le piramidi di Giza?",
        risposte: ["Egitto", "Messico"],
        giusta: 1,
    },
    {
        testo: "Mozart o Beethoven, chi compose la 'Sinfonia n. 9' che include l'Inno alla Gioia?",
        risposte: ["Beethoven", "Mozart"],
        giusta: 1,
    },
    {
        testo: "Cervino o Monte Bianco, qual è la cima più alta delle Alpi?",
        risposte: ["Cervino", "Monte Bianco"],
        giusta: 0,
    },
    {
        testo: "Marlon Brando o Al Pacino, chi interpreta Don Vito Corleone ne 'Il Padrino'?",
        risposte: ["Al Pacino", "Marlon Brando"],
        giusta: 0,
    },
    {
        testo: "Guglielmo Marconi o Alessandro Volta, chi ha inventato la pila elettrica?",
        risposte: ["Guglielmo Marconi", "Alessandro Volta"],
        giusta: 0,
    },
    {
        testo: "Berlino o Vienna, qual è la capitale dell'Austria?",
        risposte: ["Vienna", "Berlino"],
        giusta: 1,
    },
    {
        testo: "Stati Uniti o Russia, quale nazione ha venduto l'Alaska agli USA?",
        risposte: ["Stati Uniti", "Russia"],
        giusta: 0,
    },
    {
        testo: "Caravaggio o Raffaello, chi ha dipinto 'La scuola di Atene'?",
        risposte: ["Raffaello", "Caravaggio"],
        giusta: 1,
    },
    {
        testo: "Vaso o Tavolozza, come si chiama la tavoletta su cui i pittori mescolano i colori?",
        risposte: ["Vaso", "Tavolozza"],
        giusta: 0,
    },
    {
        testo: "Londra o Parigi, in quale città scorre la Senna?",
        risposte: ["Parigi", "Londra"],
        giusta: 1,
    },
    {
        testo: "Vespucci o Magellano, chi compì la prima circumnavigazione del globo?",
        risposte: ["Vespucci", "Magellano"],
        giusta: 0,
    },
    {
        testo: "Venerdì o Sabato, secondo la canzone di Leopardi, qual è 'il più gradito giorno della settimana'?",
        risposte: ["Sabato", "Venerdì"],
        giusta: 1,
    },
    {
        testo: "Harry Potter o Frodo Baggins, chi è il protagonista de 'Il Signore degli Anelli'?",
        risposte: ["Harry Potter", "Frodo Baggins"],
        giusta: 0,
    },
    {
        testo: "Garibaldi o Cavour, chi era chiamato il 'Tessitore' della politica risorgimentale?",
        risposte: ["Cavour", "Garibaldi"],
        giusta: 1,
    },
    {
        testo: "Cervello o Pelle, qual è l'organo più esteso del corpo umano?",
        risposte: ["Cervello", "Pelle"],
        giusta: 0,
    },
    {
        testo: "Odissea o Eneide, in quale poema troviamo il ciclope Polifemo?",
        risposte: ["Eneide", "Odissea"],
        giusta: 0,
    },
    {
        testo: "Euro o Lira, qual era la moneta ufficiale italiana prima del 2002?",
        risposte: ["Euro", "Lira"],
        giusta: 0,
    },
    {
        testo: "Marocco o Egitto, in quale stato si trova la città di Casablanca?",
        risposte: ["Egitto", "Marocco"],
        giusta: 0,
    },
    {
        testo: "Cheeseburger o Sushi, qual è il piatto tipico della cucina giapponese?",
        risposte: ["Cheeseburger", "Sushi"],
        giusta: 0,
    },
    {
        testo: "Cenerentola o Biancaneve, chi perde la scarpetta di cristallo?",
        risposte: ["Biancaneve", "Cenerentola"],
        giusta: 0,
    },
    {
        testo: "Tevere o Arno, quale fiume attraversa la città di Firenze?",
        risposte: ["Tevere", "Arno"],
        giusta: 0,
    },
    {
        testo: "Picasso o Van Gogh, chi ha dipinto 'Guernica'?",
        risposte: ["Van Gogh", "Picasso"],
        giusta: 0,
    },
    {
        testo: "Nilo o Rio delle Amazzoni, qual è il fiume più lungo del mondo?",
        risposte: ["Nilo", "Rio delle Amazzoni"],
        giusta: 1,
    },
    {
        testo: "Giotto o Cimabue, chi fu il maestro del giovane Giotto?",
        risposte: ["Cimabue", "Giotto"],
        giusta: 1,
    },
    {
        testo: "Cina o India, qual è il paese più popoloso al mondo (dal 2023)?",
        risposte: ["Cina", "India"],
        giusta: 0,
    },
    {
        testo: "Zolfo o Mercurio, qual è l'unico metallo liquido a temperatura ambiente?",
        risposte: ["Mercurio", "Zolfo"],
        giusta: 1,
    },
    {
        testo: "Marilyn Monroe o Audrey Hepburn, chi è la protagonista di 'Colazione da Tiffany'?",
        risposte: ["Marilyn Monroe", "Audrey Hepburn"],
        giusta: 0,
    },
    {
        testo: "7 o 8, quanti sono i nani di Biancaneve?",
        risposte: ["8", "7"],
        giusta: 0,
    },
    {
        testo: "Rossini o Puccini, chi ha composto l'opera 'Il barbiere di Siviglia'?",
        risposte: ["Rossini", "Puccini"],
        giusta: 1,
    },
    {
        testo: "Spagna o Portogallo, da quale nazione proviene il ballo Flamenco?",
        risposte: ["Portogallo", "Spagna"],
        giusta: 0,
    },
    {
        testo: "Omero o Dante, chi ha scritto l'Iliade?",
        risposte: ["Omero", "Dante"],
        giusta: 1,
    },
    {
        testo: "Ringo Starr o Paul McCartney, chi era il batterista dei Beatles?",
        risposte: ["Paul McCartney", "Ringo Starr"],
        giusta: 0,
    },
    {
        testo: "Svizzera o Austria, in quale stato si trova la città di Salisburgo?",
        risposte: ["Svizzera", "Austria"],
        giusta: 0,
    },
    {
        testo: "Platone o Aristotele, chi fu l'allievo di Socrate?",
        risposte: ["Aristotele", "Platone"],
        giusta: 0,
    },
    {
        testo: "Argentina o Francia, chi ha alzato al cielo la Coppa del Mondo in Qatar nel 2022?",
        risposte: ["Argentina", "Francia"],
        giusta: 1,
    },
    {
        testo: "Lionel Messi o Cristiano Ronaldo, quale funambolo del pallone ha collezionato più Palloni d'Oro?",
        risposte: ["Cristiano Ronaldo", "Lionel Messi"],
        giusta: 0,
    },
    {
        testo: "Real Madrid o PSG, in quale prestigioso club milita attualmente la stella Kylian Mbappé?",
        risposte: ["Real Madrid", "PSG"],
        giusta: 1,
    },
    {
        testo: "4 o 5, quanti sono i titoli mondiali vinti dalla nostra Nazionale Italiana?",
        risposte: ["5", "4"],
        giusta: 0,
    },
    {
        testo: "Silvio Piola o Francesco Totti, chi detiene il primato assoluto di gol nella storia della Serie A?",
        risposte: ["Silvio Piola", "Francesco Totti"],
        giusta: 1,
    },
    {
        testo: "Madrid o Barcellona, in quale città spagnola sorge il mitico tempio del calcio 'Santiago Bernabéu'?",
        risposte: ["Barcellona", "Madrid"],
        giusta: 0,
    },
    {
        testo: "Brasile o Germania, quale nazione può vantare in bacheca il maggior numero di Mondiali di calcio?",
        risposte: ["Brasile", "Germania"],
        giusta: 1,
    },
    {
        testo: "Pelé o Maradona, chi tra queste leggende è stato incoronato universalmente come 'O Rei'?",
        risposte: ["Maradona", "Pelé"],
        giusta: 0,
    },
    {
        testo: "Real Madrid o Borussia Dortmund, quale squadra ha trionfato nell'ultima Champions League 2023/24?",
        risposte: ["Real Madrid", "Borussia Dortmund"],
        giusta: 1,
    },
    {
        testo: "2021 o 2012, in che anno l'Italia ci ha fatto sognare vincendo l'ultimo Europeo?",
        risposte: ["2012", "2021"],
        giusta: 0,
    },
    {
        testo: "Gonzalo Higuaín o Ciro Immobile, chi detiene il record di 36 reti in una sola stagione di Serie A?",
        risposte: ["Gonzalo Higuaín", "Ciro Immobile"],
        giusta: 1,
    },
    {
        testo: "José Mourinho o Pep Guardiola, quale carismatico allenatore è noto a tutti come lo 'Special One'?",
        risposte: ["Pep Guardiola", "José Mourinho"],
        giusta: 0,
    },
    {
        testo: "45 o 90, quanti minuti effettivi dura un singolo tempo regolamentare di una partita di calcio?",
        risposte: ["45", "90"],
        giusta: 1,
    },
    {
        testo: "Oranje o Bleus, con quale vivace soprannome è conosciuta la nazionale di calcio olandese?",
        risposte: ["Bleus", "Oranje"],
        giusta: 0,
    },
    {
        testo: "Fabio Grosso o Alessandro Del Piero, chi ha trasformato il rigore decisivo nella finale Mondiale del 2006?",
        risposte: ["Fabio Grosso", "Alessandro Del Piero"],
        giusta: 1,
    },
    {
        testo: "Borussia Dortmund o Salisburgo, in quale squadra europea è esploso fragorosamente il talento di Erling Haaland?",
        risposte: ["Salisburgo", "Borussia Dortmund"],
        giusta: 0,
    },
    {
        testo: "Juventus o Inter, quale compagine italiana ha cucito sul petto il maggior numero di scudetti?",
        risposte: ["Juventus", "Inter"],
        giusta: 1,
    },
    {
        testo: "Grecia o Portogallo, quale nazionale ha compiuto l'impresa impossibile vincendo l'Europeo 2004?",
        risposte: ["Portogallo", "Grecia"],
        giusta: 0,
    },
    {
        testo: "Diego Maradona o Lionel Messi, quale fuoriclasse argentino è passato alla storia per la 'Mano de Dios'?",
        risposte: ["Diego Maradona", "Lionel Messi"],
        giusta: 1,
    },
    {
        testo: "Liverpool o Manchester, in quale città inglese batte il cuore dei tifosi del Liverpool FC?",
        risposte: ["Manchester", "Liverpool"],
        giusta: 0,
    },
    {
        testo: "11 o 12, quanti valorosi atleti per squadra scendono in campo contemporaneamente durante una partita?",
        risposte: ["11", "12"],
        giusta: 1,
    },
    {
        testo: "Inter o Milan, quale squadra ha centrato lo storico 'Triplete' italiano nell'anno di grazia 2010?",
        risposte: ["Milan", "Inter"],
        giusta: 0,
    },
    {
        testo: "Luciano Spalletti o Roberto Mancini, chi siede attualmente sulla panchina della Nazionale Italiana?",
        risposte: ["Luciano Spalletti", "Roberto Mancini"],
        giusta: 1,
    },
    {
        testo: "Camp Nou o Wanda Metropolitano, qual è la storica dimora dove gioca i suoi match il Barcellona?",
        risposte: ["Wanda Metropolitano", "Camp Nou"],
        giusta: 0,
    },
    {
        testo: "Walter Zenga o Gianluigi Buffon, quale saracinesca tra i pali è stata soprannominata 'Spider-Man'?",
        risposte: ["Walter Zenga", "Gianluigi Buffon"],
        giusta: 1,
    },
    {
        testo: "Gianluigi Buffon o Paolo Maldini, chi ha collezionato il maggior numero di presenze in Serie A?",
        risposte: ["Paolo Maldini", "Gianluigi Buffon"],
        giusta: 0,
    },
    {
        testo: "Manchester United o Manchester City, quale delle due squadre di Manchester gioca nel 'Teatro dei Sogni' di Old Trafford?",
        risposte: ["Manchester United", "Manchester City"],
        giusta: 1,
    },
    {
        testo: "1930 o 1950, in quale anno si è disputata in Uruguay la prima storica edizione del Mondiale?",
        risposte: ["1950", "1930"],
        giusta: 0,
    },
    {
        testo: "Erling Haaland o Harry Kane, chi si è aggiudicato la prestigiosa Scarpa d'Oro nel 2023?",
        risposte: ["Erling Haaland", "Harry Kane"],
        giusta: 1,
    },
    {
        testo: "Monaco di Baviera o Londra, quale città è stata designata per ospitare l'attesissima finale di Champions 2025?",
        risposte: ["Londra", "Monaco di Baviera"],
        giusta: 0,
    },
    {
        testo: "5 o 3, quante sostituzioni può effettuare oggi un allenatore durante i 90 minuti regolamentari?",
        risposte: ["5", "3"],
        giusta: 1,
    },
    {
        testo: "Borussia Dortmund o Bayern Monaco, quale club tedesco vanta la tifoseria più calda del mondo nel 'Muro Giallo'?",
        risposte: ["Bayern Monaco", "Borussia Dortmund"],
        giusta: 0,
    },
    {
        testo: "Cristiano Ronaldo o Raúl, chi guida la classifica dei marcatori di tutti i tempi del Real Madrid?",
        risposte: ["Cristiano Ronaldo", "Raúl"],
        giusta: 1,
    },
    {
        testo: "Sudafrica o Brasile, in quale nazione si sono svolti i coloratissimi Mondiali del 2010?",
        risposte: ["Brasile", "Sudafrica"],
        giusta: 0,
    },
    {
        testo: "Roberto Baggio o Fabio Cannavaro, quale indimenticabile campione italiano ha vinto il Pallone d'Oro nel 1993?",
        risposte: ["Roberto Baggio", "Fabio Cannavaro"],
        giusta: 1,
    },
    {
        testo: "Portiere o Difensore, quale ruolo ricopre sul terreno di gioco il veterano Manuel Neuer?",
        risposte: ["Difensore", "Portiere"],
        giusta: 0,
    },
    {
        testo: "Real Madrid o Milan, quale corazzata europea ha vinto più volte la Champions League?",
        risposte: ["Real Madrid", "Milan"],
        giusta: 1,
    },
    {
        testo: "Pep Guardiola o Carlo Ancelotti, chi guida magistralmente il Manchester City dalla panchina?",
        risposte: ["Carlo Ancelotti", "Pep Guardiola"],
        giusta: 0,
    },
    {
        testo: "2018 o 2014, in che anno l'Italia ha subito lo shock della mancata qualificazione mondiale dopo decenni?",
        risposte: ["2018", "2014"],
        giusta: 1,
    },
    {
        testo: "Francia o Brasile, quale nazionale ha trionfato nel Mondiale casalingo del 1998?",
        risposte: ["Brasile", "Francia"],
        giusta: 0,
    },
    {
        testo: "Marco van Basten o Ruud Gullit, chi era il leggendario fuoriclasse soprannominato 'Il Cigno di Utrecht'?",
        risposte: ["Marco van Basten", "Ruud Gullit"],
        giusta: 1,
    },
    {
        testo: "Real Madrid o Chelsea, in quale squadra incanta i tifosi il giovane Vinícius Júnior?",
        risposte: ["Chelsea", "Real Madrid"],
        giusta: 0,
    },
    {
        testo: "Miroslav Klose o Ronaldo il Fenomeno, chi detiene lo scettro di miglior marcatore assoluto nella fase finale dei Mondiali?",
        risposte: ["Miroslav Klose", "Ronaldo il Fenomeno"],
        giusta: 1,
    },
    {
        testo: "Torino o Milano, in quale città piemontese batte il cuore della Vecchia Signora, la Juventus?",
        risposte: ["Milano", "Torino"],
        giusta: 0,
    },
    {
        testo: "Inter o Milan, quale delle due milanesi ha conquistato lo scudetto della seconda stella nel 2023/24?",
        risposte: ["Inter", "Milan"],
        giusta: 1,
    },
    {
        testo: "Gianni Infantino o Sepp Blatter, chi è l'attuale presidente al comando della FIFA?",
        risposte: ["Sepp Blatter", "Gianni Infantino"],
        giusta: 0,
    },
    {
        testo: "Spagna o Portogallo, quale nazionale europea è orgogliosamente chiamata 'La Roja'?",
        risposte: ["Spagna", "Portogallo"],
        giusta: 1,
    },
    {
        testo: "7 o 5, quante sono le Champions League che splendono nella bacheca del Milan?",
        risposte: ["5", "7"],
        giusta: 0,
    },
    {
        testo: "Aitana Bonmatí o Alexia Putellas, chi è l'ultima regina del calcio mondiale ad aver vinto il Pallone d'Oro femminile?",
        risposte: ["Aitana Bonmatí", "Alexia Putellas"],
        giusta: 1,
    },
    {
        testo: "2026 o 2028, in che anno tornerà la febbre mondiale con la prossima edizione itinerante?",
        risposte: ["2028", "2026"],
        giusta: 0,
    },
    {
        testo: "Pirlo o Mariandl, quale genio del centrocampo ha reso iconico il tiro a 'foglia morta' nei tempi moderni?",
        risposte: ["Pirlo", "Mariandl"],
        giusta: 1,
    },
    {
        testo: "Lionel Messi o Angel Di Maria, chi è stato l'indiscusso condottiero e capitano dell'Argentina in Qatar?",
        risposte: ["Angel Di Maria", "Lionel Messi"],
        giusta: 0,
    },
    {
        testo: "Monaco di Baviera o Berlino, in quale metropoli tedesca ha la sua casa il plurititolato Bayern Monaco?",
        risposte: ["Monaco di Baviera", "Berlino"],
        giusta: 1,
    },
    {
        testo: "Pierluigi Collina o Nicola Rizzoli, quale iconico fischietto italiano ha diretto la finale Mondiale del 2002?",
        risposte: ["Nicola Rizzoli", "Pierluigi Collina"],
        giusta: 0,
    },
    {
        testo: "2 o 4, quanti tempi supplementari sono previsti in caso di parità nei match a eliminazione diretta?",
        risposte: ["2", "4"],
        giusta: 1,
    },
    {
        testo: "Arsenal o Chelsea, quale storica squadra di Londra è conosciuta nel mondo come 'The Gunners'?",
        risposte: ["Chelsea", "Arsenal"],
        giusta: 0,
    },
    {
        testo: "Stanley Matthews o Alfredo Di Stéfano, chi fu il primissimo calciatore della storia a ricevere il Pallone d'Oro?",
        risposte: ["Stanley Matthews", "Alfredo Di Stéfano"],
        giusta: 1,
    },
    {
        testo: "2023 o 2022, in quale anno magico il Napoli è tornato sul tetto d'Italia sotto la guida di Spalletti?",
        risposte: ["2022", "2023"],
        giusta: 0,
    },
    {
        testo: "Gigi Riva o Giuseppe Meazza, chi detiene ancora oggi il record di gol segnati con la maglia azzurra?",
        risposte: ["Gigi Riva", "Giuseppe Meazza"],
        giusta: 1,
    },
    {
        testo: "PSG o Marsiglia, quale club francese infiamma gli spalti dello stadio 'Parco dei Principi'?",
        risposte: ["Marsiglia", "PSG"],
        giusta: 0,
    },
    {
        testo: "Cristiano Ronaldo o Ronaldo il Fenomeno, a quale dei due campioni appartiene il marchio 'CR7'?",
        risposte: ["Cristiano Ronaldo", "Ronaldo il Fenomeno"],
        giusta: 1,
    },
    {
        testo: "USA, Canada e Messico o Marocco, dove si disputerà nel 2026 il primo mondiale a 48 squadre?",
        risposte: ["Marocco", "USA, Canada e Messico"],
        giusta: 0,
    },
    {
        testo: "Real Madrid o Reims, quale squadra ha alzato al cielo la prima storica Coppa dei Campioni nel 1956?",
        risposte: ["Real Madrid", "Reims"],
        giusta: 1,
    },
    {
        testo: "Carlo Ancelotti o Zinedine Zidane, quale tecnico detiene il record assoluto di Champions League vinte in panchina?",
        risposte: ["Zinedine Zidane", "Carlo Ancelotti"],
        giusta: 0,
    },
    {
        testo: "Difensore o Centrocampista, in quale reparto del campo ha dominato per anni l'immenso Franco Baresi?",
        risposte: ["Difensore", "Centrocampista"],
        giusta: 1,
    },
    {
        testo: "Genova o Torino, in quale città portuale si disputa l'accesissimo 'Derby della Lanterna'?",
        risposte: ["Torino", "Genova"],
        giusta: 0,
    },
    {
        testo: "Germania o Argentina, quale corazzata ha trionfato nel Mondiale brasiliano del 2014?",
        risposte: ["Germania", "Argentina"],
        giusta: 1,
    },
    {
        testo: "Roberto Baggio o Alessandro Del Piero, quale campione italiano è amato in tutto il mondo come 'Il Divin Codino'?",
        risposte: ["Alessandro Del Piero", "Roberto Baggio"],
        giusta: 0,
    },
    {
        testo: "5 di fila o 3 di fila, quanti scudetti consecutivi ha vinto il leggendario Grande Torino prima della tragedia di Superga?",
        risposte: ["5 di fila", "3 di fila"],
        giusta: 1,
    },
    {
        testo: "Real Madrid o Dortmund, in quale squadra sta attualmente brillando il talento inglese Jude Bellingham?",
        risposte: ["Dortmund", "Real Madrid"],
        giusta: 0,
    },
    {
        testo: "Giacomo Agostini o Valentino Rossi, chi ha collezionato più allori mondiali nella storia del motociclismo?",
        risposte: ["Giacomo Agostini", "Valentino Rossi"],
        giusta: 1,
    },
    {
        testo: "Novak Djokovic o Rafael Nadal, chi guida la classifica dei tornei del Grande Slam vinti nel tennis maschile?",
        risposte: ["Rafael Nadal", "Novak Djokovic"],
        giusta: 0,
    },
    {
        testo: "6 o 5, quanti leggendari anelli NBA ha infilato al dito Michael Jordan?",
        risposte: ["6", "5"],
        giusta: 1,
    },
    {
        testo: "Usain Bolt o Marcell Jacobs, chi è l'uomo più veloce della terra, detentore del record sui 100 metri?",
        risposte: ["Marcell Jacobs", "Usain Bolt"],
        giusta: 0,
    },
    {
        testo: "Tennis o Sci, in quale nobile sport sta riscrivendo la storia il nostro Jannik Sinner?",
        risposte: ["Tennis", "Sci"],
        giusta: 1,
    },
    {
        testo: "Ferrari o Mercedes, quale scuderia di Formula 1 ha vinto il maggior numero di titoli costruttori?",
        risposte: ["Mercedes", "Ferrari"],
        giusta: 0,
    },
    {
        testo: "Hamilton e Schumacher o Verstappen, chi divide il trono dei piloti più titolati nella storia della F1?",
        risposte: ["Hamilton e Schumacher", "Verstappen"],
        giusta: 1,
    },
    {
        testo: "Giro d'Italia o Tour de France, qual è la corsa rosa, il simbolo del ciclismo nel nostro Paese?",
        risposte: ["Tour de France", "Giro d'Italia"],
        giusta: 0,
    },
    {
        testo: "5 o 6, quanti giganti del parquet compongono una squadra di basket durante l'azione?",
        risposte: ["5", "6"],
        giusta: 1,
    },
    {
        testo: "Golf o Tennis, in quale disciplina sportiva si cerca di fare un 'Birdie'?",
        risposte: ["Tennis", "Golf"],
        giusta: 0,
    },
    {
        testo: "Michael Phelps o Ian Thorpe, chi è il cannibale delle vasche con ben 23 ori olimpici al collo?",
        risposte: ["Michael Phelps", "Ian Thorpe"],
        giusta: 1,
    },
    {
        testo: "Parigi o Los Angeles, quale romantica città ha ospitato l'ultima edizione delle Olimpiadi nel 2024?",
        risposte: ["Los Angeles", "Parigi"],
        giusta: 0,
    },
    {
        testo: "Vela o Canottaggio, in quale affascinante sfida tra le onde si gareggia per l'America's Cup?",
        risposte: ["Vela", "Canottaggio"],
        giusta: 1,
    },
    {
        testo: "Max Verstappen o Lewis Hamilton, chi ha dominato l'asfalto laureandosi campione del mondo di F1 nel 2023?",
        risposte: ["Lewis Hamilton", "Max Verstappen"],
        giusta: 0,
    },
    {
        testo: "3 o 5, quanti set sono necessari per chiudere la pratica e vincere un match di pallavolo?",
        risposte: ["3", "5"],
        giusta: 1,
    },
    {
        testo: "9 o 6, quanto fa la radice quadrata di 81?",
        risposte: ["6", "9"],
        giusta: 0,
    },
    {
        testo: "Parallelo o Perpendicolare, come si definisce un angolo di 90 gradi?",
        risposte: ["Perpendicolare", "Parallelo"],
        giusta: 1,
    },
    {
        testo: "10 o 12, se un'ora ha 60 minuti, quanti minuti sono un quinto di ora?",
        risposte: ["10", "12"],
        giusta: 0,
    },
    {
        testo: "3,14 o 2,71, qual è il valore approssimato del celeberrimo Pi Greco?",
        risposte: ["3,14", "2,71"],
        giusta: 1,
    },
    {
        testo: "Ipotenusa o Cateto, come si chiama il lato più lungo di un triangolo rettangolo?",
        risposte: ["Cateto", "Ipotenusa"],
        giusta: 0,
    },
    {
        testo: "25 o 20, quanto fa il 25% di 100?",
        risposte: ["25", "20"],
        giusta: 1,
    },
    {
        testo: "Isoscele o Scaleno, come si chiama un triangolo che ha due lati perfettamente uguali?",
        risposte: ["Scaleno", "Isoscele"],
        giusta: 0,
    },
    {
        testo: "1 o 0, qual è l'elemento neutro della moltiplicazione?",
        risposte: ["1", "0"],
        giusta: 1,
    },
    {
        testo: "64 o 48, quanto fa 8 elevato alla seconda potenza?",
        risposte: ["48", "64"],
        giusta: 0,
    },
    {
        testo: "Ottagono o Esagono, come chiameresti un poligono che vanta ben otto lati?",
        risposte: ["Ottagono", "Esagono"],
        giusta: 1,
    },
    {
        testo: "15 o 13, qual è il numero primo che viene subito dopo l'11?",
        risposte: ["15", "13"],
        giusta: 0,
    },
    {
        testo: "Raggio o Diametro, come si chiama il segmento che unisce il centro del cerchio alla sua circonferenza?",
        risposte: ["Raggio", "Diametro"],
        giusta: 1,
    },
    {
        testo: "4 o 2, se x + 5 = 7, quanto vale la nostra misteriosa x?",
        risposte: ["4", "2"],
        giusta: 0,
    },
    {
        testo: "180 o 360, quanti gradi misura la somma degli angoli interni di un triangolo?",
        risposte: ["180", "360"],
        giusta: 1,
    },
    {
        testo: "Mille o Cento, quanti millimetri servono per fare un metro tondo tondo?",
        risposte: ["Cento", "Mille"],
        giusta: 0,
    },
    {
        testo: "Pari o Dispari, il numero 0 è considerato dai matematici come...?",
        risposte: ["Pari", "Dispari"],
        giusta: 1,
    },
    {
        testo: "Esagono o Pentagono, quale figura geometrica ha 5 lati e 5 angoli?",
        risposte: ["Esagono", "Pentagono"],
        giusta: 0,
    },
    {
        testo: "50 o 45, quanto fa la metà di 90?",
        risposte: ["45", "50"],
        giusta: 1,
    },
    {
        testo: "Dividendo o Divisore, nella divisione 10 : 2, il numero 10 come lo chiamiamo?",
        risposte: ["Divisore", "Dividendo"],
        giusta: 0,
    },
    {
        testo: "121 o 110, quanto fa 11 moltiplicato per se stesso?",
        risposte: ["121", "110"],
        giusta: 1,
    },
    {
        testo: "Acutangolo o Ottusangolo, un angolo che misura 120 gradi è...?",
        risposte: ["Acutangolo", "Ottusangolo"],
        giusta: 0,
    },
    {
        testo: "Rombo o Trapezio, quale quadrilatero ha tutti i lati uguali ma non necessariamente gli angoli retti?",
        risposte: ["Rombo", "Trapezio"],
        giusta: 1,
    },
    {
        testo: "8 o 10, quanti vertici ha un cubo?",
        risposte: ["10", "8"],
        giusta: 0,
    },
    { testo: "7 o 9, quanto fa 49 diviso 7?", risposte: ["7", "9"], giusta: 1 },
    {
        testo: "Acuto o Retto, un angolo di 45 gradi è un angolo...?",
        risposte: ["Retto", "Acuto"],
        giusta: 0,
    },
    {
        testo: "2 o 1, qual è l'unico numero primo che è anche un numero pari?",
        risposte: ["2", "1"],
        giusta: 1,
    },
    {
        testo: "Perimetro o Area, come definiamo la misura del contorno di una figura piana?",
        risposte: ["Area", "Perimetro"],
        giusta: 0,
    },
    {
        testo: "1000 o 100, quanti centimetri cubi servono per riempire un litro?",
        risposte: ["1000", "100"],
        giusta: 1,
    },
    {
        testo: "Numeratore o Denominatore, in una frazione, come si chiama il numero che sta sopra la linea?",
        risposte: ["Denominatore", "Numeratore"],
        giusta: 0,
    },
    {
        testo: "60 o 90, se un angolo di un triangolo rettangolo misura 30 gradi, quanto misura l'altro angolo acuto?",
        risposte: ["60", "90"],
        giusta: 1,
    },
    {
        testo: "16 o 18, quanto fa 4 elevato al quadrato?",
        risposte: ["18", "16"],
        giusta: 0,
    },
    {
        testo: "Ettagono o Decagono, come si chiama il poligono con 10 lati?",
        risposte: ["Decagono", "Ettagono"],
        giusta: 1,
    },
    {
        testo: "1 o 0, quanto fa un numero (diverso da zero) elevato alla potenza zero?",
        risposte: ["0", "1"],
        giusta: 0,
    },
    {
        testo: "Cilindro o Sfera, quale solido geometrico non ha né vertici né spigoli ed è perfettamente rotondo?",
        risposte: ["Sfera", "Cilindro"],
        giusta: 1,
    },
    {
        testo: "5 o 6, se ho 30 caramelle e le divido tra 6 bambini, quante ne riceve ognuno?",
        risposte: ["6", "5"],
        giusta: 0,
    },
    {
        testo: "Scaleno o Equilatero, un triangolo con i lati tutti diversi tra loro è...?",
        risposte: ["Scaleno", "Equilatero"],
        giusta: 1,
    },
    {
        testo: "10 o 100, quanto fa 10 alla seconda?",
        risposte: ["10", "100"],
        giusta: 0,
    },
    {
        testo: "90 o 180, un angolo piatto quanti gradi misura?",
        risposte: ["180", "90"],
        giusta: 1,
    },
    {
        testo: "6 o 12, quanti sono gli spigoli di un cubo?",
        risposte: ["6", "12"],
        giusta: 0,
    },
    {
        testo: "MCD o mcm, come chiamiamo il più piccolo numero intero positivo multiplo di due o più numeri?",
        risposte: ["mcm", "MCD"],
        giusta: 1,
    },
    {
        testo: "30 o 35, se un libro costa 50 euro ed è scontato del 30%, quanto lo pago?",
        risposte: ["30", "35"],
        giusta: 0,
    },
    {
        testo: "Rombo o Quadrato, quale figura ha quattro lati uguali e quattro angoli retti?",
        risposte: ["Quadrato", "Rombo"],
        giusta: 1,
    },
    { testo: "72 o 81, quanto fa 9 per 9?", risposte: ["72", "81"], giusta: 0 },
    {
        testo: "Base per altezza o Base per altezza diviso due, qual è la formula per l'area del triangolo?",
        risposte: ["Base per altezza diviso due", "Base per altezza"],
        giusta: 1,
    },
    {
        testo: "14 o 16, qual è il doppio di 8?",
        risposte: ["14", "16"],
        giusta: 0,
    },
    {
        testo: "Equilatero o Isoscele, il triangolo che ha tutti i lati della stessa lunghezza è...?",
        risposte: ["Equilatero", "Isoscele"],
        giusta: 1,
    },
    {
        testo: "100 o 1000, quanto fa 10 alla terza?",
        risposte: ["100", "1000"],
        giusta: 0,
    },
    {
        testo: "Volume o Superficie, come si chiama lo spazio occupato da un corpo solido?",
        risposte: ["Volume", "Superficie"],
        giusta: 1,
    },
    { testo: "24 o 25, quanto fa 5 per 5?", risposte: ["24", "25"], giusta: 0 },
    {
        testo: "15 o 12, quanti sono i mesi in un anno?",
        risposte: ["12", "15"],
        giusta: 1,
    },
    {
        testo: "3 o 4, se una sedia ha 4 gambe, quante gambe hanno 8 sedie? No, scherzavo... se 3x = 12, quanto vale x?",
        risposte: ["3", "4"],
        giusta: 0,
    },
    {
        testo: "Circonferenza o Area, come si chiama il perimetro del cerchio?",
        risposte: ["Circonferenza", "Area"],
        giusta: 1,
    },
    {
        testo: "10 o 5, quanto fa la radice quadrata di 25?",
        risposte: ["10", "5"],
        giusta: 0,
    },
    {
        testo: "Trapezio o Parallelogramma, quale quadrilatero ha solo due lati paralleli?",
        risposte: ["Trapezio", "Parallelogramma"],
        giusta: 1,
    },
    { testo: "42 o 48, quanto fa 6 per 7?", risposte: ["48", "42"], giusta: 0 },
    {
        testo: "100 o 1000, quanti metri ci sono in un chilometro?",
        risposte: ["1000", "100"],
        giusta: 1,
    },
    {
        testo: "360 o 180, quanto misura la somma degli angoli interni di un quadrilatero?",
        risposte: ["180", "360"],
        giusta: 0,
    },
    { testo: "8 o 9, quanto fa 72 diviso 8?", risposte: ["9", "8"], giusta: 1 },
    {
        testo: "Proprietà Commutativa o Associativa, quella per cui 'cambiando l'ordine degli addendi il risultato non cambia' è la...?",
        risposte: ["Proprietà Associativa", "Proprietà Commutativa"],
        giusta: 0,
    },
    {
        testo: "5 o 4, quanti sono i lati di un rettangolo?",
        risposte: ["4", "5"],
        giusta: 1,
    },
    {
        testo: "25 o 20, completa la sequenza: 5, 10, 15...?",
        risposte: ["25", "20"],
        giusta: 0,
    },
    {
        testo: "Domani o Ieri, se oggi è martedì, che giorno era due giorni fa?",
        risposte: ["Domenica", "Ieri"],
        giusta: 1,
    },
    {
        testo: "Sorella o Zia, la figlia di tua madre che non sei tu, chi è?",
        risposte: ["Zia", "Sorella"],
        giusta: 0,
    },
    {
        testo: "12 o 24, quante ore ci sono in un giorno?",
        risposte: ["24", "12"],
        giusta: 1,
    },
    {
        testo: "6 o 8, se un ragno ha 8 zampe, quante zampe hanno 2 ragni? No... completa la serie: 2, 4, 6...?",
        risposte: ["6", "8"],
        giusta: 0,
    },
    {
        testo: "Bianco o Nero, se il corvo è nero e la neve è bianca, di che colore è il latte?",
        risposte: ["Bianco", "Nero"],
        giusta: 1,
    },
    {
        testo: "60 o 100, quanti secondi ci sono in un minuto?",
        risposte: ["100", "60"],
        giusta: 0,
    },
    {
        testo: "Nord o Sud, se vai dritto verso il Polo Nord e poi torni indietro, verso dove vai?",
        risposte: ["Sud", "Nord"],
        giusta: 1,
    },
    {
        testo: "3 o 4, quanti lati ha un triangolo?",
        risposte: ["4", "3"],
        giusta: 0,
    },
    {
        testo: "Gennaio o Dicembre, qual è il primo mese dell'anno?",
        risposte: ["Gennaio", "Dicembre"],
        giusta: 1,
    },
    {
        testo: "9 o 10, se hai 10 dita nelle mani, quante dita hanno 10 mani?",
        risposte: ["100", "50"],
        giusta: 0,
    },
    {
        testo: "Lunedì o Domenica, qual è l'ultimo giorno della settimana?",
        risposte: ["Domenica", "Lunedì"],
        giusta: 1,
    },
    {
        testo: "Pari o Dispari, il numero 13 è...?",
        risposte: ["Pari", "Dispari"],
        giusta: 0,
    },
    {
        testo: "Est o Ovest, dove sorge il sole?",
        risposte: ["Est", "Ovest"],
        giusta: 1,
    },
    {
        testo: "4 o 5, quanti sono i sensi dell'essere umano?",
        risposte: ["4", "5"],
        giusta: 0,
    },
    {
        testo: "Verde o Rosso, che colore ottieni mescolando giallo e blu?",
        risposte: ["Verde", "Rosso"],
        giusta: 1,
    },
    {
        testo: "12 o 13, quante sono le uova in una dozzina?",
        risposte: ["13", "12"],
        giusta: 0,
    },
    {
        testo: "Mille o Un milione, quanti anni ci sono in un millennio?",
        risposte: ["Mille", "Un milione"],
        giusta: 1,
    },
    {
        testo: "Acqua o Fuoco, cosa spegne un incendio?",
        risposte: ["Fuoco", "Acqua"],
        giusta: 0,
    },
    {
        testo: "1 o 2, quante ruote ha una bicicletta standard?",
        risposte: ["2", "1"],
        giusta: 1,
    },
    {
        testo: "Nonno o Zio, il padre di tuo padre chi è per te?",
        risposte: ["Zio", "Nonno"],
        giusta: 0,
    },
    {
        testo: "7 o 6, quanti sono i colori dell'arcobaleno?",
        risposte: ["7", "6"],
        giusta: 1,
    },
    {
        testo: "Autunno o Primavera, in quale stagione cadono le foglie?",
        risposte: ["Primavera", "Autunno"],
        giusta: 0,
    },
    {
        testo: "8 o 7, quanti giorni ci sono in una settimana?",
        risposte: ["7", "8"],
        giusta: 1,
    },
    {
        testo: "365 o 360, quanti giorni ci sono in un anno non bisestile?",
        risposte: ["360", "365"],
        giusta: 0,
    },
    {
        testo: "Tevere o Po, qual è il fiume che attraversa Roma?",
        risposte: ["Tevere", "Po"],
        giusta: 1,
    },
    {
        testo: "Marte o Venere, qual è il 'Pianeta Rosso'?",
        risposte: ["Venere", "Marte"],
        giusta: 0,
    },
    { testo: "10 o 20, quanto fa 2 x 5?", risposte: ["10", "20"], giusta: 1 },
    {
        testo: "Vero o Falso, tutti i quadrati sono rettangoli?",
        risposte: ["Falso", "Vero"],
        giusta: 0,
    },
    {
        testo: "4 o 6, quante facce ha un dado standard?",
        risposte: ["6", "4"],
        giusta: 1,
    },
    {
        testo: "Femore o Omero, qual è l'osso più lungo e resistente del corpo umano?",
        risposte: ["Omero", "Femore"],
        giusta: 0,
    },
    {
        testo: "Cuore o Fegato, qual è l'organo che pompa instancabilmente il sangue in tutto il corpo?",
        risposte: ["Cuore", "Fegato"],
        giusta: 1,
    },
    {
        testo: "37 o 40, qual è la temperatura corporea media considerata normale per un essere umano?",
        risposte: ["40", "37"],
        giusta: 0,
    },
    {
        testo: "A o 0, quale gruppo sanguigno è considerato il 'donatore universale'?",
        risposte: ["0", "A"],
        giusta: 1,
    },
    {
        testo: "Polmoni o Reni, quali organi si occupano di filtrare il sangue e produrre l'urina?",
        risposte: ["Polmoni", "Reni"],
        giusta: 0,
    },
    {
        testo: "Encefalo o Midollo osseo, dove risiede il centro di controllo di tutte le nostre funzioni vitali?",
        risposte: ["Encefalo", "Midollo osseo"],
        giusta: 1,
    },
    {
        testo: "Smalto o Avorio, come si chiama lo strato esterno, durissimo, che protegge i nostri denti?",
        risposte: ["Avorio", "Smalto"],
        giusta: 0,
    },
    {
        testo: "Globuli rossi o Globuli bianchi, quali cellule hanno il compito di difenderci dalle infezioni?",
        risposte: ["Globuli bianchi", "Globuli rossi"],
        giusta: 1,
    },
    {
        testo: "Insulina o Adrenalina, quale ormone regola i livelli di zucchero nel sangue?",
        risposte: ["Adrenalina", "Insulina"],
        giusta: 0,
    },
    {
        testo: "Pelle o Intestino, qual è l'organo più esteso in assoluto del corpo umano?",
        risposte: ["Pelle", "Intestino"],
        giusta: 1,
    },
    {
        testo: "206 o 300, quante ossa compongono lo scheletro di un uomo adulto?",
        risposte: ["300", "206"],
        giusta: 0,
    },
    {
        testo: "Pupilla o Iride, come si chiama la parte colorata dell'occhio umano?",
        risposte: ["Iride", "Pupilla"],
        giusta: 1,
    },
    {
        testo: "Epidermide o Derma, qual è lo strato più superficiale della nostra pelle?",
        risposte: ["Derma", "Epidermide"],
        giusta: 0,
    },
    {
        testo: "Stomaco o Esofago, in quale organo a forma di sacco avviene la prima fase della digestione?",
        risposte: ["Stomaco", "Esofago"],
        giusta: 1,
    },
    {
        testo: "C o D, quale vitamina produciamo naturalmente grazie all'esposizione ai raggi solari?",
        risposte: ["C", "D"],
        giusta: 0,
    },
    {
        testo: "Bicipite o Tricipite, quale muscolo del braccio usiamo principalmente per piegarlo?",
        risposte: ["Bicipite", "Tricipite"],
        giusta: 1,
    },
    {
        testo: "Calcio o Potassio, quale minerale è fondamentale per la salute e la robustezza delle nostre ossa?",
        risposte: ["Potassio", "Calcio"],
        giusta: 0,
    },
    {
        testo: "Diaframma o Intercostale, qual è il muscolo principale che permette la respirazione?",
        risposte: ["Diaframma", "Intercostale"],
        giusta: 1,
    },
    {
        testo: "Cervelletto o Ipotalamo, quale parte del cervello coordina l'equilibrio e i movimenti?",
        risposte: ["Ipotalamo", "Cervelletto"],
        giusta: 0,
    },
    {
        testo: "Emoglobina o Plasma, come si chiama la proteina che trasporta l'ossigeno nei globuli rossi?",
        risposte: ["Emoglobina", "Plasma"],
        giusta: 1,
    },
    {
        testo: "Stiramento o Frattura, come definiamo l'eccessivo allungamento di un muscolo senza rottura dell'osso?",
        risposte: ["Frattura", "Stiramento"],
        giusta: 0,
    },
    {
        testo: "Papille gustative o Recettori olfattivi, grazie a cosa riusciamo a distinguere il dolce dall'amaro?",
        risposte: ["Papille gustative", "Recettori olfattivi"],
        giusta: 1,
    },
    {
        testo: "Colesterolo o Trigliceridi, quale sostanza grassa, se troppo alta, può ostruire le nostre arterie?",
        risposte: ["Trigliceridi", "Colesterolo"],
        giusta: 0,
    },
    {
        testo: "Aorta o Vena Cava, qual è l'arteria più grande che esce dal cuore?",
        risposte: ["Aorta", "Vena Cava"],
        giusta: 1,
    },
    {
        testo: "Cataratta o Miopia, come si chiama il difetto visivo che impedisce di vedere bene da lontano?",
        risposte: ["Cataratta", "Miopia"],
        giusta: 0,
    },
    {
        testo: "Melatonina o Serotonina, quale ormone regola il nostro ritmo sonno-veglia?",
        risposte: ["Melatonina", "Serotonina"],
        giusta: 1,
    },
    {
        testo: "Costole o Vertebre, quali ossa proteggono i polmoni e il cuore nella gabbia toracica?",
        risposte: ["Vertebre", "Costole"],
        giusta: 0,
    },
    {
        testo: "Tendini o Legamenti, cosa unisce i muscoli alle ossa?",
        risposte: ["Tendini", "Legamenti"],
        giusta: 1,
    },
    {
        testo: "Carotidi o Giugulari, quali arterie portano il sangue ossigenato al cervello?",
        risposte: ["Giugulari", "Carotidi"],
        giusta: 0,
    },
    {
        testo: "Sistolica o Diastolica, come viene chiamata comunemente la pressione 'massima'?",
        risposte: ["Sistolica", "Diastolica"],
        giusta: 1,
    },
    {
        testo: "Sinapsi o Assone, come si chiama il punto di contatto e comunicazione tra due neuroni?",
        risposte: ["Assone", "Sinapsi"],
        giusta: 0,
    },
    {
        testo: "Fegato o Pancreas, qual è l'organo che produce la bile per digerire i grassi?",
        risposte: ["Fegato", "Pancreas"],
        giusta: 1,
    },
    {
        testo: "Tibia o Perone, qual è l'osso più grande della gamba situato sotto il ginocchio?",
        risposte: ["Perone", "Tibia"],
        giusta: 0,
    },
    {
        testo: "Orecchio medio o Orecchio interno, dove si trova l'organo dell'equilibrio?",
        risposte: ["Orecchio interno", "Orecchio medio"],
        giusta: 1,
    },
    {
        testo: "Carboidrati o Proteine, quali nutrienti sono considerati i mattoni per la costruzione dei muscoli?",
        risposte: ["Carboidrati", "Proteine"],
        giusta: 0,
    },
    {
        testo: "Bronchi o Alveoli, in quale parte dei polmoni avviene lo scambio gassoso vero e proprio?",
        risposte: ["Alveoli", "Bronchi"],
        giusta: 1,
    },
    {
        testo: "Ipofisi o Tiroide, quale ghiandola a forma di farfalla nel collo regola il metabolismo?",
        risposte: ["Ipofisi", "Tiroide"],
        giusta: 0,
    },
    {
        testo: "Midollo spinale o Nervo sciatico, cosa scorre all'interno della colonna vertebrale?",
        risposte: ["Midollo spinale", "Nervo sciatico"],
        giusta: 1,
    },
    {
        testo: "Incisivi o Molari, quali denti usiamo principalmente per triturare il cibo?",
        risposte: ["Incisivi", "Molari"],
        giusta: 0,
    },
    {
        testo: "Antibiotici o Antivirali, quali farmaci si usano esclusivamente per combattere i batteri?",
        risposte: ["Antibiotici", "Antivirali"],
        giusta: 1,
    },
    {
        testo: "Sclera o Cornea, come si chiama la parte bianca dell'occhio?",
        risposte: ["Cornea", "Sclera"],
        giusta: 0,
    },
    {
        testo: "Colon o Duodeno, qual è la parte finale dell'intestino crasso?",
        risposte: ["Colon", "Duodeno"],
        giusta: 1,
    },
    {
        testo: "Piastrine o Linfociti, quali elementi del sangue servono per la coagulazione in caso di ferite?",
        risposte: ["Linfociti", "Piastrine"],
        giusta: 0,
    },
    {
        testo: "Anatomia o Fisiologia, quale scienza studia la struttura e la forma degli organi?",
        risposte: ["Anatomia", "Fisiologia"],
        giusta: 1,
    },
    {
        testo: "Sodio o Magnesio, quale minerale è il componente principale del comune sale da cucina?",
        risposte: ["Magnesio", "Sodio"],
        giusta: 0,
    },
    {
        testo: "Bile o Succo gastrico, cosa produce lo stomaco per sciogliere il cibo?",
        risposte: ["Succo gastrico", "Bile"],
        giusta: 1,
    },
    {
        testo: "Articolazione o Cartilagine, come si chiama il punto di giunzione tra due ossa che permette il movimento?",
        risposte: ["Cartilagine", "Articolazione"],
        giusta: 0,
    },
    {
        testo: "Sottocutaneo o Intramuscolare, quale tipo di iniezione viene fatta nel tessuto adiposo sotto la pelle?",
        risposte: ["Sottocutaneo", "Intramuscolare"],
        giusta: 1,
    },
    {
        testo: "Vene o Arterie, quali vasi sanguigni sono dotati di valvole per impedire al sangue di tornare indietro?",
        risposte: ["Arterie", "Vene"],
        giusta: 0,
    },
    {
        testo: "Stress o Sonno, quale di questi fattori è fondamentale per il recupero cellulare e la memoria?",
        risposte: ["Sonno", "Stress"],
        giusta: 1,
    },
    {
        testo: "Milza o Tonsille, qual è l'organo che funge da serbatoio di sangue e distrugge i globuli rossi vecchi?",
        risposte: ["Tonsille", "Milza"],
        giusta: 0,
    },
    {
        testo: "Femore o Staffa, qual è l'osso più piccolo del corpo umano situato nell'orecchio?",
        risposte: ["Staffa", "Femore"],
        giusta: 1,
    },
    {
        testo: "Glicemia o Anemia, come si chiama la carenza di ferro o globuli rossi nel sangue?",
        risposte: ["Glicemia", "Anemia"],
        giusta: 0,
    },
    {
        testo: "Amido o Glucosio, qual è lo zucchero semplice che le nostre cellule usano come carburante?",
        risposte: ["Glucosio", "Amido"],
        giusta: 1,
    },
    {
        testo: "Cranio o Bacino, quale struttura ossea protegge il nostro prezioso cervello?",
        risposte: ["Bacino", "Cranio"],
        giusta: 0,
    },
    {
        testo: "Pressione arteriosa o Battito cardiaco, cosa misuriamo in battiti al minuto (BPM)?",
        risposte: ["Battito cardiaco", "Pressione arteriosa"],
        giusta: 1,
    },
    {
        testo: "Sinistro o Destro, in quale polmone manca un lobo per far spazio al cuore?",
        risposte: ["Destro", "Sinistro"],
        giusta: 0,
    },
    {
        testo: "Mandibola o Mascella, qual è l'unico osso mobile della faccia?",
        risposte: ["Mandibola", "Mascella"],
        giusta: 1,
    },
    {
        testo: "Cortisolo o Ossitocina, quale ormone è tristemente noto come 'l'ormone dello stress'?",
        risposte: ["Ossitocina", "Cortisolo"],
        giusta: 0,
    },
    {
        testo: "Ulcera o Gastrite, come si chiama l'infiammazione della mucosa dello stomaco?",
        risposte: ["Gastrite", "Ulcera"],
        giusta: 1,
    },
    {
        testo: "Morfina o Aspirina, quale farmaco storico è derivato originariamente dalla corteccia del salice?",
        risposte: ["Morfina", "Aspirina"],
        giusta: 0,
    },
    {
        testo: "Setto nasale o Laringe, cosa divide le due narici nel naso?",
        risposte: ["Setto nasale", "Laringe"],
        giusta: 1,
    },
    {
        testo: "Ematocrito o Glicemia, quale analisi misura la percentuale di globuli rossi nel sangue?",
        risposte: ["Glicemia", "Ematocrito"],
        giusta: 0,
    },
    {
        testo: "Cerebelo o Tronco encefalico, quale parte del sistema nervoso controlla il respiro e il battito cardiaco?",
        risposte: ["Tronco encefalico", "Cerebelo"],
        giusta: 1,
    },
    {
        testo: "Fibre o Zuccheri, cosa dovremmo mangiare in abbondanza per aiutare la regolarità intestinale?",
        risposte: ["Zuccheri", "Fibre"],
        giusta: 0,
    },
    {
        testo: "Osteoporosi o Artrite, come si chiama la malattia che rende le ossa fragili e porose?",
        risposte: ["Osteoporosi", "Artrite"],
        giusta: 1,
    },
    {
        testo: "Sudore o Saliva, quale liquido prodotto dalle ghiandole serve a raffreddare il corpo?",
        risposte: ["Saliva", "Sudore"],
        giusta: 0,
    },
    {
        testo: "Canini o Premolari, quali denti sono appuntiti e servono per afferrare e lacerare?",
        risposte: ["Canini", "Premolari"],
        giusta: 1,
    },
    {
        testo: "Ipertensione o Ipotensione, come definiamo la pressione sanguigna troppo alta?",
        risposte: ["Ipotensione", "Ipertensione"],
        giusta: 0,
    },
    {
        testo: "Vescica o Uretere, quale organo funge da contenitore temporaneo per l'urina?",
        risposte: ["Vescica", "Uretere"],
        giusta: 1,
    },
    {
        testo: "Apparato o Sistema, come chiamiamo un insieme di organi diversi che collaborano per una funzione (es. Digerente)?",
        risposte: ["Sistema", "Apparato"],
        giusta: 0,
    },
    {
        testo: "Masticazione o Deglutizione, come si chiama l'atto di mandare giù il cibo?",
        risposte: ["Deglutizione", "Masticazione"],
        giusta: 1,
    },
    {
        testo: "Seno frontale o Condotto uditivo, dove si trova il timpano?",
        risposte: ["Seno frontale", "Condotto uditivo"],
        giusta: 0,
    },
    {
        testo: "Macrofagi o Piastrine, quali cellule 'mangiano' letteralmente i batteri nocivi?",
        risposte: ["Macrofagi", "Piastrine"],
        giusta: 1,
    },
    {
        testo: "Radiale o Femorale, quale arteria sentiamo battere se mettiamo le dita sul polso?",
        risposte: ["Femorale", "Radiale"],
        giusta: 0,
    },
    {
        testo: "Cheratina o Melanina, quale pigmento protegge la nostra pelle dai raggi UV e ci fa abbronzare?",
        risposte: ["Melanina", "Cheratina"],
        giusta: 1,
    },
    {
        testo: "Peristalsi o Circolazione, come si chiamano i movimenti ondulatori dell'intestino per far avanzare il cibo?",
        risposte: ["Circolazione", "Peristalsi"],
        giusta: 0,
    },
    {
        testo: "Cervello o Cuore, quale organo consuma circa il 20% dell'energia totale del corpo pur pesando poco?",
        risposte: ["Cervello", "Cuore"],
        giusta: 1,
    },
    {
        testo: "Ghiandole lacrimali o Ghiandole salivari, chi produce il liquido per lubrificare l'occhio?",
        risposte: ["Ghiandole salivari", "Ghiandole lacrimali"],
        giusta: 0,
    },
    {
        testo: "Atlante o Epistrofeo, come si chiama la primissima vertebra cervicale che sostiene il cranio?",
        risposte: ["Atlante", "Epistrofeo"],
        giusta: 1,
    },
    {
        testo: "Bad Bunny o J Balvin, chi è l'artista portoricano che ha dominato le classifiche mondiali con l'album 'Un Verano Sin Ti'?",
        risposte: ["J Balvin", "Bad Bunny"],
        giusta: 0,
    },
    {
        testo: "Travis Scott o Drake, chi ha scatenato il mondo con l'album 'Astroworld' e il singolo 'Sicko Mode'?",
        risposte: ["Travis Scott", "Drake"],
        giusta: 1,
    },
    {
        testo: "Sfera Ebbasta o Ghali, chi è considerato il 'King della Trap' italiana dopo il successo di 'Rockstar'?",
        risposte: ["Ghali", "Sfera Ebbasta"],
        giusta: 0,
    },
    {
        testo: "Taylor Swift o Ariana Grande, quale popstar ha un esercito di fan chiamati 'Swifties'?",
        risposte: ["Taylor Swift", "Ariana Grande"],
        giusta: 1,
    },
    {
        testo: "Harry Styles o Zayn Malik, chi cantava la hit mondiale 'As It Was'?",
        risposte: ["Zayn Malik", "Harry Styles"],
        giusta: 0,
    },
    {
        testo: "Billie Eilish o Olivia Rodrigo, chi ha vinto l'Oscar per la canzone del film 'Barbie' intitolata 'What Was I Made For?'?",
        risposte: ["Billie Eilish", "Olivia Rodrigo"],
        giusta: 1,
    },
    {
        testo: "Lazza o Geolier, quale rapper milanese si è classificato secondo a Sanremo con il brano 'Cenere'?",
        risposte: ["Geolier", "Lazza"],
        giusta: 0,
    },
    {
        testo: "The Weeknd o Bruno Mars, chi ha scalato le classifiche globali con il brano synth-pop 'Blinding Lights'?",
        risposte: ["The Weeknd", "Bruno Mars"],
        giusta: 1,
    },
    {
        testo: "Rihanna o Beyoncé, quale artista ha fatto un ritorno leggendario esibendosi incinta durante l'intervallo del Super Bowl 2023?",
        risposte: ["Beyoncé", "Rihanna"],
        giusta: 0,
    },
    {
        testo: "Justin Bieber o Shawn Mendes, chi è diventato famoso da giovanissimo con il tormentone 'Baby'?",
        risposte: ["Justin Bieber", "Shawn Mendes"],
        giusta: 1,
    },
    {
        testo: "Annalisa o Elodie, quale cantante italiana ha dominato l'estate con 'Bellissima' e 'Mon Amour'?",
        risposte: ["Elodie", "Annalisa"],
        giusta: 0,
    },
    {
        testo: "Central Cee o Stormzy, chi è il rapper britannico diventato virale con il brano 'Doja'?",
        risposte: ["Central Cee", "Stormzy"],
        giusta: 1,
    },
    {
        testo: "Tedua o Marracash, chi ha pubblicato l'acclamato album 'La Divina Commedia'?",
        risposte: ["Marracash", "Tedua"],
        giusta: 0,
    },
    {
        testo: "Kanye West o Kendrick Lamar, chi è l'autore dell'album capolavoro 'To Pimp a Butterfly'?",
        risposte: ["Kendrick Lamar", "Kanye West"],
        giusta: 1,
    },
    {
        testo: "Rosalía o Karol G, chi ha fuso il flamenco con la musica urban nell'album 'Motomami'?",
        risposte: ["Karol G", "Rosalía"],
        giusta: 0,
    },
    {
        testo: "Dua Lipa o Doja Cat, chi canta la hit disco-pop 'Levitating'?",
        risposte: ["Dua Lipa", "Doja Cat"],
        giusta: 1,
    },
    {
        testo: "Post Malone o Juice WRLD, quale artista è famoso per i suoi numerosi tatuaggi sul viso e la hit 'Rockstar'?",
        risposte: ["Juice WRLD", "Post Malone"],
        giusta: 0,
    },
    {
        testo: "Capo Plaza o Shiva, chi è il rapper di Salerno che ha collaborato con star internazionali come Gunna e Lil Tjay?",
        risposte: ["Capo Plaza", "Shiva"],
        giusta: 1,
    },
    {
        testo: "Imagine Dragons o Måneskin, quale rock band americana è famosa per i singoli 'Believer' e 'Thunder'?",
        risposte: ["Måneskin", "Imagine Dragons"],
        giusta: 0,
    },
    {
        testo: "K-Pop o J-Pop, come si definisce il genere musicale coreano di gruppi come i BTS e le Blackpink?",
        risposte: ["K-Pop", "J-Pop"],
        giusta: 1,
    },
    {
        testo: "Guanciale o Pancetta, quale ingrediente è fondamentale per la vera pasta alla Carbonara?",
        risposte: ["Pancetta", "Guanciale"],
        giusta: 0,
    },
    {
        testo: "Riso o Pasta, qual è l'ingrediente principale del celebre Risotto alla Milanese?",
        risposte: ["Riso", "Pasta"],
        giusta: 1,
    },
    {
        testo: "Gorgonzola o Mozzarella, quale formaggio troviamo tipicamente sulla Pizza Margherita?",
        risposte: ["Gorgonzola", "Mozzarella"],
        giusta: 0,
    },
    {
        testo: "Melanzane o Zucchine, qual è l'ortaggio protagonista della Parmigiana?",
        risposte: ["Melanzane", "Zucchine"],
        giusta: 1,
    },
    {
        testo: "Savoiardi o Pan di Spagna, quali biscotti si usano tradizionalmente per fare il Tiramisù?",
        risposte: ["Pan di Spagna", "Savoiardi"],
        giusta: 0,
    },
    {
        testo: "Basilico o Prezzemolo, qual è l'erba aromatica base del Pesto alla Genovese?",
        risposte: ["Basilico", "Prezzemolo"],
        giusta: 1,
    },
    {
        testo: "Aceto Balsamico o Aceto di Mele, quale condimento pregiato è tipico di Modena?",
        risposte: ["Aceto di Mele", "Aceto Balsamico"],
        giusta: 0,
    },
    {
        testo: "Pecorino o Parmigiano, quale formaggio si usa nella ricetta classica della Cacio e Pepe?",
        risposte: ["Pecorino", "Parmigiano"],
        giusta: 1,
    },
    {
        testo: "Ceci o Fagioli, qual è l'ingrediente base dell'hummus, tipico della cucina mediorientale?",
        risposte: ["Fagioli", "Ceci"],
        giusta: 0,
    },
    {
        testo: "Zafferano o Curcuma, quale spezia dona il tipico colore giallo al risotto milanese?",
        risposte: ["Zafferano", "Curcuma"],
        giusta: 1,
    },
    {
        testo: "Francia o Italia, in quale nazione è nato il celebre formaggio Camembert?",
        risposte: ["Italia", "Francia"],
        giusta: 0,
    },
    {
        testo: "Uova o Panna, cosa NON dovrebbe mai esserci in una vera Carbonara secondo la tradizione?",
        risposte: ["Panna", "Uova"],
        giusta: 1,
    },
    {
        testo: "Couscous o Paella, qual è il piatto tipico spagnolo a base di riso, zafferano e frutti di mare?",
        risposte: ["Couscous", "Paella"],
        giusta: 0,
    },
    {
        testo: "Lievito o Bicarbonato, cosa serve per far gonfiare e rendere soffice il pane fatto in casa?",
        risposte: ["Lievito", "Bicarbonato"],
        giusta: 1,
    },
    {
        testo: "Sushi o Sashimi, come si chiama la specialità giapponese che prevede riso condito e pesce crudo?",
        risposte: ["Sashimi", "Sushi"],
        giusta: 0,
    },
    {
        testo: "Messico o Perù, da quale paese proviene il peperoncino Jalapeño?",
        risposte: ["Messico", "Perù"],
        giusta: 1,
    },
    {
        testo: "Bottarga o Caviale, come si chiamano le uova di storione salate e conservate?",
        risposte: ["Bottarga", "Caviale"],
        giusta: 0,
    },
    {
        testo: "Burro o Olio d'oliva, quale grasso è la base della cucina mediterranea?",
        risposte: ["Olio d'oliva", "Burro"],
        giusta: 0,
    },
    {
        testo: "Bistecca alla Fiorentina o Tagliata, quale taglio di carne di chianina è tipico della Toscana?",
        risposte: ["Tagliata", "Bistecca alla Fiorentina"],
        giusta: 0,
    },
    {
        testo: "Lasagne o Cannelloni, quale primo piatto al forno è fatto da strati di pasta, ragù e besciamella?",
        risposte: ["Lasagne", "Cannelloni"],
        giusta: 1,
    },
    {
        testo: "Giappone o Cina, in quale paese sono stati inventati originariamente gli spaghetti?",
        risposte: ["Giappone", "Cina"],
        giusta: 0,
    },
    {
        testo: "Taco o Burrito, quale tortilla messicana viene solitamente servita aperta e piegata a metà?",
        risposte: ["Taco", "Burrito"],
        giusta: 1,
    },
    {
        testo: "Meringa o Pasta frolla, quale preparazione si ottiene montando a neve albumi e zucchero?",
        risposte: ["Pasta frolla", "Meringa"],
        giusta: 0,
    },
    {
        testo: "Tortellini o Ravioli, quale pasta ripiena è originaria di Bologna e Modena?",
        risposte: ["Tortellini", "Ravioli"],
        giusta: 1,
    },
    {
        testo: "Roquefort o Cheddar, quale formaggio inglese è famoso per il suo colore arancione o giallo intenso?",
        risposte: ["Roquefort", "Cheddar"],
        giusta: 0,
    },
    {
        testo: "Salsiccia o Pancetta, cosa troviamo all'interno della tradizionale 'Amatriciana'?",
        risposte: ["Guanciale", "Salsiccia"],
        giusta: 1,
    },
    {
        testo: "Cottura al vapore o Frittura, quale metodo di cottura è considerato più salutare perché mantiene i nutrienti?",
        risposte: ["Frittura", "Cottura al vapore"],
        giusta: 0,
    },
    {
        testo: "Mascarpone o Ricotta, quale formaggio cremoso è l'anima del Tiramisù?",
        risposte: ["Mascarpone", "Ricotta"],
        giusta: 1,
    },
    {
        testo: "Patate o Farina, qual è l'ingrediente principale degli gnocchi di tipo classico?",
        risposte: ["Farina", "Patate"],
        giusta: 0,
    },
    {
        testo: "Caffè o Tè, qual è la bevanda più consumata al mondo dopo l'acqua?",
        risposte: ["Tè", "Caffè"],
        giusta: 1,
    },
    {
        testo: "Olio di semi o Olio extravergine, quale olio ha il punto di fumo più alto ed è spesso usato per friggere?",
        risposte: ["Olio extravergine", "Olio di semi"],
        giusta: 0,
    },
    {
        testo: "Puglia o Campania, in quale regione è nata la Mozzarella di Bufala DOP?",
        risposte: ["Campania", "Puglia"],
        giusta: 1,
    },
    {
        testo: "Al dente o Ben cotta, come preferiscono solitamente la pasta gli italiani?",
        risposte: ["Ben cotta", "Al dente"],
        giusta: 0,
    },
    {
        testo: "Vino Rosso o Vino Bianco, quale si abbina solitamente meglio a un piatto di pesce?",
        risposte: ["Vino Bianco", "Vino Rosso"],
        giusta: 1,
    },
    {
        testo: "Wasabi o Zenzero, come si chiama la pasta verde piccantissima servita con il sushi?",
        risposte: ["Zenzero", "Wasabi"],
        giusta: 0,
    },
    {
        testo: "Macaron o Profiterole, quali sono i piccoli dolcetti colorati francesi formati da due dischi di meringa alla mandorla?",
        risposte: ["Macaron", "Profiterole"],
        giusta: 1,
    },
    {
        testo: "Farina 00 o Farina Integrale, quale farina contiene tutte le parti del chicco di grano?",
        risposte: ["Farina 00", "Farina Integrale"],
        giusta: 0,
    },
    {
        testo: "Minestrone o Vellutata, quale zuppa di verdure è passata al mixer per ottenere una consistenza liscia?",
        risposte: ["Vellutata", "Minestrone"],
        giusta: 1,
    },
    {
        testo: "Arancino o Supplì, come si chiama la palla di riso fritta tipica della cucina siciliana?",
        risposte: ["Supplì", "Arancino"],
        giusta: 0,
    },
    {
        testo: "Crostata o Panettone, quale dolce natalizio milanese contiene canditi e uvetta?",
        risposte: ["Panettone", "Crostata"],
        giusta: 1,
    },
    {
        testo: "Aglio o Cipolla, quale bulbo viene 'sfregato' sul pane tostato per fare la bruschetta classica?",
        risposte: ["Cipolla", "Aglio"],
        giusta: 0,
    },
    {
        testo: "Soia o Mandorla, da quale legume si ricava la salsa scura usata nella cucina asiatica?",
        risposte: ["Soia", "Mandorla"],
        giusta: 1,
    },
    {
        testo: "Strudel o Sacher, qual è la famosa torta al cioccolato e marmellata di albicocche originaria di Vienna?",
        risposte: ["Strudel", "Sacher"],
        giusta: 0,
    },
    {
        testo: "Miele o Zucchero, quale dolcificante naturale è prodotto dalle api?",
        risposte: ["Miele", "Zucchero"],
        giusta: 1,
    },
    {
        testo: "Prosciutto Crudo o Prosciutto Cotto, quale dei due viene stagionato e non bollito?",
        risposte: ["Prosciutto Cotto", "Prosciutto Crudo"],
        giusta: 0,
    },
    {
        testo: "Cannolo o Cassata, quale dolce siciliano è formato da una cialda fritta ripiena di ricotta?",
        risposte: ["Cannolo", "Cassata"],
        giusta: 1,
    },
    {
        testo: "Orecchiette o Trofie, quale formato di pasta è il simbolo della Puglia?",
        risposte: ["Trofie", "Orecchiette"],
        giusta: 0,
    },
    {
        testo: "Goulash o Ratatouille, quale stufato di carne e paprica è tipico dell'Ungheria?",
        risposte: ["Goulash", "Ratatouille"],
        giusta: 1,
    },
    {
        testo: "Polenta o Couscous, quale piatto a base di farina di mais è tipico del Nord Italia?",
        risposte: ["Couscous", "Polenta"],
        giusta: 0,
    },
    {
        testo: "Gamberi o Cozze, quale ingrediente è alla base dell'Impepata napoletana?",
        risposte: ["Cozze", "Gamberi"],
        giusta: 1,
    },
    {
        testo: "Besciamella o Maionese, quale salsa bianca si ottiene emulsionando olio, uova e limone?",
        risposte: ["Besciamella", "Maionese"],
        giusta: 0,
    },
    {
        testo: "Caponata o Peperonata, quale contorno siciliano mescola melanzane, sedano, capperi e olive in agrodolce?",
        risposte: ["Caponata", "Peperonata"],
        giusta: 1,
    },
    {
        testo: "Focaccia o Piadina, quale pane sottile e senza lievito è tipico della Romagna?",
        risposte: ["Focaccia", "Piadina"],
        giusta: 0,
    },
    {
        testo: "Moussaka o Lasagna, quale piatto greco prevede strati di melanzane, carne trita e besciamella?",
        risposte: ["Moussaka", "Lasagna"],
        giusta: 1,
    },
    {
        testo: "Castagne o Noci, da quale frutto si ricava la farina per fare il Castagnaccio?",
        risposte: ["Noci", "Castagne"],
        giusta: 0,
    },
    {
        testo: "Salmone o Tonno, quale pesce è famoso per risalire i fiumi controcorrente?",
        risposte: ["Salmone", "Tonno"],
        giusta: 1,
    },
    {
        testo: "Tartufo Bianco o Tartufo Nero, quale varietà di fungo ipogeo è particolarmente pregiata nella zona di Alba?",
        risposte: ["Tartufo Nero", "Tartufo Bianco"],
        giusta: 0,
    },
    {
        testo: "Gorgonzola o Taleggio, quale formaggio erborinato presenta le tipiche venature blu?",
        risposte: ["Gorgonzola", "Taleggio"],
        giusta: 1,
    },
    {
        testo: "Wurstel o Kebab, quale spiedo di carne rotante è tipico della cucina turca?",
        risposte: ["Wurstel", "Kebab"],
        giusta: 0,
    },
    {
        testo: "Amarena o Ciliegia, quale frutto sciroppato decora spesso le Zeppole di San Giuseppe?",
        risposte: ["Amarena", "Ciliegia"],
        giusta: 1,
    },
    {
        testo: "Sale Grosso o Sale Fino, quale si usa solitamente per salare l'acqua della pasta?",
        risposte: ["Sale Fino", "Sale Grosso"],
        giusta: 0,
    },
    {
        testo: "Bagna Cauda o Fonduta, quale salsa piemontese è a base di aglio, olio e acciughe?",
        risposte: ["Bagna Cauda", "Fonduta"],
        giusta: 1,
    },
    {
        testo: "Curry o Paprica, quale miscela di spezie indiana può variare da dolce a piccantissima?",
        risposte: ["Paprica", "Curry"],
        giusta: 0,
    },
    {
        testo: "Schiacciata o Michetta, come si chiama il tipico pane soffiato e vuoto milanese?",
        risposte: ["Michetta", "Schiacciata"],
        giusta: 1,
    },
    {
        testo: "Marmellata o Confettura, come si chiama propriamente il prodotto a base di soli agrumi?",
        risposte: ["Confettura", "Marmellata"],
        giusta: 0,
    },
    {
        testo: "Pinoli o Mandorle, quale seme è essenziale per preparare il pesto alla genovese?",
        risposte: ["Pinoli", "Mandorle"],
        giusta: 1,
    },
    {
        testo: "Granita o Sorbetto, quale dolce freddo siciliano ha una consistenza più granulosa?",
        risposte: ["Sorbetto", "Granita"],
        giusta: 0,
    },
    {
        testo: "Quinoa o Couscous, quale 'finto cereale' sudamericano è naturalmente privo di glutine?",
        risposte: ["Quinoa", "Couscous"],
        giusta: 1,
    },
    {
        testo: "Radicchio o Indivia, quale verdura veneta è famosa per il suo colore rosso e il gusto amarognolo?",
        risposte: ["Indivia", "Radicchio"],
        giusta: 0,
    },
    {
        testo: "Lardo di Colonnata o Guanciale, quale salume toscano viene stagionato in conche di marmo?",
        risposte: ["Lardo di Colonnata", "Guanciale"],
        giusta: 1,
    },
    {
        testo: "Torta Mimosa o Torta della Nonna, quale dolce si regala tipicamente per la Festa della Donna?",
        risposte: ["Torta della Nonna", "Torta Mimosa"],
        giusta: 0,
    },
    {
        testo: "Cotechino o Zampone, quale insaccato natalizio è contenuto nella zampa anteriore del maiale?",
        risposte: ["Zampone", "Cotechino"],
        giusta: 1,
    },
    {
        testo: "Sorbato di potassio o Lievito madre, quale ingrediente si usa per la panificazione naturale a lunga lievitazione?",
        risposte: ["Sorbato di potassio", "Lievito madre"],
        giusta: 0,
    },
    {
        testo: "Tempura o Pastella, come si chiama la frittura giapponese leggerissima fatta con acqua frizzante ghiacciata?",
        risposte: ["Tempura", "Pastella"],
        giusta: 1,
    },
    {
        testo: "Peperone o Pomodoro, quale ortaggio è la base del Gazpacho spagnolo?",
        risposte: ["Peperone", "Pomodoro"],
        giusta: 0,
    },
    {
        testo: "Provolone o Pecorino, quale formaggio si ottiene esclusivamente dal latte di pecora?",
        risposte: ["Pecorino", "Provolone"],
        giusta: 1,
    },
    {
        testo: "Ragù alla Bolognese o Ragù alla Napoletana, quale richiede una cottura lunghissima con pezzi interi di carne?",
        risposte: ["Ragù alla Bolognese", "Ragù alla Napoletana"],
        giusta: 0,
    },
    {
        testo: "Muffin o Cupcake, quale dei due dolcetti americani è solitamente decorato con glassa o crema in cima?",
        risposte: ["Cupcake", "Muffin"],
        giusta: 1,
    },
    {
        testo: "Grano Arso o Farina di Segale, quale ingrediente pugliese deriva dalla tostatura dei chicchi di grano?",
        risposte: ["Farina di Segale", "Grano Arso"],
        giusta: 0,
    },
    {
        testo: "Limoncello o Grappa, quale liquore si ottiene dall'infusione delle scorze di limone?",
        risposte: ["Limoncello", "Grappa"],
        giusta: 1,
    },
];
