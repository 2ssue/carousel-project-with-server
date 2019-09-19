export class Card{
    constructor(cardData, name){
        this.cardName = name;
        this.imageLocation = cardData[name]['image'];
        this.carouselIndexList = cardData[name]['list'];
        this.cardColor = cardData[name]['color'];
    }

    getCarouselList(){
        return this.carouselIndexList;
    }

    makeListButton(){
        let buttonElement = `<div class='carousel-button-container'>`;

        this.carouselIndexList.forEach(() => {
            buttonElement += `<span class='carousel-page-button'></span>`;
        })
        
        buttonElement += '</div>';

        return buttonElement;
    }

    render(){
        return `<div class='card__item' style='background-color:${this.cardColor}'><img class='card-image' src=${this.imageLocation}><h1>${this.cardName}</h1>${this.makeListButton()}</div>`;
    }
}