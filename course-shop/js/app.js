// Variables
const cart = document.querySelector('#carrito'),
  cartBody = document.querySelector('#lista-carrito tbody'),
  emptryCartBtn = document.querySelector('#vaciar-carrito'),
  courseList = document.querySelector('#lista-cursos')
let articulosCarrito;


function cargarCarrito() {   
  console.log('Cargando Carrito')
  if (localStorage.getItem('carrito')) {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
    carritoHTML()
  } else {
    articulosCarrito = [];
  }
}

cargarEventListeners()
function cargarEventListeners() {
  // Cuando agregas un curso presionando agregar curso
  courseList.addEventListener('click', agregarCurso)

  // elimina cursos del carrito
  cart.addEventListener('click', eliminarCurso)

  // vaciar el carrito
  emptryCartBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const respuesta = confirm("Are you sure you want to empty the trolly?")
    if (respuesta) {
      articulosCarrito = []
      limpiarHTML() // mejor simplemente vaciar el HTML
    }
  })

  // crear carrito
  document.addEventListener('DOMContentLoaded', cargarCarrito)
}


// Functiones
function agregarCurso(e) {
  e.preventDefault()
  console.log('Presionando en cursos')
  if (e.target.classList.contains('agregar-carrito')) {
    // cursoSelecionado es el div de la carta del curso
    const cursoSelecionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSelecionado)
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.dataset.id

    // elimina del arreglo segun el data id
    articulosCarrito = articulosCarrito.filter((curso) => cursoId !== curso.id)

    carritoHTML()

    console.log(articulosCarrito)

    // guardar cambios al carrito localStorage
    guardarLocalStorage(articulosCarrito)
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('span').textContent,
    id: curso.querySelector('a').dataset.id,
    cantidad: 1,
  }

  // revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)
  if (existe) {
    // actualizar cantidad
    articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
      }
    })
  } else {
    // agregar curso al carrito
    console.log(infoCurso)

    // agrega elementos a arreglo carrito, de esta manera el ultimo curso agregado se queda arriba del carrito
    articulosCarrito = [infoCurso, ...articulosCarrito]
    console.log(articulosCarrito)
  }
  carritoHTML()

  // llamar funcion para guardar carrito al local Storage
  guardarLocalStorage(articulosCarrito)
}

// Muestra carrito compras en HTML
function carritoHTML() {
  // limpiar HTML
  limpiarHTML()

  // recorre ele carrito y genera HTML
  articulosCarrito.forEach((curso) => {
    // destructuring es mas eficaz
    const { imagen, titulo, precio, cantidad, id } = curso
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}" >X </a> 
      </td>
    `

    // agrega html carrito a tbody
    cartBody.appendChild(row)
  })
}

function limpiarHTML() {
  // esta forma de limpiar HTML es mucho mas rapida que usar innerHTML = ''
  while (cartBody.firstChild) {
    cartBody.removeChild(cartBody.firstChild)
  }
}


// guardar al local storage
function guardarLocalStorage(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito)) 
}

// cargar local storage
function cargarLocalStorage() {

}



