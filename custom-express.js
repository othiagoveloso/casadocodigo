const express = require('express');
//const expressValidator = require('express-validator')


module.exports = function(){


const app = express();
const load = require('express-load'); // ajuda para evitar muitos requires
const bodyParser = require('body-parser'); // nas versoes recente do node, ja vem instalado
app.use(bodyParser.urlencoded()); //chamado do formulario
app.use(bodyParser.json()) // 
app.set('view engine','ejs'); 
//require('./routes')(app);// por padrao, expera o index.js de routes
    load('routes')
        .then('infra')
        .into(app);

app.use(express.static('./public'));


return app;

};