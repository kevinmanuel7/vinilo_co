// ============================================
// Arreglo complementario de regiones y comunas
// Vinilo & Co.
// ============================================

const REGIONES_Y_COMUNAS = {
  "Región Metropolitana de Santiago": [
    "Santiago",
    "Providencia",
    "Las Condes",
    "Maipú",
    "Puente Alto",
  ],
  "Región de Valparaíso": [
    "Quilpué",
    "San Antonio",
    "Valparaíso",
    "Villa Alemana",
    "Viña del Mar"
  ],
  "Región del Biobío": [
    "Concepción",
    "Talcahuano",
    "Los Ángeles",
    "Chillán",
  ],
  "Región de la Araucanía": [
    "Temuco",
    "Villarrica",
    "Angol",
  ],
  "Región de Ñuble": [
    "Chillán",
    "San Carlos",
    "Bulnes",
  ],
  "Región del Maule": [
    "Talca",
    "Linares",
    "Longaví",
    "Curicó",
  ],
};

// Rellena el <select> de región al cargar la página
function inicializarSelectRegiones() {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  Object.keys(REGIONES_Y_COMUNAS).forEach((region) => {
    const opcion = document.createElement("option");
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });
}

// Actualiza el <select> de comuna según la región elegida
function actualizarComunas() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  if (!selectRegion || !selectComuna) return;

  const regionSeleccionada = selectRegion.value;

  // Limpiar comunas anteriores
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

  if (regionSeleccionada && REGIONES_Y_COMUNAS[regionSeleccionada]) {
    selectComuna.disabled = false;
    REGIONES_Y_COMUNAS[regionSeleccionada].forEach((comuna) => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  } else {
    selectComuna.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarSelectRegiones();

  const selectRegion = document.getElementById("region");
  if (selectRegion) {
    selectRegion.addEventListener("change", actualizarComunas);
  }
});
