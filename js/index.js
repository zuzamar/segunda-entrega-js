  // Objeto para almacenar datos del solicitante
  
const datosSolicitante = {
  nombre: "nombre",
  apellido: "apellido",
  email: "email"
};

// Objeto para almacenar datos del préstamo

const datosPrestamo = {
  monto: "monto",
  interes: "interes",
  cuotas: "cuotas"
};

// Array para almacenar detalles de préstamos

const historialPrestamos = [];

// Función para solicitar datos del solicitante

function solicitarDatosSolicitante() {
  datosSolicitante.nombre = prompt("Ingresa tu nombre:");
  datosSolicitante.apellido = prompt("Ingresa tu apellido:");
  datosSolicitante.email = prompt("Ingresa tu dirección de correo electrónico:");
}

// Función para solicitar datos del préstamo

function solicitarDatosPrestamo() {
  datosPrestamo.monto = parseFloat(prompt("Ingresa el monto del préstamo:"));
  datosPrestamo.interes = parseFloat(prompt("Ingresa el porcentaje de interés:"));
  datosPrestamo.cuotas = parseInt(prompt("Ingresa la cantidad de cuotas deseadas:"));
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

  alert("Detalles del solicitante:\n\n" +
    "Nombre: " + solicitante.nombre + "\n" +
    "Apellido: " + solicitante.apellido + "\n" +
    "Email: " + solicitante.email + "\n\n" +
    "Detalles del préstamo:\n\n" +
    "Total a pagar: $" + resultadoPrestamo.totalPrestamo + "\n" +
    "Intereses totales: $" + resultadoPrestamo.totalInteres + "\n" +
    "Pago mensual: $" + resultadoPrestamo.pagoMensual);
}

let solicitarPrestamo = true;

while (solicitarPrestamo) {
  solicitarDatosSolicitante();
  solicitarDatosPrestamo();
  const resultadoPrestamo = calcularPrestamo();
  mostrarDetalles(datosSolicitante, datosPrestamo.monto, datosPrestamo.interes, datosPrestamo.cuotas, resultadoPrestamo);

  historialPrestamos.push({
    solicitante: { ...datosSolicitante },
    prestamo: { ...datosPrestamo },
    resultado: { ...resultadoPrestamo }
  });

  const continuar = prompt("¿Deseas solicitar otro préstamo? (Si/No)").toLowerCase();
  if (continuar !== 'si') {
    solicitarPrestamo = false;
    alert("¡Gracias! Hasta luego.");
  }
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

// Mostrar historial de préstamos

mostrarHistorialPrestamos();

// Método para obtener el monto total prestado

function obtenerMontoTotalPrestado() {
    const montoTotal = historialPrestamos.reduce((total, prestamo) => {
      return total + prestamo.prestamo.monto;
    }, 0);
  
    console.log(`El monto total prestado en todos los préstamos es: $${montoTotal.toFixed(2)}`);
  }

  // Mostrar el monto total prestado

  obtenerMontoTotalPrestado();



