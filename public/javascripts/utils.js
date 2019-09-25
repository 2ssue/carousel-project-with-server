export default class Util{
    $ = (selector, base=document) => base.querySelector(selector);
    $$ = (selector, base=document) => base.querySelectorAll(selector);
    regist(base, action, callback){
        base.addEventListener(action, callback);
    }
    post(url, postData){
        return new Promise((resolve, reject) => {
            fetch(url, postData).then((res) => {
                if(res.status === 200){
                    resolve(res);
                }else reject(res.statusText);
            }).catch(err => console.error(err));
        })
    }
    get(url){
        return new Promise((resolve, reject) => {
            fetch(url).then((res) => {
                if(res.status === 200){
                    resolve(res);
                }else reject(res.statusText);
            }).catch(err => console.error(err));
        })
    }
    getValue = (base, id) => this.$(`#${id}`, base).value;
}
