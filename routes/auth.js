const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DatabaseManager = require('../components/db.js');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userid',
        session: true,
        passReqToCallback: false
    },
        function(username, password, done){
            const userDB = new DatabaseManager({
                host: '106.10.54.244',
                user: 'user',
                password: 'mypassword',
                database: 'amazon_db'
            }, 'user');

            const column = 'userid, name, auth';
            const condition = `userid='${username}' AND userpassword='${password}'`;

            userDB.select(column, condition).then(user => {
            if(user[0]){
                return done(null, user);
            }else{
                return done(null, false, {message: '아이디나 비밀번호를 다시 확인해주세요'});
            }
            }).catch(err => done(err, null));
        }
    ));

    passport.serializeUser(function(user, done){
        done(null, user[0]);
    });
    
    passport.deserializeUser(function(user, done){
        done(null, user);
    });
}