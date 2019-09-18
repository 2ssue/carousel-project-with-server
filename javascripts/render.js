import Carousel from './components/carousel.js';

async function renderMiniCarousel(){
    const miniCarouselContainer = document.getElementById('mini-carousel');

    await fetch('../test.json')
    .then(response => response.json())
    .then(data => {
        const carouselData = data.MiniCarousel;

        if(carouselData){
            const newCarousel = new Carousel(carouselData);
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
        }
    })
    .catch(err => console.log(err));
}

renderMiniCarousel();