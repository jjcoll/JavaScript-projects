const imageContainer = document.querySelector('.image-container')
imageContainer.hidden = true;
const loader = document.querySelector('.loader')

let photosArray = []

const count = 10
const apiKey = 'YOUR_PRIVATE_API_KEY'
// Unsplash API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Create elements for links & photos, add to dom
let imageN = 0;
let ready = false;
let imagesLoaded = 0;

// check if all images are loaded
function imageLoaded() {
  imagesLoaded ++;
  if (imagesLoaded === count) {
    ready = true;
    imageContainer.hidden = false
    // loader.hidden = false;
    console.log('ready = ', ready)
    observer.observe(loader);
    addInfoButtons()
  } else {
    // loader.hidden = true;
    ready = false;
  }
}


function displayPhotos() {
  imagesLoaded = 0;
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    const html = `
    <div class='pic--box'>
      <a href="${photo.links.html}" target="_blank">
        <img class="iimg img--${imageN}" src=${photo.urls.regular}>
      </a>
      <div class="caption cap--${imageN}">
        <p class="description">${photo.description || 'No description provided'}</p>
        <div class="pic-info">
          <ion-icon name="person-outline"></ion-icon>
          <p>${photo.name || 'Unknown Author'}</p>
        </div>
        <div class="pic-info">
          <ion-icon name="location-outline"></ion-icon>
          <p>${photo.location.title || 'Unknown Location'}</p>
        </div>
        <div class="pic-info">
          <ion-icon name="heart-outline"></ion-icon>
          <p>${photo.likes}</p>
        </div>
        <div class="pic-info">
          <ion-icon name="download-outline"></ion-icon>
          <p>${photo.downloads}</p>
        </div>
      </div>
      <div class="info-btn" data-id="${imageN}">
        <ion-icon class="info-icon" name="information-outline"></ion-icon>
      </div>
    </div>
`   
    imageContainer.insertAdjacentHTML('beforeend', html)
    // check when each is finished loading
    document.querySelector(`.img--${imageN}`).addEventListener('load', () => {
      imageLoaded()
    })
    imageN ++;
  })
}

// Make all info buttons display info on click

function addInfoButtons() {
  const infoButtons = document.querySelectorAll('.info-btn')
  console.log(infoButtons)
  document.querySelectorAll('.info-btn').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(btn.dataset.id) 
    let caption = document.querySelector(`.cap--${btn.dataset.id}`)
    console.log(caption)
    caption.classList.toggle('opp--1')
  }))
}

// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    // Catch error here
    console.log(error)
  }
}

// Infinite scrolling
  let options = {
    root: null,
    rootMargin: "1000px",
    threshold: 0.25
  };

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && ready) {
        console.log('getting images')
        getPhotos()
        observer.unobserve(loader)
      }
    });
  }

  let observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(loader);


// On load
getPhotos()
