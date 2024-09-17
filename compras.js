"use strict";

let productos = ["Azucar Ledesma", "Cafe Dolca", "CocaCola", "Fernet Branca", "Fideos Matarazzo", "Leche La Serenisima", "Mermelada", "Queso untable", "Yerba playadito", "Yogur"];
let precioProductos = [2000, 5000, 3500, 10000, 1500, 1300, 1300, 3000, 3000, 1000];
let cantidadProductos = [80, 23, 55, 16, 14, 62, 43, 38, 19, 49];
let imagenProducto = ["../imagenes/azucar.jpeg", "../imagenes/cafe.jpeg", "../imagenes/cocacola.jpeg", "../imagenes/fernet.jpeg", "../imagenes/fideos.jpeg", "../imagenes/leche.jpeg", "../imagenes/mermelada.jpeg", "../imagenes/quesoUntable.jpeg", "../imagenes/yerba.jpeg", "../imagenes/yogur.jpeg"]
let productosComprados = []

let contenedor = document.getElementById("contenedor_producto");
let precioFinal = document.getElementById("precio_final");
let divPrecioFinal = document.getElementById("cont__p__final")


function sumaFinal(productosComprados) {
    let suma = 0;
    
    for (let i = 0; i < productosComprados.length; i++) {
        suma += productosComprados[i]
    }

    return suma   
}

function actualizarPrecioFinal() {
    if (productosComprados.length > 0) {
        precioFinal.textContent = `El total de su compra es de: $${sumaFinal(productosComprados)}, gracias por elegirnos!`;
    } else {
        precioFinal.textContent = "";
    }
}

for (let i = 0; i < productos.length; i++) {
    let card = document.createElement("div")
    card.className = "card"

    let tituloProducto = document.createElement("h3")
    tituloProducto.textContent = productos[i]

    let imagen = document.createElement("img")
    imagen.src = imagenProducto[i]
    imagen.alt = productos[i]

    let precioProducto = document.createElement("p")
    precioProducto.textContent = `$${precioProductos[i]}`

    let productoDescuento = document.createElement("p");
    productoDescuento.textContent = ""

    let stock = document.createElement("p")
    stock.textContent = `El stock es de ${cantidadProductos[i]} unidades`;

    let input = document.createElement("input");
    input.placeholder = "Ingrese cantidad";
    input.type = "number";

    let botonComprar = document.createElement("button")
    botonComprar.textContent = "Realizar compra"
    botonComprar.className = "card__comprar"
    botonComprar.id = `compra${[i]}`

//console.log(typeof(input.value))
    card.appendChild(tituloProducto);
    card.appendChild(imagen)
    card.appendChild(precioProducto);
    card.appendChild(productoDescuento);
    card.appendChild(stock);
    //card.appendChild(input);
    card.appendChild(botonComprar);

    contenedor.appendChild(card)


    if(productos[i] === "CocaCola" || productos[i] === "Fernet Branca"){
        console.log("descuento", precioProductos[i])
        precioProducto.className = "precio__producto";
        precioProducto.textContent = `$${precioProductos[i]}`;
        productoDescuento.textContent = `30% off: $${precioProductos[i]-(30/100*precioProductos[i])}`
        precioProductos[i] = precioProductos[i]-(30/100*precioProductos[i]);
        console.log(precioProductos)
    };

    let openModal = document.querySelector(`#compra${[i]}`)
    let modal = document.querySelector('.modal');
    let closeModal = document.querySelector('.modal__close');
    let modalImg = document.getElementsByClassName("modal__img")
    let modalInput = document.querySelector("#input1")
    let modalNombre = document.getElementsByClassName("modal__title")
    let modalComprar = document.getElementsByClassName("modal__comprar")
    let modalValidate = document.getElementsByClassName("modal__validate")

    openModal.addEventListener('click', (e) => {
        e.preventDefault();

        modal.classList.add('modal--show');

        modalImg[0].src = imagenProducto[i]
        modalImg[0].alt = productos[i]

        modalNombre[0].textContent = productos[i]
        
        modalComprar[0].onclick = () => {
            
    
            let cantInput = Number(modalInput.value)

            if (cantInput < 0 && cantInput >= cantidadProductos[i] || modalInput.value.includes(".")) {
      
                modalValidate[0].textContent = `Por favor ingrese un número valido, que se encuentre entre 0 y ${cantidadProductos[i]}, y sea entero`
                
            } else {
                let precio = cantInput * precioProductos[i];

                productosComprados.push(precio)

                modalValidate[0].textContent = `Usted compró ${cantInput} unidades de ${productos[i]} por el precio de: $${precio}, muchas gracias!`;

                let nuevoStock = cantidadProductos[i] - cantInput;
                stock.textContent = `El stock es de ${nuevoStock} unidades`;

                actualizarPrecioFinal()

                setTimeout(() => {
                    modalInput.value = null
                    modalValidate[0].textContent = ""
                    modal.classList.remove('modal--show');
                }, 3000);

                
            }

        }


    });

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalInput.value = null
        modalValidate[0].textContent = ""
        modal.classList.remove('modal--show');
    });

}