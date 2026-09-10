// ============================================
// Listado y filtro de productos — Vinilo & Co.
// Un solo script para productos.html (todos),
// vinilos.html, tornamesas.html e instrumentos.html.
// La página le indica qué mostrar mediante
// atributos data-* en el contenedor de la grilla.
// ============================================

function inicializarListadoCategoria() {
  const grilla = document.getElementById("grilla-productos-categoria");
  if (!grilla) return; // Esta página no tiene listado dinámico

  const categoria = grilla.dataset.categoria; // "vinilo" | "tornamesa" | "instrumento" | "todos"
  const nombreParametroUrl = grilla.dataset.parametroFiltro || "sub"; // "genero" o "tipo"
  const selectFiltro = document.getElementById("filtro-subcategoria");

  const productosBase = categoria === "todos" ? PRODUCTOS : obtenerProductosPorCategoria(categoria);

  // Si la página tiene un <select> de filtro, lo poblamos con las
  // subcategorías reales que existan en los datos (nunca a mano)
  if (selectFiltro) {
    const subcategorias = [...new Set(productosBase.map((p) => p.subcategoria))].sort();

    subcategorias.forEach((sub) => {
      const opcion = document.createElement("option");
      opcion.value = slugify(sub);
      opcion.textContent = sub;
      selectFiltro.appendChild(opcion);
    });

    // Si venimos de un link del menú (ej. Vinilos ▸ Jazz), preseleccionamos
    const parametros = new URLSearchParams(window.location.search);
    const valorInicial = parametros.get(nombreParametroUrl);
    if (valorInicial) {
      selectFiltro.value = valorInicial;
    }

    selectFiltro.addEventListener("change", () => {
      renderizarGrilla();

      // Reflejamos el filtro en la URL (sin recargar) para que se pueda compartir/recargar
      const nuevaUrl = new URL(window.location);
      if (selectFiltro.value) {
        nuevaUrl.searchParams.set(nombreParametroUrl, selectFiltro.value);
      } else {
        nuevaUrl.searchParams.delete(nombreParametroUrl);
      }
      window.history.replaceState({}, "", nuevaUrl);
    });
  }

  function renderizarGrilla() {
    const filtroActivo = selectFiltro ? selectFiltro.value : "";
    const productosFiltrados = filtroActivo
      ? productosBase.filter((p) => slugify(p.subcategoria) === filtroActivo)
      : productosBase;

    grilla.innerHTML = "";

    if (productosFiltrados.length === 0) {
      grilla.innerHTML = `<li class="sin-resultados">No encontramos productos con ese filtro.</li>`;
      return;
    }

    const mostrarBadgeCategoria = categoria === "todos";

    productosFiltrados.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <article class="tarjeta-producto">
          <a href="detalle-producto.html?id=${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
          </a>
          ${mostrarBadgeCategoria ? `<p class="badge-categoria">${NOMBRE_CATEGORIA[producto.categoria]}</p>` : ""}
          <p class="marca-producto">${producto.marca}</p>
          <p class="atributo">${producto.subcategoria}</p>
          <p class="precio">${formatearPrecioCLP(producto.precio)}</p>
          <button type="button" class="boton-primario boton-anadir" data-producto="${producto.nombre}" data-precio="${producto.precio}">Añadir</button>
        </article>
      `;
      grilla.appendChild(li);
    });

    // No conectamos los botones "Añadir" aquí: carrito.js se carga después
    // de este script y su propio DOMContentLoaded ya los conecta a todos
    // los .boton-anadir que existan en ese momento (ver orden de <script> al
    // final del HTML). Conectarlos dos veces duplicaría la cantidad por clic.
  }

  renderizarGrilla();
}

document.addEventListener("DOMContentLoaded", inicializarListadoCategoria);
