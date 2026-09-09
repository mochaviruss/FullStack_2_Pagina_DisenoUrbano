let mostrandoMotivo = false;

function aceptarSolicitud() {
    alert("Solicitud aceptada y asignada a tus tareas.");
    document.getElementById('motivo-rechazo').style.display = 'none';
    mostrandoMotivo = false;
}

function rechazarSolicitud() {
    const motivo = document.getElementById('motivo-rechazo');
    const err = document.getElementById('err-rechazo');
    
    if(!mostrandoMotivo) {
        motivo.style.display = 'block';
        mostrandoMotivo = true;
        return;
    }

    if(motivo.value.trim() === '') {
        err.style.display = 'block';
        motivo.style.borderColor = '#dc2626';
    } else {
        err.style.display = 'none';
        alert("Solicitud declinada. Coordinador notificado.");
        motivo.value = '';
        motivo.style.display = 'none';
        mostrandoMotivo = false;
    }
}

function enviarMaterial() {
    const destinatario = document.getElementById('dg-destinatario').value;
    const archivoInput = document.getElementById('dg-archivo');
    const errArchivo = document.getElementById('err-dg-archivo');
    
    errArchivo.style.display = 'none';

    if(destinatario === '') {
        alert("Debe seleccionar un destinatario.");
        return;
    }

    if(archivoInput.files.length === 0) {
        errArchivo.innerText = "Debe adjuntar al menos un archivo.";
        errArchivo.style.display = 'block';
        return;
    }

    const archivo = archivoInput.files[0];
    const maxBytes = 50 * 1024 * 1024; // 50MB
    const extensionesPermitidas = ['pdf', 'png', 'jpeg', 'zip', 'ai', 'psd', 'pptx'];
    const extension = archivo.name.split('.').pop().toLowerCase();

    if(!extensionesPermitidas.includes(extension)) {
        errArchivo.innerText = "Formato no permitido.";
        errArchivo.style.display = 'block';
        return;
    }

    if(archivo.size > maxBytes) {
        errArchivo.innerText = "El archivo excede los 50MB permitidos.";
        errArchivo.style.display = 'block';
        return;
    }

    alert("Material enviado con exito.");
}