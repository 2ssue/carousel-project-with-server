import Card from './components/card.js';
import Carousel from './components/carousel.js';

async function renderMainCard(){
    const mainCardContainer = document.getElementById('main-card');
    
    await fetch('../test.json')
    .then(response => response.json())
    .then((data) => {
        const cardData = data.Card;

        if(cardData){
            for(let card in cardData){
                const newCard = new Card(cardData, card);
                mainCardContainer.insertAdjacentHTML('beforeend', newCard.render());
            }
        }
    })
    .catch(err => console.log(err));
}

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

renderMainCard();
renderMiniCarousel();