const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', '',{
    host: "localhost",
    dialect: "mysql"
}); //nome database, user, password,objeto

//conectar com banco de dados:
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso");
}).catch(function(erro){
    console.log("Falha: "+ erro);
})

const Postagem = sequelize.define("postagens",{
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

//Postagem.sync(); //cria no banco de dados a tabela definida pelo sequelize.define()
Postagem.create({
    titulo: "Primeiro post nodejs+sequelize",
    conteudo: "Meu primeiro post nodejs+sequelize"
})
const Usuario = sequelize.define("usuarios", {
    nome :{
        type: Sequelize.STRING
    }, 
    sobrenome: {
        type: Sequelize.STRING
    },

    idade: {
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING
    }
})

 //Usuario.sync();