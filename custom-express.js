const express = require('express');
//const expressValidator = require('express-validator')


module.exports = function(){


const app = express();
const load = require('express-load'); // ajuda para evitar muitos requires
const bodyParser = require('body-parser'); // nas versoes recente do node, ja vem instalado
app.use(bodyParser.urlencoded()); //chamado do formulario
app.use(bodyParser.json()) // middleware executado antes da req chegar nas rotas
app.set('view engine','ejs'); 
//require('./routes')(app);// por padrao, expera o index.js de routes
    load('routes')
        .then('infra')
        .into(app);


//Middlewares especifico         
app.use(express.static('./public'));

    app.use(function(req,res,next){

        console.log("recurso nao encontrado");
        res.status(404).render("erros/404")

    });


   

    app.use(function(error,req,res,next){

        res.format({
            html: function(){
                res.status(500).render("erros/500");
            },
            json: function(){
                res.status(500).send(error.array());
            }
        });

    });


return app;

};