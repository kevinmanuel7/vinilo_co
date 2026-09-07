// ============================================
// Validaciones de formularios — Vinilo & Co.
// Registro de usuario e Inicio de sesión
// ============================================

const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

// --------------------------------------------
// Utilidades para mostrar / limpiar mensajes de error
// --------------------------------------------

function mostrarError(idCampo, idError, mensaje) {
  const campo = document.getElementById(idCampo);
  const error = document.getElementById(idError);
  if (campo) campo.classList.add("campo-invalido");
  if (error) error.textContent = mensaje;
}

function limpiarError(idCampo, idError) {
  const campo = document.getElementById(idCampo);
  const error = document.getElementById(idError);
  if (campo) campo.classList.remove("campo-invalido");
  if (error) error.textContent = "";
}

// --------------------------------------------
// Validador de RUN chileno (sin puntos ni guion)
// Ej: 19011022K
// --------------------------------------------

function validarRun(runCompleto) {
  const run = runCompleto.trim().toUpperCase();

  // Longitud: mínimo 7, máximo 9 (según lo definido en el anexo)
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;
  if (!/^[0-9K]$/.test(dv)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

// --------------------------------------------
// Validador de correo (dominio permitido)
// --------------------------------------------

function validarCorreo(correo) {
  if (!correo || correo.length > 100) return false;

  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!formatoValido) return false;

  const dominio = correo.split("@")[1].toLowerCase();
  return DOMINIOS_PERMITIDOS.includes(dominio);
}

// ============================================
// FORMULARIO DE REGISTRO
// ============================================

function inicializarFormularioRegistro() {
  const formulario = document.getElementById("formulario-registro");
  if (!formulario) return;

  const campoRun = document.getElementById("run");
  const campoNombre = document.getElementById("nombre");
  const campoApellidos = document.getElementById("apellidos");
  const campoCorreo = document.getElementById("correo");
  const campoContrasena = document.getElementById("contrasena");
  const campoConfirmar = document.getElementById("confirmar-contrasena");
  const campoRegion = document.getElementById("region");
  const campoComuna = document.getElementById("comuna");
  const campoDireccion = document.getElementById("direccion");

  // ---- Validación en tiempo real (evento "input" / "change") ----

  campoRun.addEventListener("input", () => {
    if (campoRun.value === "") {
      mostrarError("run", "error-run", "El RUN es obligatorio.");
    } else if (!validarRun(campoRun.value)) {
      mostrarError("run", "error-run", "RUN inválido. Ingresa sin puntos ni guion, ej: 19011022K.");
    } else {
      limpiarError("run", "error-run");
    }
  });

  campoNombre.addEventListener("input", () => {
    if (campoNombre.value.trim() === "") {
      mostrarError("nombre", "error-nombre", "El nombre es obligatorio.");
    } else if (campoNombre.value.length > 50) {
      mostrarError("nombre", "error-nombre", "Máximo 50 caracteres.");
    } else {
      limpiarError("nombre", "error-nombre");
    }
  });

  campoApellidos.addEventListener("input", () => {
    if (campoApellidos.value.trim() === "") {
      mostrarError("apellidos", "error-apellidos", "Los apellidos son obligatorios.");
    } else if (campoApellidos.value.length > 100) {
      mostrarError("apellidos", "error-apellidos", "Máximo 100 caracteres.");
    } else {
      limpiarError("apellidos", "error-apellidos");
    }
  });

  campoCorreo.addEventListener("input", () => {
    if (campoCorreo.value.trim() === "") {
      mostrarError("correo", "error-correo", "El correo es obligatorio.");
    } else if (!validarCorreo(campoCorreo.value.trim())) {
      mostrarError("correo", "error-correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    } else {
      limpiarError("correo", "error-correo");
    }
  });

  campoContrasena.addEventListener("input", () => {
    const largo = campoContrasena.value.length;
    if (largo === 0) {
      mostrarError("contrasena", "error-contrasena", "La contraseña es obligatoria.");
    } else if (largo < 4 || largo > 10) {
      mostrarError("contrasena", "error-contrasena", "Debe tener entre 4 y 10 caracteres.");
    } else {
      limpiarError("contrasena", "error-contrasena");
    }
    // Si ya se había escrito la confirmación, revalidar que sigan coincidiendo
    if (campoConfirmar.value !== "") {
      campoConfirmar.dispatchEvent(new Event("input"));
    }
  });

  campoConfirmar.addEventListener("input", () => {
    if (campoConfirmar.value === "") {
      mostrarError("confirmar-contrasena", "error-confirmar-contrasena", "Confirma tu contraseña.");
    } else if (campoConfirmar.value !== campoContrasena.value) {
      mostrarError("confirmar-contrasena", "error-confirmar-contrasena", "Las contraseñas no coinciden.");
    } else {
      limpiarError("confirmar-contrasena", "error-confirmar-contrasena");
    }
  });

  campoRegion.addEventListener("change", () => {
    if (campoRegion.value === "") {
      mostrarError("region", "error-region", "Selecciona una región.");
    } else {
      limpiarError("region", "error-region");
    }
  });

  campoComuna.addEventListener("change", () => {
    if (campoComuna.value === "") {
      mostrarError("comuna", "error-comuna", "Selecciona una comuna.");
    } else {
      limpiarError("comuna", "error-comuna");
    }
  });

  campoDireccion.addEventListener("input", () => {
    if (campoDireccion.value.trim() === "") {
      mostrarError("direccion", "error-direccion", "La dirección es obligatoria.");
    } else if (campoDireccion.value.length > 300) {
      mostrarError("direccion", "error-direccion", "Máximo 300 caracteres.");
    } else {
      limpiarError("direccion", "error-direccion");
    }
  });

  // ---- Validación final al enviar el formulario ----

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Dispara la validación de cada campo obligatorio por si el usuario
    // nunca les hizo focus (ej. dejó uno vacío y fue directo al botón).
    campoRun.dispatchEvent(new Event("input"));
    campoNombre.dispatchEvent(new Event("input"));
    campoApellidos.dispatchEvent(new Event("input"));
    campoCorreo.dispatchEvent(new Event("input"));
    campoContrasena.dispatchEvent(new Event("input"));
    campoConfirmar.dispatchEvent(new Event("input"));
    campoRegion.dispatchEvent(new Event("change"));
    campoComuna.dispatchEvent(new Event("change"));
    campoDireccion.dispatchEvent(new Event("input"));

    const hayErrores = formulario.querySelectorAll(".mensaje-error:not(:empty)").length > 0;

    const mensajeExito = document.getElementById("mensaje-exito-registro");

    if (hayErrores) {
      mensajeExito.textContent = "";
      // Lleva el foco al primer campo con error, para orientar al usuario
      const primerCampoInvalido = formulario.querySelector(".campo-invalido");
      if (primerCampoInvalido) primerCampoInvalido.focus();
      return;
    }

    // Si todo está correcto (simulación, ya que aún no hay backend)
    mensajeExito.textContent = "¡Registro exitoso! Ya puedes iniciar sesión.";
    formulario.reset();
    document.getElementById("comuna").disabled = true;
  });
}

