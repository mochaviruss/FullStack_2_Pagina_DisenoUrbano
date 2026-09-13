let indiceActual = 0;
let totalOriginal = 0;
let enZoom = false;

function inicializarCarrusel() {
    const track = document.querySelector('.carrusel-track');
    const imagenes = Array.from(document.querySelectorAll('.carrusel-track img'));
    
    if (!track || imagenes.length === 0) return;

    totalOriginal = imagenes.length;

    // Clonamos imágenes para el loop infinito
    imagenes.forEach(img => {
        const clon = img.cloneNode(true);
        track.appendChild(clon);
    });

    // Delegación de clics en las imágenes
    track.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG') return;

        const todas = Array.from(track.querySelectorAll('img'));
        const indexClic = todas.indexOf(e.target);
        
        // Comprobar si la imagen presionada es la activa central
        const esCentral = (indexClic === indiceActual) || (indexClic === indiceActual + totalOriginal);

        if (esCentral) {
            abrirZoom(e.target.src);
        } else {
            if (enZoom) cerrarZoom();
            const direccion = indexClic > (indiceActual % totalOriginal) ? 1 : -1;
            moverCarrusel(direccion);
        }
    });

    // Configurar cierres del modal
    const modal = document.getElementById('modal-zoom');
    const btnCerrar = document.querySelector('.modal-cerrar');

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === btnCerrar) {
                cerrarZoom();
            }
        });
    }

    actualizarPosicion(false);
}

function abrirZoom(srcImagen) {
    const modal = document.getElementById('modal-zoom');
    const imgTarget = document.getElementById('img-modal-target');
    
    if (!modal || !imgTarget) return;

    imgTarget.src = srcImagen;
    modal.classList.add('activo');
    enZoom = true;
}

function cerrarZoom() {
    const modal = document.getElementById('modal-zoom');
    if (modal) {
        modal.classList.remove('activo');
    }
    enZoom = false;
}

function moverCarrusel(direccion = 1) {
    if (enZoom) cerrarZoom();

    const track = document.querySelector('.carrusel-track');
    if (!track) return;

    indiceActual += direccion;
    actualizarPosicion(true);

    if (indiceActual >= totalOriginal) {
        setTimeout(() => {
            track.style.transition = 'none';
            indiceActual = 0;
            actualizarPosicion(false);
            track.offsetHeight; 
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        }, 400);
    } else if (indiceActual < 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            indiceActual = totalOriginal - 1;
            actualizarPosicion(false);
            track.offsetHeight;
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        }, 400);
    }
}

function actualizarPosicion(conAnimacion = true) {
    const track = document.querySelector('.carrusel-track');
    const wrapper = document.querySelector('.carrusel-wrapper');
    const imagenes = document.querySelectorAll('.carrusel-track img');
    
    if (!track || !wrapper || imagenes.length === 0) return;

    const anchoWrapper = wrapper.clientWidth;
    const anchoImagen = imagenes[0].clientWidth;
    const gap = 15;

    const centroWrapper = anchoWrapper / 2;
    const centroImagen = anchoImagen / 2;
    const offsetInicial = centroWrapper - centroImagen;

    const desplazamiento = offsetInicial - (indiceActual * (anchoImagen + gap));

    track.style.transition = conAnimacion ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    track.style.transform = `translateX(${desplazamiento}px)`;

    imagenes.forEach((img, i) => {
        if (i === indiceActual || i === indiceActual + totalOriginal) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.style.opacity = '0.35';
            img.style.transform = 'scale(0.9)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrusel();
});

// Controles de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && enZoom) cerrarZoom();
    if (event.key === 'ArrowRight') moverCarrusel(1);
    if (event.key === 'ArrowLeft') moverCarrusel(-1);
});

window.addEventListener('resize', () => {
    if (enZoom) cerrarZoom();
    actualizarPosicion(false);
});

// --- LOGICA DE LOGIN ---
function ingresarSistema() {
    const selector = document.getElementById('rol-usuario');
    const errorDiv = document.getElementById('error-login');
    if (!selector) return;
    
    if (selector.value === "") {
        if (errorDiv) errorDiv.style.display = 'block';
        selector.style.borderColor = '#e63946';
    } else {
        if (errorDiv) errorDiv.style.display = 'none';
        window.location.href = selector.value;
    }
}