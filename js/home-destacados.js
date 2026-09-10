// ============================================
// Destacados del Home — Vinilo & Co.
// Renderiza los productos marcados como
// "destacado: true" en productos-data.js.
// ============================================

function renderizarDestacadosHome() {
  const grilla = document.getElementById("grilla-destacados-home");
  if (!grilla) return; // No estamos en index.html

  const destacados = obtenerDestacados("vinilo", 4);

  grilla.innerHTML = "";
  destacados.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="marca-producto">${producto.marca}</p>
        <p class="atributo">${producto.subcategoria}</p>
        <p class="precio">${formatearPrecioCLP(producto.precio)}</p>
        <a href="detalle-producto.html?id=${producto.id}" class="boton-secundario">Ver más</a>
      </article>
    `;
    grilla.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderizarDestacadosHome);
