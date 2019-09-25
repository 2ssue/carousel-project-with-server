var express = require('express');
var router = express.Router();
const session = require('express-session');
const auth = require('./auth.js');
const passport = require('passport');

router.use(session({
  secret: 'asdf1234qwer!@#$',
  cookie:{
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60
  },
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());
auth();

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req, res) => {
  if(req.user[0].auth > 0){
    res.redirect('/admin');
  }else{
    res.redirect('/');
  }
});

router.get('/logout', function(req, res, next){
  req.logout();
  req.session.save(function(err){
    res.redirect('/');
  });
});

router.get('/', function(req, res, next){
  const printObject = {
    title: 'CAROUSEL PARTY',
    link: '/login',
    linktext: '로그인'
  }

  if(req.user){
    printObject.user = `${req.user.name}님`;
    printObject.link = '/logout';
    printObject.linktext = '로그아웃';
  }

  res.render('index', printObject);
});

router.get('/login', function(req, res, next){
  res.render('login', {
    title: 'Login',
    link:'/',
    linktext: '돌아가기'
  })
});

module.exports = router;
