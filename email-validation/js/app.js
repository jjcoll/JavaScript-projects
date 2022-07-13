// Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');



function eventListeners() {
  // cuando la app arranca
  document.addEventListener('DOMContentLoaded', iniciarApp)

  // campos del formulario
  // evento blur se dispara cuando el elemento a perdido su foco
  email.addEventListener('blur', validarFormulario)
  asunto.addEventListener('blur', validarFormulario)
  mensaje.addEventListener('blur', validarFormulario)

  // reinicia el formulario
  btnReset.addEventListener('click', resetearFormulario)

  // Enviar email
  formulario.addEventListener('submit', enviarEmail)
}
eventListeners()


// Functiones
function iniciarApp() {
  // desabilitar el botton de enviar
  btnEnviar.disabled = true
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// Valida formulario
function validarFormulario(e) {
  console.log('validando...')

  
  // validar todos los campos presentes
  console.log(e.target.value)
  if (e.target.value.length > 0) {
    
    // elimina los errores
    const error = document.querySelector('.error')?.remove()

    e.target.classList.remove('border', 'border-red-500')
    e.target.classList.add( 'border', 'border-green-500')

  } else {
    e.target.classList.remove('border', 'border-green-500')
    e.target.classList.add('border', 'border-red-500')

    mostrarError('Todos los campos son obligatorios')
  }

  if (e.target.type === 'email') {
    
    if(er.test(e.target.value)) {
      console.log('Email valido') 
      e.target.classList.remove('border', 'border-red-500')
      e.target.classList.add( 'border', 'border-green-500')

    } else {
      mostrarError('Email no valido')
      e.target.classList.remove('border', 'border-green-500')
      e.target.classList.add('border', 'border-red-500')
    }
  }

  if (er.test(email.value) && email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
    console.log('pasaste la validacion') 
    btnEnviar.disabled = false
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    btnEnviar.classList.add('cursos-pointer')

  }
    
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'background-color-100','text-center', 'text-red-500', 'p-3', 'mt-5', 'error')

  const errores = document.querySelectorAll('.error');
  // solo agregar error si no existe ninguno
  if (errores.length === 0) {
    formulario.appendChild(mensajeError)
  }
}

// envia el email
function enviarEmail(e) {
  e.preventDefault()

  // Mostrar spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex'

  // Despues de 3 segundos ocultar spinner
  setTimeout(() => {
    spinner.style.display = 'none'

    // mensaje se envio correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El correo se envio correctamente!';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'text-white')

    formulario.insertBefore(parrafo, spinner)

    // eleminar mensaje y resetear formulario
    setTimeout(() => {
      parrafo.remove()
      resetearFormulario()
    }, 5000)
  }, 3000)
}


// resetea formulario
function resetearFormulario(e) {
  // prevent the form from being submited
  e.preventDefault()
  formulario.reset();

  iniciarApp()
}




