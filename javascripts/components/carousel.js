const PREV_BUTTON_ID = 'button-prev';
const NEXT_BUTTON_ID = 'button-next';

export class Carousel{
    constructor(data, name){
        this.imageList = data['image-list'];
        this.descriptionList = data['description-list'];
        this.className = name;
    }

    render(){
        let [leftButton, rightButton] = this.makeButtonTag();

        return `${leftButton}${this.makeUnorderedListTag()}${this.option?'':rightButton}`;
    }

    makeListTag(){
        let listElementString = '';
        
        this.imageList.forEach((element, index) => {
            listElementString += `<li class='carousel__item'>`;
            if(element['link'])
                listElementString += `<a href='${element.link}'>`;
            listElementString += `<img src='${element.image}'></a>`;
            if(this.descriptionList)
                listElementString += this.makeDescriptionLine(this.descriptionList[index]);
            
        })

        return listElementString;
    }

    makeUnorderedListTag(){
        let unorderedListString =  `<ul class='carousel__container ${this.className}' id='carousel__${this.className}'>`;
        
        unorderedListString += this.makeListTag() + '</ul>';
        
        return unorderedListString;
    }

    makeDescriptionLine(description){
        if(description)
            return `<div class='description'><h1>${description.title}</h1><p>${description.contents}</p><a href=${description.link}>${description['link-text']} &#187;</a>`
        else
            return '';
    }

    makeButtonTag(){
        const leftButton = `<span id=${PREV_BUTTON_ID}__${this.className}>&#60;</span>`
        const rightButton = `<span id=${NEXT_BUTTON_ID}__${this.className}>&#62;</span>`
    
        return [leftButton, rightButton];
    }
}