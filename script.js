const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+~`|}{[]\:;?><,./-=';
const katakterSayisi = katakterler.length;
const fontSize = 16;
const columns = canvas.width / fontSize;

const damlalar = [];

for (let x = 0; x < columns; x++) {
    damlalar[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Daha hafif bir arka plan temizleme
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < damlalar.length; i++) {
        const text = katakterler.charAt(Math.floor(Math.random() * katakterSayisi));
        ctx.fillText(text, i * fontSize, damlalar[i] * fontSize);

        if (damlalar[i] * fontSize > canvas.height && Math.random() > 0.975) {
            damlalar[i] = 0;
        }

        damlalar[i]++;
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;

    damlalar.length = 0; // Damlaları sıfırla
    for (let x = 0; x < columns; x++) {
        damlalar[x] = 1;
    }
}

setInterval(draw, 30);
window.addEventListener('resize', resizeCanvas);
