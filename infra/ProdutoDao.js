function ProdutoDao(connection){
    this._connection = connection; 

};

ProdutoDao.prototype.lista = function(callback){
    this._connection.query('SELECT * FROM livros',callback);  

};

ProdutoDao.prototype.save = function(livro,callback){
    this._connection.query('INSERT INTO livros SET ?',livro,callback);  

};

module.exports = function(){

    return ProdutoDao;

} 

