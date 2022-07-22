const formulario = document.querySelector('#formulario');
const contenedorClima = document.querySelector('.contenedor-api');
const containerSearcher = document.querySelector('.searcher-container');
const API_ID = "1351b708323574714398595234fcc328";


formulario.addEventListener('submit', obtenerClima);

function obtenerClima(e) {
  e.preventDefault();

  const city = document.querySelector('#city').value;

  if (city === '') {
    mostrarMensaje('Debe completar el campo para buscar una ciudad','error');
    return;
  }
  obtenerDatos(city);
}
function mostrarMensaje(mensaje, tipo) {
  const divMensaje = document.createElement("div");
  divMensaje.innerHTML = mensaje;
  if (tipo === 'error') {
    divMensaje.classList.add("error");
  }
  formulario.insertBefore(divMensaje, document.querySelector('#city'))
  setTimeout(() => {
    divMensaje.remove()
  }, 3000);
}

async function obtenerDatos(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_ID}`;
  spinner()
  let response = await fetch(url);
  let jsonCity = await response.json();
  if (response.ok) {
    mostrarDatos(jsonCity)
  } else {
    mostrarMensaje('La ciudad no es valida', 'error')
  }
}

function mostrarDatos(datos) {
  const { name, main: { temp, temp_max, temp_min } } = datos;

  const tempCentigrados = convertirKelvinACentigrados(temp);
  const tempMaxCentigrados = convertirKelvinACentigrados(temp_max);
  const tempMinCentigrados = convertirKelvinACentigrados(temp_min);

  limpiarTemperatura()

  const divTemp = document.createElement('div');
  divTemp.innerHTML = `
  <h2 class="heading-city">${name}</h2>
  <div class="container-temperaturas">
  <p>ACTUAL: ${tempCentigrados}&#176;</p>
  <p>MAX: ${tempMaxCentigrados}&#176;</p>
  <p>MIN: ${tempMinCentigrados}&#176;</p>
  </div>

  `;

  contenedorClima.appendChild(divTemp);
}

function spinner() {
  limpiarTemperatura()
  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-chase');
  divSpinner.innerHTML = `
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  `;
  contenedorClima.appendChild(divSpinner)
  setTimeout(() => {
    divSpinner.remove();
  }, 3000);
}

function limpiarTemperatura() {
  while (contenedorClima.firstChild) {
    contenedorClima.removeChild(contenedorClima.firstChild);
  }
}

const convertirKelvinACentigrados = grados => parseInt(grados - 273.15);