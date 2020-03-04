const express = require("express");
const app = express();

const porta = 8019;

app.get('/', function(req, res){
    res.send('Rodando')
})


app.listen(porta, function(req, res){
    console.log("funcionando");
})


