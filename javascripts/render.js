import Card from './card.js';
import Carousel from './carousel.js';
import {Carousel as CarouselComponent }from './components/carousel.js';
import {Card as CardComponent} from './components/card.js';

const CAROUSELITEM_CLASS = 'carousel__item';

const registeMiniCarouselEvent = () => {
    const miniCarouselContainer = document.getElementById('carousel__mini');
    const carousel = new Carousel(miniCarouselContainer);

    let intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);

    const registeIntervalEvent = () => {
        clearInterval(intervalSliding);
        intervalSliding = setInterval(carousel.slideCardForward.bind(carousel), 3000);
    }

    const rightButton = document.getElementById('button-next__mini');
    rightButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardForward.bind(carousel)();
    });

    const leftButton = document.getElementById('button-prev__mini');
    leftButton.addEventListener('click', () => {
        registeIntervalEvent();
        carousel.slideCardReverse.bind(carousel)();
    })

    carousel.slideCardForward.bind(carousel)();
}

const registeMainCardEvent = (carouselList) => {
    const mainContainer = document.getElementById('main');
    const cardContainer = document.getElementById('main-card');
    
    const rightButton = document.getElementById('button-next__long');
    const leftButton = document.getElementById('button-prev__long');

    const cards = new Card(mainContainer, carouselList);

    rightButton.addEventListener('click', (event) => {
        if(event.isTrusted)
            cards.changeCarouselButton.bind(cards)(event);
        else return;
    });

    leftButton.addEventListener('click',  (event) => {
        if(event.isTrusted)
            cards.changeCarouselButton.bind(cards)(event);
        else return;
    });

    cardContainer.addEventListener('click', cards.cardClickEventHandler.bind(cards));
    cardContainer.addEventListener('click', cards.selectCarouselButton.bind(cards));
    cards.makeCardBigger();
}

const registeMainCarouselEvent = () => {
    const mainCarouselContainer = document.getElementById('main-carousel');

    const carousel = new Carousel(mainCarouselContainer);

    const rightButton = document.getElementById('button-next__long');
    rightButton.addEventListener('click', () => {
        carousel.slideCardForward.bind(carousel)();
    });

    const leftButton = document.getElementById('button-prev__long');
    leftButton.addEventListener('click', () => {
        carousel.slideCardReverse.bind(carousel)();
    })

    carousel.slideCardForward.bind(carousel)();
}

const renderMainCard = () => {
    const mainCardContainer = document.getElementById('main-card');
    let carouselList = [];
    
    fetch('../dummyData/test.json')
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

const renderMainCarousel = () => {
    const mainCarouselContainer = document.getElementById('main-carousel');
    const makeCustomElement = (data) => {
        let customElementString = [];
        data['carousel-data'].forEach((element) => {
            customElementString.push(`<p class='carousel-headline'>${element['description']['head']}</p>`);
        })

        return customElementString;
    }

    fetch('../dummyData/test.json')
    .then(response => response.json())
    .then((data) => {
        const carouselData = data.MainCarousel;

        if(carouselData){
            const newCarousel = new CarouselComponent(carouselData, 'long');
            mainCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
            
            //attach custom carousel element(category)
            const carouselItems = mainCarouselContainer.querySelectorAll(`.${CAROUSELITEM_CLASS}`);
            const customElement = makeCustomElement(carouselData);
            carouselItems.forEach((element) => {
                element.querySelector('.description').insertAdjacentHTML('afterbegin', customElement.shift());
            })
            
        }
        registeMainCarouselEvent();
    })
}

const renderMiniCarousel = () => {
    const miniCarouselContainer = document.getElementById('mini-carousel');

    fetch('../dummyData/test.json')
    .then(response => response.json())
    .then(data => {
        const carouselData = data.MiniCarousel;

        if(carouselData){
            const newCarousel = new CarouselComponent(carouselData, 'mini');
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.makeDescriptionLine(carouselData['description']));
        }

        registeMiniCarouselEvent();
    })
    .catch(err => console.log(err));
}

renderMainCarousel();
renderMainCard();
renderMiniCarousel();