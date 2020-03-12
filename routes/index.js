module.exports = function (app){

    require('./produtos')(app);
    require('./usuarios')(app);


};