const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port , function(err){
    if (err) {
        console.log("error in runningn the server");
    }
    else {
        console.log("server running good");
    }
});
