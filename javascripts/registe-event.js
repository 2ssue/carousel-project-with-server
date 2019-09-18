import Carousel from './carousel.js';
import Card from './card.js';

const registeMiniCarouselEvent = () => {
    const miniCarouselContainer = document.getElementById('carousel__mini');
    const carousel = new Carousel(miniCarouselContainer);

    let intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);

    const registeIntervalEvent = () => {
        clearInterval(intervalSliding);
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

const registeMainCardEvent = () => {
    const cardContainer = document.getElementById('main-card');

    const cards = new Card(cardContainer);

    cardContainer.addEventListener('click', cards.makeCardBigger.bind(cards));
    cardContainer.addEventListener('click', cards.selectCarouselButton.bind(cards));
}


window.addEventListener('load',() => {
    registeMiniCarouselEvent();
    registeMainCardEvent();
})