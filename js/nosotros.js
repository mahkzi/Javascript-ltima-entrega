const section=document.getElementById("contenedor-section");
const textoSection=document.createElement("div");
textoSection.className="info"
const formularioContenedor=document.createElement("div");
formularioContenedor.className="form-contenedor"
section.appendChild(textoSection);
section.appendChild(formularioContenedor);
const texto=document.createElement("h3");
texto.innerText="Comuníquese con nosotros";
texto.className="texto";
textoSection.appendChild(texto);
const formulario=document.getElementById("formulario");
formulario.className="form";
formularioContenedor.appendChild(formulario);
const boton=document.createElement("button");
boton.className="boton-enviar";
boton.innerText="Envíar";
boton.type="submit";
boton.addEventListener("click",()=> enviarDatos());
formulario.appendChild(boton);
console.log(section);
/*footer*/
function enviarDatos(){
    Swal.fire({
        title: "!Muchas Gracias!",
        text: "Su mensaje se ha enviado correctamente",
        icon: "success",
        confirmButtonText: "!Perfecto!",
        background:"smokewhite"
      });
    }