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

router.get('/', function(req, res, next){
    if(!req.user){
        res.send(script('로그인이 필요합니다', '/login'));
    }else if(req.user.auth > 0){
      res.render('admin', {
        title: 'ADMIN',
        user: `${req.user.name}님`,
        link: '/logout',
        linktext: '로그아웃'
      });
    }else if(req.user){
        res.send(script('관리자가 아닙니다', '/'));
    }
});

async function getUser() {
    const column = `userid, name, email, gender, CASE WHEN auth=0 THEN '사용자' WHEN auth>0 THEN '관리자' END`;
    return userDB.select(column).then(async user => user);
}

router.get('/get/users', async function(req, res, next){
    if(!req.user) res.send(script('관리자가 아닙니다', '/'));
    else if(req.user.auth > 0){
        const user = await getUser().then(user => user);
        res.send(JSON.stringify(user));
    }else{
        res.send(script('관리자가 아닙니다', '/'));
    }
});

router.post('/change/users/auth', async function(req, res, next){
    if(!req.user) res.send(script('관리자가 아닙니다', '/'));
    else if(req.user.auth > 0){
        userDB.update('auth', req.body.userlist, req.body.authValue);
        const user = await getUser().then(user => user);
        res.send(JSON.stringify(user));
    }else{
        res.send(script('관리자가 아닙니다', '/'));
    }
});

module.exports = router;