import Carousel from './carousel.js';

const registeMiniCarouselEvent = () => {
    const miniCarouselContainer = document.getElementById('container');
    const carousel = new Carousel(miniCarouselContainer);

    let intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);

    const registeIntervalEvent = () => {
        clearInterval(intervalSliding);
        intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);
    }

    const rightButton = document.getElementById('button__slide-right');
    rightButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardForward.bind(carousel)();
    });

    const leftButton = document.getElementById('button__slide-left');
    leftButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardReverse.bind(carousel)();
    })

    carousel.slideCardForward.bind(carousel)();
}

registeMiniCarouselEvent();