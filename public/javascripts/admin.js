import Util from './utils.js'

const _ = new Util();

class Admin{
    constructor(container){
        this.container = container;
        this.addEventHandler();
    }

    addEventHandler(){
        const lookupButton = _.$('#button-lookup', this.container);
        _.regist(lookupButton, 'click', this.getUserdata);
    }

    getUserdata(){
        _.get('/admin/get/users').then(res => {
            res.text().then(res => {
                _.$('table').innerHTML = res;
            });
        });
    }
}

new Admin(_.$('section'));