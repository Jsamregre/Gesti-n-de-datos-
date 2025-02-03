
function login() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (usuario === "música" && contrasena === "solfa") {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        cargarDatos();
    } else {
        alert("Credenciales incorrectas.");
    }
}

function asignar() {
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const servicio = document.getElementById('servicio').value;
    const evento = document.getElementById('evento').value;

    if (nombre && fecha) {
        const asignacion = { nombre, fecha, servicio, evento };
        let asignaciones = JSON.parse(localStorage.getItem('asignaciones')) || [];
        asignaciones.push(asignacion);
        localStorage.setItem('asignaciones', JSON.stringify(asignaciones));
        cargarDatos();
    } else {
        alert("Nombre y fecha son obligatorios.");
    }
}

function cargarDatos() {
    const lista = document.getElementById('vistaPrevia') || document.getElementById('listaAsignaciones');
    if (lista) lista.innerHTML = '';

    const asignaciones = JSON.parse(localStorage.getItem('asignaciones')) || [];
    asignaciones.forEach((asignacion, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${asignacion.nombre}</strong> - ${asignacion.fecha} 
            ${asignacion.servicio ? `- Servicio: ${asignacion.servicio}` : ''} 
            ${asignacion.evento ? `- Evento: ${asignacion.evento}` : ''}
            <button onclick="eliminar(${index})">Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

function eliminar(index) {
    let asignaciones = JSON.parse(localStorage.getItem('asignaciones')) || [];
    asignaciones.splice(index, 1);
    localStorage.setItem('asignaciones', JSON.stringify(asignaciones));
    cargarDatos();
}

function generarPDF() {
    const asignaciones = JSON.parse(localStorage.getItem('asignaciones')) || [];
    let contenido = "Asignaciones de Servicios y Eventos:\n\n";

    asignaciones.forEach(a => {
        contenido += `${a.nombre} - ${a.fecha}`;
        if (a.servicio) contenido += ` - Servicio: ${a.servicio}`;
        if (a.evento) contenido += ` - Evento: ${a.evento}`;
        contenido += "\n";
    });

    const blob = new Blob([contenido], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'asignaciones.pdf';
    link.click();
}

document.addEventListener('DOMContentLoaded', cargarDatos);
