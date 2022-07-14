// Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];



// Event Listeners
eventListeners()
function eventListeners() {

  // cuando el usuario agrega un tweet
  formulario.addEventListener('submit', agregarTweet)

  // cuando el documento esta cargado 
  document.addEventListener('DOMContentLoaded', () => {
  
    // default to empty array
    tweets = JSON.parse(localStorage.getItem('tweets')) || []
    
    crearHTML()
  })
}



// Funciones
function agregarTweet(e) {
  e.preventDefault();
  
  // textarea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;
  

  // validacion
  if (tweet === '') {
    mostrarError('El tweet no puede ir vacio')
    return; 
  }

  const tweetObj = {
    id: Date.now(),
    tweet // tweet: tweet
  }

  // agregar tweet al arreglo de tweets
  tweets = [tweetObj, ...tweets]
  console.log(tweets)

  // crear HTML
  crearHTML()

  // reiniciar formulario
  formulario.reset()
 
}


function mostrarError(error) {
  const mensajeError = document.createElement('p')
  mensajeError.textContent = error;
  mensajeError.classList.add('error')

  // insertar en el contenido 
  const contenido = document.querySelector('#contenido')
  contenido.appendChild(mensajeError)

  // quitar mensaje de error despues de un tiempo
  setTimeout(() => {
    mensajeError.remove()
  }, 3000)
}

function crearHTML() {

  limpiarHTML()
  
  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      
      // agregar boton eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'X';
      
      // agregar funcion eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }

      // crear el HTML
      const li = document.createElement('li')
      
      // agregar texto
      li.innerText = tweet.tweet;

      // asignar botton
      li.appendChild(btnEliminar)

      // insertarlo en HTML
      listaTweets.appendChild(li)
    })   
  }

  sincronizarStorage()
}


// agrega tweets a local storage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets))
}


// elimina tweet
function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id)

  crearHTML()
}


function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.firstChild.remove()
  }
}


