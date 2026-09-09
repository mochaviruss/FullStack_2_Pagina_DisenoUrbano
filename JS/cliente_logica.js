const datosIniciales = [
    { id: "P01", nombre: "Casa Habitacion Lote 4", estado: "Planificado", fechaInicio: "2026-10-01", entregable: "Ninguno aun" },
    { id: "P02", nombre: "Remodelacion Oficina Sur", estado: "En desarrollo", fechaInicio: "2026-08-15", entregable: "boceto_v1.pdf" },
    { id: "P03", nombre: "Centro Comercial - Etapa 1", estado: "En revision", fechaInicio: "2026-05-10", entregable: "maqueta_final_v3.zip" },
    { id: "P04", nombre: "Parque Urbano Las Rosas", estado: "Entregado", fechaInicio: "2025-11-20", entregable: "planos_aprobados.pdf" },
    { id: "P05", nombre: "Edificio Residencial Norte", estado: "Cancelado", fechaInicio: "2026-01-10", entregable: "N/A" }
];

if (!localStorage.getItem('proyectosCliente')) {
    localStorage.setItem('proyectosCliente', JSON.stringify(datosIniciales));
}

function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    contenedor.innerHTML = '';
    
    const proyectos = JSON.parse(localStorage.getItem('proyectosCliente'));

    proyectos.forEach(proyecto => {
        let claseEstado = proyecto.estado.toLowerCase().replace(" ", "");
        const tarjeta = document.createElement('div');
        tarjeta.className = `proyecto-card`;
        tarjeta.style.borderLeftColor = obtenerColorEstado(proyecto.estado);

        let html = `
            <div class="proyecto-header">
                <div class="proyecto-titulo">Proyecto: ${proyecto.nombre}</div>
                <div class="badge estado-${claseEstado}">${proyecto.estado}</div>
            </div>
            <div class="detalles">
                <p><strong>Fecha de Inicio:</strong> ${proyecto.fechaInicio}</p>
                <p><strong>Ultimo Entregable:</strong> ${proyecto.entregable}</p>
            </div>
        `;

        if (proyecto.estado === "En revision") {
            html += `
            <div class="zona-acciones">
                <div class="form-group">
                    <label>Comentario o Apelacion <span class="nota-opcional">(No es necesario que rellenes este campo salvo que quieras dejar algun comentario o indicar correcciones)</span></label>
                    <textarea id="texto-${proyecto.id}" placeholder="Escribe aqui tus observaciones..."></textarea>
                </div>
                <div class="form-group">
                    <label>Adjuntar archivo de correccion <span class="nota-opcional">(Formatos permitidos: .blend, .stl, .png, .mp4, .mkv)</span></label>
                    <input type="file" id="archivo-${proyecto.id}" accept=".blend,.stl,.png,.mp4,.mkv">
                    <div id="error-${proyecto.id}" class="error-msg"></div>
                </div>
                <div class="acciones-botones">
                    <button class="btn btn-aprobar" onclick="aprobarProyecto('${proyecto.id}')">Aprobar Entregable</button>
                    <button class="btn btn-apelar" onclick="apelarProyecto('${proyecto.id}')">Enviar Apelacion</button>
                </div>
            </div>
            `;
        }

        tarjeta.innerHTML = html;
        contenedor.appendChild(tarjeta);
    });
}

function obtenerColorEstado(estado) {
    switch(estado) {
        case "Planificado": return "#cbd5e1";
        case "En desarrollo": return "#93c5fd";
        case "En revision": return "#fde047";
        case "Entregado": return "#86efac";
        case "Cancelado": return "#fca5a5";
        default: return "#ccc";
    }
}

function aprobarProyecto(id) {
    if(confirm("Estas seguro de aprobar este entregable? El proyecto pasara a estado 'Entregado'.")) {
        actualizarEstado(id, "Entregado");
    }
}

function apelarProyecto(id) {
    const inputFile = document.getElementById(`archivo-${id}`);
    const mensajeError = document.getElementById(`error-${id}`);
    const archivo = inputFile.files[0];
    
    mensajeError.style.display = 'none';

    if (archivo) {
        const extensionesPermitidas = ['blend', 'stl', 'png', 'mp4', 'mkv'];
        const extension = archivo.name.split('.').pop().toLowerCase();

        if (!extensionesPermitidas.includes(extension)) {
            mensajeError.innerText = `Error: El formato .${extension} no es valido. Formatos permitidos: .blend, .stl, .png, .mp4, .mkv`;
            mensajeError.style.display = 'block';
            inputFile.style.borderColor = '#dc2626';
            return; 
        }
    }
    
    alert("Tu apelacion ha sido enviada al equipo. El proyecto volvera a estado 'En desarrollo'.");
    actualizarEstado(id, "En desarrollo");
}

function actualizarEstado(id, nuevoEstado) {
    let proyectos = JSON.parse(localStorage.getItem('proyectosCliente'));
    let index = proyectos.findIndex(p => p.id === id);
    if(index !== -1) {
        proyectos[index].estado = nuevoEstado;
        localStorage.setItem('proyectosCliente', JSON.stringify(proyectos));
        renderizarProyectos();
    }
}

window.onload = renderizarProyectos;