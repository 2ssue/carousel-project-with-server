const CARDITEM_CLASS = 'card__item';
const SELECTED_CLASS = 'selected';
const CAROUSEL_BUTTON_CLASS = 'carousel-page-button';

export default class Card{
    constructor(cardContainer){
        this.container = cardContainer;
    }

    makeCardBigger(event){
        const parent = event.target.parentElement;

        const selectedItem = this.container.querySelector(`.${CARDITEM_CLASS}.${SELECTED_CLASS}`);
        
        this.removeSelectedCarouselButton();

        if(selectedItem)
            selectedItem.classList.remove(SELECTED_CLASS);
        
        if(parent.id){
            event.target.classList.add(SELECTED_CLASS);
        }else{
            parent.classList.add(SELECTED_CLASS);
        }

        this.selectFirstCarouselButton(event);
    }

    selectCarouselButton(event){
        if(event.target.tagName === 'SPAN'){
            this.removeSelectedCarouselButton();
            event.target.classList.add(SELECTED_CLASS);    
        }
    }

    removeSelectedCarouselButton(){
        const selectedItem = this.container.querySelector(`.${CAROUSEL_BUTTON_CLASS}.${SELECTED_CLASS}`);
            
        if(selectedItem)
            selectedItem.classList.remove(SELECTED_CLASS);
    }

    selectFirstCarouselButton(event){
        const parent = event.target.parentElement;

        let firstCarouselButton;
        if(parent.id){
            firstCarouselButton = event.target.querySelector(`.${CAROUSEL_BUTTON_CLASS}`);
        }else{
            firstCarouselButton = parent.querySelector(`.${CAROUSEL_BUTTON_CLASS}`);
        }

        firstCarouselButton.classList.add(SELECTED_CLASS);
    }
}