// ============================================
// Submenús del nav — Vinilo & Co.
// Llena "Vinilos ▸" con los géneros reales y
// "Instrumentos ▸" con los tipos reales, tomados
// directamente de PRODUCTOS (productos-data.js),
// para que nunca queden desincronizados.
// ============================================

function poblarSubmenuNav(idContenedor, categoria, nombreParametro, paginaDestino) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const subcategorias = obtenerSubcategorias(categoria);

  contenedor.innerHTML = subcategorias
    .map((sub) => `<li><a href="${paginaDestino}?${nombreParametro}=${slugify(sub)}">${sub}</a></li>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  poblarSubmenuNav("submenu-vinilos", "vinilo", "genero", "vinilos.html");
  poblarSubmenuNav("submenu-instrumentos", "instrumento", "tipo", "instrumentos.html");
});
