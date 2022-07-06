let apiQuotes = []

// Document Elements
const quoteContainer = document.querySelector('.quote-container')
const quoteText = document.querySelector('.quote-text')
const quoteTextIn = document.querySelector('#quote')
const authorTextIn = document.querySelector('#author')
const loader = document.querySelector('.loader')

// show new quote
function newQuote() {
  const n = Math.floor(Math.random() * apiQuotes.length)
  const author =  apiQuotes[n].author
  const quote =  apiQuotes[n].text
  authorTextIn.innerText = author || "unknown" // show unknown when null or ''

  // check lenght of quote
  if (quote.length > 100) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  complete()
  quoteTextIn.innerText = quote
}


function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextIn.textContent} - ${authorTextIn.textContent}`
  window.open(twitterUrl, '_blank'); // open twitter on new window
}

// loading function -- show loading
function loading() {
  loader.hidden = false;
  quoteContainer.style.display = 'none'
}

// complete function
function complete() {
  loader.hidden = true;
  quoteContainer.style.display = 'flex'
}


// Get Quoates from API
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl) // only set response when we have data
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    setTimeout(() => {
      alert('an error ocurred retrying soon') 
      getQuotes()
    }, 3000)
  }
}

// On load
getQuotes()

// Button with even delegation
quoteContainer.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
  if (e.target.classList.contains('fa-arrow-rotate-right') || e.target.classList.contains('refresh-button')) {
    newQuote()
  }
  if (e.target.classList.contains('fa-twitter')) {
    console.log('ready to open twitter')
    tweetQuote()  
  }
})
