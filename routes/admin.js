const express = require('express');
const router = express.Router();
const DatabaseManager = require('../components/db.js');
const Templator = require('../components/template.js');

router.get('/get/users', function(req, res, next){
    const userDB = new DatabaseManager({
        host: '106.10.54.244',
        user: 'admin',
        password: 'adminpassword123!',
        database: 'amazon_db'
    }, 'user');

    const column = `userid, name, email, gender, CASE WHEN auth=0 THEN '사용자' WHEN auth>0 THEN '관리자' END`;

    userDB.select(column).then(user => {
        const templating = new Templator();
        const header = ['아이디', '이름', '이메일', '성별', '권한'];
        const tables = templating.arrayToTable(user, header);
        res.send(tables);
    })
});

router.get('/', function(req, res, next){
    const script = (message) => {
        return `<script type='text/javascript'>alert('${message}'); location.href = '/';</script>`;
    }
    if(!req.user){
        res.send(script('로그인이 필요합니다'));
    }else if(req.user.auth > 0){
      res.render('admin', {
        title: 'ADMIN',
        user: `${req.user.name}님`,
        link: '/logout',
        linktext: '로그아웃'
      });
    }else if(req.user){
        res.send(script('관리자가 아닙니다'));
    }
  });

module.exports = router;