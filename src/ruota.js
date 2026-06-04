const ruota = {

    // ── Costanti ───────────────────────────────────────────────────
    CELL_W: 90, CELL_H: 86, CELL_GAP: 6,
    CELL_RANGES: [{s:1,n:12},{s:0,n:14},{s:0,n:14},{s:1,n:12}],
    COLORS: ['#ff4466','#4488ff','#22cc88'],

    // 24 spicchi secondo configurazione
    SPICCHI: [
        {label:'100',       valore:100, tipo:'euro',      colore:'#1e40af'},
        {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
        {label:'BANCAROTTA',valore:0,   tipo:'bancarotta',colore:'#000000'},
        {label:'1000',      valore:1000,tipo:'euro',      colore:'#rainbow'},
        {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
        {label:'700',       valore:700, tipo:'euro',      colore:'#1d4ed8'},
        {label:'JOLLY',     valore:0,   tipo:'jolly',     colore:'#f8f8f8'},
        {label:'600',       valore:600, tipo:'euro',      colore:'#0891b2'},
        {label:'PASSA',     valore:0,   tipo:'passa',     colore:'#ffffff'},
        {label:'800',       valore:800, tipo:'euro',      colore:'#6d28d9'},
        {label:'400',       valore:400, tipo:'euro',      colore:'#eab308'},
        {label:'100',       valore:100, tipo:'euro',      colore:'#1e40af'},
        {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
        {label:'300',       valore:300, tipo:'euro',      colore:'#c026d3'},
        {label:'RADDOPPIA', valore:0,   tipo:'raddoppia', colore:'#16a34a'},
        {label:'800',       valore:800, tipo:'euro',      colore:'#6d28d9'},
        {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
        {label:'600',       valore:600, tipo:'euro',      colore:'#0891b2'},
        {label:'300',       valore:300, tipo:'euro',      colore:'#c026d3'},
        {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
        {label:'PASSA',     valore:0,   tipo:'passa',     colore:'#ffffff'},
        {label:'400',       valore:400, tipo:'euro',      colore:'#eab308'},
        {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
        {label:'700',       valore:700, tipo:'euro',      colore:'#1d4ed8'},
    ],

    // ── Stato ──────────────────────────────────────────────────────
    nomi: ['GIOCATORE 1','GIOCATORE 2','GIOCATORE 3'],
    punteggioGioco: [0,0,0],
    punteggioRound: [0,0,0],
    jolly: [false,false,false],
    turno: 0,
    turnoIniziale: 0,
    manche: 0,
    sottomanche: 0,
    _categorieUsate: [],
    valoreRuota: 0,
    attesaLettera: false,
    faseGong: false,
    lettereRivelate: new Set(),
    fraseCorrente: null,
    fraseArray: [],
    fraseLettereScoperte: [],
    _jollyPreso: false,
    _tipoAzione: 'euro',
    _griglia: null,
    _posMap: null,
    _termometroTimer: null,
    _termometroEliminate: [],
    _trileteBonusRound: [0,0,0],
    _lastRotation: 0,
    _velPosizioniLettere: [],
    _velIdx: 0,
    _gongTimer: null,
    _gongSecondi: 0,
    _triletteTimer: null,
    _trilettePrenotatoDa: -1,
    _triletteEliminate: [],
    _triletteCategoria: '',
    jackpot_pool: 1000,
    _mancheJackpot: false,
    _mancheExpress: false,
    _expressTurn: false,
    _raddoppioVincitore: -1,
    _raddoppiaIdx: -1,
    _jollyIdx: -1,
    _ultimoVincitore: -1,
    _gongPensaTimer: null,
    _raddoppioConsSel: [],
    _raddoppioVocaleSel: null,
    _raddoppioTimer: null,
    _raddoppioSecondi: 15,
    _raddoppioMancheScore: 0,
    _bonusCat: '',
    _storiaManche: [],
    _mancheDaSaltare: [],

    // ── Reset ──────────────────────────────────────────────────────
    reset() {
        this.nomi = ['GIOCATORE 1','GIOCATORE 2','GIOCATORE 3'];
        this.punteggioGioco = [0,0,0];
        this.punteggioRound = [0,0,0];
        this.jolly = [false,false,false];
        this.turno = 0; this.turnoIniziale = 0;
        this.manche = 0; this.sottomanche = 0; this._categorieUsate = [];
        this.valoreRuota = 0; this.attesaLettera = false;
        this.faseGong = false;
        this.lettereRivelate = new Set();
        this.fraseCorrente = null; this.fraseArray = [];
        this.fraseLettereScoperte = [];
        this._jollyPreso = false; this._griglia = null; this._posMap = null;
        this._tipoAzione = 'euro';
        clearInterval(this._termometroTimer); this._termometroTimer = null;
        this._termometroEliminate = [];
        this._trileteBonusRound = [0,0,0];
        this._lastRotation = 0;
        this._velPosizioniLettere = []; this._velIdx = 0;
        clearInterval(this._gongTimer); this._gongTimer = null;
        this._gongSecondi = 0;
        clearInterval(this._triletteTimer); this._triletteTimer = null;
        this._trilettePrenotatoDa = -1;
        this._triletteEliminate = [];
        this._triletteCategoria = '';
        this._mancheJackpot = false;
        this._mancheExpress = false;
        this._expressTurn = false;
        this._raddoppioVincitore = -1;
        this._raddoppiaIdx = -1;
        this._jollyIdx = -1;
        this._ultimoVincitore = -1;
        clearInterval(this._gongPensaTimer); this._gongPensaTimer = null;
        this._raddoppioConsSel = [];
        this._raddoppioVocaleSel = null;
        clearInterval(this._raddoppioTimer); this._raddoppioTimer = null;
        this._raddoppioSecondi = 15;
        this._raddoppioMancheScore = 0;
        this._bonusCat = '';
        this._storiaManche = [];
        this._mancheDaSaltare = [];
        // Cancella tutti i setTimeout pendenti (avanzamento manche)
        if (this._pendingTimeouts) this._pendingTimeouts.forEach(id => clearTimeout(id));
        this._pendingTimeouts = [];
        // Flag: il gioco è terminato (solo dopo il finale manche 6)
        this._giocoTerminato = false;
        if (typeof ruotaCpu !== 'undefined') ruotaCpu.reset();
        // jackpot_pool NON viene resettato — carry-over tra partite
        // Ripristina spicchi originali
        this.SPICCHI = [
            {label:'100',       valore:100, tipo:'euro',      colore:'#1e40af'},
            {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
            {label:'BANCAROTTA',valore:0,   tipo:'bancarotta',colore:'#000000'},
            {label:'1000',      valore:1000,tipo:'euro',      colore:'#rainbow'},
            {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
            {label:'700',       valore:700, tipo:'euro',      colore:'#1d4ed8'},
            {label:'JOLLY',     valore:0,   tipo:'jolly',     colore:'#f8f8f8'},
            {label:'600',       valore:600, tipo:'euro',      colore:'#0891b2'},
            {label:'PASSA',     valore:0,   tipo:'passa',     colore:'#ffffff'},
            {label:'800',       valore:800, tipo:'euro',      colore:'#6d28d9'},
            {label:'400',       valore:400, tipo:'euro',      colore:'#eab308'},
            {label:'100',       valore:100, tipo:'euro',      colore:'#1e40af'},
            {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
            {label:'300',       valore:300, tipo:'euro',      colore:'#c026d3'},
            {label:'RADDOPPIA', valore:0,   tipo:'raddoppia', colore:'#16a34a'},
            {label:'800',       valore:800, tipo:'euro',      colore:'#6d28d9'},
            {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
            {label:'600',       valore:600, tipo:'euro',      colore:'#0891b2'},
            {label:'300',       valore:300, tipo:'euro',      colore:'#c026d3'},
            {label:'500',       valore:500, tipo:'euro',      colore:'#0369a1'},
            {label:'PASSA',     valore:0,   tipo:'passa',     colore:'#ffffff'},
            {label:'400',       valore:400, tipo:'euro',      colore:'#eab308'},
            {label:'200',       valore:200, tipo:'euro',      colore:'#1e3a8a'},
            {label:'700',       valore:700, tipo:'euro',      colore:'#1d4ed8'},
        ];
    },

    // ── Scala valore massimo per manche ────────────────────────────
    _scalaManche() {
        let valori = [1000, 1000, 2000, 3000, 4000, 1000, 5000];
        let val = valori[this.manche] || 1000;
        this.SPICCHI[3] = {label: String(val), valore: val, tipo: 'euro', colore: '#rainbow'};
        // Ripristina spicchi jackpot se non siamo nella manche jackpot (3)
        if (this.manche !== 3) {
            this._mancheJackpot = false;
            this.SPICCHI[4]  = {label:'200', valore:200, tipo:'euro', colore:'#1e3a8a'};
            this.SPICCHI[16] = {label:'200', valore:200, tipo:'euro', colore:'#1e3a8a'};
        }
        // Ripristina spicchi express se non siamo nella manche express (4)
        if (this.manche !== 4) {
            this._mancheExpress = false;
            this._expressTurn = false;
            this.SPICCHI[10] = {label:'400', valore:400, tipo:'euro', colore:'#eab308'};
            this.SPICCHI[22] = {label:'200', valore:200, tipo:'euro', colore:'#1e3a8a'};
        }
    },

    // ── Helpers ────────────────────────────────────────────────────
    _nomeTurno() { return this.nomi[this.turno] || `Giocatore ${this.turno+1}`; },
    _nomeG(i) { return this.nomi[i] || `Giocatore ${i+1}`; },
    _fmtEuro(n) { return n === 0 ? '0 €' : n.toLocaleString('it-IT') + ' €'; },
    _numItaliano(n) {
        const w = ['zero','una','due','tre','quattro','cinque','sei','sette','otto','nove','dieci'];
        return (n >= 0 && n <= 10) ? w[n] : n.toString();
    },
    _msgLettera(count, lettera, guadagno) {
        if (count === 1) return `C'è solo una ${lettera}&nbsp; +${this._fmtEuro(guadagno)}`;
        return `Ci sono ${this._numItaliano(count)} ${lettera}&nbsp; +${this._fmtEuro(guadagno)}`;
    },

    // Shuffle array garantendo nessun carattere consecutivo uguale
    _shuffleNoConsec(arr, charFn) {
        // Fisher-Yates
        let a = [...arr];
        for (let i = a.length-1; i > 0; i--) {
            let j = Math.floor(Math.random()*(i+1));
            [a[i],a[j]]=[a[j],a[i]];
        }
        // Fix consecutive duplicates
        for (let i = 1; i < a.length; i++) {
            if (charFn(a[i]) === charFn(a[i-1])) {
                for (let j = i+1; j < a.length; j++) {
                    if (charFn(a[j]) !== charFn(a[i-1])) {
                        [a[i],a[j]]=[a[j],a[i]]; break;
                    }
                }
            }
        }
        return a;
    },

    _passaTurno() {
        this._expressTurn = false;
        this.turno = (this.turno + 1) % 3;
        this.valoreRuota = 0; this.attesaLettera = false;
        this._renderGioco(); main.current = "RuotaGioco";
    },
    _bancaRound(idx) {
        this.punteggioGioco[idx] += this.punteggioRound[idx];
        this.punteggioRound = [0,0,0];
    },
    _playerConPiuPunti() {
        let max=-1, idx=0;
        for (let i=0;i<3;i++) if (this.punteggioGioco[i]>max){max=this.punteggioGioco[i];idx=i;}
        return idx;
    },

    // ── Jolly prompt ───────────────────────────────────────────────
    _chiedeJolly(msgEvento, colorEvento, onUsa, onNonUsa) {
        if (typeof ruotaCpu !== 'undefined' && ruotaCpu._è(this.turno)) {
            let usa = this.jolly[this.turno] && msgEvento.includes('BANCAROTTA');
            setTimeout(() => { usa ? onUsa() : onNonUsa(); }, 700);
            return;
        }
        if (!this.jolly[this.turno]) { onNonUsa(); return; }
        let overlay = document.createElement("div");
        overlay.style.cssText = `
            position:fixed;top:0;left:0;right:0;bottom:0;
            background:rgba(0,0,0,0.88);display:flex;flex-direction:column;
            align-items:center;justify-content:center;gap:28px;z-index:9500;padding:60px;
        `;
        let ev = document.createElement("div");
        ev.innerHTML = msgEvento;
        ev.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;color:${colorEvento};text-align:center;`;
        let q = document.createElement("div");
        q.innerHTML = `🃏 ${this._nomeTurno()} — Vuoi usare il tuo JOLLY?`;
        q.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:700;color:#a855f7;text-align:center;`;
        let bRow = document.createElement("div");
        bRow.style.cssText = `display:flex;gap:20px;`;
        let siBtn = document.createElement("button");
        siBtn.innerHTML = "🃏 SÌ, USA IL JOLLY";
        siBtn.style.cssText = `background:rgba(168,85,247,0.15);color:#a855f7;border:2px solid #a855f782;border-radius:14px;padding:22px 60px;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;cursor:pointer;`;
        let noBtn = document.createElement("button");
        noBtn.innerHTML = "✗ NO, CONTINUA";
        noBtn.style.cssText = `background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:22px 60px;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:700;cursor:pointer;`;
        siBtn.onclick = () => { this.jolly[this.turno]=false; overlay.remove(); onUsa(); };
        noBtn.onclick = () => { overlay.remove(); onNonUsa(); };
        bRow.appendChild(siBtn); bRow.appendChild(noBtn);
        overlay.appendChild(ev); overlay.appendChild(q); overlay.appendChild(bRow);
        document.body.appendChild(overlay);
    },

    // ── Manche helpers ─────────────────────────────────────────────
    _mancheTabColor() {
        const c = [
            {bg:'#CC5500', border:'#ee7722'},  // 0: Velocissima
            {bg:'#1a3280', border:'#2d4fa8'},  // 1: Manche 1
            {bg:'#004d4d', border:'#006666'},  // 2: Se la Sai Raddoppi
            {bg:'#aa0000', border:'#dd2222'},  // 3: Jackpot
            {bg:'#A1045A', border:'#cc1a7a'},  // 4: Express
            {bg:'#0047AB', border:'#1a69dd'},  // 5: Triplete
            {bg:'#7A3005', border:'#aa4a18'},  // 6: Round Finale
        ];
        return c[this.manche] || c[1];
    },

    _addCellGloss(cell, diagonal) {
        let gloss = document.createElement("div");
        if (diagonal) {
            gloss.style.cssText = `position:absolute;inset:0;background:linear-gradient(135deg,rgba(60,190,240,0.48) 0%,rgba(0,150,210,0.18) 40%,rgba(0,77,77,0) 65%);pointer-events:none;`;
        } else {
            gloss.style.cssText = `position:absolute;top:0;left:0;right:0;height:48%;background:linear-gradient(180deg,rgba(255,255,255,0.30) 0%,rgba(255,255,255,0.03) 100%);pointer-events:none;`;
        }
        cell.appendChild(gloss);
        let shadow = document.createElement("div");
        shadow.style.cssText = `position:absolute;bottom:0;left:0;right:0;height:28%;background:linear-gradient(0deg,rgba(0,0,0,0.40) 0%,rgba(0,0,0,0) 100%);pointer-events:none;`;
        cell.appendChild(shadow);
    },

    _buildCatBanner(cat) {
        let el = document.createElement("div");
        el.style.cssText = `background:linear-gradient(180deg,#2c3e78 0%,#1a2a5e 45%,#0e1a3d 100%);border:1.5px solid #3a4e90;border-top-color:#5a72c0;border-bottom-color:#07112a;border-radius:7px;padding:11px 50px;font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:700;letter-spacing:6px;color:white;text-align:center;align-self:stretch;box-shadow:0 4px 18px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.18);text-shadow:0 1px 4px rgba(0,0,0,0.7);flex-shrink:0;`;
        el.textContent = (cat || '').toUpperCase();
        return el;
    },

    // ── Tabellone ──────────────────────────────────────────────────
    _nuovaFrase(pool) {
        let lista = (pool && pool.length > 0) ? pool : FRASI_RUOTA;
        this.fraseCorrente = lista[Math.floor(Math.random()*lista.length)];
        this.lettereRivelate = new Set();
        this.fraseArray = this.fraseCorrente.frase.split('');
        this.fraseLettereScoperte = this.fraseArray.map(c => !/[A-ZÀ-Ö]/i.test(c));
        this._computeGriglia();
    },

    // Sceglie una frase da una categoria NON ancora usata in questa partita
    _nuovaFraseManche() {
        let tutteCategorie = [...new Set(FRASI_RUOTA.map(f => f.categoria))];
        let disponibili = tutteCategorie.filter(c => !this._categorieUsate.includes(c));
        if (disponibili.length === 0) {
            this._categorieUsate = [];
            disponibili = tutteCategorie;
        }
        let cat = disponibili[Math.floor(Math.random() * disponibili.length)];
        this._categorieUsate.push(cat);
        let pool = FRASI_RUOTA.filter(f => f.categoria === cat);
        this._nuovaFrase(pool);
    },

    _computeGriglia() {
        let frase = this.fraseCorrente ? this.fraseCorrente.frase : '';
        let RANGES = this.CELL_RANGES;
        let maxW = RANGES.map(r=>r.n);
        let griglia = Array.from({length:4},()=>Array(14).fill(null));
        let posMap  = Array.from({length:4},()=>Array(14).fill(-1));
        for (let r=0;r<4;r++) for (let c=RANGES[r].s;c<RANGES[r].s+RANGES[r].n;c++) griglia[r][c]=' ';
        if (!frase) { this._griglia=griglia; this._posMap=posMap; return; }
        let words = frase.split(' ');
        let lines = [], cur = '';
        for (let w of words) {
            let ri = lines.length, mw = ri<4 ? maxW[ri] : 12;
            if (!cur) { cur=w; }
            else if (cur.length+1+w.length<=mw) { cur+=' '+w; }
            else { lines.push(cur); cur=w; }
        }
        if (cur) lines.push(cur);
        let startRow = Math.max(0, Math.floor((4-lines.length)/2));
        for (let i=0;i<lines.length&&startRow+i<4;i++) {
            let r = startRow+i, line = lines[i], rng = RANGES[r];
            let startC = rng.s + Math.floor((rng.n - line.length)/2);
            for (let j=0;j<line.length;j++) { let c=startC+j; if(c>=0&&c<14) griglia[r][c]=line[j]; }
        }
        let gridLetters=[];
        for (let r=0;r<4;r++) for (let c=0;c<14;c++) {
            let ch=griglia[r][c]; if (ch!==null && ch!==' ') gridLetters.push({r,c});
        }
        let fraseIdxs=[];
        for (let i=0;i<frase.length;i++) if (/[A-ZÀ-Ö'`'']/i.test(frase[i])) fraseIdxs.push(i);
        for (let k=0;k<Math.min(gridLetters.length,fraseIdxs.length);k++) {
            let {r,c}=gridLetters[k]; posMap[r][c]=fraseIdxs[k];
        }
        this._griglia=griglia; this._posMap=posMap;
    },

    _rivelaLettera(lettera) {
        let l=lettera.toUpperCase();
        this.lettereRivelate.add(l);
        for (let i=0;i<this.fraseArray.length;i++)
            if (this.fraseArray[i].toUpperCase()===l) this.fraseLettereScoperte[i]=true;
    },
    _contaLettera(lettera) {
        let l=lettera.toUpperCase(), count=0;
        for (let c of this.fraseArray) if (c.toUpperCase()===l) count++;
        return count;
    },
    _tutteScoperte() { return this.fraseLettereScoperte.every(v=>v); },

    _tutteConsonantiRivelate() {
        if (!this.fraseCorrente) return false;
        const CONS = new Set('BCDFGHJKLMNPQRSTVWXYZ');
        for (let c of this.fraseCorrente.frase.toUpperCase()) {
            if (CONS.has(c) && !this.lettereRivelate.has(c)) return false;
        }
        return true;
    },

    _tutteVocaliRivelate() {
        if (!this.fraseCorrente) return false;
        const VOC = new Set('AEIOU');
        for (let c of this.fraseCorrente.frase.toUpperCase()) {
            if (VOC.has(c) && !this.lettereRivelate.has(c)) return false;
        }
        return true;
    },

    _buildTabellone() {
        let {CELL_W,CELL_H,CELL_GAP,CELL_RANGES}=this;
        let griglia=this._griglia, posMap=this._posMap;
        let totalW = 14*CELL_W + 13*CELL_GAP, totalH = 4*CELL_H + 3*CELL_GAP;
        let wrap = document.createElement("div");
        wrap.id = "ruota-tabellone";
        wrap.style.cssText = `position:relative;width:${totalW}px;height:${totalH}px;flex-shrink:0;`;
        let tc = this._mancheTabColor();
        let isDiagonal = this.manche === 2;
        for (let r=0;r<4;r++) {
            for (let c=0;c<14;c++) {
                let ch = griglia ? griglia[r][c] : null;
                if (ch===null) continue;
                let x = c*(CELL_W+CELL_GAP), y = r*(CELL_H+CELL_GAP);
                let cell = document.createElement("div");
                cell.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${CELL_W}px;height:${CELL_H}px;border-radius:5px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;overflow:hidden;`;
                if (ch===' ') {
                    let bg = this._mancheJackpot ? '#cc0000' : tc.bg;
                    let br = this._mancheJackpot ? '#ee3333' : tc.border;
                    cell.style.background = bg;
                    cell.style.border = `3px solid ${br}`;
                    this._addCellGloss(cell, isDiagonal);
                } else {
                    let fIdx = posMap ? posMap[r][c] : -1;
                    let scoperta = fIdx>=0 && this.fraseLettereScoperte[fIdx];
                    if (scoperta) {
                        cell.style.background = '#f4f4f4';
                        cell.style.border = '3px solid #c0c0c0';
                        cell.style.fontFamily = "'Barlow Condensed',sans-serif";
                        cell.style.fontSize = '52px'; cell.style.fontWeight = '800';
                        cell.style.color = '#111111';
                        cell.textContent = ch;
                    } else {
                        // Unrevealed letter cell — always white like a real game board
                        cell.style.background = '#e8e8e8';
                        cell.style.border = '3px solid #bbbbbb';
                    }
                }
                wrap.appendChild(cell);
            }
        }
        return wrap;
    },

    // Scores bar — mostra solo i punti del round attuale durante il gioco
    _buildScoresBar(mostraTotale) {
        let bar = document.createElement("div");
        bar.style.cssText = `display:flex;height:80px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.08);`;
        for (let i=0;i<3;i++) {
            let isActive = i===this.turno;
            let col = document.createElement("div");
            col.style.cssText = `
                flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
                border-right:${i<2?'1px solid rgba(255,255,255,0.07)':'none'};
                background:${isActive?'rgba(255,255,255,0.04)':'transparent'};
                position:relative;
            `;
            if (isActive) {
                let bar2=document.createElement("div");
                bar2.style.cssText=`position:absolute;bottom:0;left:15%;right:15%;height:3px;background:${this.COLORS[i]};border-radius:2px 2px 0 0;`;
                col.appendChild(bar2);
            }
            let nome=document.createElement("div");
            nome.innerHTML=this._nomeG(i)+(this.jolly[i]?' 🃏':'');
            nome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;letter-spacing:2px;color:${this.COLORS[i]};opacity:${isActive?'1':'0.6'};`;
            let sc=document.createElement("div");
            if (mostraTotale) {
                sc.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
                sc.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;color:${isActive?'white':'rgba(255,255,255,0.3)'};`;
            } else {
                // Mostra punti round (il totale in piccolo sotto)
                sc.innerHTML=this._fmtEuro(this.punteggioRound[i]);
                sc.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;color:${isActive?'#f0c800':'rgba(255,255,255,0.25)'};`;
                let tot=document.createElement("div");
                tot.innerHTML=`Totale: ${this._fmtEuro(this.punteggioGioco[i])}`;
                tot.style.cssText=`font-family:'Barlow',sans-serif;font-size:11px;color:rgba(255,255,255,0.3);line-height:1;`;
                col.appendChild(nome); col.appendChild(sc); col.appendChild(tot);
                bar.appendChild(col);
                continue;
            }
            col.appendChild(nome); col.appendChild(sc);
            bar.appendChild(col);
        }
        return bar;
    },

    // ── Ruota Canvas ───────────────────────────────────────────────
    _colorSeg(i, tipo, sp) {
        if (sp && sp.colore && sp.colore!=='#rainbow') return sp.colore;
        if (tipo==='bancarotta') return '#e8e8e8';
        if (tipo==='passa')      return '#d4d4c8';
        if (tipo==='jolly')      return '#f8f8f8';
        if (tipo==='raddoppia')  return '#16a34a';
        if (tipo==='jackpot')    return '#cc0000';
        if (tipo==='express')    return '#7B2FBE';
        return i%2===0?'#1e40af':'#1e3a8a';
    },

    _drawGlitter(ctx, cx, cy, R, sa, ea) {
        let now = performance.now();
        ctx.save();
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
        ctx.clip();
        // Animated rotating linear gradient: Oro, Viola, Azzurro, Argento
        let t = now * 0.0007;
        let midAng = (sa + ea) / 2;
        let gx1 = cx + Math.cos(t + midAng) * R;
        let gy1 = cy + Math.sin(t + midAng) * R;
        let gx2 = cx + Math.cos(t + midAng + Math.PI) * R;
        let gy2 = cy + Math.sin(t + midAng + Math.PI) * R;
        let grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
        grad.addColorStop(0,    '#FFD700');
        grad.addColorStop(0.33, '#8A2BE2');
        grad.addColorStop(0.66, '#00BFFF');
        grad.addColorStop(1,    '#C0C0C0');
        ctx.fillStyle = grad;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
        // Glitter: posizioni stabili, opacità/dimensione animate
        let t2 = now * 0.0035;
        for (let g = 0; g < 52; g++) {
            let frac = (g * 0.618033988749) % 1;
            let ang = sa + frac * (ea - sa);
            let rr = R * (0.2 + (((g * 2654435761) >>> 0) % 1000) / 1000 * 0.72);
            let gx = cx + Math.cos(ang) * rr;
            let gy = cy + Math.sin(ang) * rr;
            let alpha = 0.25 + 0.75 * Math.abs(Math.sin(t2 + g * 1.17));
            let sz = 1.1 + Math.abs(Math.sin(t2 * 0.8 + g * 0.93)) * 2.4;
            ctx.beginPath();
            ctx.arc(gx, gy, sz, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
            ctx.fill();
        }
        ctx.restore();
    },

    _drawExpressGlitter(ctx, cx, cy, R, sa, ea) {
        let now = performance.now();
        ctx.save();
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
        ctx.clip();
        let t = now * 0.0009;
        let midAng = (sa + ea) / 2;
        let gx1 = cx + Math.cos(t + midAng) * R;
        let gy1 = cy + Math.sin(t + midAng) * R;
        let gx2 = cx + Math.cos(t + midAng + Math.PI) * R;
        let gy2 = cy + Math.sin(t + midAng + Math.PI) * R;
        let grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
        grad.addColorStop(0,    '#7B2FBE');
        grad.addColorStop(0.35, '#C026D3');
        grad.addColorStop(0.65, '#4F46E5');
        grad.addColorStop(1,    '#A855F7');
        ctx.fillStyle = grad;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
        // Glitter abbondante — effetto brillantinato molto evidente
        let t2 = now * 0.0045;
        for (let g = 0; g < 70; g++) {
            let frac = (g * 0.618033988749) % 1;
            let ang = sa + frac * (ea - sa);
            let rr = R * (0.12 + (((g * 2654435761) >>> 0) % 1000) / 1000 * 0.82);
            let gx = cx + Math.cos(ang) * rr;
            let gy = cy + Math.sin(ang) * rr;
            let alpha = 0.4 + 0.6 * Math.abs(Math.sin(t2 + g * 1.05));
            let sz = 1.4 + Math.abs(Math.sin(t2 * 0.95 + g * 0.83)) * 3.0;
            ctx.beginPath();
            ctx.arc(gx, gy, sz, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
            ctx.fill();
        }
        ctx.restore();
    },

    _disegnaRuota(canvas, rotation) {
        let ctx = canvas.getContext("2d");
        let cx=canvas.width/2, cy=canvas.height/2;
        // R must leave room for the outer rim (rim = R * 1.053), so cap at cx * 0.93
        let R=cx*0.93;
        let sc=R/302; // scale factor relative to baseline radius
        let n=this.SPICCHI.length, slice=(Math.PI*2)/n;
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // ── Outer rim with glow ──
        ctx.save();
        ctx.shadowBlur=28*sc; ctx.shadowColor='rgba(80,100,255,0.7)';
        ctx.beginPath(); ctx.arc(cx,cy,R+16*sc,0,Math.PI*2);
        ctx.fillStyle='#0d1b4b'; ctx.fill();
        ctx.restore();

        ctx.beginPath(); ctx.arc(cx,cy,R+16*sc,0,Math.PI*2);
        ctx.strokeStyle='rgba(130,155,255,0.85)'; ctx.lineWidth=5*sc; ctx.stroke();
        // Thin gold outer accent
        ctx.beginPath(); ctx.arc(cx,cy,R+22*sc,0,Math.PI*2);
        ctx.strokeStyle='rgba(255,215,0,0.35)'; ctx.lineWidth=2*sc; ctx.stroke();

        // ── Segments ──
        for (let i=0;i<n;i++) {
            let sp = this.SPICCHI[i];
            let sa=-Math.PI/2+rotation+i*slice, ea=sa+slice;
            if (sp.colore==='#rainbow') {
                this._drawGlitter(ctx,cx,cy,R,sa,ea);
            } else if (sp.colore==='#express') {
                this._drawExpressGlitter(ctx,cx,cy,R,sa,ea);
            } else {
                ctx.beginPath(); ctx.moveTo(cx,cy);
                ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
                ctx.fillStyle=this._colorSeg(i,sp.tipo,sp); ctx.fill();
            }
            // Subtle inner highlight on each segment (lighter near rim edge)
            ctx.save();
            ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
            ctx.clip();
            let hg=ctx.createRadialGradient(cx,cy,R*0.5,cx,cy,R);
            hg.addColorStop(0,'rgba(0,0,0,0)'); hg.addColorStop(1,'rgba(255,255,255,0.08)');
            ctx.fillStyle=hg; ctx.fill();
            ctx.restore();

            // Divider
            ctx.beginPath(); ctx.moveTo(cx,cy);
            ctx.lineTo(cx+Math.cos(sa)*R, cy+Math.sin(sa)*R);
            ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1.5*sc; ctx.stroke();

            // Radial text
            let midAngle = sa + slice/2, textR = R * 0.68;
            ctx.save();
            ctx.translate(cx + Math.cos(midAngle)*textR, cy + Math.sin(midAngle)*textR);
            ctx.rotate(midAngle + Math.PI/2);
            ctx.textAlign='center'; ctx.textBaseline='middle';
            let textColor;
            if (sp.tipo==='bancarotta') textColor='#ffffff';
            else if (sp.tipo==='passa') textColor='#1e3a8a';
            else if (sp.tipo==='jolly'||sp.tipo==='raddoppia') textColor='#111111';
            else if (sp.tipo==='jackpot') textColor='#ffffff';
            else if (sp.tipo==='express') textColor='#ffffff';
            else if (sp.colore==='#rainbow') textColor='#111111';
            else textColor='#ffd700';
            ctx.shadowColor = (textColor==='#ffffff'||textColor==='#ffd700') ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.5)';
            ctx.shadowBlur=5*sc;
            ctx.fillStyle=textColor;
            let fs = Math.round(sp.label.length>7 ? 13*sc : sp.label.length>5 ? 15*sc : sp.label.length>3 ? 18*sc : 22*sc);
            ctx.font=`900 ${fs}px 'Barlow Condensed',sans-serif`;
            if (sp.label==='BANCAROTTA') {
                let bfs=Math.round(13*sc);
                ctx.font=`900 ${bfs}px 'Barlow Condensed',sans-serif`;
                ctx.fillText('BANCA',0,-8*sc); ctx.fillText('ROTTA',0,8*sc);
            } else {
                ctx.fillText(sp.label, 0, 0);
            }
            ctx.shadowBlur=0; ctx.restore();
        }

        // ── Gold inner ring ──
        ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2);
        ctx.strokeStyle='#ffd700'; ctx.lineWidth=3.5*sc; ctx.stroke();

        // ── Hub (metallic dark with gold rings) ──
        let hubR=R*0.28;
        ctx.beginPath(); ctx.arc(cx,cy,hubR,0,Math.PI*2);
        let hubG=ctx.createRadialGradient(cx-hubR*0.25,cy-hubR*0.25,hubR*0.05,cx,cy,hubR);
        hubG.addColorStop(0,'#2e1a5e'); hubG.addColorStop(0.55,'#1a0a3c'); hubG.addColorStop(1,'#080618');
        ctx.fillStyle=hubG; ctx.fill();
        ctx.strokeStyle='#ffd700'; ctx.lineWidth=5*sc; ctx.stroke();
        // Inner hub ring
        ctx.beginPath(); ctx.arc(cx,cy,hubR*0.62,0,Math.PI*2);
        ctx.strokeStyle='rgba(255,215,0,0.45)'; ctx.lineWidth=2*sc; ctx.stroke();
        // Center gold dot
        ctx.beginPath(); ctx.arc(cx,cy,hubR*0.22,0,Math.PI*2);
        ctx.fillStyle='#ffd700'; ctx.fill();

        // ── Pegs on the rim (3 per segment: 1 at boundary + 2 interior) ──
        const totalPegs = n * 3;
        for (let p=0; p<totalPegs; p++) {
            let pegAngle = -Math.PI/2 + rotation + p * (Math.PI*2) / totalPegs;
            let pegR = R + 8*sc;
            let px = cx + Math.cos(pegAngle) * pegR;
            let py = cy + Math.sin(pegAngle) * pegR;
            let isBoundary = (p % 3 === 0);
            ctx.beginPath(); ctx.arc(px, py, isBoundary ? 5.5*sc : 4*sc, 0, Math.PI*2);
            ctx.fillStyle = isBoundary ? '#ffd700' : '#ffe88a';
            ctx.fill();
            ctx.strokeStyle = 'rgba(30,10,60,0.7)'; ctx.lineWidth = 1*sc; ctx.stroke();
        }

        // ── Pointer (tip pointing INTO the wheel) ──
        let ps=20*sc;
        ctx.save();
        ctx.shadowBlur=14*sc; ctx.shadowColor='rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.moveTo(cx-ps, cy-R-20*sc);   // left base (above rim, outside)
        ctx.lineTo(cx+ps, cy-R-20*sc);   // right base (above rim, outside)
        ctx.lineTo(cx, cy-R+14*sc);       // tip (pointing INTO the wheel)
        ctx.closePath();
        ctx.fillStyle='#ffffff'; ctx.fill();
        ctx.shadowBlur=0;
        ctx.strokeStyle='rgba(30,30,80,0.7)'; ctx.lineWidth=2*sc; ctx.stroke();
        ctx.restore();
    },

    // ── Setup nomi ─────────────────────────────────────────────────
    setup() {
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:24px 100px;overflow-y:auto;`;
        let title=document.createElement("div");
        title.innerHTML="INSERISCI I NOMI";
        title.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:54px;font-weight:800;letter-spacing:6px;color:white;`;
        let sub=document.createElement("div");
        sub.innerHTML="3 giocatori · 7 manche · La ruota decide tutto";
        sub.style.cssText=`font-family:'Barlow',sans-serif;font-size:24px;color:rgba(255,255,255,0.4);margin-top:-20px;`;
        let inputsRow=document.createElement("div");
        inputsRow.style.cssText=`display:flex;gap:36px;width:100%;`;
        let labels=['GIOCATORE 1','GIOCATORE 2','GIOCATORE 3'];
        let inputs=[];
        let cpuToggles=[false,false,false];
        for (let i=0;i<3;i++) {
            let col=document.createElement("div");
            col.style.cssText=`flex:1;display:flex;flex-direction:column;gap:12px;`;
            let lbl=document.createElement("div");
            lbl.innerHTML=labels[i];
            lbl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:4px;color:${this.COLORS[i]};`;
            let inp=document.createElement("input");
            inp.type="text"; inp.placeholder=labels[i];
            inp.style.cssText=`background:rgba(255,255,255,0.07);border:2px solid ${this.COLORS[i]}55;border-radius:14px;padding:20px 24px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:700;color:white;outline:none;width:100%;box-sizing:border-box;`;
            // Pre-fill con il nome corrente (se non è il default o se è già personalizzato)
            inp.value = (this.nomi[i] !== labels[i]) ? this.nomi[i] : '';
            inp.addEventListener('focus',()=>inp.style.borderColor=this.COLORS[i]);
            inp.addEventListener('blur',()=>inp.style.borderColor=this.COLORS[i]+'55');
            // Salva in tempo reale mentre si digita
            let ii=i;
            inp.addEventListener('input',()=>{
                let v=inp.value.trim().toUpperCase();
                ruota.nomi[ii] = v || labels[ii];
            });
            // Toggle BOT
            let iBot=i; let botBtn=document.createElement("button");
            botBtn.innerHTML='🤖 &nbsp;BOT';
            botBtn.style.cssText=`padding:9px 18px;border-radius:10px;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;letter-spacing:3px;cursor:pointer;border:2px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.25);transition:all 0.15s;align-self:flex-start;`;
            botBtn.addEventListener('click',()=>{
                cpuToggles[iBot]=!cpuToggles[iBot];
                if (cpuToggles[iBot]) {
                    botBtn.style.background='rgba(240,200,0,0.15)'; botBtn.style.borderColor='rgba(240,200,0,0.6)'; botBtn.style.color='#f0c800';
                    inp.disabled=true; inp.style.opacity='0.35';
                } else {
                    botBtn.style.background='rgba(255,255,255,0.04)'; botBtn.style.borderColor='rgba(255,255,255,0.10)'; botBtn.style.color='rgba(255,255,255,0.25)';
                    inp.disabled=false; inp.style.opacity='1';
                }
            });
            inputs.push(inp); col.appendChild(lbl); col.appendChild(inp); col.appendChild(botBtn); inputsRow.appendChild(col);
        }
        // ── Sezione selezione manche ──
        let mancheNomi=['LA VELOCISSIMA','MANCHE 1','SE LA SAI RADDOPPI','IL JACKPOT','IL TRENO EXPRESS','IL TRIPLETE','LA SFIDA A TEMPO'];
        let mancheAttive=[true,true,true,true,true,true,true];
        let mancheSection=document.createElement("div");
        mancheSection.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;`;
        let mancheLabel=document.createElement("div");
        mancheLabel.innerHTML="SELEZIONA LE MANCHE DA GIOCARE";
        mancheLabel.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;letter-spacing:5px;color:rgba(255,255,255,0.28);`;
        let pillsRow=document.createElement("div");
        pillsRow.style.cssText=`display:flex;flex-wrap:wrap;gap:10px;justify-content:center;`;
        mancheNomi.forEach((nome,idx)=>{
            let pill=document.createElement("button");
            pill.innerHTML=nome;
            pill.style.cssText=`padding:10px 22px;border-radius:40px;font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;letter-spacing:2px;cursor:pointer;border:2px solid rgba(240,200,0,0.55);background:rgba(240,200,0,0.13);color:#f0c800;transition:all 0.15s;`;
            pill.addEventListener('click',()=>{
                let nAttive=mancheAttive.filter(x=>x).length;
                if (mancheAttive[idx] && nAttive<=1) return;
                mancheAttive[idx]=!mancheAttive[idx];
                if (mancheAttive[idx]) {
                    pill.style.background='rgba(240,200,0,0.13)'; pill.style.color='#f0c800';
                    pill.style.borderColor='rgba(240,200,0,0.55)'; pill.style.opacity='1';
                } else {
                    pill.style.background='rgba(255,255,255,0.04)'; pill.style.color='rgba(255,255,255,0.22)';
                    pill.style.borderColor='rgba(255,255,255,0.1)'; pill.style.opacity='0.55';
                }
            });
            pillsRow.appendChild(pill);
        });
        mancheSection.appendChild(mancheLabel);
        mancheSection.appendChild(pillsRow);

        let btn=document.createElement("button");
        btn.innerHTML="AVVIA LA PARTITA &#9654;";
        btn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:18px;padding:26px 110px;font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;letter-spacing:4px;cursor:pointer;box-shadow:0 8px 50px rgba(240,200,0,0.4);`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>{
            for (let i=0;i<3;i++) ruota.nomi[i]=cpuToggles[i]?'🤖 BOT':(inputs[i].value.trim().toUpperCase()||labels[i]);
            ruota._mancheDaSaltare=mancheAttive.map((a,i)=>a?-1:i).filter(i=>i>=0);
            let cpuSlots=cpuToggles.map((v,i)=>v?i:-1).filter(i=>i>=0);
            if (cpuSlots.length>0) ruotaCpu.attiva(cpuSlots,'media');
            else ruotaCpu.reset();
            ruota._avviaPartita();
        });
        wrap.appendChild(title); wrap.appendChild(sub); wrap.appendChild(inputsRow); wrap.appendChild(mancheSection); wrap.appendChild(btn);
        field.appendChild(wrap);
    },

    _avviaPartita() {
        this.manche=0; this.punteggioGioco=[0,0,0]; this.punteggioRound=[0,0,0];
        this.jolly=[false,false,false]; this._jollyPreso=false;
        this._giocoTerminato=false;
        if (!this._pendingTimeouts) this._pendingTimeouts=[];
        this._pendingTimeouts.forEach(id=>clearTimeout(id)); this._pendingTimeouts=[];
        // Salta le manches disabilitate fin dall'inizio
        while (this.manche <= 6 && this._mancheDaSaltare.includes(this.manche)) this.manche++;
        this._iniziaManche();
    },

    // ── Schermata Manche ───────────────────────────────────────────
    _iniziaManche() {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{
            clearInterval(ruota._termometroTimer); clearInterval(ruota._gongTimer);
            clearInterval(ruota._triletteTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let NOMI=['LA VELOCISSIMA','MANCHE 1','SE LA SAI RADDOPPI','IL JACKPOT','IL TRENO EXPRESS','IL TRIPLETE','LA SFIDA A TEMPO'];
        let DESC=[
            'Tabellone automatico — Il primo che si prenota e indovina vince 1.000 € e inizia per primo',
            'Ruota classica — Chi indovina congela i punti del round',
            'Ruota classica + mini-gioco bonus — Risolvi in 15 secondi e raddoppia il tuo punteggio!',
            'Il Salvadanaio — Accumula nel maialino o tenta di vincere il jackpot!',
            'Il Treno Express — 500€ a consonante, nessun errore o si riparte da zero!',
            'Tre tabelloni veloci — 1000 € per tabellone, bonus 5000 se li fai tutti',
            'Il Gong — Turni a tempo — La ruota decide il valore finale'
        ];
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;`;
        let tag=document.createElement("div");
        tag.innerHTML=`MANCHE ${this.manche+1} / 7`;
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:700;letter-spacing:8px;color:rgba(255,255,255,0.3);`;
        let titolo=document.createElement("div");
        titolo.innerHTML=NOMI[this.manche];
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;text-shadow:0 0 80px rgba(240,200,0,0.5);letter-spacing:4px;text-align:center;line-height:1;`;
        let desc=document.createElement("div");
        desc.innerHTML=DESC[this.manche];
        desc.style.cssText=`font-family:'Barlow',sans-serif;font-size:26px;color:rgba(255,255,255,0.45);text-align:center;max-width:900px;`;
        let scRow=document.createElement("div");
        scRow.style.cssText=`display:flex;gap:30px;`;
        for (let i=0;i<3;i++) {
            let cell=document.createElement("div");
            cell.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(255,255,255,0.05);border-radius:14px;padding:16px 36px;`;
            let n=document.createElement("div");
            n.innerHTML=this._nomeG(i)+(this.jolly[i]?' 🃏':'');
            n.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:3px;color:${this.COLORS[i]};`;
            let s=document.createElement("div");
            s.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            s.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;color:white;`;
            cell.appendChild(n); cell.appendChild(s); scRow.appendChild(cell);
        }
        let btn=document.createElement("button");
        btn.innerHTML="INIZIA &nbsp;&#9654;";
        btn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:16px;padding:26px 110px;font-family:'Barlow Condensed',sans-serif;font-size:42px;font-weight:800;letter-spacing:4px;cursor:pointer;box-shadow:0 8px 50px rgba(240,200,0,0.4);`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>ruota._startManche());
        wrap.appendChild(tag); wrap.appendChild(titolo); wrap.appendChild(desc); wrap.appendChild(scRow); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current="RuotaManche";
    },

    _startManche() {
        this.punteggioRound=[0,0,0]; this.faseGong=false;
        this._scalaManche();
        let chi;
        if (this.manche === 0) {
            chi = 0; // La Velocissima ha le proprie regole di inizio
        } else if (this._ultimoVincitore >= 0) {
            chi = (this._ultimoVincitore + 1) % 3; // il vincitore NON inizia per primo
        } else {
            let inizia=[0,0,1,this._playerConPiuPunti(),this._playerConPiuPunti(),2,this._playerConPiuPunti()];
            chi = inizia[this.manche] || 0;
        }
        this.turnoIniziale = chi;
        this.turno = chi;
        if (this.manche===0) { this._velocissima(); }
        else if (this.manche===3) { this._startJackpot(); }
        else if (this.manche===4) { this._startExpress(); }
        else if (this.manche===5) { this.sottomanche=0; this._trileteBonusRound=[0,0,0]; this.punteggioRound=[0,0,0]; this._prossimaTriplete(); }
        else if (this.manche===6) { this._startFinale(); }
        else { this._nuovaFraseManche(); grafica.puliscifield(); this._renderGioco(); main.current="RuotaGioco"; }
    },

    // ── La Velocissima ─────────────────────────────────────────────
    _velocissima() {
        this._nuovaFraseManche();
        this._termometroEliminate=[];
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · LA VELOCISSIMA",()=>{
            clearInterval(ruota._termometroTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        // Build positions of all letters, shuffle avoiding consecutive same char
        let posizioni = [];
        for (let i=0;i<this.fraseArray.length;i++)
            if (/[A-ZÀ-Öa-zà-ö]/i.test(this.fraseArray[i])) posizioni.push(i);
        posizioni = this._shuffleNoConsec(posizioni, p => this.fraseArray[p].toUpperCase());
        this._velPosizioniLettere = posizioni;
        this._velIdx = 0;

        let wrap=document.createElement("div");
        wrap.id="velocissima-wrap";
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;gap:20px;padding:24px 80px 30px;`;
        wrap.appendChild(this._buildTabellone());
        wrap.appendChild(this._buildCatBanner(this.fraseCorrente.categoria));

        let btnRow=document.createElement("div");
        btnRow.style.cssText=`display:flex;gap:24px;width:100%;margin-top:8px;`;
        for (let i=0;i<3;i++) {
            let isBot = typeof ruotaCpu !== 'undefined' && ruotaCpu._è(i);
            let btn=document.createElement("button");
            btn.id=`vel-btn-${i}`;
            btn.innerHTML=`${this._nomeG(i)} &mdash; ${isBot ? '🤖 BOT' : 'MI PRENOTO'}`;
            btn.style.cssText=`flex:1;padding:22px;background:rgba(255,255,255,0.07);border:2px solid ${this.COLORS[i]}66;border-radius:14px;color:${this.COLORS[i]};font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;cursor:${isBot?'default':'pointer'};letter-spacing:2px;pointer-events:${isBot?'none':'auto'};opacity:${isBot?'0.5':'1'};`;
            let idx=i;
            if (!isBot) btn.addEventListener('click',()=>ruota._velocissimaPrenota(idx));
            btnRow.appendChild(btn);
        }
        wrap.appendChild(btnRow);
        field.appendChild(wrap);
        main.current="RuotaTermometro";

        let _velTimerId;
        _velTimerId = this._termometroTimer = setInterval(()=>{
            if (main.current !== "RuotaTermometro") {
                clearInterval(_velTimerId);
                if (ruota._termometroTimer === _velTimerId) ruota._termometroTimer = null;
                return;
            }
            if (ruota._velIdx >= ruota._velPosizioniLettere.length) {
                clearInterval(_velTimerId);
                if (ruota._termometroTimer === _velTimerId) ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato!","#888");
                let _m=ruota.manche; ruota._queueTimeout(()=>ruota._mostraFraseNascosta(()=>ruota._avanzaManche(_m)),1500);
                return;
            }
            let pos = ruota._velPosizioniLettere[ruota._velIdx++];
            ruota.fraseLettereScoperte[pos] = true;
            ruota._playRevealLetter();
            let tab=document.getElementById("ruota-tabellone");
            if (tab) tab.replaceWith(ruota._buildTabellone());
            if (ruota._tutteScoperte()) {
                clearInterval(_velTimerId);
                if (ruota._termometroTimer === _velTimerId) ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato!","#888");
                let _m=ruota.manche; ruota._queueTimeout(()=>ruota._mostraFraseNascosta(()=>ruota._avanzaManche(_m)),1500);
            }
        },2000);
    },

    _velocissimaPrenota(playerIdx) {
        if (this._termometroEliminate.includes(playerIdx)) return;
        if (typeof ruotaCpu !== 'undefined' && ruotaCpu._è(playerIdx)) {
            ruotaCpu._handleVelocissima(playerIdx);
            return;
        }
        clearInterval(this._termometroTimer); this._termometroTimer = null;
        ruota._buildVKSoluzione({
            titolo: `${this._nomeG(playerIdx)} &mdash; DAI LA SOLUZIONE`,
            colore: this.COLORS[playerIdx],
            overlayId: 'vel-overlay',
            posFixed: false,
            containerEl: field,
            annullaTesto: '← ANNULLA',
            onAnnulla: () => ruota._velocissima_resumeTimer(),
            onConferma: (risposta) => {
                let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
                if (risposta === corretta) {
                    ruota._playCorrectSolution();
                    ruota.punteggioGioco[playerIdx] += 1000;
                    ruota.turnoIniziale = playerIdx; ruota.turno = playerIdx;
                    ruota._showToast(`${ruota._nomeG(playerIdx)} vince La Velocissima! +1.000 €`, "#22cc66");
                    let _mv1 = ruota.manche; ruota._queueTimeout(() => ruota._avanzaManche(_mv1), 2000);
                } else {
                    ruota._playWrongSolution();
                    ruota._termometroEliminate.push(playerIdx);
                    ruota._showToast("Sbagliato!", "#ff4444");
                    ruota._queueTimeout(() => {
                        let btn = document.getElementById(`vel-btn-${playerIdx}`);
                        if (btn) { btn.style.opacity = '0.25'; btn.style.pointerEvents = 'none'; }
                        if (ruota._termometroEliminate.length >= 3) {
                            ruota._showToast("Tutti eliminati!", "#888");
                            let _mv2 = ruota.manche; ruota._queueTimeout(() => ruota._mostraFraseNascosta(()=>ruota._avanzaManche(_mv2)), 1500);
                        } else { ruota._velocissima_resumeTimer(); }
                    }, 1400);
                }
            }
        });
    },

    _velocissima_resumeTimer() {
        let _resumeTimerId;
        _resumeTimerId = this._termometroTimer = setInterval(()=>{
            if (main.current !== "RuotaTermometro") {
                clearInterval(_resumeTimerId);
                if (ruota._termometroTimer === _resumeTimerId) ruota._termometroTimer = null;
                return;
            }
            if (ruota._velIdx >= ruota._velPosizioniLettere.length) {
                clearInterval(_resumeTimerId);
                if (ruota._termometroTimer === _resumeTimerId) ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato!","#888");
                let _mr=ruota.manche; ruota._queueTimeout(()=>ruota._mostraFraseNascosta(()=>ruota._avanzaManche(_mr)),1500);
                return;
            }
            let pos = ruota._velPosizioniLettere[ruota._velIdx++];
            ruota.fraseLettereScoperte[pos] = true;
            let tab=document.getElementById("ruota-tabellone");
            if (tab) tab.replaceWith(ruota._buildTabellone());
            if (ruota._tutteScoperte()) {
                clearInterval(_resumeTimerId);
                if (ruota._termometroTimer === _resumeTimerId) ruota._termometroTimer = null;
                ruota._showToast("Nessuno si è prenotato!","#888");
                let _mr=ruota.manche; ruota._queueTimeout(()=>ruota._mostraFraseNascosta(()=>ruota._avanzaManche(_mr)),1500);
            }
        },2000);
    },

    // ── Render Gioco ───────────────────────────────────────────────
    _renderGioco() {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        // Usa coordinate virtuali del field (1920px fisso, scalato via CSS)
        const W = fieldWidth;  // 1920
        // Pannello destra: 560px virtuali (=29% di 1920), stesso dell'originale
        const rightW = 560;
        const wheelW = rightW - 40;
        const wheelH = Math.round(wheelW / 2);

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;overflow:hidden;`;
        wrap.appendChild(this._buildScoresBar(false));

        let center=document.createElement("div");
        center.style.cssText=`flex:1;display:flex;min-height:0;overflow:hidden;`;

        let leftPanel=document.createElement("div");
        leftPanel.style.cssText=`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:12px;min-width:0;overflow:hidden;`;
        if (this._expressTurn) {
            let exRiq = this._buildExpressRiquadro();
            exRiq.style.alignSelf = 'flex-start';
            leftPanel.appendChild(exRiq);
        }
        if (this._mancheJackpot) leftPanel.appendChild(this._buildSalvadanaio());
        leftPanel.appendChild(this._buildTabellone());
        leftPanel.appendChild(this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : ''));

        let rightPanel=document.createElement("div");
        rightPanel.style.cssText=`flex:0 0 ${rightW}px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 16px;gap:12px;border-left:1px solid rgba(255,255,255,0.07);overflow:hidden;box-sizing:border-box;`;

        let turnoInfo=document.createElement("div");
        turnoInfo.style.cssText=`text-align:center;`;
        let turnoLabel=document.createElement("div");
        turnoLabel.innerHTML="TURNO DI";
        turnoLabel.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:16px;letter-spacing:5px;color:rgba(255,255,255,0.3);`;
        let turnoNome=document.createElement("div");
        turnoNome.innerHTML=this._nomeTurno();
        turnoNome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:${this.COLORS[this.turno]};letter-spacing:2px;`;
        turnoInfo.appendChild(turnoLabel); turnoInfo.appendChild(turnoNome);
        rightPanel.appendChild(turnoInfo);

        // Mezza ruota (semicerchio superiore) — dimensioni responsive
        let wheelWrapG=document.createElement("div");
        wheelWrapG.style.cssText=`position:relative;overflow:hidden;width:${wheelW}px;height:${wheelH}px;flex-shrink:0;`;
        let canvas=document.createElement("canvas");
        canvas.width=wheelW*2; canvas.height=wheelW*2;
        canvas.style.cssText=`position:absolute;top:0;left:0;width:${wheelW}px;height:${wheelW}px;`;
        this._disegnaRuota(canvas,0);
        wheelWrapG.appendChild(canvas);
        rightPanel.appendChild(wheelWrapG);
        rightPanel.appendChild(this._buildAzioni());

        center.appendChild(leftPanel); center.appendChild(rightPanel);
        wrap.appendChild(center); field.appendChild(wrap);
    },

    _buildAzioni() {
        let wrap=document.createElement("div");
        wrap.style.cssText=`display:flex;flex-direction:column;gap:16px;width:100%;`;
        let canBuyVocal = this.punteggioRound[this.turno]>=500;
        let tutteConsRiv = this._tutteConsonantiRivelate();
        let tutteVocRiv = this._tutteVocaliRivelate();
        let isBotTurn = typeof ruotaCpu !== 'undefined' && ruotaCpu._è(this.turno);
        let btnGira=this._mkBtn("🎡  GIRA LA RUOTA","#f0c800","#1a0a3c",()=>ruota._giraRuota(),this.attesaLettera||this._expressTurn||tutteConsRiv||isBotTurn);
        let btnVocale=this._mkBtn(`🔤  VOCALE · 500 €`,"rgba(255,255,255,0.07)","rgba(255,255,255,0.7)",()=>ruota._apriCompraVocale(),!canBuyVocal||this.attesaLettera||tutteVocRiv||isBotTurn);
        let btnSol=this._mkBtn("💡  DAI LA SOLUZIONE","rgba(34,204,102,0.1)","#22cc66",()=>ruota._apriSoluzione(),isBotTurn);
        wrap.appendChild(btnGira);
        if (this._expressTurn && !this.attesaLettera) {
            wrap.appendChild(this._mkBtn("🚄  CHIAMA CONSONANTE","rgba(123,47,190,0.18)","#c084fc",()=>ruota._apriChiamataLettera(false),isBotTurn));
        }
        wrap.appendChild(btnVocale); wrap.appendChild(btnSol);

        // GONG button nel finale pre-gong
        if (this.manche===6 && !this.faseGong) {
            let gongBtn=document.createElement("button");
            gongBtn.innerHTML="🔔 &nbsp; GONG — INIZIA LA FASE FINALE";
            gongBtn.style.cssText=`width:100%;padding:26px 20px;background:rgba(240,60,0,0.15);color:#ff6633;border:2px solid rgba(240,60,0,0.55);border-radius:18px;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;letter-spacing:2px;cursor:pointer;margin-top:4px;text-align:left;`;
            gongBtn.addEventListener('click',()=>ruota._giraRuotaFinale());
            wrap.appendChild(gongBtn);
        }
        return wrap;
    },

    _mkBtn(label,bg,color,onClick,disabled) {
        let btn=document.createElement("button");
        btn.innerHTML=label;
        btn.style.cssText=`width:100%;padding:28px 24px;background:${bg};color:${color};border:2px solid rgba(255,255,255,0.13);border-radius:18px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;letter-spacing:2px;text-align:left;cursor:pointer;opacity:${disabled?'0.28':'1'};pointer-events:${disabled?'none':'auto'};transition:opacity 0.15s;`;
        btn.addEventListener('click',onClick);
        return btn;
    },

    // ── Audio ──────────────────────────────────────────────────────
    _audioCtx: null,
    _getAudioCtx() {
        if (!this._audioCtx) {
            try { this._audioCtx = new (window.AudioContext||window.webkitAudioContext)(); } catch(e) {}
        }
        return this._audioCtx;
    },
    _resumeAudio() {
        let ac = this._getAudioCtx();
        if (ac && ac.state === 'suspended') ac.resume();
    },
    _playTick(speed) {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        let freq = 280 + Math.min(Math.abs(speed), 0.05) / 0.05 * 520;
        o.frequency.setValueAtTime(freq, ctx.currentTime);
        o.type = 'triangle';
        g.gain.setValueAtTime(0.2, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.055);
    },
    _playWin() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [523, 659, 784, 1046].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
            let t = ctx.currentTime + i * 0.12;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.22, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
            o.start(t); o.stop(t + 0.28);
        });
    },
    _playBancarotta() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        // Low rumble + descending crash
        [220, 180, 140, 110, 80].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sawtooth';
            o.frequency.setValueAtTime(freq, ctx.currentTime);
            o.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.8);
            let t = ctx.currentTime + i * 0.08;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.28, t + 0.03);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
            o.start(t); o.stop(t + 0.9);
        });
        // Short noise burst
        let buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
        let d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i/d.length);
        let noise = ctx.createBufferSource(), ng = ctx.createGain();
        noise.buffer = buf; noise.connect(ng); ng.connect(ctx.destination);
        ng.gain.setValueAtTime(0.35, ctx.currentTime);
        ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        noise.start(ctx.currentTime);
    },
    _playPassa() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(600, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);
        g.gain.setValueAtTime(0.2, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.4);
    },
    _playJolly() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [392, 523, 659, 784, 1047].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
            let t = ctx.currentTime + i * 0.09;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.25, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            o.start(t); o.stop(t + 0.22);
        });
    },
    _playRaddoppia() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [[523,659],[784,987]].forEach(([f1,f2], i) => {
            [f1,f2].forEach((freq, j) => {
                let o = ctx.createOscillator(), g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'square'; o.frequency.setValueAtTime(freq/2, ctx.currentTime);
                let t = ctx.currentTime + i * 0.22 + j * 0.05;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.18, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                o.start(t); o.stop(t + 0.2);
            });
        });
    },
    _playSwoosh() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        let d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / d.length);
        let src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
        src.buffer = buf; f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.5;
        src.connect(f); f.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0.15, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        src.start(ctx.currentTime);
    },
    _playCorrectLetter() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [880, 1108].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
            let t = ctx.currentTime + i * 0.08;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.2, t + 0.015);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
            o.start(t); o.stop(t + 0.28);
        });
    },
    _playWrongLetter() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square';
        o.frequency.setValueAtTime(140, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.32);
        g.gain.setValueAtTime(0.22, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.32);
    },
    _playCorrectSolution() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [523, 659, 784, 1046, 1319, 1568].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
            let t = ctx.currentTime + i * 0.11;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.26, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.40);
            o.start(t); o.stop(t + 0.40);
        });
    },
    _playWrongSolution() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [180, 130].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'square';
            o.frequency.setValueAtTime(freq, ctx.currentTime);
            o.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + 0.3);
            let t = ctx.currentTime + i * 0.33;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.26, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            o.start(t); o.stop(t + 0.3);
        });
    },
    _playTimerTick() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'triangle'; o.frequency.setValueAtTime(900, ctx.currentTime);
        g.gain.setValueAtTime(0.18, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.07);
    },
    _playTimeUp() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [600, 400, 260].forEach((freq, i) => {
            let o = ctx.createOscillator(), g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
            o.frequency.exponentialRampToValueAtTime(freq * 0.65, ctx.currentTime + 0.55);
            let t = ctx.currentTime + i * 0.22;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.22, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
            o.start(t); o.stop(t + 0.55);
        });
    },
    _playVerdetto() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        [[523,659,784],[784,1046,1319],[1046,1319,1568],[1319,1568,2093]].forEach(([f1,f2,f3], i) => {
            [f1,f2,f3].forEach((freq, j) => {
                let o = ctx.createOscillator(), g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.type = 'sine'; o.frequency.setValueAtTime(freq, ctx.currentTime);
                let t = ctx.currentTime + i * 0.19 + j * 0.04;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.2, t + 0.03);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
                o.start(t); o.stop(t + 0.55);
            });
        });
    },
    _playRevealLetter() {
        this._resumeAudio();
        let ctx = this._getAudioCtx(); if (!ctx) return;
        let o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine'; o.frequency.setValueAtTime(1100, ctx.currentTime);
        g.gain.setValueAtTime(0.11, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.1);
    },

    // ── Gira Ruota (swipe gesture + mezza ruota) ──────────────────
    _giraRuota() {
        if (this.attesaLettera) return;
        main.current="RuotaSpin";
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});

        // Use field virtual coordinates (fieldWidth=1920, fieldHeight scales with screen)
        const FW = fieldWidth;          // always 1920
        const FH = fieldHeight;         // virtual height (e.g. ~886 on landscape mobile)
        const avFH = FH - 64;           // below status bar
        const naturalH = FW / 2;        // 960 — natural semicircle height
        const minBottom = 110;
        const visibleWheelH = Math.min(naturalH, avFH - minBottom);
        const bottomH = avFH - visibleWheelH;

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;height:${avFH}px;overflow:hidden;`;

        let wheelWrap=document.createElement("div");
        wheelWrap.style.cssText=`position:absolute;top:0;left:0;width:${FW}px;height:${visibleWheelH}px;overflow:hidden;`;
        let canvas=document.createElement("canvas");
        canvas.width=FW; canvas.height=FW; // 1920×1920 — full circle in field coords
        canvas.style.cssText=`position:absolute;top:0;left:0;width:${FW}px;height:${FW}px;cursor:grab;touch-action:none;`;
        wheelWrap.appendChild(canvas);

        let bottomPanel=document.createElement("div");
        bottomPanel.style.cssText=`position:absolute;top:${visibleWheelH}px;left:0;right:0;height:${bottomH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;`;

        let hintEl=document.createElement("div");
        hintEl.innerHTML="↔  Trascina la ruota per farla girare";
        hintEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:36px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-align:center;`;

        let risultatoEl=document.createElement("div");
        risultatoEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:80px;font-weight:800;color:#f0c800;letter-spacing:4px;text-align:center;line-height:1;`;

        let continuaBtn=document.createElement("button");
        continuaBtn.innerHTML="CONTINUA";
        continuaBtn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:16px;padding:18px 120px;font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:4px;cursor:pointer;display:none;`;

        bottomPanel.appendChild(hintEl);
        bottomPanel.appendChild(risultatoEl);
        bottomPanel.appendChild(continuaBtn);
        wrap.appendChild(wheelWrap);
        wrap.appendChild(bottomPanel);
        field.appendChild(wrap);

        let rotation=ruota._lastRotation;
        ruota._disegnaRuota(canvas, rotation);

        // Peg tracking: 3 pegs per segment — used for tick sound AND impulse deceleration
        const TOTAL_PEGS = ruota.SPICCHI.length * 3;
        // Velocity lost per peg impact (rad/ms) — main realistic braking force
        const PEG_IMPULSE = 0.000058;
        let lastPeg = -1;

        const getPeg = (rot) => {
            let norm = ((-rot)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
            return Math.floor(norm * TOTAL_PEGS / (Math.PI*2)) % TOTAL_PEGS;
        };

        let isDragging=false, lastAngle=0, velocity=0, lastTime=0, spinDone=false, animFrame=null;

        const getPoint=(e)=>e.touches?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY};
        const getAngleAt=(pt)=>{
            let rect=canvas.getBoundingClientRect();
            return Math.atan2(pt.y-(rect.top+rect.height/2), pt.x-(rect.left+rect.width/2));
        };

        const cleanup=()=>{
            document.removeEventListener('mousemove',onMove);
            document.removeEventListener('touchmove',onMove);
            document.removeEventListener('mouseup',onEnd);
            document.removeEventListener('touchend',onEnd);
            window.removeEventListener('blur',onEnd);
            canvas.style.cursor='grab';
            document.body.style.userSelect='';
        };

        const onStart=(e)=>{
            if (spinDone) return;
            ruota._resumeAudio();
            ruota._playSwoosh();
            e.preventDefault();
            isDragging=true; velocity=0; lastTime=performance.now();
            lastAngle=getAngleAt(getPoint(e));
            canvas.style.cursor='grabbing';
            document.body.style.userSelect='none';
            window.addEventListener('blur',onEnd);
        };

        const onMove=(e)=>{
            if (!isDragging||spinDone) return;
            e.preventDefault();
            let pt=getPoint(e);
            let curAngle=getAngleAt(pt);
            let delta=curAngle-lastAngle;
            while(delta>Math.PI) delta-=2*Math.PI;
            while(delta<-Math.PI) delta+=2*Math.PI;
            // Solo senso orario (delta positivo)
            if (delta<0) delta=0;
            let now=performance.now(), dt=now-lastTime;
            if (dt>0) velocity=delta/dt;
            rotation+=delta;
            ruota._disegnaRuota(canvas, rotation);
            tryTick(rotation, velocity);
            lastAngle=curAngle; lastTime=now;
        };

        const onEnd=()=>{
            if (!isDragging) return;
            isDragging=false; canvas.style.cursor='grab';
            if (Math.abs(velocity)<0.003) {
                ruota._showToast("Troppo lento! Trascina più velocemente.","#ff8800");
                return;
            }
            spinDone=true; hintEl.innerHTML="";
            cleanup();
            let vel=velocity, prevTime=performance.now();
            lastPeg = getPeg(rotation);
            const animate=(now)=>{
                let dt=Math.min(now-prevTime,50); prevTime=now;
                // Continuous bearing friction (light — pegs do most of the work)
                vel *= Math.pow(0.9990, dt/16.67);
                rotation += vel * dt;
                // Peg impulse: each peg crossing subtracts a fixed speed (realistic deceleration)
                let curPeg = getPeg(rotation);
                if (curPeg !== lastPeg) {
                    lastPeg = curPeg;
                    vel = Math.max(0, vel - PEG_IMPULSE);
                    ruota._playTick(Math.abs(vel));
                }
                ruota._disegnaRuota(canvas, rotation);
                if (Math.abs(vel)>0.00003) { animFrame=requestAnimationFrame(animate); }
                else {
                    let n=ruota.SPICCHI.length, sliceAngle=(Math.PI*2)/n;
                    let normalized=((-rotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                    let spiccioVincente=Math.floor(normalized/sliceAngle)%n;
                    let sp=ruota.SPICCHI[spiccioVincente];
                    risultatoEl.innerHTML=sp.label;
                    // Flash winning segment 3 times
                    let flashCount=0;
                    const flashWin=()=>{
                        ruota._disegnaRuota(canvas, rotation);
                        let ctx2=canvas.getContext('2d');
                        let cx2=canvas.width/2, cy2=canvas.height/2, R2=cx2*0.93;
                        let sa=(-Math.PI/2)+rotation+spiccioVincente*sliceAngle;
                        ctx2.save();
                        ctx2.shadowBlur=60; ctx2.shadowColor='rgba(255,255,200,0.95)';
                        ctx2.globalAlpha=0.38*(1-flashCount/3);
                        ctx2.beginPath(); ctx2.moveTo(cx2,cy2);
                        ctx2.arc(cx2,cy2,R2,sa,sa+sliceAngle); ctx2.closePath();
                        ctx2.fillStyle='#ffffff'; ctx2.fill();
                        ctx2.restore();
                        flashCount++;
                        if (flashCount<4) setTimeout(flashWin, 160);
                        else { continuaBtn.style.display='block'; }
                    };
                    ruota._lastRotation = rotation;
                    flashWin();
                    continuaBtn.onclick=()=>ruota._dopoRuota(sp,spiccioVincente);
                }
            };
            prevTime=performance.now();
            animFrame=requestAnimationFrame(animate);
        };

        canvas.addEventListener('mousedown',onStart);
        canvas.addEventListener('touchstart',onStart,{passive:false});
        document.addEventListener('mousemove',onMove);
        document.addEventListener('touchmove',onMove,{passive:false});
        document.addEventListener('mouseup',onEnd);
        document.addEventListener('touchend',onEnd);
        document.addEventListener('pointercancel',cleanup);
    },

    _giraRuotaBot(onResult) {
        main.current = "RuotaSpin";
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        const FW = fieldWidth, FH = fieldHeight, avFH = FH - 64;
        const visibleWheelH = Math.min(FW / 2, avFH - 110);
        const bottomH = avFH - visibleWheelH;
        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;height:${avFH}px;overflow:hidden;`;
        let wheelWrap = document.createElement("div");
        wheelWrap.style.cssText = `position:absolute;top:0;left:0;width:${FW}px;height:${visibleWheelH}px;overflow:hidden;`;
        let canvas = document.createElement("canvas");
        canvas.width = FW; canvas.height = FW;
        canvas.style.cssText = `position:absolute;top:0;left:0;width:${FW}px;height:${FW}px;`;
        wheelWrap.appendChild(canvas);
        let bottomPanel = document.createElement("div");
        bottomPanel.style.cssText = `position:absolute;top:${visibleWheelH}px;left:0;right:0;height:${bottomH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;`;
        let risultatoEl = document.createElement("div");
        risultatoEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:80px;font-weight:800;color:#f0c800;letter-spacing:4px;text-align:center;line-height:1;`;
        bottomPanel.appendChild(risultatoEl);
        wrap.appendChild(wheelWrap); wrap.appendChild(bottomPanel); field.appendChild(wrap);
        let n = this.SPICCHI.length, sliceAngle = (Math.PI * 2) / n;
        let startRot = this._lastRotation || 0;
        let extraSpins = (5 + Math.floor(Math.random() * 4)) * Math.PI * 2;
        let duration = 2400 + Math.random() * 800;
        let startTime = performance.now();
        ruota._disegnaRuota(canvas, startRot);
        const anim = (now) => {
            if (main.current !== 'RuotaSpin') return;
            let t = Math.min((now - startTime) / duration, 1);
            let ease = 1 - Math.pow(1 - t, 3);
            let rot = startRot + extraSpins * ease;
            ruota._disegnaRuota(canvas, rot);
            if (t < 1) { requestAnimationFrame(anim); }
            else {
                ruota._lastRotation = rot;
                let normalized = ((-rot) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
                let spiccioVincente = Math.floor(normalized / sliceAngle) % n;
                let sp = ruota.SPICCHI[spiccioVincente];
                risultatoEl.innerHTML = sp.label;
                ruota._playWin();
                setTimeout(() => onResult(sp, spiccioVincente), 1300);
            }
        };
        requestAnimationFrame(anim);
    },

    _animaRuota(canvas, risultatoEl, continuaBtn, onDone, duration) {
        let n=this.SPICCHI.length, sliceAngle=(Math.PI*2)/n;
        let idxTarget=Math.floor(Math.random()*n);
        let fullRot=5+Math.floor(Math.random()*4);
        let totalAngle=fullRot*Math.PI*2 + (n-idxTarget)*sliceAngle - sliceAngle*0.5;
        let startTime=performance.now();
        let anim=(now)=>{
            let t=Math.min((now-startTime)/duration,1);
            let ease=1-Math.pow(1-t,3);
            ruota._disegnaRuota(canvas,totalAngle*ease);
            if (t<1) { requestAnimationFrame(anim); }
            else {
                let normalized=((-totalAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                let spiccioVincente=Math.floor(normalized/sliceAngle)%n;
                let sp=ruota.SPICCHI[spiccioVincente];
                if (risultatoEl) risultatoEl.innerHTML=sp.label;
                if (continuaBtn) { continuaBtn.style.display='block'; continuaBtn.onclick=()=>onDone(sp,spiccioVincente); }
                else onDone(sp,spiccioVincente);
            }
        };
        requestAnimationFrame(anim);
    },

    _dopoRuota(sp,idx) {
        if (sp.tipo==='bancarotta') {
            this._playBancarotta();
            this._chiedeJolly("💥 BANCAROTTA!", "#ff4444",
                ()=>{ this._playJolly(); this._showToast("🃏 Jolly usato — Bancarotta annullata!","#a855f7"); setTimeout(()=>{ ruota._renderGioco(); main.current="RuotaGioco"; },2000); },
                ()=>{ this.punteggioRound[this.turno]=0; this.punteggioGioco[this.turno]=0; this._showToast("💥 BANCAROTTA! Perdi tutto.","#ff4444"); setTimeout(()=>ruota._passaTurno(),2000); }
            );
        } else if (sp.tipo==='passa') {
            this._playPassa();
            this._chiedeJolly("PASSA — il turno passerebbe.", "#888888",
                ()=>{ this._playJolly(); this._showToast("🃏 Jolly usato — il turno resta tuo!","#a855f7"); setTimeout(()=>{ ruota._renderGioco(); main.current="RuotaGioco"; },2000); },
                ()=>{ this._showToast("PASSA — il turno passa.","#888888"); setTimeout(()=>ruota._passaTurno(),1800); }
            );
        } else if (sp.tipo==='jolly') {
            this._playJolly();
            // Lo spicchio resta finché il giocatore chiama una consonante CORRETTA
            this._jollyIdx = idx;
            this.valoreRuota = 200; // valore per la consonante che si chiama
            this.attesaLettera = true; this._tipoAzione = 'jolly';
            this._showToast("🃏 JOLLY! Chiama una consonante per guadagnarlo!","#7B2FBE");
            setTimeout(()=>ruota._apriChiamataLettera(false), 1800);
        } else if (sp.tipo==='jackpot') {
            this._playWin();
            this._mostraSceltaJackpot();
        } else if (sp.tipo==='express') {
            this._playWin();
            this._expressTurn = true;
            this.valoreRuota = 500;
            this.attesaLettera = true;
            this._tipoAzione = 'euro';
            this._showToast("🚄 EXPRESS! 500€ a consonante — nessun errore!", "#7B2FBE");
            setTimeout(()=>ruota._apriChiamataLettera(false), 1800);
        } else if (sp.tipo==='raddoppia') {
            this._playRaddoppia();
            // Lo spicchio resta finché il giocatore chiama una lettera CORRETTA
            this._raddoppiaIdx = idx;
            this._showToast("✖2 RADDOPPIA! Chiama una consonante.","#059669");
            this.attesaLettera=true; this._tipoAzione='raddoppia';
            setTimeout(()=>ruota._apriChiamataLettera(true),1800);
        } else {
            this._playWin();
            this.valoreRuota=sp.valore;
            this.attesaLettera=true; this._tipoAzione='euro';
            setTimeout(()=>ruota._apriChiamataLettera(false),1200);
        }
    },

    // ── Chiama Lettera ─────────────────────────────────────────────
    _apriChiamataLettera(isRaddoppia) {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        let wrap=document.createElement("div");
        wrap.className='ruota-lettera-screen';

        // ── Tabellone centrato verticalmente ──
        let tabEl=this._buildTabellone();
        let tabW = 14*this.CELL_W + 13*this.CELL_GAP;
        let tabScale=Math.min(1.0, (fieldWidth - 32) / tabW);
        tabEl.style.transform=`scale(${tabScale})`;
        tabEl.style.transformOrigin='center center';
        tabEl.style.marginBottom=Math.round((tabScale-1)*(4*this.CELL_H+3*this.CELL_GAP)*0.5)+'px';
        wrap.appendChild(tabEl);

        // ── Banner categoria ──
        let catBannerL = this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : '');
        catBannerL.style.cssText += 'margin:0;padding:7px 60px;font-size:26px;';
        wrap.appendChild(catBannerL);

        // ── Titolo ──
        let titolo=document.createElement("div");
        titolo.innerHTML=isRaddoppia
            ? `✖2 RADDOPPIA · Chiama una consonante`
            : (ruota._tipoAzione === 'jolly'
                ? `🃏 JOLLY · Chiama una consonante per guadagnarlo!`
                : `<strong style="color:#f0c800">${this._fmtEuro(this.valoreRuota)}</strong> · Chiama una consonante`);
        titolo.className='ruota-lettera-titolo';
        wrap.appendChild(titolo);

        // ── 2 righe di consonanti centrate ──
        let isBotTurnL = typeof ruotaCpu !== 'undefined' && ruotaCpu._è(ruota.turno);
        const ROW1 = 'BCDFGHJKLMN';
        const ROW2 = 'PQRSTVWXYZ';
        const makeRow = (letters) => {
            let row = document.createElement("div");
            row.className='ruota-tastiera-riga';
            for (let l of letters) {
                let btn=document.createElement("button");
                btn.className='ruota-lettera-btn';
                btn.dataset.lettera=l;
                btn.innerHTML=l;
                if (!isBotTurnL) btn.addEventListener('click',()=>ruota._confermaCons(l,isRaddoppia));
                else { btn.style.pointerEvents='none'; btn.style.opacity='0.35'; btn.style.cursor='default'; }
                row.appendChild(btn);
            }
            return row;
        };

        wrap.appendChild(makeRow(ROW1));
        wrap.appendChild(makeRow(ROW2));
        field.appendChild(wrap);
        main.current="RuotaLettera";
    },

    _confermaCons(lettera, isRaddoppia) {
        // Se la lettera è già stata chiamata = errore
        if (this.lettereRivelate.has(lettera)) {
            this.attesaLettera=false;
            if (this._expressTurn) {
                let prev=this.punteggioRound[this.turno];
                this.punteggioRound[this.turno]=0; this._expressTurn=false;
                this._animateExpressCounter(prev,0);
                this._showToast(`"${lettera}" già chiamata — EXPRESS azzerato!`,"#ff4444");
                setTimeout(()=>ruota._passaTurno(),2000);
            } else {
                this._chiedeJolly(`"${lettera}" è già stata chiamata!`,"#ff4444",
                    ()=>{ this._showToast("🃏 Jolly usato — turno salvato!","#a855f7"); setTimeout(()=>{ ruota._renderGioco(); main.current="RuotaGioco"; },2000); },
                    ()=>{ this._showToast(`"${lettera}" già chiamata — turno perso!`,"#ff4444"); setTimeout(()=>ruota._passaTurno(),2000); }
                );
            }
            return;
        }
        let count=this._contaLettera(lettera);
        this._rivelaLettera(lettera);
        this.attesaLettera=false;

        if (count===0) {
            this._playWrongLetter();
            if (this._expressTurn) {
                // EXPRESS: errore → azzera punteggio e passa il turno, nessun jolly
                let prev=this.punteggioRound[this.turno];
                this.punteggioRound[this.turno]=0; this._expressTurn=false;
                this._animateExpressCounter(prev,0);
                this._showToast(`"${lettera}" non presente — EXPRESS azzerato!`,"#ff4444");
                setTimeout(()=>ruota._passaTurno(),2000);
            } else {
                this._chiedeJolly(`"${lettera}" non è presente!`,"#ff4444",
                    ()=>{ this._showToast("🃏 Jolly usato — turno salvato!","#a855f7"); setTimeout(()=>{ ruota._renderGioco(); main.current="RuotaGioco"; },2000); },
                    ()=>{ this._showToast(`"${lettera}" non è presente!`,"#ff4444"); setTimeout(()=>ruota._passaTurno(),2000); }
                );
            }
        } else {
            this._playCorrectLetter();
            let msg;
            if (isRaddoppia) {
                this.punteggioRound[this.turno]*=2;
                // Solo ora che la lettera è corretta, sostituisci lo spicchio con BANCAROTTA
                if (this._raddoppiaIdx >= 0) { this.SPICCHI[this._raddoppiaIdx]={label:'BANCAROTTA',valore:0,tipo:'bancarotta',colore:'#000000'}; this._raddoppiaIdx=-1; }
                msg = `${count===1?`C'è solo una`:`Ci sono ${this._numItaliano(count)}`} ${lettera} — punteggio RADDOPPIATO!`;
                this._showToast(msg,"#22cc66");
            } else if (this._tipoAzione === 'jolly') {
                // Jolly conquistato: assegna la carta e sostituisci lo spicchio con 200€
                this.jolly[this.turno] = true; this._jollyPreso = true;
                if (this._jollyIdx >= 0) { this.SPICCHI[this._jollyIdx]={label:'200',valore:200,tipo:'euro',colore:'#1e3a8a'}; this._jollyIdx=-1; }
                let guadJ = this.valoreRuota * count;
                this.punteggioRound[this.turno] += guadJ;
                msg = `🃏 JOLLY conquistato! ${this._msgLettera(count, lettera, guadJ)}`;
                this._showToast(msg, "#7B2FBE");
            } else if (this._expressTurn) {
                // EXPRESS: valore fisso 500€ × occorrenze
                let prev=this.punteggioRound[this.turno];
                let guad=500*count;
                this.punteggioRound[this.turno]+=guad;
                msg=this._msgLettera(count,lettera,guad);
                this._showToast(msg,"#22cc66");
                setTimeout(()=>ruota._animateExpressCounter(prev, ruota.punteggioRound[ruota.turno]),200);
            } else {
                let guad=this.valoreRuota*count;
                this.punteggioRound[this.turno]+=guad;
                if (this._mancheJackpot) {
                    this.jackpot_pool += this.valoreRuota;
                    setTimeout(()=>ruota._flashSalvadanaio(), 150);
                }
                msg = this._msgLettera(count,lettera,guad);
                this._showToast(msg,"#22cc66");
            }
            setTimeout(()=>{
                if (ruota._tutteScoperte()) ruota._vinceRound(ruota.turno);
                else {
                    ruota._renderGioco(); main.current="RuotaGioco";
                    if (ruota._tutteConsonantiRivelate()) setTimeout(()=>ruota._showToast("🔠 Consonanti terminate!","#f0c800"),400);
                }
            },2200);
        }
    },

    // ── Compra Vocale ──────────────────────────────────────────────
    _apriCompraVocale() {
        if (!this.faseGong && this.punteggioRound[this.turno]<500) return;
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:16px;padding:12px 0 10px;overflow:hidden;`;
        let tabElV=this._buildTabellone();
        let tabScaleV=Math.min(0.68, window.innerWidth*0.78/1100);
        tabElV.style.transform=`scale(${tabScaleV})`;
        tabElV.style.transformOrigin='top center';
        tabElV.style.marginBottom=Math.round((tabScaleV-1)*260)+'px';
        let titolo=document.createElement("div");
        titolo.innerHTML=this.faseGong
            ? "Scegli una vocale <em style='font-size:28px;color:rgba(255,255,255,0.35)'>(gratis in fase gong)</em>"
            : `Scegli una vocale · costo <strong style="color:#f0c800">500 €</strong>`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;color:white;text-align:center;`;
        let grid=document.createElement("div");
        grid.style.cssText=`display:flex;gap:24px;`;
        for (let v of 'AEIOU') {
            // Tutte le vocali appaiono uguali (no segno di quelle già chiamate)
            let btn=document.createElement("button");
            btn.innerHTML=v;
            btn.style.cssText=`width:130px;height:130px;font-family:'Barlow Condensed',sans-serif;font-size:78px;font-weight:800;background:rgba(240,200,0,0.12);color:#f0c800;border:2px solid rgba(240,200,0,0.45);border-radius:18px;cursor:pointer;`;
            btn.addEventListener('click',()=>ruota._confermaVocale(v));
            grid.appendChild(btn);
        }
        let backBtn=this._mkBtn("← INDIETRO","rgba(255,255,255,0.06)","rgba(255,255,255,0.45)",()=>{
            if (ruota.faseGong) { ruota._renderFinale(); main.current="RuotaFinale"; }
            else { ruota._renderGioco(); main.current="RuotaGioco"; }
        },false);
        backBtn.style.width="320px";
        let catBannerV = this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : '');
        catBannerV.style.margin = '0';
        wrap.appendChild(tabElV); wrap.appendChild(catBannerV); wrap.appendChild(titolo); wrap.appendChild(grid); wrap.appendChild(backBtn);
        field.appendChild(wrap);
        main.current="RuotaVocale";
    },

    _confermaVocale(vocale) {
        // Vocale già chiamata = errore
        if (this.lettereRivelate.has(vocale)) {
            this._playWrongLetter();
            this._showToast(`"${vocale}" è già stata chiamata — turno perso!`,"#ff4444");
            if (this.faseGong) setTimeout(()=>ruota._dopoLetteraGong(),1800);
            else setTimeout(()=>ruota._passaTurno(),1800);
            return;
        }
        if (!this.faseGong) {
            this.punteggioRound[this.turno]-=500;
            if (this.punteggioRound[this.turno]<0) this.punteggioRound[this.turno]=0;
        }
        let count=this._contaLettera(vocale);
        this._rivelaLettera(vocale);
        if (count===0) {
            this._playWrongLetter();
            this._showToast(`"${vocale}" non è presente.`,"#888888");
            if (this.faseGong) setTimeout(()=>ruota._dopoLetteraGong(),1800);
            else setTimeout(()=>ruota._passaTurno(),1800);
        } else {
            this._playCorrectLetter();
            let msg = count===1 ? `C'è solo una ${vocale}!` : `Ci sono ${this._numItaliano(count)} ${vocale}!`;
            this._showToast(msg,"#22cc66");
            setTimeout(()=>{
                if (ruota._tutteScoperte()) ruota._vinceRound(ruota.turno);
                else if (ruota.faseGong) ruota._dopoLetteraGong();
                else {
                    ruota._renderGioco(); main.current="RuotaGioco";
                    if (ruota._tutteVocaliRivelate()) setTimeout(()=>ruota._showToast("🔤 Vocali terminate!","#f0c800"),400);
                }
            },2000);
        }
    },

    // ── Soluzione come overlay (tabellone visibile) ─────────────────
    // ── Schermata Soluzione con Tastiera Virtuale ─────────────────
    _buildVKSoluzione({ titolo, colore, subtitolo, overlayId, posFixed, containerEl, annullaTesto, onConferma, onAnnulla, onLetterTyped }) {
        const frase = (this.fraseCorrente?.frase || '').toUpperCase();
        const scoperte = this.fraseLettereScoperte || [];
        const isBlank = (i) => !scoperte[i] && /^[A-Z]$/.test(frase[i]);
        let ans = frase.split('').map((c, i) => isBlank(i) ? null : c);
        let cur = ans.findIndex(c => c === null);
        let docKH = null;
        const closeOv = () => { if (docKH) document.removeEventListener('keydown', docKH); ov.remove(); };

        let ov = document.createElement("div");
        ov.id = overlayId || 'soluzione-overlay';
        ov.style.cssText = `position:${posFixed?'fixed':'absolute'};top:0;left:0;right:0;bottom:0;background:rgba(5,0,20,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:8000;padding:14px 16px;box-sizing:border-box;overflow-y:auto;`;

        // Titolo giocatore — usa stessa classe della schermata consonanti
        let titEl = document.createElement("div");
        titEl.innerHTML = titolo;
        titEl.className = 'ruota-lettera-titolo';
        titEl.style.cssText += `color:${colore};letter-spacing:3px;font-size:clamp(18px,3.2vw,34px);flex-shrink:0;`;
        ov.appendChild(titEl);

        // Tabellone — stessa formula di scala della schermata consonanti
        let tab = this._buildTabellone();
        let tabNW = 14 * this.CELL_W + 13 * this.CELL_GAP;
        let tabNH = 4  * this.CELL_H + 3  * this.CELL_GAP;
        let sc = Math.min(1.0, (window.innerWidth - 8) / tabNW);
        tab.style.transform = `scale(${sc})`;
        tab.style.transformOrigin = 'top center';
        tab.style.marginBottom = Math.round((sc - 1) * tabNH) + 'px';
        tab.style.flexShrink = '0';
        ov.appendChild(tab);

        // Banner categoria (identico alla schermata consonanti)
        if (this.fraseCorrente?.categoria) {
            let cat = this._buildCatBanner(this.fraseCorrente.categoria);
            cat.style.cssText += 'margin:0;padding:6px 40px;font-size:clamp(18px,2.2vw,24px);flex-shrink:0;';
            ov.appendChild(cat);
        }

        // Riga soluzione — caselle grandi, leggibili
        let disp = document.createElement("div");
        disp.style.cssText = `display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:5px 14px;padding:2px 8px;max-width:100%;flex-shrink:0;`;

        ruota._renderSolDisplay(disp, ans, cur, colore, true);
        ov.appendChild(disp);

        const addLtr = (l) => {
            if (cur === -1) return;
            ans[cur] = l;
            let prev = cur;
            cur = ans.findIndex((c, j) => j > prev && c === null);
            ruota._renderSolDisplay(disp, ans, cur, colore, true);
            if (onLetterTyped) onLetterTyped([...ans], cur);
        };
        const doBack = () => {
            let from = cur === -1 ? frase.length - 1 : cur - 1;
            for (let j = from; j >= 0; j--) {
                if (isBlank(j) && ans[j] !== null) {
                    ans[j] = null; cur = j;
                    ruota._renderSolDisplay(disp, ans, cur, colore, true);
                    if (onLetterTyped) onLetterTyped([...ans], cur);
                    return;
                }
            }
        };

        const mkRow = (ltrs) => {
            let row = document.createElement("div");
            row.className = 'ruota-tastiera-riga';
            row.style.flexShrink = '0';
            for (let l of ltrs) {
                let btn = document.createElement("button");
                btn.className = 'ruota-lettera-btn';
                btn.dataset.lettera = l;
                btn.textContent = l;
                btn.addEventListener('click', () => addLtr(l));
                row.appendChild(btn);
            }
            return row;
        };
        ov.appendChild(mkRow('QWERTYUIOP'));
        ov.appendChild(mkRow('ASDFGHJKL'));
        let r3 = mkRow('ZXCVBNM');
        let bkBtn = document.createElement("button");
        bkBtn.className = 'ruota-lettera-btn';
        bkBtn.innerHTML = '⌫';
        bkBtn.style.minWidth = '68px';
        bkBtn.addEventListener('click', doBack);
        r3.appendChild(bkBtn);
        ov.appendChild(r3);

        let bRow = document.createElement("div");
        bRow.style.cssText = `display:flex;gap:14px;width:100%;max-width:720px;flex-shrink:0;margin-top:2px;`;

        let annBtn = document.createElement("button");
        annBtn.innerHTML = annullaTesto || '← ANNULLA';
        annBtn.style.cssText = `flex:1;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:15px;font-family:'Barlow Condensed',sans-serif;font-size:clamp(18px,2.6vw,32px);font-weight:700;cursor:pointer;`;
        annBtn.addEventListener('click', () => { closeOv(); if (onAnnulla) onAnnulla(); });

        let confBtn = document.createElement("button");
        confBtn.innerHTML = '✓ CONFERMA SOLUZIONE';
        confBtn.style.cssText = `flex:2;background:rgba(34,204,102,0.14);color:#22cc66;border:2px solid rgba(34,204,102,0.5);border-radius:14px;padding:15px;font-family:'Barlow Condensed',sans-serif;font-size:clamp(18px,2.6vw,32px);font-weight:800;cursor:pointer;`;
        confBtn.addEventListener('click', () => { let r = ans.join(''); closeOv(); onConferma(r); });

        bRow.appendChild(annBtn); bRow.appendChild(confBtn);
        ov.appendChild(bRow);

        docKH = (e) => {
            if (!document.body.contains(ov)) { document.removeEventListener('keydown', docKH); return; }
            if (e.key === 'Backspace') { doBack(); e.preventDefault(); }
            else if (e.key === 'Enter') { confBtn.click(); e.preventDefault(); }
            else if (/^[a-zA-Z]$/.test(e.key)) { addLtr(e.key.toUpperCase()); e.preventDefault(); }
        };
        document.addEventListener('keydown', docKH);
        containerEl.appendChild(ov);
        return ov;
    },

    // ── Render riga soluzione (riutilizzato da schermata attiva e waiting) ──
    _renderSolDisplay(container, ansArr, curIdx, colore, blink, cellSizeCss, fontSizeCss) {
        const frase = (this.fraseCorrente?.frase || '').toUpperCase();
        const scoperte = this.fraseLettereScoperte || [];
        const isBlank = (i) => !scoperte[i] && /^[A-Z]$/.test(frase[i]);
        const CS = cellSizeCss || `clamp(32px,6vw,56px)`;
        const CF = fontSizeCss || `clamp(24px,4.5vw,44px)`;
        container.innerHTML = '';
        let i = 0;
        while (i < frase.length) {
            if (frase[i] === ' ') {
                let sp = document.createElement("div");
                sp.style.cssText = `width:16px;flex-shrink:0;`;
                container.appendChild(sp); i++;
            } else {
                let word = document.createElement("div");
                word.style.cssText = `display:flex;gap:4px;align-items:flex-end;`;
                while (i < frase.length && frase[i] !== ' ') {
                    let cell = document.createElement("div");
                    let val = ansArr ? ansArr[i] : null;
                    let blank = val === null;
                    let pre = !isBlank(i);
                    let isCur = (i === curIdx);
                    cell.style.cssText = `width:${CS};height:${CS};display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:${CF};font-weight:800;border-bottom:3px solid ${pre?'rgba(255,255,255,0.15)':isCur?colore:'rgba(255,255,255,0.45)'};color:${pre?'rgba(255,255,255,0.32)':blank?'rgba(255,255,255,0.25)':'white'};box-sizing:border-box;flex-shrink:0;`;
                    if (blank && isCur) {
                        cell.innerHTML = blink
                            ? `<span style="color:${colore};animation:vkBlink 0.9s step-end infinite">▮</span>`
                            : `<span style="color:${colore}">▮</span>`;
                    } else {
                        cell.textContent = blank ? '·' : val;
                    }
                    word.appendChild(cell); i++;
                }
                container.appendChild(word);
            }
        }
    },

    _apriSoluzione(onCorretta, onSbagliata) {
        clearInterval(this._gongTimer);
        ruota._buildVKSoluzione({
            titolo: `${this._nomeTurno()} — DAI LA SOLUZIONE`,
            colore: this.COLORS[this.turno],
            subtitolo: `Categoria: <strong style="color:#f0c800">${this.fraseCorrente ? this.fraseCorrente.categoria : ''}</strong>`,
            overlayId: 'soluzione-overlay',
            posFixed: true,
            containerEl: document.body,
            annullaTesto: '← INDIETRO',
            onAnnulla: () => { if (ruota.faseGong) { ruota._renderFinale(); main.current = "RuotaFinale"; } },
            onConferma: (risposta) => {
                let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
                if (risposta === corretta) {
                    for (let i = 0; i < ruota.fraseLettereScoperte.length; i++) ruota.fraseLettereScoperte[i] = true;
                    if (onCorretta) { onCorretta(); }
                    else { ruota._vinceRound(ruota.turno); }
                } else {
                    ruota._playWrongSolution();
                    if (onSbagliata) {
                        ruota._showToast("Sbagliato!", "#ff4444", 1000);
                        setTimeout(() => onSbagliata(), 1200);
                    } else if (ruota.faseGong) {
                        ruota._showToast("Sbagliato! Il turno passa.", "#ff4444");
                        setTimeout(() => ruota._prossimoTurnoGong(), 2000);
                    } else {
                        ruota._chiedeJolly("Sbagliato!", "#ff4444",
                            () => { ruota._showToast("🃏 Jolly usato — turno salvato!", "#a855f7"); setTimeout(() => { ruota._renderGioco(); main.current = "RuotaGioco"; }, 2000); },
                            () => { ruota._showToast("Sbagliato! Il turno passa.", "#ff4444"); setTimeout(() => ruota._passaTurno(), 2000); }
                        );
                    }
                }
            }
        });
    },

    // ── Timeout registrato (cancellabile) ──────────────────────────
    _queueTimeout(fn, ms) {
        if (!this._pendingTimeouts) this._pendingTimeouts = [];
        let id = setTimeout(() => {
            // Rimuoviti dalla lista quando scatti
            this._pendingTimeouts = this._pendingTimeouts.filter(x => x !== id);
            fn();
        }, ms);
        this._pendingTimeouts.push(id);
        return id;
    },

    // ── Avanza manche (helper centralizzato) ───────────────────────
    // Chiamato SEMPRE con il valore di manche al momento della vittoria,
    // per evitare race condition con timer asincroni.
    _avanzaManche(mancheVinta) {
        // Cancella TUTTI i timer — interval E timeout pendenti
        clearInterval(this._termometroTimer); this._termometroTimer = null;
        clearInterval(this._triletteTimer);   this._triletteTimer = null;
        clearInterval(this._gongTimer);       this._gongTimer = null;
        clearInterval(this._raddoppioTimer);  this._raddoppioTimer = null;
        if (this._pendingTimeouts) { this._pendingTimeouts.forEach(id=>clearTimeout(id)); this._pendingTimeouts=[]; }
        // Salva snapshot punteggi per il riepilogo finale
        this._storiaManche.push({m: mancheVinta, s: [...this.punteggioGioco]});
        // Usa mancheVinta (catturato al momento della vittoria) per calcolare la prossima
        let prossima = mancheVinta + 1;
        // Salta le manches disabilitate dall'utente
        while (prossima <= 6 && this._mancheDaSaltare.includes(prossima)) prossima++;
        // Aggiorna manche solo se non è già più avanti (previene doppio-increment)
        if (ruota.manche < prossima) ruota.manche = prossima;
        if (ruota.manche <= 6) ruota._iniziaManche();
        else { ruota._giocoTerminato = true; ruota._verdetto(); }
    },

    // ── Vittoria Round ─────────────────────────────────────────────
    _vinceRound(idx) {
        this._playCorrectSolution();
        // Salva il valore di manche NOW — prima che qualsiasi timer asincrono lo modifichi
        let mancheCorrente = this.manche;
        this._ultimoVincitore = idx; // il vincitore non inizierà per primo la prossima manche
        clearInterval(this._gongTimer);        this._gongTimer = null;
        clearInterval(this._termometroTimer);  this._termometroTimer = null;
        clearInterval(this._triletteTimer);    this._triletteTimer = null;
        clearInterval(this._raddoppioTimer);   this._raddoppioTimer = null;
        if (this.punteggioRound[idx] < 1000) this.punteggioRound[idx] = 1000;
        let _roundScore = this.punteggioRound[idx];
        this._bancaRound(idx);
        if (mancheCorrente === 2) {
            this._raddoppioMancheScore = _roundScore;
            this._startBonusRaddoppio(idx);
            return;
        }
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;`;
        let tag=document.createElement("div");
        tag.innerHTML="SOLUZIONE ESATTA!";
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;letter-spacing:8px;color:rgba(255,255,255,0.35);`;
        let nomeEl=document.createElement("div");
        nomeEl.innerHTML=this._nomeG(idx);
        nomeEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:74px;font-weight:800;color:${this.COLORS[idx]};`;
        let fraseEl=document.createElement("div");
        fraseEl.innerHTML=`"${this.fraseCorrente.frase}"`;
        fraseEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:700;color:white;text-align:center;max-width:1100px;`;
        let scoreEl=document.createElement("div");
        scoreEl.innerHTML=this._fmtEuro(this.punteggioGioco[idx]);
        scoreEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;line-height:1;`;
        let totLabel=document.createElement("div");
        totLabel.innerHTML="TOTALE ACCUMULATO";
        totLabel.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:20px;letter-spacing:5px;color:rgba(240,200,0,0.45);`;
        let btn=document.createElement("button");
        // Usa mancheCorrente (catturato ora) non ruota.manche (potrebbe cambiare)
        let isUltimaManche = mancheCorrente >= 6;
        // Segna la partita come terminata SOLO se è davvero il finale (manche 6)
        if (isUltimaManche) ruota._giocoTerminato = true;
        btn.innerHTML = isUltimaManche ? "VERDETTO FINALE →" : "PROSSIMA MANCHE →";
        btn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;cursor:pointer;margin-top:8px;`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click', () => ruota._avanzaManche(mancheCorrente));
        wrap.appendChild(tag); wrap.appendChild(nomeEl); wrap.appendChild(fraseEl);
        wrap.appendChild(scoreEl); wrap.appendChild(totLabel); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current="RuotaVittoriaRound";
    },

    // ── Il Triplete ────────────────────────────────────────────────
    _prossimaTriplete() {
        if (this._triletteTimer) { clearInterval(this._triletteTimer); this._triletteTimer=null; }
        this._trilettePrenotatoDa=-1;
        this._triletteEliminate=[];
        if (this.fraseCorrente && this.sottomanche > 0) {
            this._mostraFraseNascosta(() => ruota._caricaTriplete()); return;
        }
        ruota._caricaTriplete();
    },
    _caricaTriplete() {
        if (this.sottomanche===0) {
            let tutteCategorie=[...new Set(FRASI_RUOTA.map(f=>f.categoria))];
            let disponibili=tutteCategorie.filter(c=>!this._categorieUsate.includes(c));
            if (disponibili.length===0) { this._categorieUsate=[]; disponibili=tutteCategorie; }
            this._triletteCategoria=disponibili[Math.floor(Math.random()*disponibili.length)];
            this._categorieUsate.push(this._triletteCategoria);
        }
        if (this.sottomanche>=3) {
            // Salva i guadagni triplete di TUTTI i giocatori nel totale
            for (let i=0;i<3;i++) this.punteggioGioco[i] += this.punteggioRound[i];
            this.punteggioRound=[0,0,0];
            this._trileteBonusRound=[0,0,0];
            // Usa _avanzaManche invece di manche++ diretto
            let _mt = this.manche; ruota._avanzaManche(_mt); return;
        }
        let poolCategoria=FRASI_RUOTA.filter(f=>f.categoria===this._triletteCategoria);
        if (poolCategoria.length===0) poolCategoria=FRASI_RUOTA;
        this._nuovaFrase(poolCategoria);
        // Posizioni di tutte le lettere, shuffle come velocissima (una cella alla volta)
        let posizioni=[];
        for (let i=0;i<this.fraseArray.length;i++)
            if (/[A-ZÀ-Öa-zà-ö]/i.test(this.fraseArray[i])) posizioni.push(i);
        posizioni = this._shuffleNoConsec(posizioni, p => this.fraseArray[p].toUpperCase());
        let revIdx=0;

        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · IL TRIPLETE",()=>{
            clearInterval(ruota._triletteTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:0 80px;`;
        let tag=document.createElement("div");
        tag.innerHTML=`TABELLONE ${this.sottomanche+1} / 3 &nbsp;·&nbsp; Indovina tutti e 3 per vincere 5.000 €`;
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:26px;letter-spacing:5px;color:rgba(255,255,255,0.35);`;
        let tabEl=this._buildTabellone();
        let scRow=document.createElement("div");
        scRow.style.cssText=`display:flex;gap:24px;`;
        for (let i=0;i<3;i++) {
            let cell=document.createElement("div");
            cell.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:2px;background:rgba(255,255,255,0.05);border-radius:10px;padding:12px 28px;`;
            let n=document.createElement("div");
            n.innerHTML=this._nomeG(i);
            n.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:${this.COLORS[i]};`;
            let s=document.createElement("div");
            s.innerHTML=this._fmtEuro(this.punteggioRound[i]);
            s.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;color:white;`;
            cell.appendChild(n); cell.appendChild(s); scRow.appendChild(cell);
        }
        let prenotaRow=document.createElement("div");
        prenotaRow.style.cssText=`display:flex;gap:20px;width:100%;`;
        let prenotaBtns=[];
        for (let i=0;i<3;i++) {
            let pb=document.createElement("button");
            pb.innerHTML=`PRENOTA &nbsp;<strong>${this._nomeG(i)}</strong>`;
            pb.style.cssText=`flex:1;padding:20px;border-radius:14px;background:rgba(255,255,255,0.07);color:${this.COLORS[i]};border:2px solid ${this.COLORS[i]}66;font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;letter-spacing:2px;cursor:pointer;`;
            if (ruota._triletteEliminate.includes(i)) {
                pb.style.opacity='0.25'; pb.style.pointerEvents='none';
            }
            let idx=i;
            pb.addEventListener('click',()=>{
                if (ruota._trilettePrenotatoDa>=0) return;
                if (ruota._triletteTimer){clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
                ruota._trilettePrenotatoDa=idx;
                prenotaBtns.forEach(b=>{b.style.opacity='0.3';b.style.pointerEvents='none';});
                ruota._apriSoluzioneTriplete(idx,()=>{
                    ruota._triletteEliminate.push(idx);
                    ruota._trilettePrenotatoDa=-1;
                    prenotaBtns.forEach((b,j)=>{
                        if (!ruota._triletteEliminate.includes(j)) {
                            b.style.opacity='1'; b.style.pointerEvents='auto';
                        } else {
                            b.style.opacity='0.25'; b.style.pointerEvents='none';
                        }
                    });
                    let ov=document.getElementById("triplete-overlay"); if(ov)ov.remove();
                    ruota._triletteTimer=setInterval(()=>{
                        if (document.getElementById('ro-pausa-overlay')) return;
                        if (revIdx<posizioni.length){
                            ruota.fraseLettereScoperte[posizioni[revIdx++]]=true;
                            let t=document.getElementById("ruota-tabellone");
                            if(t)t.replaceWith(ruota._buildTabellone());
                            if(ruota._tutteScoperte()){clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
                        } else {clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
                    },1500);
                });
            });
            prenotaBtns.push(pb); prenotaRow.appendChild(pb);
        }
        let skipBtn=document.createElement("button");
        skipBtn.innerHTML="→ SALTA tabellone";
        skipBtn.style.cssText=`background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.35);border:2px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 40px;font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;cursor:pointer;`;
        skipBtn.addEventListener('click',()=>{
            if(ruota._triletteTimer){clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
            ruota.sottomanche++;ruota._prossimaTriplete();
        });
        wrap.appendChild(tag); wrap.appendChild(tabEl);
        wrap.appendChild(this._buildCatBanner(this.fraseCorrente.categoria));
        wrap.appendChild(scRow); wrap.appendChild(prenotaRow); wrap.appendChild(skipBtn);
        field.appendChild(wrap);
        main.current="RuotaTriplete";
        this._triletteTimer=setInterval(()=>{
            if (document.getElementById('ro-pausa-overlay')) return;
            if(revIdx<posizioni.length){
                ruota.fraseLettereScoperte[posizioni[revIdx++]]=true;
                let t=document.getElementById("ruota-tabellone");
                if(t)t.replaceWith(ruota._buildTabellone());
                if(ruota._tutteScoperte()){clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
            } else {clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
        },1500);
    },

    _apriSoluzioneTriplete(idx, onSbagliata) {
        ruota._buildVKSoluzione({
            titolo: `${this._nomeG(idx)} — DAI LA SOLUZIONE`,
            colore: this.COLORS[idx],
            overlayId: 'triplete-overlay',
            posFixed: false,
            containerEl: field,
            annullaTesto: '✗ ANNULLA',
            onAnnulla: () => { if (onSbagliata) onSbagliata(); },
            onConferma: (risposta) => {
                let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
                if (risposta === corretta) { ruota._confermaTriplete(true, idx); }
                else { ruota._playWrongSolution(); ruota._showToast("Sbagliato!", "#ff4444", 1000); setTimeout(() => { if (onSbagliata) onSbagliata(); }, 1200); }
            }
        });
    },

    _confermaTriplete(corretto, idx) {
        if (corretto) {
            this._playCorrectSolution();
            this._trileteBonusRound[idx]++;
            this.punteggioRound[idx] += 1000;
            if (this._trileteBonusRound[idx] >= 3) {
                // Triplete completo: 5000€ invece di 3000€
                this.punteggioRound[idx] = 5000;
                this._showToast(`TRIPLETE COMPLETO! ${this._nomeG(idx)} → 5.000 €!`,"#f0c800");
            } else {
                this._showToast(`Corretto! +1.000 € — ${this._nomeG(idx)} (${this._trileteBonusRound[idx]}/3)`,"#22cc66");
            }
        }
        this.sottomanche++;
        setTimeout(()=>ruota._prossimaTriplete(),2000);
    },

    // ── Finale (Manche 5 — La Sfida a Tempo) ──────────────────────
    _startFinale() {
        this.faseGong=false;
        // Sostituisci JOLLY→500€ e RADDOPPIA→BANCAROTTA prima del gong
        for (let i=0;i<this.SPICCHI.length;i++) {
            if (this.SPICCHI[i].tipo==='jolly') this.SPICCHI[i]={label:'500',valore:500,tipo:'euro',colore:'#0369a1'};
            if (this.SPICCHI[i].tipo==='raddoppia') this.SPICCHI[i]={label:'BANCAROTTA',valore:0,tipo:'bancarotta',colore:'#000000'};
        }
        this._nuovaFraseManche();
        this.punteggioRound=[0,0,0];
        // Pre-gong: gioca come una manche normale (con GONG button aggiunto)
        this._renderGioco(); main.current="RuotaGioco";
    },

    // ── Render Finale (post-gong) ──────────────────────────────────
    _renderFinale() {
        clearInterval(this._gongTimer);
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · LA SFIDA A TEMPO",()=>{
            clearInterval(ruota._gongTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;`;
        wrap.appendChild(this._buildScoresBar(false));
        let center=document.createElement("div");
        center.style.cssText=`flex:1;display:flex;min-height:0;`;
        let leftPanel=document.createElement("div");
        leftPanel.style.cssText=`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:12px;min-width:0;`;
        leftPanel.appendChild(this._buildTabellone());
        leftPanel.appendChild(this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : ''));
        let rightPanel=document.createElement("div");
        rightPanel.style.cssText=`width:520px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:14px;border-left:1px solid rgba(255,255,255,0.07);`;
        // Turno info
        let turnoNome=document.createElement("div");
        turnoNome.innerHTML=`Turno di <strong style="color:${this.COLORS[this.turno]}">${this._nomeTurno()}</strong>`;
        turnoNome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;color:white;text-align:center;`;
        // Valore ruota
        let valEl=document.createElement("div");
        valEl.innerHTML=`Valore: <strong style="color:#f0c800">${this._fmtEuro(this.valoreRuota)} a lettera</strong>`;
        valEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;color:rgba(255,255,255,0.45);text-align:center;`;
        rightPanel.appendChild(turnoNome); rightPanel.appendChild(valEl);
        // Action buttons — nessun countdown automatico: il timer di 5s parte solo dopo aver chiamato una lettera
        let tutteConsRivF = this._tutteConsonantiRivelate();
        let tutteVocRivF = this._tutteVocaliRivelate();
        let btnCons=this._mkBtn("🔠  CONSONANTI","rgba(255,255,255,0.1)","white",()=>{ clearInterval(ruota._gongTimer); ruota._apriChiamataConsonanteGong(); },tutteConsRivF);
        let btnVoc=this._mkBtn("🔤  VOCALI","rgba(240,200,0,0.1)","#f0c800",()=>{ clearInterval(ruota._gongTimer); ruota._apriCompraVocale(); },tutteVocRivF);
        let btnSol=this._mkBtn("💡  DAI LA SOLUZIONE","rgba(34,204,102,0.1)","#22cc66",()=>{ ruota._apriSoluzione(null,null); },false);
        rightPanel.appendChild(btnCons); rightPanel.appendChild(btnVoc); rightPanel.appendChild(btnSol);
        center.appendChild(leftPanel); center.appendChild(rightPanel);
        wrap.appendChild(center); field.appendChild(wrap);
    },

    // ── Gira Ruota Finale (animata, ririgira su PASSA/BANCAROTTA) ──
    _giraRuotaFinale() {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · LA SFIDA A TEMPO",()=>{});

        const FW = fieldWidth;
        const FH = fieldHeight;
        const avFH = FH - 64;
        const titleH = 80;
        const minBottom = 140;
        const naturalH = FW / 2;
        const visibleWheelH = Math.min(naturalH, avFH - titleH - minBottom);

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;height:${avFH}px;overflow:hidden;display:flex;flex-direction:column;align-items:center;`;

        let titleEl=document.createElement("div");
        titleEl.innerHTML="🔔 &nbsp; GONG — LA RUOTA DECIDE IL VALORE FINALE";
        titleEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;letter-spacing:3px;color:#ff6633;height:${titleH}px;line-height:${titleH}px;flex-shrink:0;`;

        let wheelWrapF=document.createElement("div");
        wheelWrapF.style.cssText=`position:relative;overflow:hidden;width:${FW}px;height:${visibleWheelH}px;flex-shrink:0;`;

        let canvas=document.createElement("canvas");
        canvas.width=FW; canvas.height=FW;
        canvas.style.cssText=`position:absolute;top:0;left:0;width:${FW}px;height:${FW}px;`;
        wheelWrapF.appendChild(canvas);

        let risultatoEl=document.createElement("div");
        risultatoEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:72px;font-weight:800;color:#f0c800;letter-spacing:4px;min-height:90px;text-align:center;flex-shrink:0;`;
        let continuaBtn=document.createElement("button");
        continuaBtn.innerHTML="INIZIA LA FASE FINALE →";
        continuaBtn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:16px;padding:22px 100px;font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:4px;cursor:pointer;display:none;flex-shrink:0;`;
        wrap.appendChild(titleEl); wrap.appendChild(wheelWrapF); wrap.appendChild(risultatoEl); wrap.appendChild(continuaBtn);
        field.appendChild(wrap);

        ruota._resumeAudio();
        let lastTickSeg = -1;
        let doSpin = () => {
            let n=ruota.SPICCHI.length, sliceAngle=(Math.PI*2)/n;
            let idxTarget=Math.floor(Math.random()*n);
            let fullRot=4+Math.floor(Math.random()*4);
            let totalAngle=fullRot*Math.PI*2 + (n-idxTarget)*sliceAngle - sliceAngle*0.5;
            let startTime=performance.now(), duration=3500;
            let anim=(now)=>{
                let t=Math.min((now-startTime)/duration,1);
                let curAngle = totalAngle*(1-Math.pow(1-t,4));
                ruota._disegnaRuota(canvas, curAngle);
                // Tick sounds
                let norm=((-curAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                let seg=Math.floor(norm/sliceAngle)%n;
                if (seg!==lastTickSeg) { lastTickSeg=seg; ruota._playTick(1-t); }
                if (t<1) { requestAnimationFrame(anim); }
                else {
                    let normalized=((-totalAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                    let spiccio=Math.floor(normalized/sliceAngle)%n;
                    let sp=ruota.SPICCHI[spiccio];
                    if (sp.tipo==='passa'||sp.tipo==='bancarotta') {
                        ruota._playPassa();
                        risultatoEl.innerHTML=`${sp.label} — Si rigira!`;
                        risultatoEl.style.color='#ff6633';
                        setTimeout(()=>{ risultatoEl.innerHTML=''; risultatoEl.style.color='#f0c800'; doSpin(); },1200);
                        return;
                    }
                    ruota._playWin();
                    let valoreFinale = sp.tipo==='euro' ? (sp.valore===5000?5000:sp.valore+1000) : 0;
                    risultatoEl.innerHTML=`${sp.label} → Valore finale: ${ruota._fmtEuro(valoreFinale)}`;
                    ruota.faseGong=true;
                    ruota.valoreRuota=valoreFinale;
                    continuaBtn.style.display='block';
                    continuaBtn.onclick=()=>{ ruota._renderFinale(); main.current="RuotaFinale"; };
                }
            };
            requestAnimationFrame(anim);
        };
        doSpin();
    },

    // ── Timer Gong ─────────────────────────────────────────────────
    _avviaTimerGong(cdEl) {
        clearInterval(this._gongTimer);
        this._gongSecondi=3;
        if (cdEl) cdEl.innerHTML=this._gongSecondi;
        this._gongTimer=setInterval(()=>{
            ruota._gongSecondi--;
            ruota._playTimerTick();
            let el=document.getElementById("gong-countdown");
            if (el) { el.innerHTML=ruota._gongSecondi; if(ruota._gongSecondi<=1)el.style.color='#ff4444'; }
            if (ruota._gongSecondi<=0) {
                clearInterval(ruota._gongTimer);
                ruota._playTimeUp();
                ruota._showToast("Tempo scaduto! Turno passato.","#888888", 1000);
                setTimeout(()=>ruota._prossimoTurnoGong(),1200);
            }
        },1000);
    },

    // ── Consonanti nel Gong ────────────────────────────────────────
    _apriChiamataConsonanteGong() {
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · LA SFIDA A TEMPO",()=>{});
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:16px;padding:12px 0 10px;overflow:hidden;`;
        let tabElG=this._buildTabellone();
        let tabScaleG=Math.min(0.68, window.innerWidth*0.78/1100);
        tabElG.style.transform=`scale(${tabScaleG})`;
        tabElG.style.transformOrigin='top center';
        tabElG.style.marginBottom=Math.round((tabScaleG-1)*260)+'px';
        let titolo=document.createElement("div");
        titolo.innerHTML=`<strong style="color:${this.COLORS[this.turno]}">${this._nomeTurno()}</strong> · Consonante · <span style="color:#f0c800">${this._fmtEuro(this.valoreRuota)} a lettera</span>`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:700;color:white;text-align:center;`;
        let grid=document.createElement("div");
        grid.style.cssText=`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;max-width:900px;`;
        for (let l of 'BCDFGHJKLMNPQRSTVWXYZ') {
            let btn=document.createElement("button");
            btn.innerHTML=l;
            btn.style.cssText=`width:94px;height:94px;font-family:'Barlow Condensed',sans-serif;font-size:50px;font-weight:800;background:rgba(255,255,255,0.12);color:white;border:2px solid rgba(255,255,255,0.3);border-radius:12px;cursor:pointer;`;
            btn.addEventListener('click',()=>ruota._confermaConsGong(l));
            grid.appendChild(btn);
        }
        let catBannerG = this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : '');
        catBannerG.style.margin = '0';
        wrap.appendChild(tabElG); wrap.appendChild(catBannerG); wrap.appendChild(titolo); wrap.appendChild(grid);
        field.appendChild(wrap);
        main.current="RuotaLettera";
    },

    _confermaConsGong(lettera) {
        if (this.lettereRivelate.has(lettera)) {
            this._playWrongLetter();
            this._showToast(`"${lettera}" già chiamata — turno perso!`,"#ff4444");
            setTimeout(()=>ruota._dopoLetteraGong(),2000);
            return;
        }
        let count=this._contaLettera(lettera);
        this._rivelaLettera(lettera);
        if (count===0) {
            this._playWrongLetter();
            this._showToast(`"${lettera}" non è presente!`,"#ff4444");
            setTimeout(()=>ruota._dopoLetteraGong(),2000);
        } else {
            this._playCorrectLetter();
            let guad=this.valoreRuota*count;
            this.punteggioRound[this.turno]+=guad;
            this._showToast(this._msgLettera(count,lettera,guad),"#22cc66");
            setTimeout(()=>{
                if (ruota._tutteScoperte()) ruota._vinceRound(ruota.turno);
                else ruota._dopoLetteraGong();
            },2200);
        }
    },

    // ── Post-lettera nel Gong: 5 secondi per dare la soluzione ────
    _dopoLetteraGong() {
        clearInterval(this._gongTimer);
        clearInterval(this._gongPensaTimer);
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA · LA SFIDA A TEMPO",()=>{
            clearInterval(ruota._gongPensaTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;`;
        wrap.appendChild(this._buildScoresBar(false));
        let center=document.createElement("div");
        center.style.cssText=`flex:1;display:flex;min-height:0;`;
        let leftPanel=document.createElement("div");
        leftPanel.style.cssText=`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:12px;min-width:0;`;
        leftPanel.appendChild(this._buildTabellone());
        leftPanel.appendChild(this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : ''));
        let rightPanel=document.createElement("div");
        rightPanel.style.cssText=`width:520px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:18px;border-left:1px solid rgba(255,255,255,0.07);`;
        let turnoNome=document.createElement("div");
        turnoNome.innerHTML=`<strong style="color:${this.COLORS[this.turno]}">${this._nomeTurno()}</strong><br><span style="font-size:24px;color:rgba(255,255,255,0.5);">Pensa alla soluzione!</span>`;
        turnoNome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:700;color:white;text-align:center;line-height:1.2;`;
        let cdWrap=document.createElement("div");
        cdWrap.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:4px;`;
        let cdLabel=document.createElement("div");
        cdLabel.innerHTML="SECONDI RIMASTI";
        cdLabel.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:18px;letter-spacing:4px;color:rgba(255,255,255,0.3);`;
        let cdEl=document.createElement("div");
        cdEl.innerHTML="5";
        cdEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:80px;font-weight:800;color:#f0c800;line-height:1;`;
        cdWrap.appendChild(cdLabel); cdWrap.appendChild(cdEl);
        let btnSol=this._mkBtn("💡  DAI LA SOLUZIONE","rgba(34,204,102,0.1)","#22cc66",()=>{
            clearInterval(ruota._gongPensaTimer);
            ruota._apriSoluzione(null, ()=>ruota._prossimoTurnoGong());
        },false);
        rightPanel.appendChild(turnoNome); rightPanel.appendChild(cdWrap); rightPanel.appendChild(btnSol);
        center.appendChild(leftPanel); center.appendChild(rightPanel);
        wrap.appendChild(center); field.appendChild(wrap);
        main.current="RuotaFinale";
        let sec=5;
        this._gongPensaTimer=setInterval(()=>{
            sec--;
            ruota._playTimerTick();
            cdEl.innerHTML=sec;
            if (sec<=2) cdEl.style.color='#ff4444';
            if (sec<=0) {
                clearInterval(ruota._gongPensaTimer);
                ruota._playTimeUp();
                ruota._showToast("Tempo scaduto — turno passato!","#888888", 1000);
                setTimeout(()=>ruota._prossimoTurnoGong(),1200);
            }
        },1000);
    },

    _prossimoTurnoGong() {
        clearInterval(this._gongTimer);
        clearInterval(this._gongPensaTimer);
        this.turno=(this.turno+1)%3;
        this._renderFinale(); main.current="RuotaFinale";
    },

    // ── Toast ──────────────────────────────────────────────────────
    _toastTimer: null,
    _showToast(msg, color, ms) {
        // Cancella timer precedente e rimuove toast vecchio
        if (this._toastTimer) { clearTimeout(this._toastTimer); this._toastTimer = null; }
        let old = document.getElementById("ruota-toast"); if (old) old.remove();
        let t = document.createElement("div"); t.id = "ruota-toast";
        t.innerHTML = msg;
        t.style.cssText = `position:fixed;bottom:56px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.93);border:2px solid ${color};color:${color};border-radius:14px;padding:18px 56px;font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;letter-spacing:3px;z-index:9999;white-space:nowrap;transition:opacity 0.25s;`;
        document.body.appendChild(t);
        let duration = ms || 2000;
        this._toastTimer = setTimeout(() => {
            if (t.parentNode) {
                t.style.opacity = '0';
                setTimeout(() => { if (t.parentNode) t.remove(); }, 250);
            }
            this._toastTimer = null;
        }, duration);
    },

    // ── Fix tastiera mobile: nasconde il tabellone quando la tastiera appare ──
    _applyMobileKeyboardFix(overlay, tabElement) {
        if (!window.visualViewport) return;
        const baseH = window.visualViewport.height;
        const handler = () => {
            if (!overlay.isConnected) { window.visualViewport.removeEventListener('resize', handler); return; }
            const vv = window.visualViewport;
            const kbOpen = vv.height < baseH * 0.75;
            if (tabElement) tabElement.style.display = kbOpen ? 'none' : '';
            const isFixed = overlay.style.position === 'fixed' || getComputedStyle(overlay).position === 'fixed';
            if (isFixed) {
                overlay.style.height = vv.height + 'px';
                overlay.style.top = Math.round(vv.offsetTop || 0) + 'px';
                overlay.style.bottom = 'auto';
            }
        };
        window.visualViewport.addEventListener('resize', handler);
    },

    // ── Se la Sai Raddoppi — Bonus Mini-Gioco ──────────────────────
    _startBonusRaddoppio(vincitoreIdx) {
        let cat = this.fraseCorrente.categoria;
        this._bonusCat = cat;
        // Filtra frasi corte (max 25 lettere esclusi spazi) per garantire che sia risolvibile
        let pool = FRASI_RUOTA.filter(f => f.categoria === cat && f.frase.replace(/ /g,'').length <= 25);
        if (pool.length > 1) pool = pool.filter(f => f.frase !== this.fraseCorrente.frase);
        if (pool.length === 0) pool = FRASI_RUOTA.filter(f => f.frase.replace(/ /g,'').length <= 25 && f.frase !== this.fraseCorrente.frase);
        if (pool.length === 0) pool = FRASI_RUOTA.filter(f => f.frase !== this.fraseCorrente.frase);
        this._nuovaFrase(pool);
        this._raddoppioVincitore = vincitoreIdx;
        this._raddoppioConsSel = [];
        this._raddoppioVocaleSel = null;
        clearInterval(this._raddoppioTimer);
        this._raddoppioTimer = null;
        this._raddoppioSecondi = 15;
        this._renderBonusSelezione();
    },

    _renderBonusSelezione() {
        let v = this._raddoppioVincitore;
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA — SE LA SAI RADDOPPI",()=>{
            clearInterval(ruota._raddoppioTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;padding:14px 40px 10px;gap:12px;overflow:hidden;`;

        // Prize oval
        let prizeOval = document.createElement("div");
        prizeOval.style.cssText = `background:#1a4fc4;border-radius:50px;padding:12px 48px;font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;color:white;border:3px solid #4488ff;box-shadow:0 0 40px rgba(68,136,255,0.5);flex-shrink:0;`;
        prizeOval.textContent = this._fmtEuro(this._raddoppioMancheScore) + ' → ' + this._fmtEuro(this._raddoppioMancheScore * 2);

        // Tabellone scaled
        let tabEl = this._buildTabellone();
        let sc = Math.min(0.56, window.innerWidth * 0.64 / 1100);
        tabEl.style.transform = `scale(${sc})`;
        tabEl.style.transformOrigin = 'top center';
        tabEl.style.marginBottom = Math.round((sc - 1) * 260) + 'px';
        tabEl.style.flexShrink = '0';

        // Bottom row: tema box + pickers
        let bottomRow = document.createElement("div");
        bottomRow.style.cssText = `display:flex;gap:24px;width:100%;align-items:flex-start;flex:1;`;

        // Tema box
        let temaBox = document.createElement("div");
        temaBox.style.cssText = `background:#0d3580;border-radius:14px;padding:16px 24px;min-width:200px;flex-shrink:0;display:flex;flex-direction:column;gap:10px;`;
        let temaLabel = document.createElement("div");
        temaLabel.textContent = this._bonusCat.toUpperCase();
        temaLabel.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:#f0c800;letter-spacing:3px;`;
        let slotRow = document.createElement("div");
        slotRow.id = 'bonus-slots';
        slotRow.style.cssText = `display:flex;gap:8px;`;
        const updateSlots = () => {
            slotRow.innerHTML = '';
            let all = [...ruota._raddoppioConsSel];
            if (ruota._raddoppioVocaleSel) all.push(ruota._raddoppioVocaleSel);
            for (let i = 0; i < 5; i++) {
                let slot = document.createElement("div");
                slot.style.cssText = `width:34px;height:42px;border-bottom:3px solid ${i < all.length ? '#f0c800' : 'rgba(255,255,255,0.3)'};display:flex;align-items:flex-end;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:800;color:#f0c800;padding-bottom:2px;`;
                slot.textContent = all[i] || '';
                slotRow.appendChild(slot);
            }
        };
        updateSlots();
        temaBox.appendChild(temaLabel); temaBox.appendChild(slotRow);

        // Pickers area
        let pickersArea = document.createElement("div");
        pickersArea.style.cssText = `flex:1;display:flex;flex-direction:column;gap:10px;`;

        let consLabel = document.createElement("div");
        consLabel.innerHTML = `4 CONSONANTI &nbsp;<span id="cons-count" style="color:#f0c800">(${this._raddoppioConsSel.length}/4)</span>`;
        consLabel.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:18px;letter-spacing:3px;color:rgba(255,255,255,0.5);`;

        let consGrid = document.createElement("div");
        consGrid.style.cssText = `display:flex;flex-wrap:wrap;gap:8px;`;
        for (let l of 'BCDFGHJKLMNPQRSTVWXYZ') {
            let btn = document.createElement("button");
            btn.id = `bonus-cons-${l}`;
            btn.textContent = l;
            let sel = this._raddoppioConsSel.includes(l);
            btn.style.cssText = `width:62px;height:62px;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;background:${sel?'rgba(240,200,0,0.22)':'rgba(255,255,255,0.08)'};color:${sel?'#f0c800':'white'};border:2px solid ${sel?'#f0c800':'rgba(255,255,255,0.2)'};border-radius:10px;cursor:pointer;`;
            btn.addEventListener('click', () => {
                let idx2 = ruota._raddoppioConsSel.indexOf(l);
                if (idx2 >= 0) {
                    ruota._raddoppioConsSel.splice(idx2, 1);
                    btn.style.background='rgba(255,255,255,0.08)'; btn.style.color='white'; btn.style.borderColor='rgba(255,255,255,0.2)';
                } else if (ruota._raddoppioConsSel.length < 4) {
                    ruota._raddoppioConsSel.push(l);
                    btn.style.background='rgba(240,200,0,0.22)'; btn.style.color='#f0c800'; btn.style.borderColor='#f0c800';
                }
                updateSlots();
                let cc = document.getElementById('cons-count');
                if (cc) cc.textContent = `(${ruota._raddoppioConsSel.length}/4)`;
                checkConferma();
            });
            consGrid.appendChild(btn);
        }

        let vocLabel = document.createElement("div");
        vocLabel.textContent = '1 VOCALE';
        vocLabel.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:18px;letter-spacing:3px;color:rgba(255,255,255,0.5);margin-top:4px;`;

        let vocRow = document.createElement("div");
        vocRow.style.cssText = `display:flex;gap:8px;`;
        for (let vv of 'AEIOU') {
            let btn = document.createElement("button");
            btn.id = `bonus-voc-${vv}`;
            btn.textContent = vv;
            let sel = this._raddoppioVocaleSel === vv;
            btn.style.cssText = `width:62px;height:62px;font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;background:${sel?'rgba(34,204,102,0.22)':'rgba(255,255,255,0.08)'};color:${sel?'#22cc66':'white'};border:2px solid ${sel?'#22cc66':'rgba(255,255,255,0.2)'};border-radius:10px;cursor:pointer;`;
            btn.addEventListener('click', () => {
                for (let vv2 of 'AEIOU') {
                    let b = document.getElementById(`bonus-voc-${vv2}`);
                    if (b) { b.style.background='rgba(255,255,255,0.08)'; b.style.color='white'; b.style.borderColor='rgba(255,255,255,0.2)'; }
                }
                if (ruota._raddoppioVocaleSel === vv) {
                    ruota._raddoppioVocaleSel = null;
                } else {
                    ruota._raddoppioVocaleSel = vv;
                    btn.style.background='rgba(34,204,102,0.22)'; btn.style.color='#22cc66'; btn.style.borderColor='#22cc66';
                }
                updateSlots();
                checkConferma();
            });
            vocRow.appendChild(btn);
        }

        let confermaBtn = document.createElement("button");
        confermaBtn.id = 'bonus-conferma';
        confermaBtn.textContent = '✓ CONFERMA LETTERE';
        confermaBtn.style.cssText = `background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:16px 50px;font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;letter-spacing:2px;cursor:pointer;margin-top:8px;opacity:0.3;pointer-events:none;align-self:flex-start;`;
        confermaBtn.addEventListener('click', () => ruota._confermaBonusLettere());

        const checkConferma = () => {
            let ok = ruota._raddoppioConsSel.length === 4 && ruota._raddoppioVocaleSel !== null;
            confermaBtn.style.opacity = ok ? '1' : '0.3';
            confermaBtn.style.pointerEvents = ok ? 'auto' : 'none';
        };

        pickersArea.appendChild(consLabel); pickersArea.appendChild(consGrid);
        pickersArea.appendChild(vocLabel); pickersArea.appendChild(vocRow);
        pickersArea.appendChild(confermaBtn);
        bottomRow.appendChild(temaBox); bottomRow.appendChild(pickersArea);
        let catBannerSel = this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : '');
        catBannerSel.style.margin = '0';
        wrap.appendChild(prizeOval); wrap.appendChild(tabEl); wrap.appendChild(catBannerSel); wrap.appendChild(bottomRow);
        field.appendChild(wrap);
        main.current = "RuotaBonusSel";
    },

    _confermaBonusLettere() {
        for (let l of [...this._raddoppioConsSel, this._raddoppioVocaleSel]) {
            if (l) this._rivelaLettera(l);
        }
        this._renderBonusGioco();
    },

    _renderBonusGioco() {
        let v = this._raddoppioVincitore;
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA — SE LA SAI RADDOPPI",()=>{
            clearInterval(ruota._raddoppioTimer);
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });
        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;`;

        // Prize bar at top
        let prizeBar = document.createElement("div");
        prizeBar.style.cssText = `display:flex;align-items:center;justify-content:center;gap:24px;padding:10px 32px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;`;

        let prizeOval = document.createElement("div");
        prizeOval.id = 'bonus-prize';
        prizeOval.style.cssText = `background:#1a4fc4;border-radius:50px;padding:10px 48px;font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;color:white;border:3px solid #4488ff;box-shadow:0 0 30px rgba(68,136,255,0.45);white-space:nowrap;`;
        prizeOval.textContent = this._fmtEuro(this._raddoppioMancheScore);
        prizeBar.appendChild(prizeOval);

        // Main two-column area
        let center = document.createElement("div");
        center.style.cssText = `flex:1;display:flex;min-height:0;`;

        // Left panel: tabellone + cat banner
        let leftPanel = document.createElement("div");
        leftPanel.style.cssText = `flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 20px;gap:10px;min-width:0;`;

        let tabEl = this._buildTabellone();
        let sc = Math.min(0.68, window.innerWidth * 0.56 / 1100);
        tabEl.style.transform = `scale(${sc})`;
        tabEl.style.transformOrigin = 'top center';
        tabEl.style.marginBottom = Math.round((sc - 1) * 260) + 'px';
        tabEl.style.flexShrink = '0';
        leftPanel.appendChild(tabEl);
        leftPanel.appendChild(this._buildCatBanner(this.fraseCorrente ? this.fraseCorrente.categoria : ''));

        // Right panel: timer + lettere rivelate + solution button
        let rightPanel = document.createElement("div");
        rightPanel.style.cssText = `width:480px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:18px;border-left:1px solid rgba(255,255,255,0.07);`;

        // Timer
        let timerWrap = document.createElement("div");
        timerWrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;`;
        let timerLabel = document.createElement("div");
        timerLabel.textContent = 'SECONDI RIMASTI';
        timerLabel.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,0.3);`;
        let timerBox = document.createElement("div");
        timerBox.id = 'bonus-timer';
        timerBox.style.cssText = `background:rgba(0,10,50,0.80);border:1.5px solid rgba(120,180,255,0.45);border-radius:14px;padding:8px 36px;font-family:'Barlow Condensed',sans-serif;font-size:88px;font-weight:800;color:#8dc8ff;min-width:80px;text-align:center;line-height:1;`;
        timerBox.textContent = this._raddoppioSecondi;
        timerWrap.appendChild(timerLabel); timerWrap.appendChild(timerBox);
        rightPanel.appendChild(timerWrap);

        // Lettere rivelate
        let letSection = document.createElement("div");
        letSection.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:8px;`;
        let letLabel = document.createElement("div");
        letLabel.textContent = 'LETTERE SCELTE';
        letLabel.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,0.3);`;
        let lettersRow = document.createElement("div");
        lettersRow.style.cssText = `display:flex;gap:16px;flex-wrap:wrap;justify-content:center;`;
        for (let l of [...this._raddoppioConsSel, ...(this._raddoppioVocaleSel ? [this._raddoppioVocaleSel] : [])]) {
            let lEl = document.createElement("div");
            lEl.textContent = l;
            lEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:800;color:white;border-bottom:3px solid rgba(255,255,255,0.55);padding-bottom:4px;min-width:32px;text-align:center;`;
            lettersRow.appendChild(lEl);
        }
        letSection.appendChild(letLabel); letSection.appendChild(lettersRow);
        rightPanel.appendChild(letSection);

        // Solution button
        let solBtn = document.createElement("button");
        solBtn.innerHTML = "💡  DAI LA SOLUZIONE";
        solBtn.style.cssText = `width:100%;background:rgba(34,204,102,0.14);color:#22cc66;border:2px solid rgba(34,204,102,0.5);border-radius:18px;padding:28px 24px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;letter-spacing:2px;cursor:pointer;text-align:left;`;
        solBtn.addEventListener('click', () => {
            clearInterval(ruota._raddoppioTimer);
            ruota._apriSoluzioneBonusRaddoppio();
        });
        rightPanel.appendChild(solBtn);

        center.appendChild(leftPanel); center.appendChild(rightPanel);
        wrap.appendChild(prizeBar); wrap.appendChild(center);
        field.appendChild(wrap);
        main.current = "RuotaBonusGioco";

        // Start countdown
        ruota._raddoppioSecondi = 15;
        clearInterval(ruota._raddoppioTimer);
        ruota._raddoppioTimer = setInterval(() => {
            ruota._raddoppioSecondi--;
            let el = document.getElementById('bonus-timer');
            if (el) {
                el.textContent = ruota._raddoppioSecondi;
                if (ruota._raddoppioSecondi <= 5) { el.style.color='#ff2200'; el.style.borderColor='#ff2200'; }
            }
            if (ruota._raddoppioSecondi <= 0) { clearInterval(ruota._raddoppioTimer); ruota._bonusErrata(); }
        }, 1000);
    },

    _apriSoluzioneBonusRaddoppio() {
        let v = this._raddoppioVincitore;
        ruota._buildVKSoluzione({
            titolo: `${this._nomeG(v)} — DAI LA SOLUZIONE`,
            colore: this.COLORS[v],
            overlayId: 'soluzione-overlay',
            posFixed: true,
            containerEl: document.body,
            annullaTesto: '← INDIETRO',
            onAnnulla: () => {
                if (ruota._raddoppioSecondi > 0) {
                    ruota._raddoppioTimer = setInterval(() => {
                        ruota._raddoppioSecondi--;
                        let el = document.getElementById('bonus-timer');
                        if (el) { el.textContent = ruota._raddoppioSecondi; if (ruota._raddoppioSecondi <= 5) { el.style.color = '#ff2200'; el.style.borderColor = '#ff2200'; } }
                        if (ruota._raddoppioSecondi <= 0) { clearInterval(ruota._raddoppioTimer); ruota._bonusErrata(); }
                    }, 1000);
                } else { ruota._bonusErrata(); }
            },
            onConferma: (risposta) => {
                let corretta = ruota.fraseCorrente ? ruota.fraseCorrente.frase.toUpperCase() : '';
                if (risposta === corretta) {
                    for (let i = 0; i < ruota.fraseLettereScoperte.length; i++) ruota.fraseLettereScoperte[i] = true;
                    ruota._bonusCorretta();
                } else { ruota._bonusErrata(); }
            }
        });
    },

    _bonusCorretta() {
        clearInterval(this._raddoppioTimer);
        let v = this._raddoppioVincitore;
        this.punteggioGioco[v] += this._raddoppioMancheScore;
        let newScore = this.punteggioGioco[v];
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;`;
        let tag = document.createElement("div");
        tag.innerHTML = "✓ RADDOPPIO RIUSCITO!";
        tag.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;letter-spacing:8px;color:rgba(255,255,255,0.35);`;
        let nomeEl = document.createElement("div");
        nomeEl.innerHTML = this._nomeG(v);
        nomeEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:74px;font-weight:800;color:${this.COLORS[v]};`;
        let prizeEl = document.createElement("div");
        prizeEl.id = 'bonus-res-prize';
        prizeEl.textContent = this._fmtEuro(newScore);
        prizeEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;line-height:1;`;
        let subEl = document.createElement("div");
        subEl.textContent = 'PUNTEGGIO RADDOPPIATO!';
        subEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:5px;color:rgba(240,200,0,0.55);`;
        let btn = document.createElement("button");
        let _mancheBC = this.manche;
        btn.innerHTML = _mancheBC >= 6 ? "VERDETTO FINALE →" : "PROSSIMA MANCHE →";
        btn.style.cssText = `background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;cursor:pointer;margin-top:8px;`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click', () => ruota._avanzaManche(_mancheBC));
        wrap.appendChild(tag); wrap.appendChild(nomeEl); wrap.appendChild(prizeEl); wrap.appendChild(subEl); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current = "RuotaBonusRis";
        // Flash animation
        let flashes = 0;
        let fi = setInterval(() => {
            let el = document.getElementById('bonus-res-prize');
            if (!el || flashes >= 6) { clearInterval(fi); return; }
            el.style.color = flashes % 2 === 0 ? '#ffffff' : '#f0c800';
            flashes++;
        }, 200);
    },

    _bonusErrata() {
        clearInterval(this._raddoppioTimer);
        let v = this._raddoppioVincitore;
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{});
        let wrap = document.createElement("div");
        wrap.style.cssText = `position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;`;
        let tag = document.createElement("div");
        tag.innerHTML = "RADDOPPIO FALLITO";
        tag.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;letter-spacing:8px;color:rgba(255,100,100,0.5);`;
        let nomeEl = document.createElement("div");
        nomeEl.innerHTML = this._nomeG(v);
        nomeEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:74px;font-weight:800;color:${this.COLORS[v]};`;
        let fraseEl = document.createElement("div");
        fraseEl.innerHTML = `"${this.fraseCorrente.frase}"`;
        fraseEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:700;color:white;text-align:center;max-width:1100px;`;
        let scoreEl = document.createElement("div");
        scoreEl.textContent = this._fmtEuro(this.punteggioGioco[v]);
        scoreEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;line-height:1;`;
        let subEl = document.createElement("div");
        subEl.textContent = 'PUNTEGGIO MANTENUTO';
        subEl.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:5px;color:rgba(240,200,0,0.45);`;
        let btn = document.createElement("button");
        let _mancheBE = this.manche;
        btn.innerHTML = _mancheBE >= 6 ? "VERDETTO FINALE →" : "PROSSIMA MANCHE →";
        btn.style.cssText = `background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;cursor:pointer;margin-top:8px;`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click', () => ruota._avanzaManche(_mancheBE));
        wrap.appendChild(tag); wrap.appendChild(nomeEl); wrap.appendChild(fraseEl); wrap.appendChild(scoreEl); wrap.appendChild(subEl); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current = "RuotaBonusRis";
    },

    // ── Express Manche ─────────────────────────────────────────────
    _startExpress() {
        this._mancheExpress = true;
        // Pos. 11 (1-indexed) = index 10: 400€ → EXPRESS viola glitter
        // Pos. 23 (1-indexed) = index 22: 200€ → EXPRESS viola glitter
        this.SPICCHI[10] = {label:'EXPRESS', valore:0, tipo:'express', colore:'#express'};
        this.SPICCHI[22] = {label:'EXPRESS', valore:0, tipo:'express', colore:'#express'};
        this._nuovaFraseManche();
        grafica.puliscifield();
        this._renderGioco();
        main.current = "RuotaGioco";
    },

    _buildExpressRiquadro() {
        let wrap = document.createElement("div");
        wrap.id = "express-riquadro";
        wrap.style.cssText = `
            display:flex;align-items:center;gap:16px;
            background:#0f1a6e;border:2px solid #4455ff;
            border-radius:14px;padding:12px 24px;
            box-shadow:0 0 28px rgba(80,100,255,0.5);
        `;
        let label = document.createElement("div");
        label.innerHTML = "🚄 EXPRESS";
        label.style.cssText = `
            font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;
            color:#f0c800;letter-spacing:4px;background:#1a2acc;
            border-radius:8px;padding:6px 18px;white-space:nowrap;
        `;
        let counter = document.createElement("div");
        counter.id = "express-counter";
        counter.textContent = this._fmtEuro(this.punteggioRound[this.turno]);
        counter.style.cssText = `
            font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;
            color:white;min-width:170px;text-align:right;letter-spacing:2px;
            font-variant-numeric:tabular-nums;
        `;
        wrap.appendChild(label); wrap.appendChild(counter);
        return wrap;
    },

    _animateExpressCounter(prevVal, newVal) {
        let el = document.getElementById("express-counter");
        if (!el) return;
        if (prevVal === newVal) { el.textContent = this._fmtEuro(newVal); return; }
        let dur = 380, startTime = performance.now();
        let step = (now) => {
            let p = Math.min((now - startTime) / dur, 1);
            // Ease-out cubic
            let ep = 1 - Math.pow(1 - p, 3);
            let cur = Math.round(prevVal + (newVal - prevVal) * ep);
            el.textContent = ruota._fmtEuro(cur);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = ruota._fmtEuro(newVal);
        };
        requestAnimationFrame(step);
    },

    // ── Jackpot Manche ─────────────────────────────────────────────
    _startJackpot() {
        this._mancheJackpot = true;
        // Sostituisce spicchi pos. 5 (idx 4) e pos. 17 (idx 16) con JACKPOT rosso
        this.SPICCHI[4]  = {label:'JACKPOT', valore:0, tipo:'jackpot', colore:'#cc0000'};
        this.SPICCHI[16] = {label:'JACKPOT', valore:0, tipo:'jackpot', colore:'#cc0000'};
        this._nuovaFraseManche();
        grafica.puliscifield();
        this._renderGioco();
        main.current = "RuotaGioco";
    },

    _buildSalvadanaio() {
        let el = document.createElement("div");
        el.id = "jackpot-pool-display";
        el.style.cssText = `
            display:flex;align-items:center;justify-content:center;gap:16px;
            background:rgba(220,0,0,0.18);border:2px solid rgba(255,60,60,0.55);
            border-radius:18px;padding:14px 36px;
            font-family:'Barlow Condensed',sans-serif;font-size:46px;font-weight:800;
            color:#f0c800;letter-spacing:3px;
            box-shadow:0 0 30px rgba(220,0,0,0.3);
            transition:transform 0.4s ease,text-shadow 0.4s ease;
        `;
        el.innerHTML = `🐷 &nbsp;<span id="jackpot-pool-value">${this._fmtEuro(this.jackpot_pool)}</span>`;
        return el;
    },

    _flashSalvadanaio() {
        let el = document.getElementById("jackpot-pool-display");
        let val = document.getElementById("jackpot-pool-value");
        if (val) val.textContent = this._fmtEuro(this.jackpot_pool);
        if (!el) return;
        el.style.transition = 'none';
        el.style.transform = 'scale(1.18)';
        el.style.textShadow = '0 0 40px rgba(255,215,0,1), 0 0 80px rgba(255,100,0,0.8)';
        el.style.boxShadow = '0 0 60px rgba(255,80,0,0.8)';
        setTimeout(() => {
            el.style.transition = 'transform 0.5s ease, text-shadow 0.5s ease, box-shadow 0.5s ease';
            el.style.transform = 'scale(1)';
            el.style.textShadow = '';
            el.style.boxShadow = '0 0 30px rgba(220,0,0,0.3)';
        }, 220);
    },

    _mostraSceltaJackpot() {
        let overlay = document.createElement("div");
        overlay.style.cssText = `
            position:fixed;top:0;left:0;right:0;bottom:0;
            background:rgba(0,0,0,0.94);display:flex;flex-direction:column;
            align-items:center;justify-content:center;gap:28px;z-index:9500;padding:60px;
        `;
        // Titolo jackpot
        let title = document.createElement("div");
        title.innerHTML = `🐷 &nbsp;JACKPOT &nbsp; <span style="color:#f0c800">${this._fmtEuro(this.jackpot_pool)}</span>`;
        title.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:72px;font-weight:800;color:#ff3333;text-align:center;text-shadow:0 0 60px rgba(255,0,0,0.7);`;
        let subtitle = document.createElement("div");
        subtitle.innerHTML = `${this._nomeTurno()} — Cosa vuoi fare?`;
        subtitle.style.cssText = `font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:700;color:rgba(255,255,255,0.7);text-align:center;`;
        // Scelta A: tenta jackpot
        let btnA = document.createElement("button");
        btnA.innerHTML = `🎯 &nbsp;TENTA IL JACKPOT<br><span style="font-size:22px;font-weight:400;opacity:0.75">Dai la soluzione — vinci ${this._fmtEuro(this.jackpot_pool)} + il tuo montepremi</span>`;
        btnA.style.cssText = `background:rgba(204,0,0,0.22);color:#ff5555;border:2px solid #cc0000;border-radius:20px;padding:28px 60px;font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;cursor:pointer;text-align:center;width:100%;max-width:760px;`;
        btnA.onclick = () => { overlay.remove(); ruota._tentaJackpot(); };
        // Scelta B: continua
        let btnB = document.createElement("button");
        btnB.innerHTML = `🎡 &nbsp;CONTINUA LA MANCHE<br><span style="font-size:22px;font-weight:400;opacity:0.65">Rinuncia al jackpot — puoi girare di nuovo la ruota</span>`;
        btnB.style.cssText = `background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.65);border:2px solid rgba(255,255,255,0.18);border-radius:20px;padding:28px 60px;font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:700;cursor:pointer;text-align:center;width:100%;max-width:760px;`;
        btnB.onclick = () => { overlay.remove(); ruota._renderGioco(); main.current = "RuotaGioco"; };
        overlay.appendChild(title); overlay.appendChild(subtitle);
        overlay.appendChild(btnA); overlay.appendChild(btnB);
        document.body.appendChild(overlay);
    },

    _tentaJackpot() {
        // Apre il campo soluzione — se corretta vince jackpot; se sbagliata perde il turno
        this._apriSoluzione(
            () => {
                // Corretta: vince il jackpot
                let premio = this.jackpot_pool;
                this.jackpot_pool = 1000; // Azzera e riparte da 1000€
                this.punteggioRound[this.turno] += premio;
                this._showToast(`🐷 JACKPOT! +${this._fmtEuro(premio)}`, "#f0c800");
                setTimeout(() => ruota._vinceRound(ruota.turno), 2400);
            },
            () => {
                // Sbagliata: perde il turno, jackpot rimane
                this._showToast("Sbagliato! Il jackpot rimane nel maialino.", "#ff4444");
                setTimeout(() => ruota._passaTurno(), 2000);
            }
        );
    },

    // ── Rivela frase nascosta (quando nessuno ha vinto) ────────────
    _mostraFraseNascosta(onDone) {
        if (!this.fraseCorrente) { onDone(); return; }
        for (let i=0;i<this.fraseLettereScoperte.length;i++) this.fraseLettereScoperte[i]=true;
        let ov=document.createElement("div");
        ov.style.cssText=`position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.93);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:9800;`;
        let tag=document.createElement("div");
        tag.innerHTML="LA FRASE ERA";
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:8px;color:rgba(255,255,255,0.3);`;
        let frase=document.createElement("div");
        frase.innerHTML=this.fraseCorrente.frase.toUpperCase();
        frase.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:58px;font-weight:800;color:#f0c800;text-align:center;max-width:1100px;line-height:1.2;padding:0 40px;`;
        let cat=document.createElement("div");
        cat.innerHTML=this.fraseCorrente.categoria.toUpperCase();
        cat.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:6px;color:rgba(255,255,255,0.28);`;
        let barWrap=document.createElement("div");
        barWrap.style.cssText=`width:260px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;margin-top:12px;`;
        let bar=document.createElement("div");
        bar.style.cssText=`height:100%;width:100%;background:#f0c800;transform-origin:left;animation:_rfShrink 2.5s linear forwards;`;
        barWrap.appendChild(bar);
        if (!document.getElementById('_rfkf')) {
            let st=document.createElement("style"); st.id='_rfkf';
            st.textContent=`@keyframes _rfShrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}`;
            document.head.appendChild(st);
        }
        ov.appendChild(tag); ov.appendChild(frase); ov.appendChild(cat); ov.appendChild(barWrap);
        document.body.appendChild(ov);
        setTimeout(()=>{ ov.remove(); onDone(); }, 2700);
    },

    // ── Verdetto Finale ────────────────────────────────────────────
    _verdetto() {
        // ── GUARDIA ASSOLUTA ──────────────────────────────────────────
        // _verdetto può essere mostrato SOLO se il finale (manche 6) è stato
        // davvero vinto e _giocoTerminato è stato impostato da _vinceRound.
        // Qualsiasi chiamata prematura viene reindirizzata.
        if (!this._giocoTerminato || this.manche < 7) {
            console.warn('[ruota] _verdetto() bloccata: manche =', this.manche, 'terminato =', this._giocoTerminato, '— forzo _iniziaManche()');
            if (this.manche <= 6) { ruota._iniziaManche(); }
            return;
        }
        this._playVerdetto();
        main.current="RuotaVerdetto";
        clearInterval(this._gongTimer);
        grafica.puliscifield();
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{ruota.reset();grafica.puliscifield();grafica.home();main.current="Home";});

        // Ordina i giocatori per punteggio decrescente
        let order=[0,1,2].sort((a,b)=>this.punteggioGioco[b]-this.punteggioGioco[a]);
        let vincitore=order[0];
        let medals=['🥇','🥈','🥉'];

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;overflow-y:auto;padding:36px 60px 48px;gap:32px;`;

        // ── Intestazione vincitore ──
        let header=document.createElement("div");
        header.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:6px;`;
        let htag=document.createElement("div");
        htag.innerHTML="VINCITORE DELLA PUNTATA";
        htag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:21px;letter-spacing:8px;color:rgba(255,255,255,0.28);`;
        let hname=document.createElement("div");
        hname.innerHTML=this._nomeG(vincitore);
        hname.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:82px;font-weight:800;line-height:1;color:${this.COLORS[vincitore]};text-shadow:0 0 80px ${this.COLORS[vincitore]}88;`;
        let hscore=document.createElement("div");
        hscore.innerHTML=this._fmtEuro(this.punteggioGioco[vincitore]);
        hscore.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;color:#f0c800;line-height:1;`;
        header.appendChild(htag); header.appendChild(hname); header.appendChild(hscore);

        // ── Podio 1°/2°/3° ──
        let podiumRow=document.createElement("div");
        podiumRow.style.cssText=`display:flex;gap:16px;align-items:flex-end;`;
        let podiumOrder=[order[1], order[0], order[2]]; // 2°, 1°, 3° per effetto podio visivo
        let podiumRanks=[1, 0, 2];
        podiumOrder.forEach((playerIdx, col)=>{
            let rank=podiumRanks[col];
            let heights=[90,130,60];
            let card=document.createElement("div");
            card.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:2px solid ${this.COLORS[playerIdx]}40;border-radius:14px;padding:18px 28px;min-width:220px;`;
            let medal=document.createElement("div");
            medal.innerHTML=medals[rank];
            medal.style.cssText=`font-size:${rank===0?46:34}px;line-height:1;`;
            let pname=document.createElement("div");
            pname.innerHTML=this._nomeG(playerIdx);
            pname.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:${rank===0?26:21}px;font-weight:800;color:${this.COLORS[playerIdx]};text-align:center;`;
            let pscore=document.createElement("div");
            pscore.innerHTML=this._fmtEuro(this.punteggioGioco[playerIdx]);
            pscore.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:${rank===0?36:26}px;font-weight:800;color:white;`;
            let base=document.createElement("div");
            base.style.cssText=`width:100%;height:${heights[col]}px;background:${this.COLORS[playerIdx]}18;border-radius:0 0 10px 10px;margin:-18px -28px -18px;margin-top:8px;`;
            card.appendChild(medal); card.appendChild(pname); card.appendChild(pscore); card.appendChild(base);
            podiumRow.appendChild(card);
        });

        // ── Tabella riepilogo manche ──
        let NOMI_MANCHE=['La Velocissima','Manche 1','Se la Sai Raddoppi','Il Jackpot','Il Treno Express','Il Triplete','La Sfida a Tempo'];
        let recapWrap=document.createElement("div");
        recapWrap.style.cssText=`width:100%;max-width:920px;`;
        let recapLabel=document.createElement("div");
        recapLabel.innerHTML="RIEPILOGO PER MANCHE";
        recapLabel.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:19px;letter-spacing:6px;color:rgba(255,255,255,0.28);text-align:center;margin-bottom:14px;`;
        recapWrap.appendChild(recapLabel);

        let tbl=document.createElement("table");
        tbl.style.cssText=`width:100%;border-collapse:collapse;font-family:'Barlow Condensed',sans-serif;`;
        // thead
        let thead=document.createElement("thead");
        let htr=document.createElement("tr");
        ['MANCHE', this._nomeG(0), this._nomeG(1), this._nomeG(2)].forEach((txt,ci)=>{
            let th=document.createElement("th");
            th.innerHTML=txt;
            th.style.cssText=`padding:10px 14px;text-align:${ci===0?'left':'center'};font-size:17px;letter-spacing:2px;color:${ci===0?'rgba(255,255,255,0.3)':this.COLORS[ci-1]};border-bottom:1px solid rgba(255,255,255,0.1);font-weight:700;`;
            htr.appendChild(th);
        });
        thead.appendChild(htr); tbl.appendChild(thead);
        // tbody
        let tbody=document.createElement("tbody");
        let prevS=[0,0,0];
        this._storiaManche.forEach((snap)=>{
            let tr=document.createElement("tr");
            tr.style.cssText=`border-bottom:1px solid rgba(255,255,255,0.05);`;
            let td0=document.createElement("td");
            td0.innerHTML=NOMI_MANCHE[snap.m]||`Manche ${snap.m+1}`;
            td0.style.cssText=`padding:9px 14px;font-size:19px;color:rgba(255,255,255,0.55);font-weight:600;`;
            tr.appendChild(td0);
            for (let i=0;i<3;i++){
                let delta=snap.s[i]-prevS[i];
                let td=document.createElement("td");
                td.innerHTML=delta>0?`+${this._fmtEuro(delta)}`:`—`;
                td.style.cssText=`padding:9px 14px;text-align:center;font-size:21px;font-weight:800;color:${delta>0?this.COLORS[i]:'rgba(255,255,255,0.18)'};`;
                tr.appendChild(td);
            }
            prevS=[...snap.s];
            tbody.appendChild(tr);
        });
        tbl.appendChild(tbody);
        // tfoot totali
        let tfoot=document.createElement("tfoot");
        let ftr=document.createElement("tr");
        ftr.style.cssText=`border-top:2px solid rgba(255,255,255,0.15);`;
        let ftd0=document.createElement("td");
        ftd0.innerHTML="TOTALE";
        ftd0.style.cssText=`padding:13px 14px;font-size:21px;font-weight:800;letter-spacing:3px;color:rgba(255,255,255,0.45);`;
        ftr.appendChild(ftd0);
        for (let i=0;i<3;i++){
            let td=document.createElement("td");
            td.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            let isWinner=(i===vincitore);
            td.style.cssText=`padding:13px 14px;text-align:center;font-size:26px;font-weight:800;color:${this.COLORS[i]};${isWinner?'text-shadow:0 0 20px '+this.COLORS[i]+'99;':''}`;
            ftr.appendChild(td);
        }
        tfoot.appendChild(ftr); tbl.appendChild(tfoot);
        recapWrap.appendChild(tbl);

        // ── Bottone nuova partita ──
        let btn=document.createElement("button");
        btn.innerHTML="NUOVA PARTITA";
        btn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;cursor:pointer;`;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>{ ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home"; });

        wrap.appendChild(header); wrap.appendChild(podiumRow); wrap.appendChild(recapWrap); wrap.appendChild(btn);
        field.appendChild(wrap);
    },
};
