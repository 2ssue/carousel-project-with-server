const SHOWING_CLASS = 'showing';
const UNSHOWING_CLASS = 'unshowing';

export default class Carousel{
    constructor(slidingContainer){
        this.container = slidingContainer;
        this.firstCard = slidingContainer.querySelector('.card__item:first-child');
        this.lastCard = slidingContainer.querySelector('.card__item:last-child');
    }

    setStartToEndCard(){
        this.firstCard = this.container.querySelector('.card__item:first-child');
        this.lastCard = this.container.querySelector('.card__item:first-child');
    }

    slideCardForward(){
        const currentCard = this.container.querySelector(`.${SHOWING_CLASS}`);

        const enrollPreviousCard = () => {
            this.firstCard.classList.add(SHOWING_CLASS);
            this.lastCard.classList.add(UNSHOWING_CLASS);
        }
    
        if(currentCard){
            currentCard.classList.remove(SHOWING_CLASS);
            const nextCard = currentCard.nextElementSibling;
            const previousCard = this.container.querySelector(`.${UNSHOWING_CLASS}`);
    
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

    slideCardReverse(){
        let currentCard = this.container.querySelector(`.${SHOWING_CLASS}`);
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
                    this.lastCard.classList.add(UNSHOWING_CLASS);
                }
            }else{
                this.lastCard.classList.remove(UNSHOWING_CLASS);
                this.lastCard.classList.add(SHOWING_CLASS);
                currentCard.classList.remove(SHOWING_CLASS);
                enrollPreviousCard(this.lastCard);
            }
        }
    }
}