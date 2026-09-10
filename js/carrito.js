// ============================================
// Carrito de compras — Vinilo & Co.
// Persistencia en localStorage
// ============================================

const CLAVE_CARRITO = "vinilo-co-carrito";

// --------------------------------------------
// Lectura y escritura del carrito en localStorage
// --------------------------------------------

function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// --------------------------------------------
// Operaciones sobre el carrito
// --------------------------------------------

function agregarProductoAlCarrito(nombre, precio, cantidad = 1, imagen = "") {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad, imagen });
  }

  guardarCarrito(carrito);
}

function actualizarCantidadProducto(nombre, nuevaCantidad) {
  let carrito = obtenerCarrito();

  if (nuevaCantidad <= 0) {
    carrito = carrito.filter((item) => item.nombre !== nombre);
  } else {
    const item = carrito.find((i) => i.nombre === nombre);
    if (item) item.cantidad = nuevaCantidad;
  }

  guardarCarrito(carrito);
}

function eliminarProductoDelCarrito(nombre) {
  const carrito = obtenerCarrito().filter((item) => item.nombre !== nombre);
  guardarCarrito(carrito);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function calcularTotalCarrito(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function contarItemsCarrito(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// --------------------------------------------
// Formato de precio en pesos chilenos
// --------------------------------------------

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

// --------------------------------------------
// Actualiza el número que aparece junto al ícono
// del carrito en el header (presente en TODAS las páginas)
// --------------------------------------------

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const total = contarItemsCarrito(carrito);

  document.querySelectorAll(".contador-carrito").forEach((elemento) => {
    elemento.textContent = total;
  });
}

// --------------------------------------------
// Conecta todos los botones "Añadir" de la página actual
// (Home, Productos, Detalle de producto) con el carrito
// --------------------------------------------

function inicializarBotonesAnadir() {
  const botones = document.querySelectorAll(".boton-anadir");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.producto;
      const precio = parseInt(boton.dataset.precio, 10) || 0;

      agregarProductoAlCarrito(nombre, precio, 1);
      mostrarConfirmacionAnadido(boton);
    });
  });

  // Caso especial: el botón de detalle de producto usa un <select> de cantidad
  const botonDetalle = document.querySelector(".boton-anadir-carrito");
  if (botonDetalle) {
    botonDetalle.addEventListener("click", (evento) => {
      evento.preventDefault();
      const nombre = botonDetalle.dataset.producto;
      const precio = parseInt(botonDetalle.dataset.precio, 10) || 0;
      const selectCantidad = document.getElementById("cantidad");
      const cantidad = selectCantidad ? parseInt(selectCantidad.value, 10) : 1;

      agregarProductoAlCarrito(nombre, precio, cantidad);
      mostrarConfirmacionAnadido(botonDetalle);
    });
  }
}

// Pequeña confirmación visual y no intrusiva de que el producto se agregó
function mostrarConfirmacionAnadido(boton) {
  const textoOriginal = boton.textContent;
  boton.textContent = "¡Añadido!";
  boton.disabled = true;

  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.disabled = false;
  }, 900);
}

// ============================================
// RENDERIZADO DE LA PÁGINA DEL CARRITO (carrito.html)
// ============================================

function renderizarPaginaCarrito() {
  const contenedor = document.getElementById("lista-items-carrito");
  if (!contenedor) return; // No estamos en carrito.html

  const carrito = obtenerCarrito();
  const elementoVacio = document.getElementById("carrito-vacio");
  const elementoTotal = document.getElementById("carrito-total");
  const botonPagar = document.getElementById("boton-pagar");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    elementoVacio.style.display = "block";
    elementoTotal.textContent = formatearPrecio(0);
    botonPagar.disabled = true;
    return;
  }

  elementoVacio.style.display = "none";
  botonPagar.disabled = false;

  carrito.forEach((item) => {
    const fila = document.createElement("li");
    fila.className = "item-carrito";
    fila.innerHTML = `
      <img src="${item.imagen || 'https://placehold.co/100x100/2B2118/F5E6D3?text=Vinilo'}" alt="${item.nombre}">

      <div class="item-carrito-info">
        <h3>${item.nombre}</h3>
        <p class="item-carrito-precio-unitario">${formatearPrecio(item.precio)} c/u</p>
      </div>

      <div class="selector-cantidad">
        <button type="button" class="boton-cantidad" data-accion="restar" data-nombre="${item.nombre}" aria-label="Disminuir cantidad">−</button>
        <span class="cantidad-actual">${item.cantidad}</span>
        <button type="button" class="boton-cantidad" data-accion="sumar" data-nombre="${item.nombre}" aria-label="Aumentar cantidad">+</button>
      </div>

      <p class="item-carrito-subtotal">${formatearPrecio(item.precio * item.cantidad)}</p>

      <button type="button" class="boton-eliminar" data-nombre="${item.nombre}" aria-label="Eliminar ${item.nombre} del carrito">🗑</button>
    `;
    contenedor.appendChild(fila);
  });

  elementoTotal.textContent = formatearPrecio(calcularTotalCarrito(carrito));

  // Conectar los botones +/- y eliminar recién creados
  contenedor.querySelectorAll(".boton-cantidad").forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      const accion = boton.dataset.accion;
      const carritoActual = obtenerCarrito();
      const item = carritoActual.find((i) => i.nombre === nombre);
      if (!item) return;

      const nuevaCantidad = accion === "sumar" ? item.cantidad + 1 : item.cantidad - 1;
      actualizarCantidadProducto(nombre, nuevaCantidad);
      renderizarPaginaCarrito();
    });
  });

  contenedor.querySelectorAll(".boton-eliminar").forEach((boton) => {
    boton.addEventListener("click", () => {
      eliminarProductoDelCarrito(boton.dataset.nombre);
      renderizarPaginaCarrito();
    });
  });
}

function inicializarPaginaCarrito() {
  const botonPagar = document.getElementById("boton-pagar");
  if (!botonPagar) return;

  botonPagar.addEventListener("click", () => {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    alert("¡Gracias por tu compra! (Simulación: aún no hay pasarela de pago conectada).");
    vaciarCarrito();
    renderizarPaginaCarrito();
  });

  const formularioCupon = document.getElementById("form-cupon");
  if (formularioCupon) {
    formularioCupon.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const mensajeCupon = document.getElementById("mensaje-cupon");
      mensajeCupon.textContent = "El cupón ingresado no es válido o ya expiró.";
    });
  }
}

// --------------------------------------------
// Inicialización general (se ejecuta en TODAS las páginas)
// --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  inicializarBotonesAnadir();
  renderizarPaginaCarrito();
  inicializarPaginaCarrito();
});
