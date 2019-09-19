const CARDITEM_CLASS = 'card__item';
const SELECTED_CLASS = 'selected';
const CAROUSEL_BUTTON_CLASS = 'carousel-page-button';
const CAROUSEL_BUTTON_CONTAINER_CLASS = 'carousel-button-container';
const CAROUSELITEM_CLASS = 'carousel__item';
const CAROUSEL_CLASS = 'carousel__container';
const PREV_CAROUSEL_BUTTON = 'button-prev__long';
const NEXT_CAROUSEL_BUTTON = 'button-next__long';

export default class Card{
    constructor(cardContainer, carouselList){
        this.container = cardContainer;
        this.carouselList = carouselList;
    }

    cardClickEventHandler(event){
        if(event.target === this.container || event.target === this.container.firstElementChild) return;

        let parent = event.target.parentElement;

        if(event.target.tagName === 'SPAN') return;
            
        if(parent.id){
            this.makeCardBigger(event.target);
        }else{
            this.makeCardBigger(parent);
        }
    }

    makeCardBigger(card, nonecarouselEvent){
        if(card){
            const selectedItem = this.container.querySelector(`.${CARDITEM_CLASS}.${SELECTED_CLASS}`);

            if(selectedItem)
                selectedItem.classList.remove(SELECTED_CLASS);

            this.removeSelectedCarouselButton();
            this.unshowCarouselButtons();
        }else{
            card = this.container.querySelector(`.${CARDITEM_CLASS}`);
        }

        card.classList.add(SELECTED_CLASS);
        this.showCarouselButtons();

        if(nonecarouselEvent) return;
        
        this.selectFirstCarouselButton();
        this.showNthCarousel(this.getElementIndex(card), 0);
    }

    selectCarouselButton(event){
        if(event.target.tagName === 'SPAN'){
            this.removeSelectedCarouselButton();
            event.target.classList.add(SELECTED_CLASS);

            const cardIndex = this.getElementIndex(event.target.parentElement.parentElement);
            const carouselIndex = this.getElementIndex(event.target);
            this.showNthCarousel(cardIndex, carouselIndex);
        }
    }

    showNthCarousel(cardIndex, carouselIndex){
        const togoCarouselIndex = this.carouselList[cardIndex][carouselIndex];
        const totalCarouselCount = this.container.querySelector(`.${CAROUSEL_CLASS}`).childElementCount;
        const currentCarouselIndex = this.getElementIndex(this.container.querySelector(`.${CAROUSELITEM_CLASS}.showing`)) + 1;

        if(togoCarouselIndex === currentCarouselIndex) return;

        const rightCarouselButton = this.container.querySelector(`#${NEXT_CAROUSEL_BUTTON}`);
        const leftCarouselButton = this.container.querySelector(`#${PREV_CAROUSEL_BUTTON}`);
        
        const forwardCount = Math.abs(currentCarouselIndex - togoCarouselIndex);
        const reverseCount = Math.abs(totalCarouselCount - forwardCount);

        let gap = 0;

        if(forwardCount > reverseCount){
            gap = reverseCount * -1;
        }else{
            gap = forwardCount;
        }

        if(currentCarouselIndex > togoCarouselIndex)
            gap *= -1;

        const customWhile = (count, button) => {
            count--;
            if(count < 0) return;
            new Promise((resolve) => {
                setTimeout(() => {
                    button.click();
                    resolve();
                }, 100);
            })
            .then(() => {
                customWhile(count, button);
            });
        }

        if(gap < 0){
            customWhile(Math.abs(gap), leftCarouselButton);
        }else{
            customWhile(gap, rightCarouselButton);
        }
    }

    getElementIndex(element){
        let index = 0;
        
        while(element = element.previousElementSibling){
            index++;
        }

        return index;
    }

    removeSelectedCarouselButton(){
        const selectedItem = this.container.querySelector(`.${CAROUSEL_BUTTON_CLASS}.${SELECTED_CLASS}`);
            
        if(selectedItem)
            selectedItem.classList.remove(SELECTED_CLASS);
    }

    selectFirstCarouselButton(){
        const selectedCard = this.container.querySelector(`.${CARDITEM_CLASS}.${SELECTED_CLASS}`);
        
        if(selectedCard){
            selectedCard.querySelector(`.${CAROUSEL_BUTTON_CLASS}`).classList.add(SELECTED_CLASS);
        }
    }

    showCarouselButtons(){
        const selectedCard = this.container.querySelector(`.${CARDITEM_CLASS}.${SELECTED_CLASS}`);

        if(selectedCard){
            const carouselButtons = selectedCard.querySelectorAll(`.${CAROUSEL_BUTTON_CLASS}`);
            carouselButtons.forEach((button) => {
                button.classList.add('show');
            })
        }
    }

    unshowCarouselButtons(){
        const visibleCarouselButtons = this.container.querySelectorAll(`.${CAROUSEL_BUTTON_CLASS}.show`);
        
        if(visibleCarouselButtons){
            visibleCarouselButtons.forEach((button) => {
                button.classList.remove('show');
            })
        }
    }
}