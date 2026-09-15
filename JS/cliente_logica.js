const datosIniciales = [
    { id: "P01", nombre: "Casa Habitacion Lote 4", estado: "Planificado", fechaInicio: "2026-10-01", entregable: "N/A", imagen: "ProyectoCliente.jpg" },
    { id: "P02", nombre: "Remodelacion Oficina Sur", estado: "En desarrollo", fechaInicio: "2026-08-15", entregable: "boceto_v1.pdf", imagen: "" },
    { id: "P03", nombre: "Centro Comercial - Etapa 1", estado: "En revision", fechaInicio: "2026-05-10", entregable: "maqueta_final_v3.zip", imagen: "" },
    { id: "P04", nombre: "Parque Urbano Las Rosas", estado: "Entregado", fechaInicio: "2025-11-20", entregable: "planos_aprobados.pdf", imagen: "" },
    { id: "P05", nombre: "Edificio Residencial Norte", estado: "Cancelado", fechaInicio: "2026-01-10", entregable: "N/A", imagen: "" }
];

if (!localStorage.getItem('proyectosCliente')) {
    localStorage.setItem('proyectosCliente', JSON.stringify(datosIniciales));
}

function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    if(!contenedor) return;
    
    contenedor.innerHTML = '';
    const proyectos = JSON.parse(localStorage.getItem('proyectosCliente'));

    proyectos.forEach(proyecto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = `proyecto-card`;
        
        tarjeta.style.background = "#ffffff";
        tarjeta.style.border = "1px solid #e5e5e7";
        tarjeta.style.borderLeft = "5px solid #121315"; 
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.padding = "20px";
        tarjeta.style.marginBottom = "25px";
        tarjeta.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";

        let imagenHtml = '';
        if (proyecto.imagen) {
            // object-fit: contain asegura que la imagen se vea completa. El fondo gris llena los espacios sobrantes si es muy cuadrada.
            imagenHtml = `<img src="${proyecto.imagen}" alt="Render del proyecto" style="width: 100%; height: 250px; object-fit: contain; background-color: #f4f4f5; border-radius: 6px; margin-bottom: 20px; border: 1px solid #e5e5e7;">`;
        } else {
            imagenHtml = `<div style="background-color: #f4f4f5; height: 140px; border-radius: 6px; border: 1px dashed #d1d1d6; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #a0a0a5; font-size: 0.85rem; font-weight: 500;">[ Espacio reservado para imagen del proyecto ]</div>`;
        }

        let html = `
            ${imagenHtml}
            
            <div class="proyecto-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div class="proyecto-titulo" style="font-size: 1.1rem; font-weight: bold; color: #121315;">Proyecto: ${proyecto.nombre}</div>
                <!-- Ancho fijo (width: 140px) y text-align center para que todos los botones sean iguales -->
                <div class="badge" style="background-color: #121315; color: #ffffff; padding: 6px 10px; width: 140px; text-align: center; border-radius: 4px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${proyecto.estado}</div>
            </div>
            
            <div class="detalles" style="font-size: 0.9rem; color: #4a4a4f; margin-bottom: 15px;">
                <p style="margin: 6px 0;"><strong>Fecha de Inicio:</strong> ${proyecto.fechaInicio}</p>
                <p style="margin: 6px 0;"><strong>Ultimo Entregable:</strong> ${proyecto.entregable}</p>
            </div>
        `;

        if (proyecto.estado === "En revision") {
            html += `
            <div class="zona-acciones" style="border-top: 1px solid #e5e5e7; padding-top: 20px; margin-top: 15px;">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; font-size: 0.8rem; font-weight: bold; margin-bottom: 8px; color: #121315;">COMENTARIO O APELACION <span style="font-weight: normal; color: #a0a0a5; text-transform: none;">(Opcional)</span></label>
                    <textarea id="texto-${proyecto.id}" placeholder="Escribe aqui tus observaciones..." style="width: 100%; padding: 12px; border: 1px solid #e5e5e7; border-radius: 4px; font-family: inherit; resize: vertical; min-height: 80px; box-sizing: border-box;"></textarea>
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 0.8rem; font-weight: bold; margin-bottom: 8px; color: #121315;">ADJUNTAR ARCHIVO <span style="font-weight: normal; color: #a0a0a5; text-transform: none;">(.blend, .stl, .png, .mp4)</span></label>
                    <input type="file" id="archivo-${proyecto.id}" accept=".blend,.stl,.png,.mp4,.mkv" style="width: 100%; font-size: 0.9rem;">
                    <div id="error-${proyecto.id}" class="error-msg" style="display: none; color: #e63946; font-size: 0.8rem; margin-top: 5px;"></div>
                </div>
                <div class="acciones-botones" style="display: flex; gap: 15px;">
                    <button class="btn" style="background: #121315; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; flex: 1; text-transform: uppercase; font-size: 0.85rem;" onclick="aprobarProyecto('${proyecto.id}')">Aprobar Entregable</button>
                    <button class="btn" style="background: #fff; color: #121315; border: 1px solid #121315; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; flex: 1; text-transform: uppercase; font-size: 0.85rem;" onclick="apelarProyecto('${proyecto.id}')">Enviar Apelacion</button>
                </div>
            </div>
            `;
        }

        tarjeta.innerHTML = html;
        contenedor.appendChild(tarjeta);
    });
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
            mensajeError.innerText = `Error: El formato .${extension} no es valido. Permitidos: .blend, .stl, .png, .mp4, .mkv`;
            mensajeError.style.display = 'block';
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

function reiniciarPruebas() {
    localStorage.removeItem('proyectosCliente');
    location.reload();
}

document.addEventListener('DOMContentLoaded', renderizarProyectos);