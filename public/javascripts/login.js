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
        }).then((res) => {
            if(res.result === 'admin'){
                alert('admin!');
                // location.href = './admin.html';
            }else if(res.result === 'user'){
                alert('user!');
            }else{
                alert('아이디 또는 비밀번호를 확인해주세요');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

const login = new Login(_.$('form'));