export default class Card{
    constructor(cardData, name){
        this.cardName = name;
        this.imageLocation = cardData[name]['image'];
        this.carouselIndexList = cardData[name]['list'];
        this.cardColor = cardData[name]['color'];
    }

    makeListButton(){
        let buttonElement = '';

        this.carouselIndexList.forEach(() => {
            buttonElement += `<span class='carousel-page-button'></span>`;
        })

        return buttonElement;
    }

    render(){
        return `<div class='card__item' style='background-color:${this.cardColor}'><img class='card-image' src=${this.imageLocation}><h1>${this.cardName}</h1>${this.makeListButton()}</div>`;
    }
}