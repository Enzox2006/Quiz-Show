const ruota = {

    // ── Costanti ───────────────────────────────────────────────────
    CELL_W: 92, CELL_H: 88, CELL_GAP: 5,
    // Ogni riga: {s: colonna iniziale, n: numero celle}
    CELL_RANGES: [{s:1,n:11},{s:0,n:13},{s:0,n:13},{s:1,n:11}],
    COLORS: ['#ff4466','#4488ff','#22cc88'],

    // 24 spicchi: 17 valori + 5 speciali + 2 extra (250, 150)
    // colore = colore di sfondo del segmento (stile TV)
    SPICCHI: [
        {label:'100',       valore:100,  tipo:'euro',      colore:'#1e40af'},
        {label:'200',       valore:200,  tipo:'euro',      colore:'#1e3a8a'},
        {label:'PASSA',     valore:0,    tipo:'passa',     colore:'#d4d4c8'},
        {label:'300',       valore:300,  tipo:'euro',      colore:'#c026d3'},
        {label:'100',       valore:100,  tipo:'euro',      colore:'#1e40af'},
        {label:'500',       valore:500,  tipo:'euro',      colore:'#0369a1'},
        {label:'200',       valore:200,  tipo:'euro',      colore:'#1e3a8a'},
        {label:'BANCAROTTA',valore:0,    tipo:'bancarotta',colore:'#f0f0f0'},
        {label:'400',       valore:400,  tipo:'euro',      colore:'#7c3aed'},
        {label:'100',       valore:100,  tipo:'euro',      colore:'#1e40af'},
        {label:'JOLLY',     valore:0,    tipo:'jolly',     colore:'#f8f8f8'},
        {label:'700',       valore:700,  tipo:'euro',      colore:'#1d4ed8'},
        {label:'200',       valore:200,  tipo:'euro',      colore:'#1e3a8a'},
        {label:'PASSA',     valore:0,    tipo:'passa',     colore:'#d4d4c8'},
        {label:'600',       valore:600,  tipo:'euro',      colore:'#0891b2'},
        {label:'200',       valore:200,  tipo:'euro',      colore:'#1e3a8a'},
        {label:'RADDOPPIA', valore:0,    tipo:'raddoppia', colore:'#16a34a'},
        {label:'300',       valore:300,  tipo:'euro',      colore:'#c026d3'},
        {label:'500',       valore:500,  tipo:'euro',      colore:'#0369a1'},
        {label:'800',       valore:800,  tipo:'euro',      colore:'#6d28d9'},
        {label:'400',       valore:400,  tipo:'euro',      colore:'#7c3aed'},
        {label:'250',       valore:250,  tipo:'euro',      colore:'#0e7490'},
        {label:'1000',      valore:1000, tipo:'euro',      colore:'#rainbow'},
        {label:'150',       valore:150,  tipo:'euro',      colore:'#600'},
    ],

    // ── Stato ──────────────────────────────────────────────────────
    nomi: ['','',''],
    punteggioGioco: [0,0,0],
    punteggioRound: [0,0,0],
    jolly: [false,false,false],
    turno: 0,
    turnoIniziale: 0,
    manche: 0,
    sottomanche: 0,
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

    // ── Reset ──────────────────────────────────────────────────────
    reset() {
        this.nomi = ['','',''];
        this.punteggioGioco = [0,0,0];
        this.punteggioRound = [0,0,0];
        this.jolly = [false,false,false];
        this.turno = 0; this.turnoIniziale = 0;
        this.manche = 0; this.sottomanche = 0;
        this.valoreRuota = 0; this.attesaLettera = false;
        this.faseGong = false;
        this.lettereRivelate = new Set();
        this.fraseCorrente = null; this.fraseArray = [];
        this.fraseLettereScoperte = [];
        this._jollyPreso = false; this._griglia = null; this._posMap = null;
        clearInterval(this._termometroTimer); this._termometroTimer = null;
        this._termometroEliminate = [];
        this._trileteBonusRound = [0,0,0];
    },

    // ── Helpers ────────────────────────────────────────────────────
    _nomeTurno() { return this.nomi[this.turno] || `Giocatore ${this.turno+1}`; },
    _fmtEuro(n) { return n === 0 ? '0 €' : n.toLocaleString('it-IT') + ' €'; },

    _passaTurno() {
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

    // ── Tabellone ──────────────────────────────────────────────────
    _cellInRange(r,c) {
        let {s,n}=this.CELL_RANGES[r]; return c>=s && c<s+n;
    },

    _nuovaFrase(pool) {
        let lista = pool || FRASI_RUOTA;
        this.fraseCorrente = lista[Math.floor(Math.random()*lista.length)];
        this.lettereRivelate = new Set();
        this.fraseArray = this.fraseCorrente.frase.split('');
        // spaces/punct start revealed, letters start hidden
        this.fraseLettereScoperte = this.fraseArray.map(c => !/[A-ZÀ-Ö]/i.test(c));
        this._computeGriglia();
    },

    _computeGriglia() {
        let frase = this.fraseCorrente ? this.fraseCorrente.frase : '';
        let RANGES = this.CELL_RANGES;
        let maxW = RANGES.map(r=>r.n); // [11,13,13,11]

        // Init: null = fuori range, ' ' = cella vuota attiva
        let griglia = Array.from({length:4},()=>Array(13).fill(null));
        let posMap  = Array.from({length:4},()=>Array(13).fill(-1));
        for (let r=0;r<4;r++) for (let c=RANGES[r].s;c<RANGES[r].s+RANGES[r].n;c++) griglia[r][c]=' ';

        if (!frase) { this._griglia=griglia; this._posMap=posMap; return; }

        // Word-wrap
        let words = frase.split(' ');
        let lines = [];
        let cur = '';
        for (let w of words) {
            let ri = lines.length;
            let mw = ri<4 ? maxW[ri] : 11;
            if (!cur) { cur=w; }
            else if (cur.length+1+w.length<=mw) { cur+=' '+w; }
            else { lines.push(cur); cur=w; }
        }
        if (cur) lines.push(cur);

        // Center vertically
        let startRow = Math.max(0, Math.floor((4-lines.length)/2));

        // Place lines in grid
        for (let i=0;i<lines.length&&startRow+i<4;i++) {
            let r = startRow+i;
            let line = lines[i];
            let rng = RANGES[r];
            let startC = rng.s + Math.floor((rng.n - line.length)/2);
            for (let j=0;j<line.length;j++) {
                let c=startC+j;
                if (c>=0&&c<13) griglia[r][c]=line[j];
            }
        }

        // Build posMap: non-space griglia chars → frase letter indices
        let gridLetters=[];
        for (let r=0;r<4;r++) for (let c=0;c<13;c++) {
            let ch=griglia[r][c];
            if (ch!==null && ch!==' ') gridLetters.push({r,c});
        }
        let fraseIdxs=[];
        for (let i=0;i<frase.length;i++) if (/[A-ZÀ-Ö'`'']/i.test(frase[i])) fraseIdxs.push(i);

        for (let k=0;k<Math.min(gridLetters.length,fraseIdxs.length);k++) {
            let {r,c}=gridLetters[k];
            posMap[r][c]=fraseIdxs[k];
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

    _buildTabellone() {
        let {CELL_W,CELL_H,CELL_GAP,CELL_RANGES}=this;
        let griglia=this._griglia, posMap=this._posMap;
        let totalW = 13*CELL_W + 12*CELL_GAP;
        let totalH = 4*CELL_H  +  3*CELL_GAP;

        let wrap = document.createElement("div");
        wrap.id = "ruota-tabellone";
        wrap.style.cssText = `position:relative;width:${totalW}px;height:${totalH}px;flex-shrink:0;`;

        for (let r=0;r<4;r++) {
            for (let c=0;c<13;c++) {
                let ch = griglia ? griglia[r][c] : null;
                if (ch===null) continue; // fuori range

                let x = c*(CELL_W+CELL_GAP);
                let y = r*(CELL_H+CELL_GAP);

                let cell = document.createElement("div");
                cell.style.cssText = `
                    position:absolute;left:${x}px;top:${y}px;
                    width:${CELL_W}px;height:${CELL_H}px;
                    border-radius:5px;
                    display:flex;align-items:center;justify-content:center;
                    box-sizing:border-box;
                `;

                if (ch===' ') {
                    // Cella attiva ma senza lettera — ROSSA (non utilizzata)
                    cell.style.background='#c0185a';
                    cell.style.border='3px solid #8a0030';
                } else {
                    // Cella con lettera — BIANCA se non rivelata, BIANCA+lettera se rivelata
                    let fIdx = posMap ? posMap[r][c] : -1;
                    let scoperta = fIdx>=0 && this.fraseLettereScoperte[fIdx];
                    cell.style.background = '#ffffff';
                    cell.style.border = '3px solid #cccccc';
                    cell.style.fontFamily = "'Barlow Condensed',sans-serif";
                    cell.style.fontSize = '54px';
                    cell.style.fontWeight = '800';
                    // Lettera visibile solo se rivelata
                    cell.style.color = scoperta ? '#111111' : '#ffffff';
                    cell.textContent = ch;
                }
                wrap.appendChild(cell);
            }
        }
        return wrap;
    },

    _buildLettereChip() {
        let wrap = document.createElement("div");
        wrap.style.cssText = `display:flex;flex-wrap:wrap;gap:6px;justify-content:center;`;
        for (let l of 'BCDFGHLMNPQRSTVZ') {
            let usata = this.lettereRivelate.has(l);
            let chip = document.createElement("div");
            chip.innerHTML = l;
            chip.style.cssText = `
                width:40px;height:40px;border-radius:7px;
                display:flex;align-items:center;justify-content:center;
                font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;
                background:${usata?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.15)'};
                color:${usata?'rgba(255,255,255,0.2)':'white'};
                border:1px solid ${usata?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.3)'};
                text-decoration:${usata?'line-through':'none'};
            `;
            wrap.appendChild(chip);
        }
        return wrap;
    },

    _buildScoresBar() {
        let bar = document.createElement("div");
        bar.style.cssText = `display:flex;height:84px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.08);`;
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
            nome.innerHTML=this.nomi[i]+(this.jolly[i]?' 🃏':'');
            nome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:3px;color:${isActive?this.COLORS[i]:'rgba(255,255,255,0.45)'};`;
            let sc=document.createElement("div");
            sc.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            sc.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;color:${isActive?'white':'rgba(255,255,255,0.3)'};`;
            let rnd=document.createElement("div");
            rnd.innerHTML=this.punteggioRound[i]>0?`+${this._fmtEuro(this.punteggioRound[i])} round`:'';
            rnd.style.cssText=`font-family:'Barlow',sans-serif;font-size:14px;color:#f0c800aa;`;
            col.appendChild(nome); col.appendChild(sc); col.appendChild(rnd);
            bar.appendChild(col);
        }
        return bar;
    },

    // ── Ruota Canvas (stile TV) ─────────────────────────────────────
    _segColors: [
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
        '#1e3a8a','#1d4ed8','#1e3a8a','#3730a3',
    ],

    _colorSeg(i, tipo, sp) {
        // Use per-spicchio colour defined in SPICCHI array
        if (sp && sp.colore && sp.colore!=='#rainbow') return sp.colore;
        if (tipo==='bancarotta') return '#f0f0f0';
        if (tipo==='passa')      return '#d4d4c8';
        if (tipo==='jolly')      return '#f8f8f8';
        if (tipo==='raddoppia')  return '#16a34a';
        return i%2===0?'#1e40af':'#1e3a8a';
    },

    _drawRainbow(ctx, cx, cy, R, sa, ea) {
        // Multicolour arc fill for the 1000€ segment
        let grad = ctx.createConicGradient(sa, cx, cy);
        grad.addColorStop(0,      '#ff0000');
        grad.addColorStop(0.16,   '#ff8800');
        grad.addColorStop(0.33,   '#ffff00');
        grad.addColorStop(0.5,    '#00cc44');
        grad.addColorStop(0.66,   '#0088ff');
        grad.addColorStop(0.83,   '#8800ff');
        grad.addColorStop(1,      '#ff0000');
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
        ctx.fillStyle=grad; ctx.fill();
    },

    _disegnaRuota(canvas, rotation) {
        let ctx = canvas.getContext("2d");
        let cx=canvas.width/2, cy=canvas.height/2;
        let R=cx-16;
        let n=this.SPICCHI.length;
        let slice=(Math.PI*2)/n;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Outer rim
        ctx.beginPath(); ctx.arc(cx,cy,R+14,0,Math.PI*2);
        ctx.fillStyle='#0d1b4b'; ctx.fill();

        // Segments
        for (let i=0;i<n;i++) {
            let sp = this.SPICCHI[i];
            if (sp.tipo==='jolly'&&this._jollyPreso) sp={label:'500',valore:500,tipo:'euro'};

            let sa=-Math.PI/2+rotation+i*slice;
            let ea=sa+slice;

            if (sp.colore==='#rainbow') {
                this._drawRainbow(ctx,cx,cy,R,sa,ea);
            } else {
                ctx.beginPath(); ctx.moveTo(cx,cy);
                ctx.arc(cx,cy,R,sa,ea); ctx.closePath();
                ctx.fillStyle=this._colorSeg(i,sp.tipo,sp); ctx.fill();
            }

            // White divider
            ctx.beginPath(); ctx.moveTo(cx,cy);
            ctx.lineTo(cx+Math.cos(sa)*R, cy+Math.sin(sa)*R);
            ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=2; ctx.stroke();

            // Text — written radially from rim toward center
            let textAngle = sa+slice/2;
            let textR = R*0.70;
            ctx.save();
            ctx.translate(cx+Math.cos(textAngle)*textR, cy+Math.sin(textAngle)*textR);
            ctx.rotate(textAngle+Math.PI/2);
            ctx.textAlign='center'; ctx.textBaseline='middle';
            // Shadow/outline for legibility
            let textColor = sp.tipo==='passa'?'#222222':'#ffd700';
            if (sp.tipo==='bancarotta') textColor='#aaaaaa';
            ctx.shadowColor='rgba(0,0,0,0.8)'; ctx.shadowBlur=4;
            ctx.fillStyle=textColor;
            let fs = sp.label.length>7?11:sp.label.length>5?13:15;
            ctx.font=`bold ${fs}px 'Barlow Condensed',sans-serif`;
            ctx.fillText(sp.label,0,0);
            ctx.shadowBlur=0;
            ctx.restore();
        }

        // Inner hub — dark circle with gold ring
        let hubR=R*0.38;
        ctx.beginPath(); ctx.arc(cx,cy,hubR,0,Math.PI*2);
        ctx.fillStyle='#0d1b4b'; ctx.fill();
        ctx.strokeStyle='#ffd700'; ctx.lineWidth=4; ctx.stroke();

        // Outer gold ring
        ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2);
        ctx.strokeStyle='#ffd700'; ctx.lineWidth=3; ctx.stroke();

        // Pointer at top
        ctx.beginPath();
        ctx.moveTo(cx, cy-R-12);
        ctx.lineTo(cx-10, cy-R+8);
        ctx.lineTo(cx+10, cy-R+8);
        ctx.closePath();
        ctx.fillStyle='white'; ctx.fill();
        ctx.strokeStyle='#333'; ctx.lineWidth=1; ctx.stroke();
    },

    // ── Setup nomi ─────────────────────────────────────────────────
    setup() {
        grafica._statusBar("← TORNA AL MENU","RUOTA DELLA FORTUNA",()=>{
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:40px;padding:40px 140px;
        `;

        let title=document.createElement("div");
        title.innerHTML="INSERISCI I NOMI";
        title.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:54px;font-weight:800;letter-spacing:6px;color:white;`;

        let sub=document.createElement("div");
        sub.innerHTML="3 giocatori · 5 manche · La ruota decide tutto";
        sub.style.cssText=`font-family:'Barlow',sans-serif;font-size:24px;color:rgba(255,255,255,0.4);margin-top:-20px;`;

        let inputsRow=document.createElement("div");
        inputsRow.style.cssText=`display:flex;gap:36px;width:100%;`;

        let labels=['GIOCATORE 1','GIOCATORE 2','GIOCATORE 3'];
        let inputs=[];
        for (let i=0;i<3;i++) {
            let col=document.createElement("div");
            col.style.cssText=`flex:1;display:flex;flex-direction:column;gap:12px;`;
            let lbl=document.createElement("div");
            lbl.innerHTML=labels[i];
            lbl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:4px;color:${this.COLORS[i]};`;
            let inp=document.createElement("input");
            inp.type="text"; inp.placeholder=labels[i];
            inp.style.cssText=`
                background:rgba(255,255,255,0.07);
                border:2px solid ${this.COLORS[i]}55;
                border-radius:14px;padding:20px 24px;
                font-family:'Barlow Condensed',sans-serif;
                font-size:36px;font-weight:700;color:white;
                outline:none;width:100%;box-sizing:border-box;
            `;
            inp.addEventListener('focus',()=>inp.style.borderColor=this.COLORS[i]);
            inp.addEventListener('blur',()=>inp.style.borderColor=this.COLORS[i]+'55');
            inputs.push(inp);
            col.appendChild(lbl); col.appendChild(inp);
            inputsRow.appendChild(col);
        }

        let btn=document.createElement("button");
        btn.innerHTML="AVVIA LA PARTITA &#9654;";
        btn.style.cssText=`
            background:#f0c800;color:#1a0a3c;border:none;border-radius:18px;
            padding:28px 120px;
            font-family:'Barlow Condensed',sans-serif;
            font-size:46px;font-weight:800;letter-spacing:4px;cursor:pointer;
            box-shadow:0 8px 50px rgba(240,200,0,0.4);
        `;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>{
            for (let i=0;i<3;i++) ruota.nomi[i]=inputs[i].value.trim().toUpperCase()||labels[i];
            ruota._avviaPartita();
        });

        wrap.appendChild(title); wrap.appendChild(sub);
        wrap.appendChild(inputsRow); wrap.appendChild(btn);
        field.appendChild(wrap);
    },

    _avviaPartita() {
        this.manche=0; this.punteggioGioco=[0,0,0]; this.punteggioRound=[0,0,0];
        this.jolly=[false,false,false]; this._jollyPreso=false;
        this._iniziaManche();
    },

    // ── Schermata Manche ───────────────────────────────────────────
    _iniziaManche() {
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });

        let NOMI_MANCHE=['IL TERMOMETRO','MANCHE 1','MANCHE 2','IL TRIPLETE','LA SFIDA A TEMPO'];
        let DESC_MANCHE=[
            'Tabellone automatico — Il primo che indovina vince 500 € e inizia per primo',
            'Ruota classica — Chi indovina congela i punti del round',
            'Ruota classica — Inizia chi non ha ancora aperto la manche',
            'Tre tabelloni veloci — 1000 € per tabellone, bonus 5000 se li fai tutti',
            'Il Gong — Turni veloci — Vocali gratis — Chi indovina vince la puntata'
        ];

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:36px;
        `;
        let tag=document.createElement("div");
        tag.innerHTML=`MANCHE ${this.manche+1} / 5`;
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:700;letter-spacing:8px;color:rgba(255,255,255,0.3);`;

        let titolo=document.createElement("div");
        titolo.innerHTML=NOMI_MANCHE[this.manche];
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;text-shadow:0 0 80px rgba(240,200,0,0.5);letter-spacing:4px;text-align:center;line-height:1;`;

        let desc=document.createElement("div");
        desc.innerHTML=DESC_MANCHE[this.manche];
        desc.style.cssText=`font-family:'Barlow',sans-serif;font-size:26px;color:rgba(255,255,255,0.45);text-align:center;max-width:900px;`;

        // Punteggi mini
        let scRow=document.createElement("div");
        scRow.style.cssText=`display:flex;gap:30px;`;
        for (let i=0;i<3;i++) {
            let cell=document.createElement("div");
            cell.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(255,255,255,0.05);border-radius:14px;padding:16px 36px;`;
            let n=document.createElement("div");
            n.innerHTML=this.nomi[i];
            n.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;letter-spacing:3px;color:${this.COLORS[i]};`;
            let s=document.createElement("div");
            s.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            s.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;color:white;`;
            cell.appendChild(n); cell.appendChild(s); scRow.appendChild(cell);
        }

        let btn=document.createElement("button");
        btn.innerHTML="INIZIA &nbsp;&#9654;";
        btn.style.cssText=`
            background:#f0c800;color:#1a0a3c;border:none;border-radius:16px;
            padding:26px 110px;
            font-family:'Barlow Condensed',sans-serif;font-size:42px;font-weight:800;letter-spacing:4px;
            cursor:pointer;box-shadow:0 8px 50px rgba(240,200,0,0.4);
        `;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>ruota._startManche());

        wrap.appendChild(tag); wrap.appendChild(titolo); wrap.appendChild(desc);
        wrap.appendChild(scRow); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current="RuotaManche";
    },

    _startManche() {
        this.punteggioRound=[0,0,0]; this.faseGong=false;
        // Chi inizia
        let inizia=[0,0,1,2,this._playerConPiuPunti()];
        this.turnoIniziale=inizia[this.manche]||0;
        this.turno=this.turnoIniziale;

        if (this.manche===0) { this._termometro(); }
        else if (this.manche===3) { this.sottomanche=0; this._trileteBonusRound=[0,0,0]; this._prossimaTriplete(); }
        else if (this.manche===4) { this._startFinale(); }
        else { this._nuovaFrase(); grafica.puliscifield(); this._renderGioco(); main.current="RuotaGioco"; }
    },

    // ── Il Termometro ─────────────────────────────────────────────
    _termometro() {
        this._nuovaFrase();
        this._termometroEliminate=[];
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA · IL TERMOMETRO",()=>{});

        let wrap=document.createElement("div");
        wrap.id="termometro-wrap";
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;gap:20px;
            padding:24px 80px 30px;
        `;

        let catEl=document.createElement("div");
        catEl.innerHTML=`Categoria: <strong style="color:#f0c800">${this.fraseCorrente.categoria}</strong>`;
        catEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;letter-spacing:4px;color:rgba(255,255,255,0.4);`;

        wrap.appendChild(catEl);
        wrap.appendChild(this._buildTabellone());
        wrap.appendChild(this._buildLettereChip());

        // Pulsanti per i 3 giocatori
        let btnRow=document.createElement("div");
        btnRow.style.cssText=`display:flex;gap:24px;width:100%;margin-top:8px;`;
        for (let i=0;i<3;i++) {
            let btn=document.createElement("button");
            btn.id=`termo-btn-${i}`;
            btn.innerHTML=`${this.nomi[i]} — DAI LA SOLUZIONE`;
            btn.style.cssText=`
                flex:1;padding:20px;
                background:rgba(255,255,255,0.07);border:2px solid ${this.COLORS[i]}66;
                border-radius:14px;color:${this.COLORS[i]};
                font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;
                cursor:pointer;
            `;
            let idx=i;
            btn.addEventListener('click',()=>ruota._termometroSoluzione(idx));
            btnRow.appendChild(btn);
        }

        wrap.appendChild(btnRow);
        field.appendChild(wrap);
        main.current="RuotaTermometro";

        // Auto-reveal letters
        let allLetters='ABCDEFGHILMNOPQRSTUVZ'.split('');
        // shuffle
        for (let i=allLetters.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[allLetters[i],allLetters[j]]=[allLetters[j],allLetters[i]];}
        let qi=0;
        this._termometroTimer=setInterval(()=>{
            if (qi>=allLetters.length){clearInterval(ruota._termometroTimer);return;}
            let l=allLetters[qi++];
            if (ruota._contaLettera(l)>0){
                ruota._rivelaLettera(l);
                let tab=document.getElementById("ruota-tabellone");
                if (tab) tab.replaceWith(ruota._buildTabellone());
            }
            // check if all scoperte
            if (ruota._tutteScoperte()){
                clearInterval(ruota._termometroTimer);
                ruota._showToast("Nessuno ha risposto! Prossima manche.","#888");
                setTimeout(()=>{
                    ruota.manche++; ruota._iniziaManche();
                },2500);
            }
        },1500);
    },

    _termometroSoluzione(playerIdx) {
        if (this._termometroEliminate.includes(playerIdx)) return;
        clearInterval(this._termometroTimer);

        // Overlay soluzione sopra la schermata termometro (non la sostituisce)
        let overlay=document.createElement("div");
        overlay.id="termo-overlay";
        overlay.style.cssText=`
            position:absolute;top:0;left:0;right:0;bottom:0;
            background:rgba(10,0,24,0.96);display:flex;flex-direction:column;
            align-items:center;justify-content:center;gap:36px;z-index:500;padding:0 120px;
        `;

        let titolo=document.createElement("div");
        titolo.innerHTML=`${this.nomi[playerIdx]} — DAI LA SOLUZIONE`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;color:${this.COLORS[playerIdx]};letter-spacing:3px;`;

        let inp=document.createElement("input");
        inp.type="text"; inp.placeholder="Scrivi la frase...";
        inp.style.cssText=`
            background:rgba(255,255,255,0.07);border:2px solid ${this.COLORS[playerIdx]}88;
            border-radius:14px;padding:24px 36px;
            font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;
            color:white;outline:none;width:100%;box-sizing:border-box;text-transform:uppercase;
        `;

        let btnRow=document.createElement("div");
        btnRow.style.cssText=`display:flex;gap:20px;width:100%;`;
        let okBtn=document.createElement("button");
        okBtn.innerHTML="✓ CONFERMA";
        okBtn.style.cssText=`flex:2;background:rgba(34,204,102,0.12);color:#22cc66;border:2px solid rgba(34,204,102,0.5);border-radius:14px;padding:22px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;cursor:pointer;`;
        let annullaBtn=document.createElement("button");
        annullaBtn.innerHTML="← ANNULLA";
        annullaBtn.style.cssText=`flex:1;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:22px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:700;cursor:pointer;`;
        annullaBtn.addEventListener('click',()=>{
            overlay.remove();
            ruota._termometro_resumeTimer();
        });

        let doCheck=()=>{
            let risposta=inp.value.trim().toUpperCase();
            let corretta=ruota.fraseCorrente?ruota.fraseCorrente.frase.toUpperCase():'';
            if (risposta===corretta) {
                ruota.punteggioGioco[playerIdx]+=500;
                ruota.turnoIniziale=playerIdx; ruota.turno=playerIdx;
                overlay.remove();
                ruota._showToast(`${ruota.nomi[playerIdx]} vince il Termometro! +500 €`,"#22cc66");
                setTimeout(()=>{ ruota.manche++; ruota._iniziaManche(); },2000);
            } else {
                ruota._termometroEliminate.push(playerIdx);
                ruota._showToast("Sbagliato!","#ff4444");
                setTimeout(()=>{
                    overlay.remove();
                    // Disabilita il pulsante nella schermata sottostante
                    let btn=document.getElementById(`termo-btn-${playerIdx}`);
                    if (btn){btn.style.opacity='0.25';btn.style.pointerEvents='none';}
                    if (ruota._termometroEliminate.length>=3){
                        ruota._showToast("Tutti eliminati! Prossima manche.","#888");
                        setTimeout(()=>{ ruota.manche++; ruota._iniziaManche(); },2000);
                    } else {
                        ruota._termometro_resumeTimer();
                    }
                },1400);
            }
        };
        okBtn.addEventListener('click',doCheck);
        inp.addEventListener('keydown',e=>{if(e.key==='Enter')doCheck();});

        btnRow.appendChild(okBtn); btnRow.appendChild(annullaBtn);
        overlay.appendChild(titolo); overlay.appendChild(inp); overlay.appendChild(btnRow);
        field.appendChild(overlay);
        setTimeout(()=>inp.focus(),80);
    },

    _termometro_resumeTimer(){
        let allLetters='ABCDEFGHILMNOPQRSTUVZ'.split('');
        let remaining=allLetters.filter(l=>!this.lettereRivelate.has(l));
        let qi=0;
        this._termometroTimer=setInterval(()=>{
            if (qi>=remaining.length){clearInterval(ruota._termometroTimer);return;}
            let l=remaining[qi++];
            if (ruota._contaLettera(l)>0){
                ruota._rivelaLettera(l);
                let tab=document.getElementById("ruota-tabellone");
                if (tab) tab.replaceWith(ruota._buildTabellone());
            }
            if (ruota._tutteScoperte()){ clearInterval(ruota._termometroTimer); }
        },1500);
    },

    // ── Render Gioco principale ────────────────────────────────────
    _renderGioco() {
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{
            ruota.reset(); grafica.puliscifield(); grafica.home(); main.current="Home";
        });

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;`;

        wrap.appendChild(this._buildScoresBar());

        let center=document.createElement("div");
        center.style.cssText=`flex:1;display:flex;min-height:0;`;

        // Left: tabellone
        let leftPanel=document.createElement("div");
        leftPanel.style.cssText=`
            flex:1;display:flex;flex-direction:column;
            align-items:center;justify-content:center;
            padding:16px 24px;gap:12px;min-width:0;
        `;

        let catEl=document.createElement("div");
        catEl.innerHTML=`Categoria: <strong style="color:#f0c800">${this.fraseCorrente?this.fraseCorrente.categoria:''}</strong>`;
        catEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:4px;color:rgba(255,255,255,0.4);`;

        leftPanel.appendChild(catEl);
        leftPanel.appendChild(this._buildTabellone());
        leftPanel.appendChild(this._buildLettereChip());

        // Right panel: turno + ruota + azioni
        let rightPanel=document.createElement("div");
        rightPanel.style.cssText=`
            width:500px;flex-shrink:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            padding:16px 24px;gap:18px;
            border-left:1px solid rgba(255,255,255,0.07);
        `;

        rightPanel.appendChild(this._buildTurnoInfo());

        // Wheel canvas
        let canvas=document.createElement("canvas");
        canvas.width=320;canvas.height=320;
        canvas.style.cssText=`width:260px;height:260px;`;
        this._disegnaRuota(canvas,0);
        rightPanel.appendChild(canvas);

        rightPanel.appendChild(this._buildAzioni());

        center.appendChild(leftPanel);
        center.appendChild(rightPanel);
        wrap.appendChild(center);
        field.appendChild(wrap);
    },

    _buildTurnoInfo() {
        let wrap=document.createElement("div");
        wrap.style.cssText=`text-align:center;`;
        let label=document.createElement("div");
        label.innerHTML="TURNO DI";
        label.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:18px;letter-spacing:5px;color:rgba(255,255,255,0.3);`;
        let nome=document.createElement("div");
        nome.innerHTML=this._nomeTurno();
        nome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;color:${this.COLORS[this.turno]};letter-spacing:2px;`;
        let rnd=document.createElement("div");
        rnd.innerHTML=this.punteggioRound[this.turno]>0?`Round: <strong style="color:#f0c800">${this._fmtEuro(this.punteggioRound[this.turno])}</strong>`:'Round: 0 €';
        rnd.style.cssText=`font-family:'Barlow',sans-serif;font-size:20px;color:rgba(255,255,255,0.4);`;
        wrap.appendChild(label); wrap.appendChild(nome); wrap.appendChild(rnd);
        return wrap;
    },

    _buildAzioni() {
        let wrap=document.createElement("div");
        wrap.style.cssText=`display:flex;flex-direction:column;gap:10px;width:100%;`;
        let canBuyVocal = this.punteggioRound[this.turno]>=500;

        let btnGira=this._mkBtn("🎡  GIRA LA RUOTA","#f0c800","#1a0a3c",()=>ruota._giraRuota(),false);
        let btnVocale=this._mkBtn(`🔤  VOCALE · 500 €`,"rgba(255,255,255,0.07)","rgba(255,255,255,0.6)",()=>ruota._apriCompraVocale(),!canBuyVocal);
        let btnSol=this._mkBtn("💡  DAI LA SOLUZIONE","rgba(34,204,102,0.1)","#22cc66",()=>ruota._apriSoluzione(null,null),false);

        if (this.attesaLettera) { btnGira.style.opacity='0.3'; btnGira.style.pointerEvents='none'; }

        wrap.appendChild(btnGira); wrap.appendChild(btnVocale); wrap.appendChild(btnSol);
        return wrap;
    },

    _mkBtn(label,bg,color,onClick,disabled) {
        let btn=document.createElement("button");
        btn.innerHTML=label;
        btn.style.cssText=`
            width:100%;padding:16px 18px;
            background:${bg};color:${color};
            border:2px solid rgba(255,255,255,0.1);border-radius:12px;
            font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:700;
            letter-spacing:2px;text-align:left;cursor:pointer;
            opacity:${disabled?'0.3':'1'};
            pointer-events:${disabled?'none':'auto'};
        `;
        btn.addEventListener('click',onClick);
        return btn;
    },

    // ── Gira Ruota ────────────────────────────────────────────────
    _giraRuota() {
        if (this.attesaLettera) return;
        main.current="RuotaSpin";
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;
        `;

        let canvas=document.createElement("canvas");
        canvas.width=500;canvas.height=500;
        canvas.style.cssText=`width:420px;height:420px;`;

        let risultatoEl=document.createElement("div");
        risultatoEl.style.cssText=`
            font-family:'Barlow Condensed',sans-serif;
            font-size:64px;font-weight:800;color:#f0c800;
            letter-spacing:4px;min-height:80px;text-align:center;
        `;

        let continuaBtn=document.createElement("button");
        continuaBtn.innerHTML="CONTINUA";
        continuaBtn.style.cssText=`
            background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;
            padding:22px 100px;
            font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;letter-spacing:4px;
            cursor:pointer;display:none;
        `;

        wrap.appendChild(canvas); wrap.appendChild(risultatoEl); wrap.appendChild(continuaBtn);
        field.appendChild(wrap);

        // Pre-determine target
        let n=this.SPICCHI.length;
        let sliceAngle=(Math.PI*2)/n;
        let idxTarget=Math.floor(Math.random()*n);
        let fullRot=5+Math.floor(Math.random()*4);
        // Formula: land in center of segment idxTarget
        let totalAngle=fullRot*Math.PI*2 + (n-idxTarget)*sliceAngle - sliceAngle*0.5;

        let startTime=performance.now();
        let duration=3500;

        let anim=(now)=>{
            let t=Math.min((now-startTime)/duration,1);
            let ease=1-Math.pow(1-t,3);
            let angle=totalAngle*ease;

            ruota._disegnaRuota(canvas,angle);

            if (t<1) { requestAnimationFrame(anim); }
            else {
                // Verify which segment landed
                let normalized=((-totalAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
                let spiccioVincente=Math.floor(normalized/sliceAngle)%n;

                let sp=ruota.SPICCHI[spiccioVincente];
                if (sp.tipo==='jolly'&&ruota._jollyPreso) sp={label:'500',valore:500,tipo:'euro'};

                risultatoEl.innerHTML=sp.label;
                continuaBtn.style.display='block';
                continuaBtn.onclick=()=>ruota._dopoRuota(sp,spiccioVincente);
            }
        };
        requestAnimationFrame(anim);
    },

    _dopoRuota(sp,idx) {
        if (sp.tipo==='bancarotta') {
            this.punteggioRound[this.turno]=0;
            this.punteggioGioco[this.turno]=0;
            this._showToast("💥 BANCAROTTA! Perdi tutto.","#ff4444");
            setTimeout(()=>ruota._passaTurno(),2000);
        } else if (sp.tipo==='passa') {
            this._showToast("PASSA — il turno passa.","#888888");
            setTimeout(()=>ruota._passaTurno(),1800);
        } else if (sp.tipo==='jolly') {
            this.jolly[this.turno]=true; this._jollyPreso=true;
            this._showToast("🃏 JOLLY! Una seconda chance è tua.","#7B2FBE");
            setTimeout(()=>{ ruota._renderGioco(); main.current="RuotaGioco"; },2000);
        } else if (sp.tipo==='raddoppia') {
            this._showToast("✖2 RADDOPPIA! Chiama una consonante.","#059669");
            this.attesaLettera=true; this._tipoAzione='raddoppia';
            setTimeout(()=>ruota._apriChiamataLettera(true),1800);
        } else {
            this.valoreRuota=sp.valore;
            this.attesaLettera=true; this._tipoAzione='euro';
            setTimeout(()=>ruota._apriChiamataLettera(false),1200);
        }
    },

    // ── Chiama Lettera ─────────────────────────────────────────────
    _apriChiamataLettera(isRaddoppia) {
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;
        `;

        let titolo=document.createElement("div");
        titolo.innerHTML=isRaddoppia
            ? `✖2 RADDOPPIA · Chiama una consonante`
            : `<strong style="color:#f0c800">${this._fmtEuro(this.valoreRuota)}</strong> · Chiama una consonante`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;color:white;text-align:center;`;

        let grid=document.createElement("div");
        grid.style.cssText=`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;max-width:900px;`;

        for (let l of 'BCDFGHLMNPQRSTVZ') {
            let usata=this.lettereRivelate.has(l);
            let btn=document.createElement("button");
            btn.innerHTML=l;
            btn.style.cssText=`
                width:94px;height:94px;
                font-family:'Barlow Condensed',sans-serif;font-size:50px;font-weight:800;
                background:${usata?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.12)'};
                color:${usata?'rgba(255,255,255,0.2)':'white'};
                border:2px solid ${usata?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.3)'};
                border-radius:12px;cursor:${usata?'default':'pointer'};
            `;
            if (!usata) btn.addEventListener('click',()=>ruota._confermaCons(l,isRaddoppia));
            grid.appendChild(btn);
        }

        wrap.appendChild(titolo); wrap.appendChild(grid);
        field.appendChild(wrap);
        main.current="RuotaLettera";
    },

    _confermaCons(lettera,isRaddoppia) {
        let count=this._contaLettera(lettera);
        this._rivelaLettera(lettera);
        this.attesaLettera=false;

        if (count===0) {
            this._showToast(`"${lettera}" non è presente!`,"#ff4444");
            setTimeout(()=>ruota._passaTurno(),2000);
        } else {
            if (isRaddoppia) {
                this.punteggioRound[this.turno]*=2;
                this._showToast(`"${lettera}" c'è ${count}x · Punteggio RADDOPPIATO!`,"#22cc66");
            } else {
                let guad=this.valoreRuota*count;
                this.punteggioRound[this.turno]+=guad;
                this._showToast(`"${lettera}" c'è ${count}x · +${this._fmtEuro(guad)}!`,"#22cc66");
            }
            setTimeout(()=>{
                if (ruota._tutteScoperte()) ruota._vinceRound(ruota.turno);
                else { ruota._renderGioco(); main.current="RuotaGioco"; }
            },2200);
        }
    },

    // ── Compra Vocale ──────────────────────────────────────────────
    _apriCompraVocale() {
        if (!this.faseGong && this.punteggioRound[this.turno]<500) return;
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;
        `;

        let titolo=document.createElement("div");
        titolo.innerHTML=this.faseGong
            ? "Scegli una vocale <em style='font-size:28px;color:rgba(255,255,255,0.35)'>(gratis in fase finale)</em>"
            : `Scegli una vocale · costo <strong style="color:#f0c800">500 €</strong>`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;color:white;text-align:center;`;

        let grid=document.createElement("div");
        grid.style.cssText=`display:flex;gap:24px;`;
        for (let v of 'AEIOU') {
            let usata=this.lettereRivelate.has(v);
            let btn=document.createElement("button");
            btn.innerHTML=v;
            btn.style.cssText=`
                width:130px;height:130px;
                font-family:'Barlow Condensed',sans-serif;font-size:78px;font-weight:800;
                background:${usata?'rgba(255,255,255,0.04)':'rgba(240,200,0,0.12)'};
                color:${usata?'rgba(255,255,255,0.2)':'#f0c800'};
                border:2px solid ${usata?'rgba(255,255,255,0.06)':'rgba(240,200,0,0.45)'};
                border-radius:18px;cursor:${usata?'default':'pointer'};
            `;
            if (!usata) btn.addEventListener('click',()=>ruota._confermaVocale(v));
            grid.appendChild(btn);
        }

        let backBtn=this._mkBtn("← INDIETRO","rgba(255,255,255,0.06)","rgba(255,255,255,0.45)",()=>{
            ruota._renderGioco(); main.current="RuotaGioco";
        },false);
        backBtn.style.width="320px";

        wrap.appendChild(titolo); wrap.appendChild(grid); wrap.appendChild(backBtn);
        field.appendChild(wrap);
        main.current="RuotaVocale";
    },

    _confermaVocale(vocale) {
        if (!this.faseGong) {
            this.punteggioRound[this.turno]-=500;
            if (this.punteggioRound[this.turno]<0) this.punteggioRound[this.turno]=0;
        }
        let count=this._contaLettera(vocale);
        this._rivelaLettera(vocale);

        if (count===0) {
            this._showToast(`"${vocale}" non è presente.`,"#888888");
            setTimeout(()=>this.faseGong?ruota._prossimoTurnoGong():ruota._passaTurno(),1800);
        } else {
            this._showToast(`"${vocale}" presente ${count}x!`,"#22cc66");
            setTimeout(()=>{
                if (ruota._tutteScoperte()) ruota._vinceRound(ruota.turno);
                else if (ruota.faseGong) ruota._prossimoTurnoGong();
                else { ruota._renderGioco(); main.current="RuotaGioco"; }
            },2000);
        }
    },

    // ── Dai la Soluzione ───────────────────────────────────────────
    _apriSoluzione(onCorretta, onSbagliata) {
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:40px;padding:40px 120px;
        `;

        let titolo=document.createElement("div");
        titolo.innerHTML="DAI LA SOLUZIONE";
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:52px;font-weight:800;letter-spacing:4px;color:#f0c800;`;

        let hint=document.createElement("div");
        hint.innerHTML=`Categoria: <strong>${this.fraseCorrente?this.fraseCorrente.categoria:''}</strong>`;
        hint.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:28px;color:rgba(255,255,255,0.35);`;

        let inp=document.createElement("input");
        inp.type="text"; inp.placeholder="Scrivi la frase...";
        inp.style.cssText=`
            background:rgba(255,255,255,0.07);border:2px solid rgba(240,200,0,0.4);
            border-radius:14px;padding:24px 36px;
            font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:700;
            color:white;outline:none;width:100%;box-sizing:border-box;
            text-transform:uppercase;
        `;

        let btnRow=document.createElement("div");
        btnRow.style.cssText=`display:flex;gap:20px;`;

        let confermaBtn=document.createElement("button");
        confermaBtn.innerHTML="✓ CONFERMA";
        confermaBtn.style.cssText=`
            flex:2;background:rgba(34,204,102,0.12);color:#22cc66;
            border:2px solid rgba(34,204,102,0.5);border-radius:14px;padding:22px;
            font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;cursor:pointer;
        `;

        let backBtn=document.createElement("button");
        backBtn.innerHTML="← INDIETRO";
        backBtn.style.cssText=`
            flex:1;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);
            border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:22px;
            font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:700;cursor:pointer;
        `;
        backBtn.addEventListener('click',()=>{
            if (!onCorretta){ruota._renderGioco();main.current="RuotaGioco";}
            else {ruota._termometro_resumeTimer();}
        });

        let doConferma=()=>{
            let risposta=inp.value.trim().toUpperCase();
            let corretta=this.fraseCorrente?this.fraseCorrente.frase.toUpperCase():'';
            if (risposta===corretta) {
                for (let i=0;i<this.fraseLettereScoperte.length;i++) this.fraseLettereScoperte[i]=true;
                if (onCorretta) { onCorretta(); }
                else { ruota._vinceRound(ruota.turno); }
            } else {
                if (onSbagliata) { ruota._showToast("Sbagliato!","#ff4444"); setTimeout(()=>onSbagliata(),1200); }
                else if (ruota.jolly[ruota.turno]) {
                    ruota._showToast("Sbagliato! Il Jolly ti salva.","#7B2FBE");
                    ruota.jolly[ruota.turno]=false;
                    setTimeout(()=>{ruota._renderGioco();main.current="RuotaGioco";},2000);
                } else {
                    ruota._showToast("Sbagliato! Il turno passa.","#ff4444");
                    setTimeout(()=>ruota._passaTurno(),2000);
                }
            }
        };

        confermaBtn.addEventListener('click',doConferma);
        inp.addEventListener('keydown',e=>{if(e.key==='Enter')doConferma();});

        btnRow.appendChild(confermaBtn); btnRow.appendChild(backBtn);
        wrap.appendChild(titolo); wrap.appendChild(hint); wrap.appendChild(inp); wrap.appendChild(btnRow);
        field.appendChild(wrap);
        setTimeout(()=>inp.focus(),100);
        main.current="RuotaSoluzione";
    },

    // ── Vittoria Round ─────────────────────────────────────────────
    _vinceRound(idx) {
        this._bancaRound(idx);
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;
        `;
        let tag=document.createElement("div");
        tag.innerHTML="SOLUZIONE ESATTA!";
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;letter-spacing:8px;color:rgba(255,255,255,0.35);`;

        let nomeEl=document.createElement("div");
        nomeEl.innerHTML=this.nomi[idx];
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
        btn.innerHTML=this.manche<4?"PROSSIMA MANCHE →":"VERDETTO FINALE →";
        btn.style.cssText=`
            background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;
            font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;
            cursor:pointer;margin-top:8px;
        `;
        btn.classList.add('btn-primary');
        btn.addEventListener('click',()=>{
            ruota.manche++;
            if (ruota.manche<=4) ruota._iniziaManche();
            else ruota._verdetto();
        });

        wrap.appendChild(tag); wrap.appendChild(nomeEl); wrap.appendChild(fraseEl);
        wrap.appendChild(scoreEl); wrap.appendChild(totLabel); wrap.appendChild(btn);
        field.appendChild(wrap);
        main.current="RuotaVittoriaRound";
    },

    // ── Triplete ───────────────────────────────────────────────────
    _triletteTimer: null,
    _trilettePrenotatoDa: -1,

    _prossimaTriplete() {
        if (this._triletteTimer) { clearInterval(this._triletteTimer); this._triletteTimer=null; }
        this._trilettePrenotatoDa=-1;

        if (this.sottomanche>=3) {
            for (let i=0;i<3;i++) this.punteggioGioco[i]+=this._trileteBonusRound[i];
            this.manche++; this._iniziaManche(); return;
        }
        this._nuovaFrase();
        // Raccoglie tutte le lettere uniche nella frase (da rivelare automaticamente)
        let lettereUniche=[...new Set(
            this.fraseArray.filter(c=>/[A-ZÀ-Öa-zà-öA-Z]/i.test(c)).map(c=>c.toUpperCase())
        )];
        let revIdx=0;

        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA · IL TRIPLETE",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`
            position:absolute;top:64px;left:0;right:0;bottom:0;
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:16px;padding:0 80px;
        `;

        let tag=document.createElement("div");
        tag.innerHTML=`TABELLONE ${this.sottomanche+1} / 3 &nbsp;·&nbsp; 1000 € se lo indovini`;
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:26px;letter-spacing:5px;color:rgba(255,255,255,0.35);`;

        let catEl=document.createElement("div");
        catEl.innerHTML=`Categoria: <strong style="color:#f0c800">${this.fraseCorrente.categoria}</strong>`;
        catEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;color:rgba(255,255,255,0.4);`;

        let tabEl=this._buildTabellone();

        // Punteggi mini
        let scRow=document.createElement("div");
        scRow.style.cssText=`display:flex;gap:24px;`;
        for (let i=0;i<3;i++) {
            let cell=document.createElement("div");
            cell.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:2px;background:rgba(255,255,255,0.05);border-radius:10px;padding:12px 28px;`;
            let n=document.createElement("div");
            n.innerHTML=this.nomi[i];
            n.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:${this.COLORS[i]};`;
            let s=document.createElement("div");
            s.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            s.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;color:white;`;
            cell.appendChild(n); cell.appendChild(s); scRow.appendChild(cell);
        }

        // 3 pulsanti PRENOTA (uno per giocatore)
        let prenotaRow=document.createElement("div");
        prenotaRow.style.cssText=`display:flex;gap:20px;width:100%;`;
        let prenotaBtns=[];
        for (let i=0;i<3;i++) {
            let pb=document.createElement("button");
            pb.innerHTML=`PRENOTA &nbsp;<strong>${this.nomi[i]}</strong>`;
            pb.style.cssText=`
                flex:1;padding:20px;border-radius:14px;
                background:rgba(255,255,255,0.07);
                color:${this.COLORS[i]};
                border:2px solid ${this.COLORS[i]}66;
                font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;
                letter-spacing:2px;cursor:pointer;
            `;
            let idx=i;
            pb.addEventListener('click',()=>{
                if (ruota._trilettePrenotatoDa>=0) return; // già prenotato
                if (ruota._triletteTimer) { clearInterval(ruota._triletteTimer); ruota._triletteTimer=null; }
                ruota._trilettePrenotatoDa=idx;
                // Disabilita tutti i tasti prenota
                prenotaBtns.forEach(b=>{b.style.opacity='0.3';b.style.pointerEvents='none';});
                // Apri overlay soluzione
                ruota._apriSoluzioneTriplete(idx, ()=>{
                    // Sbagliato — riavvia timer per gli altri
                    ruota._trilettePrenotatoDa=-1;
                    prenotaBtns.forEach(b=>{b.style.opacity='1';b.style.pointerEvents='auto';});
                    // Rimuovi overlay
                    let ov=document.getElementById("triplete-overlay"); if(ov) ov.remove();
                    ruota._triletteTimer=setInterval(()=>{
                        if (revIdx<lettereUniche.length) {
                            ruota._rivelaLettera(lettereUniche[revIdx++]);
                            let t=document.getElementById("ruota-tabellone");
                            if (t) t.replaceWith(ruota._buildTabellone());
                            if (ruota._tutteScoperte()) { clearInterval(ruota._triletteTimer); ruota._triletteTimer=null; }
                        } else { clearInterval(ruota._triletteTimer); ruota._triletteTimer=null; }
                    },1500);
                });
            });
            prenotaBtns.push(pb);
            prenotaRow.appendChild(pb);
        }

        let skipBtn=document.createElement("button");
        skipBtn.innerHTML="→ SALTA tabellone";
        skipBtn.style.cssText=`
            background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.35);
            border:2px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 40px;
            font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;cursor:pointer;
        `;
        skipBtn.addEventListener('click',()=>{
            if (ruota._triletteTimer){clearInterval(ruota._triletteTimer);ruota._triletteTimer=null;}
            ruota.sottomanche++;ruota._prossimaTriplete();
        });

        wrap.appendChild(tag); wrap.appendChild(catEl); wrap.appendChild(tabEl);
        wrap.appendChild(scRow); wrap.appendChild(prenotaRow); wrap.appendChild(skipBtn);
        field.appendChild(wrap);
        main.current="RuotaTriplete";

        // Auto-reveal timer
        this._triletteTimer=setInterval(()=>{
            if (revIdx<lettereUniche.length) {
                ruota._rivelaLettera(lettereUniche[revIdx++]);
                let t=document.getElementById("ruota-tabellone");
                if (t) t.replaceWith(ruota._buildTabellone());
                if (ruota._tutteScoperte()) { clearInterval(ruota._triletteTimer); ruota._triletteTimer=null; }
            } else { clearInterval(ruota._triletteTimer); ruota._triletteTimer=null; }
        },1500);
    },

    _apriSoluzioneTriplete(idx, onSbagliata) {
        let overlay=document.createElement("div");
        overlay.id="triplete-overlay";
        overlay.style.cssText=`
            position:absolute;top:0;left:0;right:0;bottom:0;
            background:rgba(0,0,0,0.82);
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
            z-index:50;
        `;

        let titolo=document.createElement("div");
        titolo.innerHTML=`${this.nomi[idx]} — scrivi la soluzione`;
        titolo.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:44px;font-weight:800;color:${this.COLORS[idx]};text-align:center;`;

        let inp=document.createElement("input");
        inp.type="text"; inp.placeholder="Scrivi la soluzione...";
        inp.style.cssText=`
            background:rgba(255,255,255,0.09);border:2px solid rgba(240,200,0,0.5);
            border-radius:14px;padding:20px 32px;
            font-family:'Barlow Condensed',sans-serif;font-size:42px;font-weight:700;
            color:white;outline:none;width:700px;max-width:90%;box-sizing:border-box;text-transform:uppercase;
        `;

        let btnRow=document.createElement("div");
        btnRow.style.cssText=`display:flex;gap:20px;`;

        let okBtn=document.createElement("button");
        okBtn.innerHTML="✓ CONFERMA";
        okBtn.style.cssText=`background:rgba(34,204,102,0.14);color:#22cc66;border:2px solid rgba(34,204,102,0.5);border-radius:14px;padding:22px 70px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;cursor:pointer;`;

        let annullaBtn=document.createElement("button");
        annullaBtn.innerHTML="✗ ANNULLA";
        annullaBtn.style.cssText=`background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);border:2px solid rgba(255,255,255,0.12);border-radius:14px;padding:22px 50px;font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:700;cursor:pointer;`;

        let doConferma=()=>{
            let risposta=inp.value.trim().toUpperCase();
            let corretta=ruota.fraseCorrente?ruota.fraseCorrente.frase.toUpperCase():'';
            if (risposta===corretta) {
                ruota._confermaTriplete(true, idx);
                overlay.remove();
            } else {
                ruota._showToast("Sbagliato!","#ff4444");
                setTimeout(()=>{ overlay.remove(); if(onSbagliata) onSbagliata(); },1200);
            }
        };
        okBtn.addEventListener('click',doConferma);
        annullaBtn.addEventListener('click',()=>{ overlay.remove(); if(onSbagliata) onSbagliata(); });
        inp.addEventListener('keydown',e=>{if(e.key==='Enter')doConferma();});

        btnRow.appendChild(okBtn); btnRow.appendChild(annullaBtn);
        overlay.appendChild(titolo); overlay.appendChild(inp); overlay.appendChild(btnRow);
        field.appendChild(overlay);
        setTimeout(()=>inp.focus(),80);
    },

    _confermaTriplete(corretto, idx) {
        if (corretto) {
            this._trileteBonusRound[idx]+=1000;
            let tot=this._trileteBonusRound.reduce((a,b)=>a+b,0);
            if (this.sottomanche===2 && this._trileteBonusRound[idx]>=3000) {
                this._trileteBonusRound[idx]+=5000;
                this._showToast("TRIPLETE COMPLETO! +1000 € + 5000 € BONUS!","#f0c800");
            } else {
                this._showToast(`+1000 € — ${this.nomi[idx]}! (${this.sottomanche+1}/3)`, "#22cc66");
            }
        }
        this.sottomanche++;
        setTimeout(()=>ruota._prossimaTriplete(),2000);
    },

    // ── Round Finale ───────────────────────────────────────────────
    _startFinale() {
        this.faseGong=false; this._nuovaFrase(); this.punteggioRound=[0,0,0];
        this._renderFinale(); main.current="RuotaFinale";
    },

    _renderFinale() {
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA · LA SFIDA A TEMPO",()=>{});

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;`;
        wrap.appendChild(this._buildScoresBar());

        let center=document.createElement("div");
        center.style.cssText=`flex:1;display:flex;min-height:0;`;

        let leftPanel=document.createElement("div");
        leftPanel.style.cssText=`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:12px;min-width:0;`;
        let catEl=document.createElement("div");
        catEl.innerHTML=`Categoria: <strong style="color:#f0c800">${this.fraseCorrente?this.fraseCorrente.categoria:''}</strong>`;
        catEl.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:22px;letter-spacing:4px;color:rgba(255,255,255,0.4);`;
        leftPanel.appendChild(catEl);
        leftPanel.appendChild(this._buildTabellone());
        leftPanel.appendChild(this._buildLettereChip());

        let rightPanel=document.createElement("div");
        rightPanel.style.cssText=`width:500px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 24px;gap:18px;border-left:1px solid rgba(255,255,255,0.07);`;

        if (!this.faseGong) {
            let info=document.createElement("div");
            info.innerHTML="Il conduttore gira la ruota.<br>Poi turni veloci — vocali gratis.";
            info.style.cssText=`font-family:'Barlow',sans-serif;font-size:24px;color:rgba(255,255,255,0.45);text-align:center;line-height:1.5;`;
            let gongBtn=document.createElement("button");
            gongBtn.innerHTML="🔔 GONG — GIRA RUOTA";
            gongBtn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:26px 40px;width:100%;font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;cursor:pointer;`;
            gongBtn.addEventListener('click',()=>ruota._giraRuotaFinale());
            rightPanel.appendChild(info); rightPanel.appendChild(gongBtn);
        } else {
            rightPanel.appendChild(this._buildTurnoInfo());
            rightPanel.appendChild(this._mkBtn("🔤 VOCALE GRATIS","rgba(240,200,0,0.1)","#f0c800",()=>ruota._apriCompraVocale(),false));
            rightPanel.appendChild(this._mkBtn("💡 DAI LA SOLUZIONE","rgba(34,204,102,0.1)","#22cc66",()=>ruota._apriSoluzione(null,null),false));
            rightPanel.appendChild(this._mkBtn("→ PASSA TURNO","rgba(255,255,255,0.05)","rgba(255,255,255,0.35)",()=>ruota._prossimoTurnoGong(),false));
        }

        center.appendChild(leftPanel); center.appendChild(rightPanel);
        wrap.appendChild(center); field.appendChild(wrap);
    },

    _giraRuotaFinale() {
        let n=this.SPICCHI.length;
        let i=Math.floor(Math.random()*n);
        let sp=this.SPICCHI[i];
        let valoreFinale=sp.tipo==='euro'?(sp.valore===5000?5000:sp.valore+1000):0;
        this.faseGong=true; this.valoreRuota=valoreFinale;
        if (valoreFinale>0) for (let j=0;j<3;j++) this.punteggioRound[j]=valoreFinale;
        this._showToast(sp.tipo==='euro'?`Uscito ${sp.label} → Valore ${this._fmtEuro(valoreFinale)}`:`Uscito ${sp.label} — nessun bonus`,"#f0c800");
        setTimeout(()=>{ruota._renderFinale();main.current="RuotaFinale";},2500);
    },

    _prossimoTurnoGong() {
        this.turno=(this.turno+1)%3;
        this._renderFinale(); main.current="RuotaFinale";
    },

    // ── Toast ──────────────────────────────────────────────────────
    _showToast(msg,color) {
        let old=document.getElementById("ruota-toast"); if(old) old.remove();
        let t=document.createElement("div"); t.id="ruota-toast";
        t.innerHTML=msg;
        t.style.cssText=`
            position:fixed;bottom:56px;left:50%;transform:translateX(-50%);
            background:rgba(0,0,0,0.93);border:2px solid ${color};color:${color};
            border-radius:14px;padding:18px 56px;
            font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;
            letter-spacing:3px;z-index:9999;white-space:nowrap;
        `;
        document.body.appendChild(t);
        setTimeout(()=>{if(t.parentNode)t.remove();},2600);
    },

    // ── Verdetto Finale ────────────────────────────────────────────
    _verdetto() {
        main.current="RuotaVerdetto";
        grafica.puliscifield();
        grafica._statusBar("← MENU","RUOTA DELLA FORTUNA",()=>{ruota.reset();grafica.puliscifield();grafica.home();main.current="Home";});

        let vincitore=0;
        for (let i=1;i<3;i++) if (this.punteggioGioco[i]>this.punteggioGioco[vincitore]) vincitore=i;

        let wrap=document.createElement("div");
        wrap.style.cssText=`position:absolute;top:64px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;`;

        let tag=document.createElement("div");
        tag.innerHTML="VINCITORE DELLA PUNTATA";
        tag.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;letter-spacing:8px;color:rgba(255,255,255,0.3);`;

        let nome=document.createElement("div");
        nome.innerHTML=this.nomi[vincitore];
        nome.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:100px;font-weight:800;color:${this.COLORS[vincitore]};line-height:1;text-shadow:0 0 80px ${this.COLORS[vincitore]}88;`;

        let score=document.createElement("div");
        score.innerHTML=this._fmtEuro(this.punteggioGioco[vincitore]);
        score.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:90px;font-weight:800;color:#f0c800;line-height:1;`;

        let allSc=document.createElement("div");
        allSc.style.cssText=`display:flex;gap:36px;`;
        for (let i=0;i<3;i++) {
            let cell=document.createElement("div");
            cell.style.cssText=`display:flex;flex-direction:column;align-items:center;gap:4px;opacity:${i===vincitore?'1':'0.38'};`;
            let n=document.createElement("div");
            n.innerHTML=this.nomi[i];
            n.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:700;color:${this.COLORS[i]};`;
            let s=document.createElement("div");
            s.innerHTML=this._fmtEuro(this.punteggioGioco[i]);
            s.style.cssText=`font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;color:white;`;
            cell.appendChild(n); cell.appendChild(s); allSc.appendChild(cell);
        }

        let btn=document.createElement("button");
        btn.innerHTML="↩ NUOVA PARTITA";
        btn.style.cssText=`background:#f0c800;color:#1a0a3c;border:none;border-radius:14px;padding:24px 100px;font-family:'Barlow Condensed',sans-serif;font-size:38px;font-weight:800;letter-spacing:4px;cursor:pointer;`;
        btn.addEventListener('click',()=>{ruota.reset();grafica.puliscifield();ruota.setup();main.current="RuotaSetup";});

        wrap.appendChild(tag); wrap.appendChild(nome); wrap.appendChild(score);
        wrap.appendChild(allSc); wrap.appendChild(btn);
        field.appendChild(wrap);
    },
};
