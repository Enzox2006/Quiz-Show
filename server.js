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

        // Caso 1: nome corrisponde a un giocatore disconnesso → ripristina il suo slot
        const existing = stanza.giocatori.find(
            g => g.disconnesso && g.nome.trim().toUpperCase() === (nome || '').trim().toUpperCase()
        );
        if (existing) {
            const oldId = existing.id;
            existing.id = socket.id;
            existing.disconnesso = false;
            codiceStanza = codice;
            socket.join(codice);
            if (stanza.host === oldId) stanza.host = socket.id;

            socket.emit('riconnesso', {
                codice,
                idx: existing.idx,
                nome: existing.nome,
                token: existing.token,
                giocatori: stanza.giocatori,
                partitaIniziata: stanza.partitaIniziata
            });
            io.to(codice).emit('giocatore_riconnesso', {
                idx: existing.idx,
                nome: existing.nome,
                giocatori: stanza.giocatori
            });
            return;
        }

        // Caso 2: stanza piena (tutti e 3 gli slot occupati, anche da disconnessi)
        if (stanza.giocatori.length >= 3) {
            socket.emit('errore', { messaggio: 'Stanza piena' });
            return;
        }

        // Caso 3: nuovo giocatore
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

    // Riconnessione tramite token (ricaricamento pagina con sessione localStorage)
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
            // Sessione già attiva: ignora silenziosamente
            socket.emit('riconnessione_fallita', { motivo: null });
            return;
        }

        const oldId = player.id;
        player.id = socket.id;
        player.disconnesso = false;
        codiceStanza = codice;
        socket.join(codice);
        if (stanza.host === oldId) stanza.host = socket.id;

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

    // Uscita volontaria: il giocatore torna al menù senza chiudere il browser
    socket.on('lascia_stanza', () => {
        if (!codiceStanza || !stanze[codiceStanza]) return;
        const stanza = stanze[codiceStanza];
        const player = stanza.giocatori.find(g => g.id === socket.id);
        if (!player || player.disconnesso) return;
        player.disconnesso = true;
        io.to(codiceStanza).emit('giocatore_disconnesso', {
            idx: player.idx,
            nome: player.nome
        });
    });

    socket.on('disconnect', () => {
        if (!codiceStanza || !stanze[codiceStanza]) return;
        const stanza = stanze[codiceStanza];
        const player = stanza.giocatori.find(g => g.id === socket.id);
        if (!player || player.disconnesso) return; // già gestito da lascia_stanza

        player.disconnesso = true;
        io.to(codiceStanza).emit('giocatore_disconnesso', {
            idx: player.idx,
            nome: player.nome
        });
    });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Quiz Show server running on port ${PORT}`);
});
