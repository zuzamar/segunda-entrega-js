
// Objeto para almacenar datos del solicitante
const datosSolicitante = {
  nombre: "",
  apellido: "",
  email: ""
};

// Objeto para almacenar datos del préstamo
const datosPrestamo = {
  monto: 0,
  interes: 0,
  cuotas: 0
};

// Array para almacenar detalles de préstamos
let historialPrestamos = [];

// Obtener referencias a elementos del formulario y botón
const formulario = document.getElementById('prestamoForm');
const nombreInput = document.getElementById('Nombre');
const apellidoInput = document.getElementById('Apellido');
const emailInput = document.getElementById('email');
const montoInput = document.getElementById('monto');
const interesInput = document.getElementById('interes');
const cuotasInput = document.getElementById('cuotas');
const calcularSolicitarBtn = document.getElementById('calcularSolicitar');

// Función principal para manejar los préstamos
function manejarSolicitudPrestamo() {
  solicitarDatosSolicitante();
  solicitarDatosPrestamo();
  const resultadoPrestamo = calcularPrestamo();
  mostrarDetalles(datosSolicitante, datosPrestamo.monto, datosPrestamo.interes, datosPrestamo.cuotas, resultadoPrestamo);

  historialPrestamos.push({
    solicitante: { ...datosSolicitante },
    prestamo: { ...datosPrestamo },
    resultado: { ...resultadoPrestamo }
  });

 // Almacenar en localStorage todo el historial de préstamos
localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));

// Recuperar el historial de préstamos almacenado en localStorage
const historialAlmacenado = JSON.parse(localStorage.getItem('historialPrestamos'));

// Verificar si hay datos almacenados y mostrar el historial si es así
if (historialAlmacenado && historialAlmacenado.length > 0) {
  historialPrestamos = historialAlmacenado;
  mostrarHistorialPrestamos();
} else {
  console.log("No hay préstamos almacenados en el historial.");
}

  // Limpiar el formulario
  formulario.reset();
}

// Manejar la presentación de préstamos cuando se hace clic en el botón
calcularSolicitarBtn.addEventListener('click', function () {
  manejarSolicitudPrestamo();

  const continuar = confirm("¿Deseas solicitar otro préstamo?");
  if (!continuar) {
    swal.fire({
      title: "¡Muchas Gracias!",
      text:" Gracias por usar el simulador",
      icon: "success",
      confirmButtonText:"OK"
    });
  }
});

// Función para solicitar datos del solicitante desde el formulario
function solicitarDatosSolicitante() {
  datosSolicitante.nombre = nombreInput.value;
  datosSolicitante.apellido = apellidoInput.value;
  datosSolicitante.email = emailInput.value;
}

// Función para solicitar datos del préstamo desde el formulario
function solicitarDatosPrestamo() {
  datosPrestamo.monto = parseFloat(montoInput.value);
  datosPrestamo.interes = parseFloat(interesInput.value);
  datosPrestamo.cuotas = parseInt(cuotasInput.value);
}

// Función para calcular el préstamo
function calcularPrestamo() {
  const totalInteres = (datosPrestamo.monto * datosPrestamo.interes) / 100;
  const totalPrestamo = datosPrestamo.monto + totalInteres;
  const pagoMensual = totalPrestamo / datosPrestamo.cuotas;

  return {
    totalPrestamo: totalPrestamo.toFixed(2),
    totalInteres: totalInteres.toFixed(2),
    pagoMensual: pagoMensual.toFixed(2)
  };
}

// Función para mostrar detalles
function mostrarDetalles(solicitante, montoPrestamo, porcentajeInteres, cuotas, resultadoPrestamo) {
  console.log("Detalles del solicitante:");
  console.log(solicitante);
  console.log("\nDetalles del préstamo:");
  console.log("Monto del préstamo: $" + montoPrestamo);
  console.log("Porcentaje de interés: " + porcentajeInteres + "%");
  console.log("Cantidad de cuotas: " + cuotas);
  console.log("--------------------------");
  console.log("Total a pagar: $" + resultadoPrestamo.totalPrestamo);
  console.log("Intereses totales: $" + resultadoPrestamo.totalInteres);
  console.log("Pago mensual: $" + resultadoPrestamo.pagoMensual);
}

// Función para mostrar el historial de préstamos

function mostrarHistorialPrestamos() {
  historialPrestamos.forEach((prestamo, index) => {
    console.log(`\nPréstamo ${index + 1}:`);
    console.log(`Nombre: ${prestamo.solicitante.nombre}`);
    console.log(`Apellido: ${prestamo.solicitante.apellido}`);
    console.log(`Monto del préstamo: $${prestamo.prestamo.monto}`);
    console.log(`Cuotas a pagar: ${prestamo.prestamo.cuotas}`);
    console.log("--------------------------");
  });
}

 // Redirigir al usuario a la página del BROU con el tipo de cambio
document.getElementById('verTipoDeCambioBtn').addEventListener('click', () =>{

  window.open('https://www.brou.com.uy/cotizaciones', '_blank');
  
  console.log("El usuario solicitó el tipo de cambio.");
});




