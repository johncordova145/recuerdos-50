const photoDetails = {
    1:  { title: "Orgullo de Familia", desc: "Celebrando cada meta alcanzada juntos." },
    2:  { title: "Cecilia • 50 Años", desc: "Medio siglo de vida, fuerza y alegría." },
    3:  { title: "Brindis por la Vida", desc: "Sonrisas que iluminan cada encuentro." },
    4:  { title: "Abrazos Sinceros", desc: "El cariño que nos une en todo momento." },
    5:  { title: "Complicidad", desc: "Instantes compartidos con el corazón." },
    6:  { title: "Alegría Pura", desc: "Disfrutando los pequeños grandes detalles." },
    7:  { title: "Mesa Familiar", desc: "Donde nacen las mejores conversaciones." },
    8:  { title: "Nuestras Raíces", desc: "El amor y sabiduría de quienes nos preceden." },
    9:  { title: "Tierra y Esfuerzo", desc: "El valor del trabajo y nuestras costumbres." },
    10: { title: "Generaciones Unidas", desc: "Lazos que se fortalecen con los años." },
    11: { title: "Días de Fiesta", desc: "Celebrando cada año con gratitud." },
    12: { title: "Siempre Juntos", desc: "Mis cuñados en huayllabamba." },
    13: { title: "Paseos Inolvidables", desc: "Recuerdos que quedan grabados para siempre." },
    14: { title: "Logros Compartidos", desc: "El fruto del amor y la dedicación." },
    15: { title: "Infancia Feliz", desc: "Rony, Gustavo y John en sus mejores travesuras." },
    16: { title: "Unión Familiar", desc: "Presentes en cada momento importante." },
    17: { title: "Recuerdos de Ayer", desc: "Historias que seguimos contando hoy." },
    18: { title: "Nuestro Hogar", desc: "El refugio donde siempre reina el cariño." },
    19: { title: "Familia Completa", desc: "La mayor bendición de estos 50 años." },
    20: { title: "Ternura de Madre", desc: "El amor más puro e incondicional." },
    21: { title: "Noches Especiales", desc: "Brillando con luz propia." },
    22: { title: "Dulces Momentos", desc: "Celebrando la vida con quienes más amo." },
    23: { title: "Nuestros Mayores", desc: "Respeto, ejemplo y bendición eterna." },
    24: { title: "Identidad y Orgullo", desc: "Llevando nuestras raíces en el corazón." },
    25: { title: "Tradición Viva", desc: "Alegría y color en nuestra tierra." },
    26: { title: "El Comienzo de Todo", desc: "Cuando empezó esta hermosa historia de amor." }
};

function resolveImageUrl(index, callback) {
    const extensions = ["jpg", "png", "jpeg"];
    let attempt = 0;
    function tryNext() {
        if (attempt >= extensions.length) return;
        const url = `img/f${index}.${extensions[attempt]}`;
        const testImg = new Image();
        testImg.onload = () => callback(url);
        testImg.onerror = () => { attempt++; tryNext(); };
        testImg.src = url;
    }
    tryNext();
}

// MITAD 1 (f1 a f13): CARRUSEL DE EXPANSIÓN
const expansionSlide = document.getElementById("expansionSlide");
for (let i = 1; i <= 13; i++) {
    const item = document.createElement("div");
    item.className = "item";
    item.style.backgroundImage = `url('img/f${i}.jpg')`;
    resolveImageUrl(i, (validUrl) => { item.style.backgroundImage = `url('${validUrl}')`; });

    item.innerHTML = `
        <div class="content">
            <div class="name">${photoDetails[i].title}</div>
            <div class="des">${photoDetails[i].desc}</div>
        </div>
    `;
    item.onclick = () => {
        const bg = item.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        openModalWithSrc(bg, `${photoDetails[i].title} — ${photoDetails[i].desc}`, false);
    };
    expansionSlide.appendChild(item);
}

function nextExpansionCard() {
    const items = expansionSlide.querySelectorAll(".item");
    if (items.length > 0) expansionSlide.appendChild(items[0]);
}
function prevExpansionCard() {
    const items = expansionSlide.querySelectorAll(".item");
    if (items.length > 0) expansionSlide.prepend(items[items.length - 1]);
}
document.getElementById("nextExpansion").onclick = nextExpansionCard;
document.getElementById("prevExpansion").onclick = prevExpansionCard;
setInterval(nextExpansionCard, 3800);

// MITAD 2 (f14 a f26): CARRUSEL 3D
const carousel3d = document.getElementById("carousel3d");
const secondHalfCount = 13;
carousel3d.style.setProperty("--n", secondHalfCount);

for (let idx = 0; idx < secondHalfCount; idx++) {
    const photoNum = 14 + idx;
    const img = document.createElement("img");
    img.className = "card-3d";
    img.src = `img/f${photoNum}.jpg`;
    img.alt = photoDetails[photoNum].title;
    img.style.setProperty("--i", idx);
    resolveImageUrl(photoNum, (validUrl) => { img.src = validUrl; });

    img.onclick = () => {
        openModalWithSrc(img.src, `${photoDetails[photoNum].title} — ${photoDetails[photoNum].desc}`, photoNum === 15);
    };
    carousel3d.appendChild(img);
}

const mainPhoto = document.getElementById("mainPhoto");
if (mainPhoto) resolveImageUrl(2, (validUrl) => { mainPhoto.src = validUrl; });

function openModalWithSrc(src, text, isRotated) {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    modalImg.src = src;
    modalImg.style.transform = isRotated ? "rotate(90deg)" : "none";
    modalCaption.innerText = text;
    modal.style.display = "flex";
}
function closeModal() { document.getElementById("photoModal").style.display = "none"; }

// MÚSICA AUTOMÁTICA AL PRIMER TOQUE
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById("bgMusic");
    const musicIcon = document.getElementById("musicIcon");
    const musicText = document.getElementById("musicText");
    if (music) music.volume = 0.6;

    function startAudioOnFirstInteraction() {
        if (music && music.paused) {
            music.play().then(() => {
                if (musicIcon) musicIcon.innerText = "🎵";
                if (musicText) musicText.innerText = "Música Activa";
                window.removeEventListener('click', startAudioOnFirstInteraction);
                window.removeEventListener('touchstart', startAudioOnFirstInteraction);
                window.removeEventListener('scroll', startAudioOnFirstInteraction);
            }).catch(() => {});
        }
    }
    window.addEventListener('click', startAudioOnFirstInteraction);
    window.addEventListener('touchstart', startAudioOnFirstInteraction);
    window.addEventListener('scroll', startAudioOnFirstInteraction);
});

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const musicIcon = document.getElementById("musicIcon");
    const musicText = document.getElementById("musicText");
    if (music.paused) {
        music.play().then(() => {
            musicIcon.innerText = "🎵";
            musicText.innerText = "Música Activa";
        });
    } else {
        music.pause();
        musicIcon.innerText = "🔇";
        musicText.innerText = "Reproducir Música";
    }
}