const http = require("http"); //modulo http

//createServer = levanta o servidor
//listen = escuta requisicoes na porta 
http.createServer(function(req, res){
    res.end("<h1>Ola mundo</h1>");
}).listen(8085);
