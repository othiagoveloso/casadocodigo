module.exports = function(app){

    app.get('/usuarios',function(req,res){
        console.log('recebeu requisiçao');
        res.render('usuarios/lista');
    
    
    });
    
    }