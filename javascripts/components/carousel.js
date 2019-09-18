const PREV_BUTTON_ID = 'button-prev';
const NEXT_BUTTON_ID = 'button-next';
const LONG_VERSION = '__long';

export default class Carousel{
    constructor(data, option){
        this.imageList = data['imageList'];
        this.description = data['description'];
        this.option = option;
    }

    render(){
        let [leftButton, rightButton] = this.makeButtonTag();

        return `${leftButton}${this.makeUnorderedListTag()}${this.option?'':rightButton}${this.makeDescriptionLine()}${this.option?rightButton:''}`;
    }

    makeListTag(){
        let listElementString = '';
        
        this.imageList.forEach((element) => {
            listElementString += `<li class='carousel__item'>`;
            listElementString += `<a href='${element.link}'>`;
            listElementString += `<img src='${element.image}'></a>`;
        })

        return listElementString;
    }

    makeUnorderedListTag(){
        let unorderedListString =  `<ul class='carousel__container mini' id='carousel__mini'>`;
        
        unorderedListString += this.makeListTag() + '</ul>';
        
        return unorderedListString;
    }

    makeDescriptionLine(){
        return `<div class='description'><h1>${this.description.title}</h1><p>${this.description.contents}</p><a href=${this.description.link}>${this.description['link-text']}</a>`
    }

    makeButtonTag(){
        const leftButton = `<span id=${PREV_BUTTON_ID}${this.option ? LONG_VERSION : ''}>&#60;</span>`
        const rightButton = `<span id=${NEXT_BUTTON_ID}${this.option ? LONG_VERSION : ''}>&#62;</span>`
    
        return [leftButton, rightButton];
    }
}