const CARDITEM_CLASS = 'card__item';
const SELECTED_CLASS = 'selected';
const CAROUSEL_BUTTON_CLASS = 'carousel-page-button';
const CAROUSEL_BUTTON_CONTAINER_CLASS = 'carousel-button-container'
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