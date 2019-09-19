const CARDITEM_CLASS = 'card__item';
const SELECTED_CLASS = 'selected';
const CAROUSEL_BUTTON_CLASS = 'carousel-page-button';

export default class Card{
    constructor(cardContainer, carouselList){
        this.container = cardContainer;
        this.carouselList = carouselList;
    }

    makeCardBigger(event){
        if(event.target === this.container) return;
        
        let parent = event.target.parentElement;

        if(event.target.tagName === 'SPAN')
            parent = event.target.parentElement.parentElement;
        
        const selectedItem = this.container.querySelector(`.${CARDITEM_CLASS}.${SELECTED_CLASS}`);
        
        this.removeSelectedCarouselButton();
        this.unshowCarouselButtons();

        if(selectedItem)
            selectedItem.classList.remove(SELECTED_CLASS);

        if(parent.id){
            event.target.classList.add(SELECTED_CLASS);
        }else{
            parent.classList.add(SELECTED_CLASS);
        }

        this.showCarouselButtons(event);
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

    showCarouselButtons(event){
        const parent = event.target.parentElement;

        let carouselButtons;
        if(parent.id){
            carouselButtons = event.target.querySelectorAll(`.${CAROUSEL_BUTTON_CLASS}`);
        }else{
            carouselButtons = parent.querySelectorAll(`.${CAROUSEL_BUTTON_CLASS}`);
        }

        carouselButtons.forEach((button) => {
            button.classList.add('show');
        })
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