const SHOWING_CLASS = 'showing';
const UNSHOWING_CLASS = 'unshowing';

function slideCardForward(){
    const firstCard = document.querySelector(`#${this.id} .card__item:first-child`);
    const currentCard = document.querySelector(`.${SHOWING_CLASS}`);
    
    const enrollPreviousCard = () => {
        firstCard.classList.add(SHOWING_CLASS);
        const lastCard = document.querySelector(`#${this.id} .card__item:last-child`);
        lastCard.classList.add(UNSHOWING_CLASS);
    }

    if(currentCard){
        currentCard.classList.remove(SHOWING_CLASS);
        const nextCard = currentCard.nextElementSibling;
        const previousCard = document.querySelector(`.${UNSHOWING_CLASS}`);

        if(previousCard){
            previousCard.classList.remove(UNSHOWING_CLASS);
        }
        if(nextCard){
            nextCard.classList.add(SHOWING_CLASS);
            currentCard.classList.add(UNSHOWING_CLASS);
        }else{
            enrollPreviousCard();
            currentCard.classList.add(UNSHOWING_CLASS);
        }
    }else{
        enrollPreviousCard();
    }
}

function slideCardReverse(){
    const lastCard = document.querySelector(`#${this.id} .card__item:last-child`);
    let currentCard = document.querySelector(`.${SHOWING_CLASS}`);
    let previousCard = currentCard.previousElementSibling;

    const enrollPreviousCard = (currentCard) => {
        const previousCard = currentCard.previousElementSibling;
        previousCard.classList.add(UNSHOWING_CLASS);
    }

    if(currentCard){
        if(previousCard){
            currentCard.classList.remove(SHOWING_CLASS);
            previousCard.classList.remove(UNSHOWING_CLASS);
            previousCard.classList.add(SHOWING_CLASS);
            
            if(previousCard.previousElementSibling){
                enrollPreviousCard(previousCard);
            }else{
                lastCard.classList.add(UNSHOWING_CLASS);
            }
        }else{
            lastCard.classList.remove(UNSHOWING_CLASS);
            lastCard.classList.add(SHOWING_CLASS);
            currentCard.classList.remove(SHOWING_CLASS);
            enrollPreviousCard(lastCard);
        }
    }
}

const miniCarouselContainer = document.getElementById('container');
let intervalSliding = setInterval(slideCardForward.bind(miniCarouselContainer), 3000);

slideCardForward.bind(miniCarouselContainer)();

const rightButton = document.getElementById('button__slide-right');
rightButton.addEventListener('click', () => {
    clearInterval(intervalSliding);
    slideCardForward.bind(miniCarouselContainer)();
    intervalSliding = setInterval(slideCardForward.bind(miniCarouselContainer), 3000);
});

const leftButton = document.getElementById('button__slide-left');
leftButton.addEventListener('click', () => {
    clearInterval(intervalSliding);
    slideCardReverse.bind(miniCarouselContainer)();
    intervalSliding = setInterval(slideCardForward.bind(miniCarouselContainer), 3000);
})