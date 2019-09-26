const PREV_BUTTON_ID = 'button-prev';
const NEXT_BUTTON_ID = 'button-next';

export class Carousel{
    constructor(data, name){
        this.carouselData = data;
        this.className = name;
    }

    render(){
        let [leftButton, rightButton] = this.makeButtonTag();

        return `${leftButton}${this.makeUnorderedListTag()}${rightButton}`;
    }

    makeListTag(){
        let listElementString = '';
        
        this.carouselData.forEach((element) => {
            listElementString += `<li class='carousel__item'>`;
            if(element['image_link'])
                listElementString += `<a href='${element['image_link']}'>`;
            listElementString += `<img src='${element['image_src']}'></a>`;
            if(element['title'])
                listElementString += this.makeDescriptionLine(element);
            
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
            return `<div class='description'><h1>${description.title}</h1><p>${description.content}</p><a href=${description.link}>${description['link_text']} &#187;</a>`
        else
            return '';
    }

    makeButtonTag(){
        const leftButton = `<span id=${PREV_BUTTON_ID}__${this.className}>&#60;</span>`
        const rightButton = `<span id=${NEXT_BUTTON_ID}__${this.className}>&#62;</span>`
    
        return [leftButton, rightButton];
    }
}