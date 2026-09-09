document.addEventListener("DOMContentLoaded", () => {
    const imagenPrincipal = document.getElementById("imagenPrincipal");
    const miniaturas = document.querySelectorAll(".miniatura");
    const flechaIzquierda = document.querySelector(".flecha-izquierda");
    const flechaDerecha = document.querySelector(".flecha-derecha");
  
    let indiceActual = 0;
  
    // Guardamos las rutas y los textos alternativos de las imágenes
    const imagenes = Array.from(miniaturas).map(min => ({
      src: min.src,
      alt: min.alt
    }));
  
    function actualizarImagen(indice) {
      imagenPrincipal.src = imagenes[indice].src;
      imagenPrincipal.alt = imagenes[indice].alt;
  
      // Actualizar clase activa en las miniaturas
      miniaturas.forEach((min, i) => {
        if (i === indice) {
          min.classList.add("activa");
        } else {
          min.classList.remove("activa");
        }
      });
    }
  
    // Click en flecha derecha
    flechaDerecha.addEventListener("click", () => {
      indiceActual = (indiceActual + 1) % imagenes.length;
      actualizarImagen(indiceActual);
    });
  
    // Click en flecha izquierda
    flechaIzquierda.addEventListener("click", () => {
      indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
      actualizarImagen(indiceActual);
    });
  
    // Click directo en las miniaturas
    miniaturas.forEach((miniatura, index) => {
      miniatura.addEventListener("click", () => {
        indiceActual = index;
        actualizarImagen(indiceActual);
      });
    });
  });