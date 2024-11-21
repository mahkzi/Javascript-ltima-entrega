
function mostrarCarrito() {
    if (carrito.length === 0) {
        const contenedorCarrito = document.createElement("div");
        contenedorCarrito.className = "container-carrito";
        carritoIcono.appendChild(contenedorCarrito);
        const carritoHtml = document.createElement("div")
        carritoHtml.className = "carrito-productos";
        contenedorCarrito.appendChild(carritoHtml);
        const mensaje = document.createElement("p");
        mensaje.innerText = "Su carrito está vacio";
        setTimeout(() => {
            location.reload()
        }, 3000);
        carritoHtml.appendChild(mensaje);
    } else {
        carrito.forEach(producto => {
            const contenedorCarrito = document.createElement("div");
            contenedorCarrito.className = "container-carrito";
            carritoIcono.appendChild(contenedorCarrito);
            const carritoHtml = document.createElement("div")
            carritoHtml.className = "carrito-productos";
            contenedorCarrito.appendChild(carritoHtml);
            const productosCarrito = document.createElement("div");
            productosCarrito.className = "productos-carrito";
            const mostrarNombre = document.createElement("p");
            mostrarNombre.className = "texto-carrito";
            mostrarNombre.innerText = "Producto: " + `${producto.nombre}`;
            const mostrarPrecio = document.createElement("p");
            mostrarPrecio.className = "texto-carrito";
            mostrarPrecio.innerText = "Precio: " + `${producto.precio}`;
            const mostrarCantidad = document.createElement("p")
            mostrarCantidad.className = "texto-carrito";
            mostrarCantidad.innerText = "Cantidad: " + `${producto.cantidad}`;
            productosCarrito.appendChild(mostrarNombre);
            productosCarrito.appendChild(mostrarPrecio);
            productosCarrito.appendChild(mostrarCantidad);
            carritoHtml.appendChild(productosCarrito);
            /*suma de total*/
            const totalCarrito = document.createElement("div");
            totalCarrito.className = "contenedor-total";
            const mostrarTotal = document.createElement("p");
            mostrarTotal.innerText = "Total: ";
            mostrarTotal.className = "texto-total";
            const precioTotal = document.createElement("p");
            precioTotal.innerText = carrito.reduce((acc, el) => acc + el.precio, 0);
            precioTotal.className = "texto-total";
            totalCarrito.appendChild(precioTotal);
            totalCarrito.appendChild(mostrarTotal);
            carritoHtml.appendChild(totalCarrito);
            /*botones*/
            const botonCarrito = document.createElement("div");
            botonCarrito.className = "contenedor-botones";
            carritoHtml.appendChild(botonCarrito);
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
        })
    }console.log(carrito);
   
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
const carritoIcono = document.getElementById("contenedor-icono");
carritoIcono.addEventListener("click", () => mostrarCarrito());
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
            backgroundColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,13,233,1) 37%, rgba(0,212,255,1) 100%)",
            duration: 3000

        }).showToast();
        setTimeout(() => {
            location.reload()
        }, 3500);
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
            backgroundColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,13,233,1) 37%, rgba(0,212,255,1) 100%)",
            duration: 3000

        }).showToast();
        setTimeout(() => {
            location.reload()
        }, 3500);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
};