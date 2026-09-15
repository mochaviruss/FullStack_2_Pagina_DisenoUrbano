function subirPlano() {
    const ids = ['proyecto', 'version', 'fecha', 'comentario'];
    let hayError = false;

    ids.forEach(id => {
        const campo = document.getElementById(`arq-${id}`);
        const err = document.getElementById(`err-${id}`);
        err.style.display = 'none';
        campo.style.borderColor = '#ccc';

        if(campo.value.trim() === '') {
            err.style.display = 'block';
            campo.style.borderColor = '#dc2626';
            hayError = true;
        }
    });

    if(!hayError) {
        alert("Plano registrado exitosamente. Control de versiones actualizado.");
        document.getElementById('form-plano').reset();
    }
}

function marcarRevision() {
    alert("La tarea actual ha sido marcada como 'En Revision'. El cliente podra verla.");
}