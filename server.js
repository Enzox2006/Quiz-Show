const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'https://enzox2006.github.io',
            /\.replit\.dev$/,
            /\.replit\.app$/,
            'http://localhost:5000'
        ],
        methods: ['GET', 'POST']
    }
});

app.use(express.static(path.join(__dirname)));

const stanze = {};
const graceTimers = {}; // token → timer ID

function generaCodice() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

function generaToken() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

io.on('connection', (socket) => {
    let codiceStanza = null;

    socket.on('crea_stanza', ({ nome }) => {
        codiceStanza = generaCodice();
        const token = generaToken();
        stanze[codiceStanza] = {
            host: socket.id,
            partitaIniziata: false,
            giocatori: [{ id: socket.id, nome, token, idx: 0, disconnesso: false }]
        };
        socket.join(codiceStanza);
        socket.emit('stanza_creata', {
            codice: codiceStanza,
            idx: 0,
            token,
            giocatori: stanze[codiceStanza].giocatori
        });
    });

    socket.on('entra_stanza', ({ codice, nome }) => {
        const stanza = stanze[codice];
        if (!stanza) {
            socket.emit('errore', { messaggio: 'Stanza non trovata' });
            return;
        }
        if (stanza.giocatori.length >= 3) {
            socket.emit('errore', { messaggio: 'Stanza piena' });
            return;
        }
        codiceStanza = codice;
        const token = generaToken();
        const idx = stanza.giocatori.length;
        stanza.giocatori.push({ id: socket.id, nome, token, idx, disconnesso: false });
        socket.join(codice);
        socket.emit('stanza_entrata', {
            codice,
            idx,
            token,
            giocatori: stanza.giocatori
        });
        io.to(codice).emit('aggiorna_lobby', { giocatori: stanza.giocatori });
    });

    socket.on('inizia_partita', () => {
        if (!codiceStanza) return;
        const stanza = stanze[codiceStanza];
        if (!stanza || stanza.host !== socket.id) return;
        stanza.partitaIniziata = true;
        const nomi = stanza.giocatori.map(g => g.nome);
        io.to(codiceStanza).emit('partita_iniziata', { nomi });
    });

    socket.on('azione', ({ tipo, dati }) => {
        if (!codiceStanza) return;
        socket.to(codiceStanza).emit('azione', { tipo, dati, da: socket.id });
    });

    socket.on('spin_result', ({ spiccioIdx, rotazioneFinale }) => {
        if (!codiceStanza) return;
        socket.to(codiceStanza).emit('spin_result', { spiccioIdx, rotazioneFinale, da: socket.id });
    });

    socket.on('sync_stato', (stato) => {
        if (!codiceStanza) return;
        socket.to(codiceStanza).emit('sync_stato', stato);
    });

    socket.on('wheel_rotation', ({ r }) => {
        if (!codiceStanza) return;
        socket.to(codiceStanza).emit('wheel_rotation', { r });
    });

    // Relay: chi si sta riconnettendo chiede lo stato, gli altri rispondono
    socket.on('richiedi_sync', () => {
        if (!codiceStanza) return;
        socket.to(codiceStanza).emit('richiedi_sync');
    });

    socket.on('riconnetti', ({ token, codice }) => {
        const stanza = stanze[codice];
        if (!stanza) {
            socket.emit('riconnessione_fallita', { motivo: 'Stanza non trovata o partita terminata' });
            return;
        }
        const player = stanza.giocatori.find(g => g.token === token);
        if (!player) {
            socket.emit('riconnessione_fallita', { motivo: 'Sessione non trovata' });
            return;
        }
        if (!player.disconnesso) {
            // Sessione già attiva: non mostrare errore, ignora silenziosamente
            socket.emit('riconnessione_fallita', { motivo: null });
            return;
        }

        // Cancella il timer di grazia
        if (graceTimers[token]) {
            clearTimeout(graceTimers[token]);
            delete graceTimers[token];
        }

        const oldId = player.id;
        player.id = socket.id;
        player.disconnesso = false;
        codiceStanza = codice;
        socket.join(codice);

        // Ripristina host se era lui
        if (stanza.host === oldId) {
            stanza.host = socket.id;
        }

        socket.emit('riconnesso', {
            codice,
            idx: player.idx,
            nome: player.nome,
            token,
            giocatori: stanza.giocatori,
            partitaIniziata: stanza.partitaIniziata
        });

        io.to(codice).emit('giocatore_riconnesso', {
            idx: player.idx,
            nome: player.nome,
            giocatori: stanza.giocatori
        });
    });

    socket.on('disconnect', () => {
        if (!codiceStanza || !stanze[codiceStanza]) return;
        const stanza = stanze[codiceStanza];
        const player = stanza.giocatori.find(g => g.id === socket.id);
        if (!player) return;

        player.disconnesso = true;
        const disconnectedSocketId = socket.id;
        const stanzaCode = codiceStanza;

        io.to(stanzaCode).emit('giocatore_disconnesso', {
            idx: player.idx,
            nome: player.nome
        });

        // Periodo di grazia: 30 secondi per riconnettersi
        graceTimers[player.token] = setTimeout(() => {
            const s = stanze[stanzaCode];
            if (!s) { delete graceTimers[player.token]; return; }

            s.giocatori = s.giocatori.filter(g => g.token !== player.token);
            delete graceTimers[player.token];

            if (s.giocatori.length === 0) {
                delete stanze[stanzaCode];
            } else {
                if (s.host === disconnectedSocketId) {
                    const primo = s.giocatori.find(g => !g.disconnesso);
                    if (primo) s.host = primo.id;
                }
                io.to(stanzaCode).emit('giocatore_rimosso', {
                    idx: player.idx,
                    nome: player.nome,
                    giocatori: s.giocatori
                });
            }
        }, 30000);
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Quiz Show server running on port ${PORT}`);
});
