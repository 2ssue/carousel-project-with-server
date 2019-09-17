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

const miniCarouselContainer = document.getElementById('container');
let intervalSliding = setInterval(slideCardForward.bind(miniCarouselContainer), 3000);

slideCardForward.bind(miniCarouselContainer)();