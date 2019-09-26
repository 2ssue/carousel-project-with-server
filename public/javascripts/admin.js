import Util from './util/utils.js'

const _ = new Util();
const authElement = 
`<div class='show-right'>
    <select name='auth' id='select-auth'>
        <option value='0'>사용자</option>
        <option value='1'>관리자</option>
    </select>
    <input type='button' value='권한 변경' id='change-auth'>
</div>`;

class Admin{
    constructor(container){
        this.container = container;
        this.addEventHandler();
    }

    addEventHandler(){
        const lookupButton = _.$('#button-lookup', this.container);
        _.regist(lookupButton, 'click', this.getUserdata);
        _.regist(_.$('#ui'), 'change', event => this.renderItemList(event));
    }

    getUserdata(){
        _.get('/admin/get/users').then(res => {
            res.text().then(res => {
                admin.renderUserdata(res);
            });
        });
    }

    renderUserdata(res){
        const container = _.$('#table-container');
        const header = ['아이디', '이름', '이메일', '성별', '권한'];
        container.innerHTML = _.templateJsonToTable(res, header) + authElement;
        _.regist(_.$('table'), 'click', event => admin.selectUser(event));
        _.regist(_.$('#change-auth'), 'click', admin.changeUserAuth);
    }

    selectUser(event){
        const parent = event.target.parentNode;
        if(parent.previousElementSibling){
            const isSelect = parent.className;
            if(isSelect){
                parent.classList.remove('select');
            }else{
                parent.classList.add('select');
            }
        }
    }

    changeUserAuth(){
        const selectedUser = _.$$('.select');
        if(selectedUser.length > 0){
            let userlist = [];
            selectedUser.forEach((element) => {
                userlist.push(`userid='${element.firstElementChild.innerText}'`);
            });
            const auth = _.$('#select-auth').value;
            
            _.post('/admin/change/users/auth', {
                method: 'POST',
                body: JSON.stringify({userlist: userlist, authValue: Number(auth)}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                res.text().then(res => {
                    admin.renderUserdata(res);
                    alert(`${userlist} 권한이 변경되었습니다`);
                });
            });
        }else{
            alert('선택된 사용자가 없습니다');
        }
    }
}

const admin = new Admin(_.$('section'));