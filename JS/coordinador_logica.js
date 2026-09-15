// Carga inicial de proyectos simulados
function cargarEstadosProyectos() {
    let proyectos = JSON.parse(localStorage.getItem('proyectosCliente'));
    
    // Si no existen, creamos un array vacio de respaldo
    if (!proyectos) {
        proyectos = [
            { id: "P01", nombre: "Casa Habitacion Lote 4", estado: "Planificado" },
            { id: "P02", nombre: "Remodelacion Oficina Sur", estado: "En desarrollo" },
            { id: "P03", nombre: "Centro Comercial - Etapa 1", estado: "En revision" }
        ];
    }

    const contenedor = document.getElementById('lista-proyectos-estado');
    contenedor.innerHTML = '';

    proyectos.forEach(proyecto => {
        let claseEstado = proyecto.estado.toLowerCase().replace(" ", "");
        const div = document.createElement('div');
        div.className = 'proyecto-item';
        div.innerHTML = `
            <span><strong>${proyecto.id}</strong> - ${proyecto.nombre}</span>
            <span class="badge estado-${claseEstado}">${proyecto.estado}</span>
        `;
        contenedor.appendChild(div);
    });
}

// Ocultar mensajes de error
function limpiarErrores(ids) {
    ids.forEach(id => {
        const errorDiv = document.getElementById(`error-${id}`);
        if(errorDiv) errorDiv.style.display = 'none';
        
        const inputElem = document.getElementById(id);
        if(inputElem) inputElem.style.borderColor = '#ccc';
    });
}

function mostrarError(idElemento, mensaje) {
    const errorDiv = document.getElementById(`error-${idElemento}`);
    const inputElem = document.getElementById(idElemento);
    
    errorDiv.innerText = mensaje;
    errorDiv.style.display = 'block';
    inputElem.style.borderColor = '#dc2626';
}

// Logica y Validaciones: Asignar Tarea
function asignarTarea() {
    limpiarErrores(['usuario', 'tarea']);
    
    const usuario = document.getElementById('usuario-tarea').value;
    const tarea = document.getElementById('desc-tarea').value.trim();
    let hayError = false;

    // 1. Debe estar asignada a un usuario
    if (usuario === "") {
        mostrarError('usuario', "Debe seleccionar un usuario responsable.");
        hayError = true;
    }

    // 2. Tarea: Al menos 3 caracteres, no numericos, tope 200
    // Regex para verificar si son SOLO numeros (no permitido)
    const soloNumeros = /^\d+$/;

    if (tarea.length < 3 || tarea.length > 200) {
        mostrarError('tarea', "La tarea debe tener entre 3 y 200 caracteres.");
        hayError = true;
    } else if (soloNumeros.test(tarea)) {
        mostrarError('tarea', "La tarea no puede contener unicamente numeros.");
        hayError = true;
    }

    if (!hayError) {
        alert("Tarea asignada correctamente a: " + usuario);
        document.getElementById('form-tarea').reset();
    }
}

// Logica y Validaciones: Fijar Evento
function fijarEvento() {
    limpiarErrores(['nombre-evento', 'fecha']);
    
    const nombre = document.getElementById('nombre-evento').value.trim();
    const fechaInput = document.getElementById('fecha-evento').value;
    let hayError = false;

    if (nombre === "") {
        mostrarError('nombre-evento', "Debe ingresar el nombre del evento.");
        hayError = true;
    }

    if (fechaInput === "") {
        mostrarError('fecha', "Debe seleccionar una fecha y hora.");
        hayError = true;
    } else {
        const fechaSeleccionada = new Date(fechaInput);
        const fechaActual = new Date();

        if (fechaSeleccionada < fechaActual) {
            mostrarError('fecha', "La fecha y hora no pueden ser en el pasado.");
            hayError = true;
        }
    }

    if (!hayError) {
        alert("Evento guardado exitosamente para la fecha seleccionada.");
        document.getElementById('form-evento').reset();
    }
}

// Logica simple para Ticket
function levantarTicket() {
    const usuario = document.getElementById('usuario-ticket').value;
    const detalle = document.getElementById('detalle-ticket').value.trim();

    if (usuario === "" || detalle === "") {
        alert("Por favor seleccione un usuario y escriba un detalle para el ticket.");
        return;
    }

    alert("Ticket generado y notificacion enviada.");
    document.getElementById('form-ticket').reset();
}

window.onload = cargarEstadosProyectos;