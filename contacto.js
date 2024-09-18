"use strict"

let nombreYapellido = document.getElementById("nombre");
let correo = document.getElementById("email");
let telefono = document.getElementById("telefono");
let consulta = document.getElementById("consulta");
let Formulario = document.getElementById("formulario");

let informacion = [];

Formulario.addEventListener("submit", (e) => {
    informacion[0] = `Su nombre y apellido es: ${nombreYapellido.value} `;
    informacion[1] = `\nEl correo electronico es: ${correo.value} `;
    informacion[2] = `\nEl numero de telefono es: ${telefono.value} `;
    informacion[3] = `\nSu consulta es: ${consulta.value}`;

    let validacionNombre = /^[a-zA-ZéÉáÁíóúÍÓÚÑñ\s]*$/;
    let validacionTelefono = /^([0-9-+])*$/;
    let email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{3,4}$/i;
    if (nombreYapellido.value == "" || correo.value == "" || telefono.value == "" || consulta.value == "") {
        e.preventDefault();
        alert("Por favor, complete todas las casillas");
    } else if (nombreYapellido.value.length < 6) {
        e.preventDefault();
        alert("Ingrese nombre y apellido con 6 caracteres o más ");
    } else if (!validacionNombre.test(nombreYapellido.value)) {
        e.preventDefault();
        alert("Nombre y apellido no válidos, no se permiten números ni caracteres especiales");
    } else if (!email.test(correo.value)) {
        e.preventDefault();
        alert("Correo electrónico no válido ");
    } else if (telefono.value.length < 8) {
        e.preventDefault();
        alert("Ingrese un telefono con 8 ó más números");
    } else if (!validacionTelefono.test(telefono.value)) {
        e.preventDefault();
        alert("Número de telefono no válido");
    } else if (consulta.value.length < 10) {
        e.preventDefault();
        alert("Ingrese 10 caracteres o más para su consulta");
    } else {
        alert("Formulario enviado");
        let blob = new Blob([informacion], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "contacto.txt");
    }
})


