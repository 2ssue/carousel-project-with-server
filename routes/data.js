var express = require('express');
var router = express.Router();
const DatabaseManager = require('../nodejs/db.js');
const db = require('../db_access_info.js');

//all
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const userDB = new DatabaseManager(new db().getUser(), 'card');
const adminDB = new DatabaseManager(new db().getAdmin(), 'card');

const checkAdmin = (req, res, next) => {
  if(!req.user) 
    next('invalid user');
  else if(req.user.auth > 0)
    next();
}

router.get('/get/card', function(req, res, next){
  userDB.changeUseTable('card');
  userDB.select().then(card => {
    res.send(JSON.stringify(card));
  });
});

router.get('/get/mini-carousel', function(req, res, next){
  userDB.changeUseTable('mini_carousel');
  userDB.select().then(carousel => {
    res.send(JSON.stringify(carousel));
  });
});

router.get('/get/mini/description', function(req, res, next){
  userDB.changeUseTable('mini_description');
  userDB.select().then(description => {
    res.send(JSON.stringify(description));
  })
})

router.get('/get/main-carousel', function(req, res, next){
  userDB.changeUseTable('main_carousel');
  userDB.select().then(carousel => {
    res.send(JSON.stringify(carousel));
  });
});

router.post('/add/card', checkAdmin, function(req, res, next){
  adminDB.changeUseTable('card');
  adminDB.insert(req.body.column, req.body.values).then(result => {
    res.send(result);
  });
});

router.post('/add/mini', checkAdmin, function(req, res, next){
  adminDB.changeUseTable('mini_carousel');
  adminDB.insert(req.body.column, req.body.values).then(result => {
    res.send(result);
  });
});

router.post('/add/long', checkAdmin, function(req, res, next){
  adminDB.changeUseTable('main_carousel');
  adminDB.insert(req.body.column, req.body.values).then(result => {
    res.send(result);
  })
});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('/upload/image', checkAdmin, upload.single('imagefile'), function(req, res){
  res.send(`<script>location.href='/admin'</script>`);
});


module.exports = router;
