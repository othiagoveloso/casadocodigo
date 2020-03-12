//const connectionFactory = require('../infra/connectionFactory');
//const ProdutoDao = require('../infra/ProdutoDao');
const { check, validationResult } = require('express-validator');
 
    module.exports = function (app){  
    app.get('/produtos',function(req,res){ // metodo get do http
       
        const connection = app.infra.connectionFactory();
        const produtoDao = new app.infra.ProdutoDao(connection)
        
       produtoDao.lista(function(error,results,fields){
            res.format({
                html:function(){
                    res.render('produtos/lista', {lista:results});
                },
                json:function(){
                    res.json(results);

                }


            });
            

       });

        connection.end();
    
    });

    app.get('/produtos/form',function(req,res){
        res.render('produtos/form');

    });

    app.post('/produtos',[
        
        check('titulo','titulo precisa ser preenchido').notEmpty(),
        
        check('preco','o preco precisa ser números').isFloat()
      ],function(req,res){
        const livros = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            console.log('há um erro de validaçáo');
            res.format({
                html: function(){
                    res.status(400).render('produtos/form',{validationErrors:errors.array()});
                },
                json: function(){
                    res.status(400).send(errors.array());
                }
            });
            return;
        }
        


        console.log(livros);

        const connection = app.infra.connectionFactory();
        const produtoDao = new app.infra.ProdutoDao(connection)

        produtoDao.save(livros, function(erro, results){
            res.redirect('produtos/salvo'); //redirect para a pagina nao cadastrar varios

        });


    });
    
}

