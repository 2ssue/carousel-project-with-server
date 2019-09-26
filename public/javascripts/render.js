import Card from './components/card.js';
import Carousel from './components/carousel.js';
import {Carousel as CarouselUI }from './ui/carousel.js';
import {Card as CardUI} from './ui/card.js';

const CAROUSELITEM_CLASS = 'carousel__item';
const CARDITEM_CLASS = 'card__item';

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
        if(data){
            let previousCardCarouselIndex = 1;

            for(let i  = 0; i < data.length; i++){
                const newCard = new CardUI(data[i], previousCardCarouselIndex);
                previousCardCarouselIndex = newCard.getlastCarouselIndex()+ 1;
                carouselList.push(newCard.getCarouselList());
                mainCardContainer.insertAdjacentHTML('beforeend', newCard.render());
            }
        }
        registeMainCardEvent(carouselList);
    })
    .catch(err => console.log(err));
}

async function renderMainCarousel(){
    const mainCarouselContainer = document.getElementById('main-carousel');
    
    CarouselUI.prototype.makeCustomElement = (data) => {
        let customElementString = [];
        data['carousel-data'].forEach((element) => {
            customElementString.push(`<p class='carousel-headline'>${element['description']['head']}</p>`);
        })

        return customElementString;
    }

    await fetch('../dummyData/test.json')
    .then(response => response.json())
    .then((data) => {
        const carouselData = data.MainCarousel;

        if(carouselData){
            const newCarousel = new CarouselUI(carouselData, 'long');
            mainCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
            
            const customElement = newCarousel.makeCustomElement(carouselData);
            
            const carouselItems = mainCarouselContainer.querySelectorAll(`.${CAROUSELITEM_CLASS}`);
            carouselItems.forEach((element) => {
                element.querySelector('.description').insertAdjacentHTML('afterbegin', customElement.shift());
            })
            
        }
        registeMainCarouselEvent();
    })
}

async function renderMiniCarousel(){
    const miniCarouselContainer = document.getElementById('mini-carousel');

    await fetch('../dummyData/test.json')
    .then(response => response.json())
    .then(data => {
        const carouselData = data.MiniCarousel;

        if(carouselData){
            const newCarousel = new CarouselUI(carouselData, 'mini');
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.render());
            miniCarouselContainer.insertAdjacentHTML('beforeend', newCarousel.makeDescriptionLine(carouselData['description']));
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