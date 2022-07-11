// Elements
const btnNew = document.querySelector('.btn__new')
const img = document.querySelector('.jukebox')
const jokeBox = document.querySelector('.joke')
const audio = document.querySelector('#audio')
const btnRepeat = document.querySelector('.btn__repeat')
const btnTweet = document.querySelector('.btn__tweet')

let joke
async function getJoke() {
  console.log('getting a joke')
  const url = `https://v2.jokeapi.dev/joke/Any`
  try {
    const response = await fetch(url)
    let json = await response.json()
    console.log(json)
    if (json.type === 'twopart') {
      joke = `${json.setup}\n${json.delivery}`
    } else {
      joke = json.joke
    }
  } catch (err) {
    console.log(err)
  }
}

// const getJoke = () => {
//   return 'Hello my name is Gori and I am the prowd owner of a Nike Airforce one, pero si tocas mi familia comprare una pipa perdona mama no morire en la cama!'
// }

// text to speech API
const apiKeyVoice = '9e65efc69d50433fbb0d81402e85a309'

// get voice
async function getAudio() {
  console.log('getting audio')
  apiUrl = `http://api.voicerss.org/?key=${apiKeyVoice}&hl=en-us&src=${joke}`
  try {
    const response = await fetch(apiUrl)
    audio.src = response.url
  } catch (error) {
    console.log(error)
  }
}

// get a new joke
const newJoke = async () => {
  await getJoke()
  await getAudio()
  console.log('new joke')
  audio.addEventListener('ended', () => {
    img.src = 'main.gif'
    jokeBox.classList.add('hidden')
  })

  // audio.addEventListener('loadeddata', () => {
  //   audioLoaded = true
  //   console.log('audio loaded')
  // })
  //
  // img.src = 'box.gif'
  // img.addEventListener('load', () => {
  //   imgLoaded = true
  //   console.log('image loaded')
  // })
  img.src = 'final-1.gif'
  jokeBox.innerText = `${joke}`
  jokeBox.classList.remove('hidden')
  audio.play()
}

// Event listeners
btnNew.addEventListener('click', (e) => {
  e.preventDefault()
  // img.src = img.src.includes('box.gif') ? 'still.png' : 'box.gif'
  newJoke()
  btnTweet.classList.remove('hidden')
  btnRepeat.classList.remove('hidden')
})

// replay previous joke
btnRepeat.addEventListener('click', (e) => {
  e.preventDefault()
  img.src = 'final-1.gif'
  jokeBox.innerText = `${joke}`
  jokeBox.classList.remove('hidden')
  audio.play()
})

// tweet joke
btnTweet.addEventListener('click', () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${joke}`
  window.open(twitterUrl, '_blank'); // open twitter on new window
})



