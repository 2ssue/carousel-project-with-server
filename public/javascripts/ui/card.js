export class Card{
    constructor(card, startCarouselIndex){
        this.cardName = card.title;
        this.carouselIndexList = [];
        this.setCarouselList(startCarouselIndex, card.carousel_count);
        this.imageLocation = card['image_src'];
        this.cardColor = card['background_color'];
    }

    setCarouselList(startIndex, count){
        for(let i = 0; i < count; i++){
            this.carouselIndexList.push(startIndex + i);
        }
    }

    getlastCarouselIndex(){
        const lastIndex = this.carouselIndexList.pop();
        this.carouselIndexList.push(lastIndex);
        return lastIndex;
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