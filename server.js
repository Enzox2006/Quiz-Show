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

function generaCodice() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

io.on('connection', (socket) => {
    let codiceStanza = null;

    socket.on('crea_stanza', ({ nome }) => {
        codiceStanza = generaCodice();
        stanze[codiceStanza] = {
            host: socket.id,
            giocatori: [{ id: socket.id, nome }]
        };
        socket.join(codiceStanza);
        socket.emit('stanza_creata', {
            codice: codiceStanza,
            idx: 0,
            giocatori: stanze[codiceStanza].giocatori
        });
    });

    socket.on('entra_stanza', ({ codice, nome }) => {
        const stanza = stanze[codice];
        if (!stanza) {
            socket.emit('errore', { messaggio: 'Stanza non trovata' });
            return;
        }
        codiceStanza = codice;
        const idx = stanza.giocatori.length;
        stanza.giocatori.push({ id: socket.id, nome });
        socket.join(codice);
        socket.emit('stanza_entrata', {
            codice,
            idx,
            giocatori: stanza.giocatori
        });
        io.to(codice).emit('aggiorna_lobby', { giocatori: stanza.giocatori });
    });

    socket.on('inizia_partita', () => {
        if (!codiceStanza) return;
        const stanza = stanze[codiceStanza];
        if (!stanza || stanza.host !== socket.id) return;
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

    socket.on('disconnect', () => {
        if (!codiceStanza || !stanze[codiceStanza]) return;
        const stanza = stanze[codiceStanza];
        stanza.giocatori = stanza.giocatori.filter(g => g.id !== socket.id);
        if (stanza.giocatori.length === 0) {
            delete stanze[codiceStanza];
        } else {
            if (stanza.host === socket.id) {
                stanza.host = stanza.giocatori[0].id;
            }
            io.to(codiceStanza).emit('giocatore_disconnesso', { id: socket.id });
        }
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Quiz Show server running on port ${PORT}`);
});
