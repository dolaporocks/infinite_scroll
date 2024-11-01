const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unspash API
const count = 30;
const apiKey = 'pUEe5cGhjvfM65r-d608LpUlppLSeePKpVAOWr0keO8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function for setting attributes on DOM elemnts.
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run for each method
    photosArray.forEach((photo) =>{
        // Create an anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create image tag for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading'
        img.addEventListener('load', imageLoaded);
        // Put img tag inside anchor element. and out both inside imagecontainer element.
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get photos from Unsplash Api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos.
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