// ============================================
// FORMULARIO DE LOGIN
// ============================================

function inicializarFormularioLogin() {
  const formulario = document.getElementById("formulario-login");
  if (!formulario) return;

  const campoCorreo = document.getElementById("correo-login");
  const campoContrasena = document.getElementById("contrasena-login");

  campoCorreo.addEventListener("input", () => {
    if (campoCorreo.value.trim() === "") {
      mostrarError("correo-login", "error-correo-login", "El correo es obligatorio.");
    } else if (!validarCorreo(campoCorreo.value.trim())) {
      mostrarError("correo-login", "error-correo-login", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    } else {
      limpiarError("correo-login", "error-correo-login");
    }
  });

  campoContrasena.addEventListener("input", () => {
    const largo = campoContrasena.value.length;
    if (largo === 0) {
      mostrarError("contrasena-login", "error-contrasena-login", "La contraseña es obligatoria.");
    } else if (largo < 4 || largo > 10) {
      mostrarError("contrasena-login", "error-contrasena-login", "Debe tener entre 4 y 10 caracteres.");
    } else {
      limpiarError("contrasena-login", "error-contrasena-login");
    }
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    campoCorreo.dispatchEvent(new Event("input"));
    campoContrasena.dispatchEvent(new Event("input"));

    const hayErrores = formulario.querySelectorAll(".mensaje-error:not(:empty)").length > 0;
    if (hayErrores) {
      const primerCampoInvalido = formulario.querySelector(".campo-invalido");
      if (primerCampoInvalido) primerCampoInvalido.focus();
      return;
    }

    // Simulación de inicio de sesión (sin backend por ahora)
    alert("Inicio de sesión simulado correctamente.");
    formulario.reset();
  });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function inicializarFormularioContacto() {
  const formulario = document.getElementById("formulario-contacto");
  if (!formulario) return;

  const campoNombre = document.getElementById("nombre-contacto");
  const campoCorreo = document.getElementById("correo-contacto");
  const campoComentario = document.getElementById("comentario-contacto");
  const contadorComentario = document.getElementById("contador-comentario");

  campoNombre.addEventListener("input", () => {
    if (campoNombre.value.trim() === "") {
      mostrarError("nombre-contacto", "error-nombre-contacto", "El nombre es obligatorio.");
    } else if (campoNombre.value.length > 100) {
      mostrarError("nombre-contacto", "error-nombre-contacto", "Máximo 100 caracteres.");
    } else {
      limpiarError("nombre-contacto", "error-nombre-contacto");
    }
  });

  campoCorreo.addEventListener("input", () => {
    if (campoCorreo.value.trim() === "") {
      // El correo es opcional según el anexo (solo define un máximo y dominio),
      // por lo que un campo vacío no se marca como error.
      limpiarError("correo-contacto", "error-correo-contacto");
    } else if (!validarCorreo(campoCorreo.value.trim())) {
      mostrarError("correo-contacto", "error-correo-contacto", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    } else {
      limpiarError("correo-contacto", "error-correo-contacto");
    }
  });

  campoComentario.addEventListener("input", () => {
    const largo = campoComentario.value.length;
    contadorComentario.textContent = 500 - largo;

    if (campoComentario.value.trim() === "") {
      mostrarError("comentario-contacto", "error-comentario-contacto", "El comentario es obligatorio.");
    } else if (largo > 500) {
      mostrarError("comentario-contacto", "error-comentario-contacto", "Máximo 500 caracteres.");
    } else {
      limpiarError("comentario-contacto", "error-comentario-contacto");
    }
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    campoNombre.dispatchEvent(new Event("input"));
    campoCorreo.dispatchEvent(new Event("input"));
    campoComentario.dispatchEvent(new Event("input"));

    const hayErrores = formulario.querySelectorAll(".mensaje-error:not(:empty)").length > 0;
    const mensajeExito = document.getElementById("mensaje-exito-contacto");

    if (hayErrores) {
      mensajeExito.textContent = "";
      const primerCampoInvalido = formulario.querySelector(".campo-invalido");
      if (primerCampoInvalido) primerCampoInvalido.focus();
      return;
    }

    mensajeExito.textContent = "¡Mensaje enviado! Te responderemos a la brevedad.";
    formulario.reset();
    contadorComentario.textContent = "500";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarFormularioRegistro();
  inicializarFormularioLogin();
  inicializarFormularioContacto();
});
