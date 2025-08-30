const form = document.getElementById("formularioNotas");
const notasContainer = document.getElementById("notasContainer");
const resultado = document.getElementById("resultado");
const precargarBtn = document.getElementById("precargar");

let notas = [];

async function cargarAlumnos() {
  try {
    const response = await fetch("./data/alumnos.json");
    const alumnos = await response.json();
    precargarDatos(alumnos);
  } catch (error) {
    Swal.fire({ icon: "error", title: "Error al cargar alumnos" });
  }
}

function precargarDatos(alumnos) {
  precargarBtn.addEventListener("click", () => {
    const alumno = alumnos[Math.floor(Math.random() * alumnos.length)];
    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("cantidad").value = alumno.notas.length;

    notasContainer.innerHTML = "";
    alumno.notas.forEach((nota, i) => {
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = `Nota de materia ${i + 1}`;
      input.min = 0;
      input.max = 10;
      input.required = true;
      input.classList.add("notaInput");
      input.value = nota;
      notasContainer.appendChild(input);
    });
  });
}

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
    Swal.fire({
      icon: "warning",
      title: "Ingresá todas las notas correctamente.",
    });
  }
});

function mostrarResultado(nombre, notas, promedio) {
  resultado.innerHTML = `
    Alumno: <strong>${nombre}</strong><br>
    Notas ingresadas: ${notas.join(", ")}<br>
    Promedio final: <strong>${promedio}</strong>
  `;
  resultado.classList.remove("hidden");

  Toastify({
    text: `Promedio calculado: ${promedio}`,
    duration: 2500,
    gravity: "top",
    position: "right",
    backgroundColor: "#4caf50",
  }).showToast();
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

cargarAlumnos();
