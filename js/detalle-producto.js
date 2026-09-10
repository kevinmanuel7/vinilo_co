// ============================================
// Detalle de producto — Vinilo & Co.
// Lee el parámetro ?id= de la URL, busca el
// producto en PRODUCTOS (productos-data.js) y
// rellena la plantilla dinámicamente.
// (NOMBRE_CATEGORIA, PAGINA_CATEGORIA, slugify y
//  formatearPrecioCLP viven en productos-data.js,
//  que se carga antes que este script)
// ============================================

function obtenerIdDesdeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

function renderizarDetalleProducto() {
  const contenedor = document.getElementById("nombre-producto");
  if (!contenedor) return; // No estamos en detalle-producto.html

  const id = obtenerIdDesdeUrl();
  const producto = buscarProductoPorId(id);

  if (!producto) {
    window.location.href = "productos.html";
    return;
  }

  document.title = `${producto.nombre} — Vinilo & Co.`;

  // Miga de pan: Home > [Categoría] > Nombre
  const migaCategoria = document.getElementById("miga-categoria");
  migaCategoria.textContent = NOMBRE_CATEGORIA[producto.categoria];
  migaCategoria.href = PAGINA_CATEGORIA[producto.categoria];
  document.getElementById("miga-producto").textContent = producto.nombre;

  // Info principal
  document.getElementById("nombre-producto").textContent = producto.nombre;
  document.getElementById("marca-producto").textContent = producto.marca;
  document.getElementById("precio-producto").textContent = formatearPrecioCLP(producto.precio);
  document.getElementById("descripcion-producto").textContent = producto.descripcion;

  // Especificaciones (flexibles: cada categoría define sus propios campos).
  // La marca/artista va siempre primero, con la etiqueta correcta según la categoría.
  const listaEspecificaciones = document.getElementById("lista-especificaciones");
  listaEspecificaciones.innerHTML = "";

  const especificacionesCompletas = [
    { label: ETIQUETA_MARCA[producto.categoria], value: producto.marca },
    ...producto.especificaciones,
  ];

  especificacionesCompletas.forEach((espec) => {
    const div = document.createElement("div");
    div.innerHTML = `<dt>${espec.label}</dt><dd>${espec.value}</dd>`;
    listaEspecificaciones.appendChild(div);
  });

  // Imagen principal y miniaturas
  const imagenPrincipal = document.getElementById("imagen-principal-producto");
  imagenPrincipal.src = producto.imagen;
  imagenPrincipal.alt = `${producto.nombre}`;

  const listaMiniaturas = document.getElementById("lista-miniaturas");
  listaMiniaturas.innerHTML = "";
  producto.miniaturas.forEach((src, indice) => {
    const li = document.createElement("li");
    const claseActiva = indice === 0 ? " activa" : "";
    li.innerHTML = `<img src="${src}" alt="Miniatura de ${producto.nombre}" class="miniatura${claseActiva}">`;
    listaMiniaturas.appendChild(li);
  });

  // Bug corregido: al hacer clic en una miniatura, se muestra en grande
  listaMiniaturas.querySelectorAll(".miniatura").forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
      imagenPrincipal.src = miniatura.src;

      listaMiniaturas.querySelectorAll(".miniatura").forEach((m) => m.classList.remove("activa"));
      miniatura.classList.add("activa");
    });
  });

  // Botón "Añadir al carrito"
  const botonAnadir = document.getElementById("boton-anadir-detalle");
  botonAnadir.dataset.producto = producto.nombre;
  botonAnadir.dataset.precio = producto.precio;

  // Spotify embed: solo para productos que traigan spotifyId (vinilos)
  const contenedorSpotify = document.getElementById("contenedor-spotify");
  const iframeSpotify = document.getElementById("iframe-spotify");
  if (producto.spotifyId) {
    iframeSpotify.src = `https://open.spotify.com/embed/album/${producto.spotifyId}?utm_source=generator&theme=0`;
    contenedorSpotify.style.display = "block";
  } else {
    contenedorSpotify.style.display = "none";
  }

  renderizarRelacionados(producto);
}

function renderizarRelacionados(productoActual) {
  const grilla = document.getElementById("grilla-relacionados");
  if (!grilla) return;

  // Priorizamos productos de la MISMA categoría (más relevantes)
  const mismaCategoria = obtenerProductosPorCategoria(productoActual.categoria)
    .filter((p) => p.id !== productoActual.id);

  const otros = mismaCategoria.slice(0, 3);

  grilla.innerHTML = "";
  otros.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <article class="tarjeta-producto">
        <a href="detalle-producto.html?id=${producto.id}">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
        </a>
        <p class="atributo">${producto.subcategoria}</p>
        <p class="precio">${formatearPrecioCLP(producto.precio)}</p>
        <button type="button" class="boton-primario boton-anadir" data-producto="${producto.nombre}" data-precio="${producto.precio}">Añadir</button>
      </article>
    `;
    grilla.appendChild(li);
  });

  // No inicializamos los botones aquí a propósito: carrito.js se carga
  // después de este script y su propio DOMContentLoaded ya los conecta.
  // Hacerlo dos veces duplicaría la cantidad agregada por cada clic.
}

document.addEventListener("DOMContentLoaded", renderizarDetalleProducto);
