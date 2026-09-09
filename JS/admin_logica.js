const reportes = [
    { cod: "PR001", nombre: "Centro Comercial La Florida", avance: "45%", costo: "$280.000.000", estado: "En ejecucion" },
    { cod: "PR002", nombre: "Viviendas Sociales Los Olivos", avance: "10%", costo: "$150.000.000", estado: "Planificado" },
    { cod: "PR003", nombre: "Remodelacion Parque Central", avance: "80%", costo: "$350.000.000", estado: "En ejecucion" }
];

window.onload = function() {
    const tbody = document.getElementById('tabla-reportes');
    reportes.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.cod}</td><td>${r.nombre}</td><td>${r.avance}</td><td>${r.costo}</td><td>${r.estado}</td>`;
        tbody.appendChild(tr);
    });
};

function exportarExcel() {
    alert("Simulando descarga: consolidado_proyectos.xlsx generado con exito.");
}