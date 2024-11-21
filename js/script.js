const carritoIcono = document.getElementById("contenedor-icono");
carritoIcono.addEventListener("click", () => mostrarCarrito());
function mostrarCarrito() {
    if (carrito.length === 0) {
        const contenedorCarrito=document.getElementById("contenedor-carrito");
        contenedorCarrito.className="contenedor-carrito";
       const carritoVacio=document.createElement("p");
       carritoVacio.className="carrito-vacio"
       carritoVacio.innerText="Su carrito esta vacío";
       contenedorCarrito.appendChild(carritoVacio);
       setTimeout(() => {
        location.reload()
       }, 2000);
    } else {
        const contenedorCarrito=document.getElementById("contenedor-carrito");
        contenedorCarrito.className="contenedor-carrito";
        carrito.forEach(el => {
            const divProductos=document.createElement("div");
            divProductos.className="div-productos";
            const nombreProducto=document.createElement("p");
            nombreProducto.innerText="Producto: " + `${el.nombre}`;
            nombreProducto.className="p-productos";
            const cantidadProducto=document.createElement("p");
            cantidadProducto.className="p-productos"
            cantidadProducto.innerText="Cantidad: " + `${el.cantidad}`;
            divProductos.appendChild(nombreProducto);
            divProductos.appendChild(cantidadProducto);
            contenedorCarrito.appendChild(divProductos);
        })
        const mostrarTotal=document.createElement("div");
        mostrarTotal.className="mostrar-total";
        mostrarTotal.innerText="Total: "
        const precioTotal = document.createElement("p");
        precioTotal.innerText=""
        precioTotal.innerText = carrito.reduce((acc, el) => acc + el.precio,0.00);
        precioTotal.className="precio-total";
        mostrarTotal.appendChild(precioTotal);
        contenedorCarrito.appendChild(mostrarTotal);
        /*botones*/
        const botonCarrito = document.createElement("div");
       botonCarrito.className = "contenedor-botones";
        contenedorCarrito.appendChild(botonCarrito);
        const eliminarCarrito = document.createElement("button");
        eliminarCarrito.className = "boton-eliminar";
        eliminarCarrito.innerText = "Vaciar carrito";
        eliminarCarrito.addEventListener("click", () => vaciarCarrito());
        const comprar = document.createElement("button");
        comprar.className = "boton-comprar";
        comprar.innerText = "Proceder a la compra";
        comprar.addEventListener("click", () => confirmarCompra());
        botonCarrito.appendChild(eliminarCarrito);
        botonCarrito.appendChild(comprar);
    }
};
function vaciarCarrito() {
    Swal.fire({
        title: "Su carrito se ha vaciado correctamente",
        icon: "success"
    });
    localStorage.clear()
    setTimeout(() => {
        location.reload()
    }, 3000);
}
function confirmarCompra() {
    Swal.fire({
        title: "Su compra se ha realizado con éxito",
        text: "¡Muchas gracias por su compra!",
        icon: "success"
    })
    localStorage.clear()
    setTimeout(() => {
        location.reload()
    }, 3000);
    ;
}
// header index

const container = document.getElementById("main-container");
const titulo = document.createElement("h1");
titulo.className = "titulo-principal";
titulo.innerText = "Nuestros Productos";
container.appendChild(titulo);
const containerCards = document.createElement("section");
containerCards.className = "contenedor-cartitas";
container.appendChild(containerCards);

function cardCreator(producto) {
    const carta = document.createElement("div");
    carta.className = "cartita"
    const imagen = document.createElement("img");
    imagen.src = `${producto.imagen}`;
    imagen.alt = "carga fallida";
    imagen.className = "imagen-cartita";
    const nombre = document.createElement("p");
    nombre.className = "texto-cartita";
    nombre.innerText = `${producto.nombre}`;
    const precio = document.createElement("p");
    precio.className = "texto-cartita";
    precio.innerText = `${producto.precio} $`;
    const boton = document.createElement("button");
    boton.innerText = "Comprar";
    boton.className = "boton-cartita";
    boton.addEventListener("click", () => agregarAlCarrito(producto));
    //agregar la funcion para agregar al carrito
    carta.appendChild(imagen);
    carta.appendChild(nombre);
    carta.appendChild(precio);
    carta.appendChild(boton);
    containerCards.appendChild(carta);
};
fetch("./json/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(el => cardCreator(el));
    })
    .catch(error => console.error(error));
let carrito;
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
    carrito = []
}
function agregarAlCarrito(producto) {
    if (carrito.some(el => el.id === producto.id)) {
        const indiceProducto = carrito.findIndex(el => el.id === producto.id);
        carrito[indiceProducto].cantidad += 1;
        Toastify({

            text: "Su producto se agregó correctamente al carrito",
           stylebackground: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,13,233,1) 37%, rgba(0,212,255,1) 100%)",
            duration: 3000

        }).showToast();
    } else {
        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        };
        carrito.push(nuevoProducto);
        Toastify({

            text: "Su producto se agregó correctamente al carrito",
            stylebackground: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,13,233,1) 37%, rgba(0,212,255,1) 100%)",
            duration: 3000

        }).showToast();
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};