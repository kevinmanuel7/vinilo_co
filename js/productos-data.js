// ============================================
// Arreglo central de productos — Vinilo & Co.
// Cada producto tiene:
//   - categoria: "vinilo" | "tornamesa" | "instrumento"
//   - subcategoria: género (vinilos) o tipo (instrumentos/tornamesas)
//   - marca: artista/banda (vinilos) o fabricante (tornamesas/instrumentos)
//   - destacado: true si debe aparecer en el Home
//   - especificaciones: lista flexible de {label, value}
//     (así cada categoría puede tener campos distintos)
// ============================================

const PRODUCTOS = [

  // ==================== VINILOS ====================
  {
    id: "abbey-road",
    nombre: "Abbey Road",
    marca: "The Beatles",
    precio: 12990,
    categoria: "vinilo",
    subcategoria: "Rock clásico",
    destacado: true,
    imagen: "img/The_Beatles_Abbey_Road_album_cover.jpg",
    miniaturas: [
      "img/The_Beatles_Abbey_Road_album_cover.jpg",
      "img/abbeyroad-partetrasera.jpg",
      "img/abbeyroad-vinyl.jpg",
    ],
    descripcion: "Edición en vinilo de 180 gramos del clásico álbum de 1969. Remasterizado para conservar la calidez del sonido analógico original.",
    especificaciones: [
      { label: "Género", value: "Rock clásico" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "0ETFjACtuP2ADo6LFhL6HN",
  },
  {
    id: "young-americans",
    nombre: "Young Americans",
    marca: "David Bowie",
    precio: 14500,
    categoria: "vinilo",
    subcategoria: "Soul",
    destacado: true,
    imagen: "img/youngamericans-portada.jpg",
    miniaturas: ["img/youngamericans-portada.jpg"],
    descripcion: "Edición en vinilo del álbum de 1975 de David Bowie, su incursión más directa en el soul y el funk.",
    especificaciones: [
      { label: "Género", value: "Soul" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "blizzard-of-ozz",
    nombre: "Blizzard Of Ozz",
    marca: "Ozzy Osbourne",
    precio: 11990,
    categoria: "vinilo",
    subcategoria: "Heavy Metal",
    destacado: false,
    imagen: "img/blizzardofozz-frontal.jpg",
    miniaturas: ["img/blizzardofozz-frontal.jpg"],
    descripcion: "El debut solista de Ozzy Osbourne tras Black Sabbath (1980), con la guitarra de Randy Rhoads como protagonista.",
    especificaciones: [
      { label: "Género", value: "Heavy Metal" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "forever-young",
    nombre: "Forever Young",
    marca: "Alphaville",
    precio: 13490,
    categoria: "vinilo",
    subcategoria: "Synth-pop",
    destacado: false,
    imagen: "img/foreveryoung-portada.jpg",
    miniaturas: ["img/foreveryoung-portada.jpg"],
    descripcion: "Edición en vinilo del clásico synth-pop de los 80, con un sonido de sintetizadores luminoso.",
    especificaciones: [
      { label: "Género", value: "Synth-pop" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "toto",
    nombre: "Toto",
    marca: "Toto",
    precio: 13990,
    categoria: "vinilo",
    subcategoria: "Rock / Pop Rock",
    destacado: false,
    imagen: "img/toto-portada.jpg",
    miniaturas: ["img/toto-portada.jpg"],
    descripcion: "El álbum debut homónimo de Toto (1978), con un despliegue de virtuosismo instrumental.",
    especificaciones: [
      { label: "Género", value: "Rock / Pop Rock" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "signos",
    nombre: "Signos",
    marca: "Soda Stereo",
    precio: 14990,
    categoria: "vinilo",
    subcategoria: "Rock en español / New Wave",
    destacado: true,
    imagen: "img/signos-portada.jpg",
    miniaturas: ["img/signos-portada.jpg"],
    descripcion: "El cuarto álbum de estudio de Soda Stereo (1986), pilar del rock en español.",
    especificaciones: [
      { label: "Género", value: "Rock en español / New Wave" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "infame",
    nombre: "Infame",
    marca: "Babasónicos",
    precio: 13990,
    categoria: "vinilo",
    subcategoria: "Rock alternativo",
    destacado: false,
    imagen: "img/infameportada.jpg",
    miniaturas: ["img/infameportada.jpg"],
    descripcion: "Álbum de Babasónicos que marcó un giro hacia un sonido más pulido, sin perder su identidad alternativa.",
    especificaciones: [
      { label: "Género", value: "Rock alternativo" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "one-night-stand",
    nombre: "One Night Stand!",
    marca: "Sam Cooke",
    precio: 14500,
    categoria: "vinilo",
    subcategoria: "Soul / R&B",
    destacado: false,
    imagen: "img/onenightstand-portada.jpg",
    miniaturas: ["img/onenightstand-portada.jpg"],
    descripcion: "Grabación en vivo de Sam Cooke, capturando la energía de uno de los grandes de la música soul.",
    especificaciones: [
      { label: "Género", value: "Soul / R&B" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "take-ten",
    nombre: "Take Ten",
    marca: "Paul Desmond",
    precio: 15990,
    categoria: "vinilo",
    subcategoria: "Cool Jazz",
    destacado: false,
    imagen: "img/taketenportada.jpg",
    miniaturas: ["img/taketenportada.jpg"],
    descripcion: "El álbum de 1963 de Paul Desmond, referente del cool jazz con un sonido elegante y relajado.",
    especificaciones: [
      { label: "Género", value: "Cool Jazz" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },
  {
    id: "led-zeppelin",
    nombre: "Led Zeppelin",
    marca: "Led Zeppelin",
    precio: 13990,
    categoria: "vinilo",
    subcategoria: "Hard Rock",
    destacado: true,
    imagen: "img/ledzeppelin-portada.jpg",
    miniaturas: ["img/ledzeppelin-portada.jpg"],
    descripcion: "El álbum debut de Led Zeppelin (1969), punto de partida del hard rock.",
    especificaciones: [
      { label: "Género", value: "Hard Rock" },
      { label: "Formato", value: "LP 12\" — 33 RPM" },
      { label: "Estado", value: "Nuevo, sellado" },
    ],
    spotifyId: "",
  },

  // ==================== TORNAMESAS ====================
  {
    id: "tornamesa-at-lp60x",
    nombre: "AT-LP60X",
    marca: "Audio-Technica",
    precio: 99990,
    categoria: "tornamesa",
    subcategoria: "Automática",
    destacado: false,
    imagen: "https://placehold.co/400x400/2B2118/F5E6D3?text=AT-LP60X",
    miniaturas: ["https://placehold.co/400x400/2B2118/F5E6D3?text=AT-LP60X"],
    descripcion: "Tornamesa totalmente automática, ideal para quienes recién comienzan a coleccionar vinilos. Incluye cápsula de fábrica ya instalada.",
    especificaciones: [
      { label: "Tipo", value: "Automática" },
      { label: "Velocidades", value: "33 / 45 RPM" },
      { label: "Conectividad", value: "USB, RCA" },
    ],
    spotifyId: "",
  },
  {
    id: "tornamesa-plx500",
    nombre: "PLX-500",
    marca: "Pioneer",
    precio: 249990,
    categoria: "tornamesa",
    subcategoria: "Manual",
    destacado: false,
    imagen: "https://placehold.co/400x400/8B4513/F5E6D3?text=PLX-500",
    miniaturas: ["https://placehold.co/400x400/8B4513/F5E6D3?text=PLX-500"],
    descripcion: "Tornamesa de tracción directa de nivel profesional, pensada tanto para audiófilos como para DJs.",
    especificaciones: [
      { label: "Tipo", value: "Manual, tracción directa" },
      { label: "Velocidades", value: "33 / 45 / 78 RPM" },
      { label: "Conectividad", value: "RCA, USB" },
    ],
    spotifyId: "",
  },
  {
    id: "tornamesa-crosley-c62",
    nombre: "C62",
    marca: "Crosley",
    precio: 129990,
    categoria: "tornamesa",
    subcategoria: "Automática",
    destacado: false,
    imagen: "https://placehold.co/400x400/D2691E/F5E6D3?text=Crosley+C62",
    miniaturas: ["https://placehold.co/400x400/D2691E/F5E6D3?text=Crosley+C62"],
    descripcion: "Tornamesa de estética vintage con parlantes incorporados, perfecta para quienes buscan un equipo todo-en-uno.",
    especificaciones: [
      { label: "Tipo", value: "Automática" },
      { label: "Velocidades", value: "33 / 45 / 78 RPM" },
      { label: "Conectividad", value: "Bluetooth, RCA" },
    ],
    spotifyId: "",
  },

  // ==================== INSTRUMENTOS ====================
  {
    id: "guitarra-fender-stratocaster",
    nombre: "Stratocaster",
    marca: "Fender",
    precio: 589990,
    categoria: "instrumento",
    subcategoria: "Guitarras",
    destacado: false,
    imagen: "https://placehold.co/400x400/2B2118/F5E6D3?text=Stratocaster",
    miniaturas: ["https://placehold.co/400x400/2B2118/F5E6D3?text=Stratocaster"],
    descripcion: "Guitarra eléctrica icónica, versátil para rock, blues y funk. Cuerpo de aliso y mástil de arce.",
    especificaciones: [
      { label: "Tipo", value: "Guitarra eléctrica" },
      { label: "Cuerdas", value: "6" },
      { label: "Cuerpo", value: "Aliso" },
    ],
    spotifyId: "",
  },
  {
    id: "bajo-fender-precision",
    nombre: "Precision Bass",
    marca: "Fender",
    precio: 549990,
    categoria: "instrumento",
    subcategoria: "Bajos",
    destacado: false,
    imagen: "https://placehold.co/400x400/8B4513/F5E6D3?text=Precision+Bass",
    miniaturas: ["https://placehold.co/400x400/8B4513/F5E6D3?text=Precision+Bass"],
    descripcion: "El bajo eléctrico que definió el sonido del bajo moderno desde los años 50.",
    especificaciones: [
      { label: "Tipo", value: "Bajo eléctrico" },
      { label: "Cuerdas", value: "4" },
      { label: "Cuerpo", value: "Aliso" },
    ],
    spotifyId: "",
  },
  {
    id: "bateria-pearl-export",
    nombre: "Export",
    marca: "Pearl",
    precio: 399990,
    categoria: "instrumento",
    subcategoria: "Baterías",
    destacado: false,
    imagen: "https://placehold.co/400x400/D2691E/F5E6D3?text=Pearl+Export",
    miniaturas: ["https://placehold.co/400x400/D2691E/F5E6D3?text=Pearl+Export"],
    descripcion: "Batería acústica de 5 piezas, ideal tanto para principiantes como para uso semi-profesional.",
    especificaciones: [
      { label: "Tipo", value: "Batería acústica, 5 piezas" },
      { label: "Incluye", value: "Platillos básicos" },
    ],
    spotifyId: "",
  },
  {
    id: "microfono-shure-sm58",
    nombre: "SM58",
    marca: "Shure",
    precio: 79990,
    categoria: "instrumento",
    subcategoria: "Micrófonos",
    destacado: false,
    imagen: "https://placehold.co/400x400/C9A961/2B2118?text=Shure+SM58",
    miniaturas: ["https://placehold.co/400x400/C9A961/2B2118?text=Shure+SM58"],
    descripcion: "El micrófono vocal dinámico más usado del mundo en vivo, resistente y confiable.",
    especificaciones: [
      { label: "Tipo", value: "Dinámico, cardioide" },
      { label: "Conector", value: "XLR" },
    ],
    spotifyId: "",
  },
  {
    id: "amplificador-fender-champion",
    nombre: "Champion 40",
    marca: "Fender",
    precio: 159990,
    categoria: "instrumento",
    subcategoria: "Amplificadores",
    destacado: false,
    imagen: "https://placehold.co/400x400/2B2118/C9A961?text=Champion+40",
    miniaturas: ["https://placehold.co/400x400/2B2118/C9A961?text=Champion+40"],
    descripcion: "Amplificador de guitarra de 40 watts con efectos incorporados, ideal para práctica y grabación.",
    especificaciones: [
      { label: "Tipo", value: "Amplificador de guitarra" },
      { label: "Potencia", value: "40 W" },
    ],
    spotifyId: "",
  },
  {
    id: "guitarra-gibson-lespaul",
    nombre: "Les Paul 1968 Custom Reissue",
    marca: "Gibson",
    precio: 5899900,
    categoria: "instrumento",
    subcategoria: "Guitarras",
    destacado: false,
    imagen: "img/gibsonlespaul1.png",
    miniaturas: [
      "img/gibsonlespaul1.png",
      "img/gibsonlespaul2.png",
    ],
    descripcion: "La Custom Les Paul de 1968 se diferenció de sus predecesoras de los años 50 con algunos detalles significativos. En lugar de un cuerpo de caoba maciza, ahora tenía una tapa de arce macizo sobre un fondo de caoba, lo que añadía la claridad que muchos guitarristas de rock buscaban. También venía de serie con dos pastillas de tipo humbucker en lugar de tres, lo que ofrecía una opción tímbrica renovada.",
    especificaciones: [
      { label: "Tipo", value: "Guitarra eléctrica" },
      { label: "Cuerdas", value: "6" },
      { label: "Cuerpo", value: "Aliso" },
    ],
    spotifyId: "",
  }
];

// --------------------------------------------
// Utilidades de consulta sobre el arreglo
// --------------------------------------------

function buscarProductoPorId(id) {
  return PRODUCTOS.find((producto) => producto.id === id);
}

function obtenerProductosPorCategoria(categoria) {
  return PRODUCTOS.filter((producto) => producto.categoria === categoria);
}

function obtenerSubcategorias(categoria) {
  const productos = obtenerProductosPorCategoria(categoria);
  return [...new Set(productos.map((producto) => producto.subcategoria))];
}

function obtenerDestacados(categoria, cantidad) {
  const productos = categoria ? obtenerProductosPorCategoria(categoria) : PRODUCTOS;
  return productos.filter((p) => p.destacado).slice(0, cantidad);
}

// --------------------------------------------
// Utilidades compartidas por productos.html,
// vinilos.html, tornamesas.html, instrumentos.html,
// index.html y detalle-producto.html
// --------------------------------------------

const NOMBRE_CATEGORIA = {
  vinilo: "Vinilos",
  tornamesa: "Tornamesas",
  instrumento: "Instrumentos",
};

const PAGINA_CATEGORIA = {
  vinilo: "vinilos.html",
  tornamesa: "tornamesas.html",
  instrumento: "instrumentos.html",
};

// Etiqueta que corresponde al campo "marca" según la categoría
// (es un artista/banda para vinilos, un fabricante para el resto)
const ETIQUETA_MARCA = {
  vinilo: "Artista",
  tornamesa: "Marca",
  instrumento: "Marca",
};

// Convierte "Rock / Pop Rock" -> "rock-pop-rock" (para usar en la URL y comparar filtros)
function slugify(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatearPrecioCLP(valor) {
  return "$" + valor.toLocaleString("es-CL");
}
