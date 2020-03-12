//const connectionFactory = require('../infra/connectionFactory');
//const ProdutoDao = require('../infra/ProdutoDao');
 
    module.exports = function (app){  
    app.get('/produtos',function(req,res){ // metodo get do http
       
        const connection = app.infra.connectionFactory();
        const produtoDao = new app.infra.ProdutoDao(connection)
        
       produtoDao.lista(function(error,results,fields){
            res.render('produtos/lista', {lista:results});

       })

        connection.end();
    
    });

    app.get('/produtos/form',function(req,res){
        res.render('produtos/form');

    });

    app.post('/produtos',function(req,res){
        const livros = req.body;
        console.log(livros);

        const connection = app.infra.connectionFactory();
        const produtoDao = new app.infra.ProdutoDao(connection)

        produtoDao.save(livros, function(erro, results){
            res.render('produtos/salvo');

        });


    });
    
}

