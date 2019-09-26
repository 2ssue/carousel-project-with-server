var express = require('express');
var router = express.Router();
const DatabaseManager = require('../nodejs/db.js');
const db = require('../db_access_info.js');

//all
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get/card', function(req, res, next){
  const userDB = new DatabaseManager(new db().getUser(), 'card');
  userDB.select().then(card => {
    res.send(JSON.stringify(card));
  });
});

router.get('/get/mini', function(req, res, next){

});

router.get('/get/long', function(req, res, next){
  
});


module.exports = router;
