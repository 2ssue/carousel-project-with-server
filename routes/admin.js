const express = require('express');
const router = express.Router();
const DatabaseManager = require('../nodejs/db.js');
const db = require('../db_access_info.js');
const userDB = new DatabaseManager(new db().getAdmin(), 'user');

const script = (message, redirect) => {
    let script = `<script type='text/javascript'>alert('${message}');`;
    if(redirect) script += `location.href='${redirect}'`;
    script += '</script>';
    return script;
}

const checkUser = (req, res, next) => {
    if(!req.user) 
        req.notUser = true;
    else if(req.user.auth > 0)
        req.admin = true;
    
    next();
}

router.get('/', checkUser, function(req, res, next){
    if(req.notUser){
        res.send(script('로그인이 필요합니다', '/login'));
    }else if(req.admin){
        res.render('admin', {
            title: 'ADMIN',
            user: `${req.user.name}님`,
            link: '/logout',
            linktext: '로그아웃'
        });
    }else{
        res.send(script('관리자가 아닙니다', '/'));
    }
});

async function getUser() {
    const column = `userid, name, email, gender, CASE WHEN auth=0 THEN '사용자' WHEN auth>0 THEN '관리자' END`;
    return userDB.select(column).then(async user => user);
}

router.get('/get/users', checkUser, async function(req, res, next){
    if(req.admin){
        const user = await getUser().then(user => user);
        res.send(JSON.stringify(user));
    }else{
        res.send(script('관리자가 아닙니다', '/'));
    }
});

router.post('/change/users/auth', checkUser, async function(req, res, next){
    if(req.admin){
        userDB.update('auth', req.body.userlist, req.body.authValue);
        const user = await getUser().then(user => user);
        res.send(JSON.stringify(user));
    }else{
        res.send(script('관리자가 아닙니다', '/'));
    }
});

module.exports = router;