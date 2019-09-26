# membership-amazon project

This project is clone practice version of [amazon](https://www.amazon.com/amazonprime?_encoding=UTF8&*Version*=1&*entries*=0)

<a href="https://github.com/2ssue/membership-amazon/wiki">
<img alt="project-management" src="https://img.shields.io/badge/project--management-wiki-blue" target="_blank" />
</a>

## [🏠 PUBLISH PAGE(WITH BACKEND)](http://106.10.54.244/)
## [🏠 TEMPERAL FRONTEND PAGE: ~~https://2ssue.github.io/carousel-project/~~](https://2ssue.github.io/carousel-project/)

## project structure

### frontend
```
.
├── public                  #front static file
│   ├── images              #server upload image here
│   ├── javascripts
│   │   ├── admin.js
│   │   ├── login.js
│   │   ├── render.js
│   │   ├── components
│   │   ├── ui
│   │   └── util
│   └── stylesheets
...
```

### backend
```
.
├── app.js
├── bin
│   └── www
├── nodejs                  #server javascript
│   └── db.js               #database manager
├── routes
│   ├── admin.js
│   ├── auth.js             #authenticate user by passport module
│   ├── data.js
│   └── index.js
└── views
    ├── admin.pug
    ├── error.pug
    ├── index.pug
    ├── layout.pug
    └── login.pug
```

## Install
```bash
$ npm install
```

## Usage
```bash
$  cd ./public/stylesheets/sass
$ node-sass . --output ../css
# You have to make db_access_info.js file which access database information. This project don't inform database information.
$ npm start
```

### db_access_info.js

This file is organized like this.

```
class DBInfo{
    constructor(){
        this.host = '...';
        this.database = '...';
    }
    getUserAccount(){
        return {
            host: this.host,
            user '...',
            password '...',
            database: this.database
        }
    }
}
```

## Tech
module name|description|
---|---|
[Express](https://expressjs.com/)|Fast, unopinionated, minimalist web framework for Node.js|
[mysql2](https://www.npmjs.com/package/mysql2)|MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl|
[multer](https://www.npmjs.com/package/multer)|Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.|
[passport](https://www.npmjs.com/package/passport)|Passport is Express-compatible authentication middleware for Node.js.|
[express-session](https://www.npmjs.com/package/express-session)|express-session is the middleware required to manage sessions in the Express framework.|


## Author

Sujeong Lee
- Github: @2ssue