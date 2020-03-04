const express = require("express"); //faz importacao da funcao de criacao o objeto
                                    //express
const app = express(); //funcao de criacao do objeto express
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');



const CONSTANTES = {PORTA: 8369}

app.listen(CONSTANTES.PORTA, function(){
    console.log(`Porta SERVIDOR: ${CONSTANTES.PORTA}`);
});

//config
    //template 
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

const sequelize = new Sequelize('test', 'root', '', {
    host: "localhost",
    dialect: "mysql" 
});

app.get("/cad", function(req, res){
    res.send("Rota de cadastro")
})

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});


// //parametros de funcao vem como json
app.get('/evento/:nome', function(req, res){
    if(req.params.nome === 'gustavo')
        res.sendFile(__dirname+'/evento_gustavo.html');
    else {
        res.sendFile(__dirname+'/evento_padrao.html');
    }
});

// app.get('/tipo', function(req, res){
//     if(req.body.nome === 'gustavo')
//         res.sendFile(__dirname+'/evento_gustavo.html');
//     else
//         res.sendFile(__dirname+'/evento_padrao.html');
    
// })





