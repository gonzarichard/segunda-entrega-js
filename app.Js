const form = document.getElementById("formularioNotas");
const notasContainer = document.getElementById("notasContainer");
const resultado = document.getElementById("resultado");

let notas = [];

document.getElementById("cantidad").addEventListener("change", function () {
  const cantidad = parseInt(this.value);
  notasContainer.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = `Nota de materia ${i + 1}`;
    input.min = 0;
    input.max = 10;
    input.required = true;
    input.classList.add("notaInput");
    notasContainer.appendChild(input);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  notas = [];

  const nombre = document.getElementById("nombre").value;
  const notaInputs = document.querySelectorAll(".notaInput");

  notaInputs.forEach((input) => {
    const valor = parseFloat(input.value);
    if (!isNaN(valor) && valor >= 0 && valor <= 10) {
      notas.push(valor);
    }
  });

  if (notas.length === notaInputs.length) {
    const suma = notas.reduce((acc, val) => acc + val, 0);
    const promedio = (suma / notas.length).toFixed(2);

    mostrarResultado(nombre, notas, promedio);
    guardarEnStorage(nombre, notas, promedio);
  } else {
    resultado.innerHTML = "Ingresá todas las notas correctamente.";
    resultado.classList.remove("hidden");
  }
});

function mostrarResultado(nombre, notas, promedio) {
  resultado.innerHTML = `
    Alumno: <strong>${nombre}</strong><br>
    Notas ingresadas: ${notas.join(", ")}<br>
    Promedio final: <strong>${promedio}</strong>
  `;
  resultado.classList.remove("hidden");
}

function guardarEnStorage(nombre, notas, promedio) {
  const datos = {
    nombre,
    notas,
    promedio,
    fecha: new Date().toLocaleString(),
  };
  localStorage.setItem("ultimoPromedio", JSON.stringify(datos));
}
