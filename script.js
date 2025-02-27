const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katarlar = '0ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷｸｺｾｿﾀﾁﾄﾇﾌﾕﾗﾚﾛ'; // Japonca karakterler
const katarlarDizi = katarlar.split('');

const fontBoyutu = 15;
const sutunSayisi = canvas.width / fontBoyutu;
const yPozisyonlari = [];

for (let x = 0; x < sutunSayisi; x++) {
    yPozisyonlari[x] = 100 * Math.random();
}

function matrixCiz() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontBoyutu + 'px monospace'; // monospace font kullan
    for (let i = 0; i < sutunSayisi; i++) {
        const metin = katarlarDizi[Math.floor(Math.random() * katarlarDizi.length)];
        ctx.fillText(metin, i * fontBoyutu, yPozisyonlari[i]);

        if (yPozisyonlari[i] > canvas.height || Math.random() > 0.99) {
            yPozisyonlari[i] = 0;
        }
        yPozisyonlari[i] += fontBoyutu;
    }
}

setInterval(matrixCiz, 30);
