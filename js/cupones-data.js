const CUPONES = [
    {codigo: "PROFEHERNANUN7PORFA", tipo: "porcentaje", valor: 50, descripcion: "50% de descuento" }
]

//Función para buscarcupon sin importar mayusculas o minusculas
function buscarCupon(codigoIngresado) {
    const normalizado = codigoIngresado.trim().toUpperCase();
    return CUPONES.find((cupon) => cupon.codigo === normalizado)
}

//Calculo descuento, sin permitir que el descuento supere el subtotal
function calcularDescuento(cupon, subtotal) {
    if(!cupon) return 0;

    const descuento = cupon.tipo === "porcentaje"
    ? Math.round(subtotal * (cupon.valor/100))
    : cupon.valor;

    return Math.min(descuento, subtotal);
}