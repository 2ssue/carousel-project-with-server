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

const cardElement = `
    <label for='title'>카드 이름</label>
    <input type='text' id='title'>
    <label for='background_color'>카드 색상 코드</label>
    <input type='text' id='background_color'>
    <label for='carousel_count'>소유 캐로셀 개수</label>
    <input type='text' id='carousel_count'>`;

const miniCarouselElement = `
    <label for='title'>제목</label>
    <input type='text' id='title'>
    <label for='content'>내용</label>
    <input type='text' id='content'>
    <label for='image_link'>이미지 링크</label>
    <input type='text' id='image_link'>
    <label for='link'>링크</label>
    <input type='text' id='link'>
    <label for='link_text'>링크 커버 텍스트</label>
    <input type='text' id='link_text'>`;

const mainCarouselElemnt = `
    <label for='head'>헤더 제목</label>
    <input type='text' id='head'>
    <label for='title'>제목</label>
    <input type='text' id='title'>
    <label for='content'>내용</label>
    <input type='text' id='content'>
    <label for='link'>링크</label>
    <input type='text' id='link'>
    <label for='link_text'>링크 커버 텍스트</label>
    <input type='text' id='link_text'>`;

class Admin{
    constructor(container){
        this.container = container;
        this.addEventHandler();
    }

    addEventHandler(){
        const lookupButton = _.$('#button-lookup', this.container);
        _.regist(lookupButton, 'click', this.getUserdata);
        _.regist(_.$('#ui'), 'change', event => this.renderInputSection(event));
        _.regist(_.$('#upload'), 'click', this.sendInputToServer);
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

    renderInputSection(event){
        const container = _.$('#input-section');
        switch(event.target.value){
            case 'card':
                container.innerHTML = cardElement;
                break;
            case 'mini':
                container.innerHTML = miniCarouselElement;
                break;
            case 'long':
                container.innerHTML = mainCarouselElemnt;
                break;
        }
    }

    sendInputToServer(){
        let image = _.$('form input').value;
        if(!image)
            if(!confirm('이미지를 추가하지 않았습니다. 이미지 없이 데이터를 추가하려면 확인을 누르세요')) return;

        const whatDataSend = _.$('#ui').value;

        if(!whatDataSend){
            alert('업로드 할 데이터가 없습니다');
            return;
        }

        const inputs = _.$$('#input-section > input');
        let inputlist = [];
        inputs.forEach(element => {
            if(element.id === 'carousel_count')
                inputlist.push(`${element.id}:${element.value}`);
            else
                inputlist.push(`${element.id}:"${element.value}"`);
        });
        let bodyContent = {
            column: [], values: []
        };

        inputlist.forEach(element => {
            const splitElement = element.split(":");
            const column = splitElement.shift();
            const value = splitElement.join('');
            bodyContent.column.push(column);
            bodyContent.values.push(value);
        })

        image = image.split('\\')[2];
        bodyContent.column.push('image_src');
        bodyContent.values.push(`"/images/${image}"`);

        const sendAddress = `data/add/${whatDataSend}`;

        _.post(sendAddress, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if(!res) alert('데이터 업로드에 실패했습니다');
            else{
                if(image){
                    _.$('#image-upload').click();
                }
                alert('데이터 업로드 완료');
            }
        });
    }
}

const admin = new Admin(_.$('section'));