import Card from './card.js';
import Carousel from './carousel.js';
import {Carousel as CarouselComponent }from './components/carousel.js';
import {Card as CardComponent} from './components/card.js';

const registeMiniCarouselEvent = () => {
    const miniCarouselContainer = document.getElementById('carousel__mini');
    const carousel = new Carousel(miniCarouselContainer);

    let intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);

    const registeIntervalEvent = () => {
        clearInterval(intervalSliding);a
        intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);
    }

    const rightButton = document.getElementById('button-next');
    rightButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardForward.bind(carousel)();
    });

    const leftButton = document.getElementById('button-prev');
    leftButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardReverse.bind(carousel)();
    })

    carousel.slideCardForward.bind(carousel)();
}

const registeMainCardEvent = (carouselList) => {
    const cardContainer = document.getElementById('main-card');

    const cards = new Card(cardContainer, carouselList);

    cardContainer.addEventListener('click', cards.makeCardBigger.bind(cards));
    cardContainer.addEventListener('click', cards.selectCarouselButton.bind(cards));
}

const renderMainCard = () => {
    const mainCardContainer = document.getElementById('main-card');
    let carouselList = [];
    
    fetch('../test.json')
    .then(response => response.json())
    .then((data) => {
        const cardData = data.Card;

        if(cardData){
            for(let card in cardData){
                const newCard = new CardComponent(cardData, card);
                carouselList.push(newCard.getCarouselList());
                mainCardContainer.insertAdjacentHTML('beforeend', newCard.render());
            }
        }
        registeMainCardEvent(carouselList);
    })
    .catch(err => console.log(err));
}

const renderMiniCarousel = () => {
    const miniCarouselContainer = document.getElementById('mini-carousel');

    fetch('../test.json')
    .then(response => response.json())
    .then(data => {
        const carouselData = data.MiniCarousel;

        if(carouselData){
            const newCarousel = new CarouselComponent(carouselData);
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
        }

        registeMiniCarouselEvent();
    })
    .catch(err => console.log(err));
}

renderMainCard();
renderMiniCarousel();
// registeMainCardEvent();
// registeMiniCarouselEvent();