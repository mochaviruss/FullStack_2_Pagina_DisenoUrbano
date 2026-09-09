function reportarFalla() {
    const falla = document.getElementById('falla-detalle');
    const err = document.getElementById('err-falla');
    
    if(falla.value.trim().length < 20) {
        err.style.display = 'block';
        falla.style.borderColor = '#dc2626';
    } else {
        err.style.display = 'none';
        falla.style.borderColor = '#ccc';
        alert("Falla reportada correctamente al Arquitecto.");
        falla.value = '';
    }
}

function entregarCalculos() {
    const receptor = document.getElementById('ing-receptor').value;
    const version = document.getElementById('ing-version').value;
    const archivoInput = document.getElementById('ing-archivo');
    const conformidad = document.getElementById('ing-conformidad').checked;
    
    const errArchivo = document.getElementById('err-ing-archivo');
    const errConformidad = document.getElementById('err-conformidad');
    
    errArchivo.style.display = 'none';
    errConformidad.style.display = 'none';

    if(!conformidad) {
        errConformidad.style.display = 'block';
        return;
    }

    if(receptor === '' || version === '') {
        alert("Complete todos los campos de texto.");
        return;
    }

    if(archivoInput.files.length === 0) {
        errArchivo.innerText = "Debe adjuntar la memoria de calculo y plano.";
        errArchivo.style.display = 'block';
        return;
    }

    const archivo = archivoInput.files[0];
    const extensionesPermitidas = ['pdf', 'dwg', 'dxf', 'xlsx', 'zip'];
    const extension = archivo.name.split('.').pop().toLowerCase();

    if(!extensionesPermitidas.includes(extension)) {
        errArchivo.innerText = "Formato no valido. Solo archivos de ingenieria.";
        errArchivo.style.display = 'block';
        return;
    }

    alert("Calculos entregados con exito y notificacion enviada.");
}