var express = require('express');
var router = express.Router();
const DatabaseManager = require('../nodejs/db.js');
const db = require('../db_access_info.js');

//all
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const userDB = new DatabaseManager(new db().getUser(), 'card');

router.get('/get/card', function(req, res, next){
  // const userDB = new DatabaseManager(new db().getUser(), 'card');
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


module.exports = router;
