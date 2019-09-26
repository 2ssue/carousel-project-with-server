import Util from './util/utils.js'

const _ = new Util();

class Login{
    constructor(container){
        this.container = container;
        this.addEventHandler();
    }

    addEventHandler(){
        const loginButton = _.$('button', this.container);
        _.regist(loginButton, 'click', this.sendLoginEventHandler);
    }

    sendLoginEventHandler(){
        event.preventDefault();

        const sendingContents = {
            userid: _.getValue(this.container, 'userid'),
            password: _.getValue(this.container, 'password')
        }

        _.post('/login', {
            method: 'POST',
            body: JSON.stringify(sendingContents),
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            location.href = res.url;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

new Login(_.$('form'));