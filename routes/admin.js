const express = require('express');
const router = express.Router();

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