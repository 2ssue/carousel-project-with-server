import Card from './components/card.js';
import Carousel from './components/carousel.js';
import {Carousel as CarouselUI }from './ui/carousel.js';
import {Card as CardUI} from './ui/card.js';
import Util from './util/utils.js';

const CAROUSELITEM_CLASS = 'carousel__item';
const CARDITEM_CLASS = 'card__item';
const _ = new Util();

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

    Card.prototype.changeCustomElementDesign = () => {
        carouselList.forEach((element, index) => {
            const currentColor = mainContainer.querySelector(`.${CARDITEM_CLASS}:nth-child(${index + 1})`).style.backgroundColor;
            element.forEach(childElement => {
                const currentCarousel = mainContainer.querySelector(`.${CAROUSELITEM_CLASS}:nth-child(${childElement})`);
                currentCarousel.querySelector(`.carousel-headline`).style.backgroundColor = currentColor;
            })
        })
    }

    cardContainer.addEventListener('click', cards.cardClickEventHandler.bind(cards));
    cardContainer.addEventListener('click', cards.selectCarouselButton.bind(cards));
    cards.makeCardBigger();
    cards.changeCustomElementDesign();
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

async function renderMainCard(){
    const mainCardContainer = document.getElementById('main-card');
    let carouselList = [];
    
    await fetch('/data/get/card')
    .then(response => response.json())
    .then((data) => {
        if(data[0]){
            let previousCardCarouselIndex = 1;

            for(let i  = 0; i < data.length; i++){
                const newCard = new CardUI(data[i], previousCardCarouselIndex);
                previousCardCarouselIndex = newCard.getlastCarouselIndex()+ 1;
                carouselList.push(newCard.getCarouselList());
                mainCardContainer.insertAdjacentHTML('beforeend', newCard.render());
            }
            registeMainCardEvent(carouselList);
        }
    })
    .catch(err => console.log(err));
}

async function renderMainCarousel(){
    const mainCarouselContainer = document.getElementById('main-carousel');
    
    CarouselUI.prototype.makeCustomElement = (data) => {
        let customElementString = [];
        data.forEach((element) => {
            customElementString.push(`<p class='carousel-headline'>${element['head']}</p>`);
        })

        return customElementString;
    }

    await fetch('/data/get/main-carousel')
    .then(response => response.json())
    .then((data) => {
        if(data[0]){
            const newCarousel = new CarouselUI(data, 'long');
            mainCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
            
            const customElement = newCarousel.makeCustomElement(data);
            
            const carouselItems = mainCarouselContainer.querySelectorAll(`.${CAROUSELITEM_CLASS}`);
            carouselItems.forEach((element) => {
                element.querySelector('.description').insertAdjacentHTML('afterbegin', customElement.shift());
            })
            registeMainCarouselEvent();   
        }
    })
}

async function renderMiniCarousel(){
    const miniCarouselContainer = document.getElementById('mini-carousel');

    await fetch('/data/get/mini-carousel')
    .then(response => response.json())
    .then(data => {
        if(data[0]){
            const newCarousel = new CarouselUI(data, 'mini');
            miniCarouselContainer.insertAdjacentHTML('afterbegin', newCarousel.render());
            _.get('/data/get/mini/description').then(res => res.json())
            .then(data => {
                if(data[0])
                    miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.makeDescriptionLine(data[0]));
            })
        }
        registeMiniCarouselEvent();
    })
    .catch(err => console.log(err));
}

renderMainCarousel().then(() => {
    renderMainCard().then(() => {
        renderMiniCarousel();
    });
});