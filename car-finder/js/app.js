// Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

// contenedor para resultados
const resultado = document.querySelector('#resultado')
const max = new Date().getFullYear()
const min = max - 10

// generar objeto con los datos de la busqueda
const datosBusqueda = {
  marca: '',
  year: 0,
  maximo: 0,
  minimo: 0,
  puertas: 0,
  color: '',
  transmision: '',
}

// eventos
document.addEventListener('DOMContentLoaded', () => {
  // muestra automoviles al cargar
  mostrarAutos(autos)

  // Llena opciones de anyos
  llenarSelect()
})

// Even listeners para los select de busqueda
marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value

  filtrarAuto()
})

year.addEventListener('change', (e) => {
  datosBusqueda.year = parseInt(e.target.value)

  filtrarAuto()
})

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = e.target.value

  filtrarAuto()
})

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value
  filtrarAuto()
})

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value)
  filtrarAuto()
})

transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value
  filtrarAuto()
})

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value
  filtrarAuto()
})

function mostrarAutos(obj) {
  limpiarHTML()

  resultado.innerHTML = ''
  obj.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto
    const autoHTML = document.createElement('p')
    autoHTML.textContent = `
      ${marca} 
      ${modelo} - ${year} - ${puertas} puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color} 
    `

    // insertar en HTML
    resultado.appendChild(autoHTML)
  })
}

// limpiear HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

// Genera los anyos del select
function llenarSelect() {
  // de alante hacia atras para que el primer anyo que se muestre sea el mayor!
  for (let i = max; i > min; i--) {
    const opcion = document.createElement('option')
    opcion.value = `${i}`
    opcion.innerText = `${i}`
    year.appendChild(opcion)
  }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
  // chaining
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)
  
  if(resultado.length) {
    mostrarAutos(resultado)
  } else {
    noResultado();
  }

}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div')
  noResultado.classList.add('alerta', 'error')
  noResultado.textContent = 'No hay resultados, intenta con otros terminos de busqueda'
  resultado.appendChild(noResultado)
}


function filtrarMarca(auto) {
  const { marca } = datosBusqueda
  if (marca) {
    return auto.marca === marca
  }
  return auto
}

function filtrarYear(auto) {
  const { year } = datosBusqueda
  if (year) {
    return auto.year === year
  }
  return auto
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda
  if (minimo) {
    return auto.precio >= minimo
  }
  return auto
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda
  if (maximo) {
    return auto.precio <= maximo
  }
  return auto
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda
  if (puertas) {
    return auto.puertas === puertas
  }
  return auto
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda
  if (transmision) {
    return auto.transmision === transmision
  }
  return auto
}

function filtrarColor(auto) {
  const {color} = datosBusqueda
  if (color) {
    return auto.color === color
  }
  return auto
}


