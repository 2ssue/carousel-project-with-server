var express = require('express');
var router = express.Router();
const DatabaseManager = require('../component/db.js');

router.post('/login', function(req, res, next) {
  const userDb = new DatabaseManager({
    host: '106.10.54.244',
    user: 'user',
    password: 'mypassword',
    database: 'amazon_db'
  }, 'user');

  const column = 'userid, auth';
  const condition = `userid='${req.body.userid}' AND userpassword='${req.body.password}'`;
  userDb.select(column, condition).then(data => {
    let message = {result: ''};

    if(data.length > 0){
      if(data[0].auth > 0){
        message.result = 'admin';
      }else{
        message.result = 'user';
      }
    }else{
      message.result = 'fail';
    }

    res.send(JSON.stringify(message));
  });  
});

module.exports = router;
