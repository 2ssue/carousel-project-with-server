import Util from './utils.js'

const _ = new Util();

class Login{
    constructor(form){
        this.container = form;
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
        }).then((res) => res.json())
        .then((res) => {
            if(res.result === 'admin'){
                href.location = './admin.html';
            }else{
                alert('user?');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

const login = new Login(_.$('form'));