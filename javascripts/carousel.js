const SHOWING_CLASS = 'showing';
const UNSHOWING_CLASS = 'unshowing';
const CAROUSELITEM_CLASS = 'carousel__item';

export default class Carousel{
    constructor(slidingContainer){
        this.container = slidingContainer;
        this.firstCarousel = slidingContainer.querySelector(`.${CAROUSELITEM_CLASS}:first-child`);
        this.lastCarousel = slidingContainer.querySelector(`.${CAROUSELITEM_CLASS}:last-child`);
    }

    setStartToEndCard(){
        this.firstCarousel = this.container.querySelector(`.${CAROUSELITEM_CLASS}:first-child`);
        this.lastCarousel = this.container.querySelector(`.${CAROUSELITEM_CLASS}:first-child`);
    }

    slideCardForward(){
        const currentCard = this.container.querySelector(`.${SHOWING_CLASS}`);

        const enrollPreviousCard = () => {
            this.firstCarousel.classList.add(SHOWING_CLASS);
            this.lastCarousel.classList.add(UNSHOWING_CLASS);
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
                    this.lastCarousel.classList.add(UNSHOWING_CLASS);
                }
            }else{
                this.lastCarousel.classList.remove(UNSHOWING_CLASS);
                this.lastCarousel.classList.add(SHOWING_CLASS);
                currentCard.classList.remove(SHOWING_CLASS);
                enrollPreviousCard(this.lastCarousel);
            }
        }
    }
}