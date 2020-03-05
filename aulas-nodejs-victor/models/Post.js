const db = require("./db");

const tabela = {
    nome:"postagens",
    schema: {
        titulo : {
            type: db.Sequelize.STRING
        },

        conteudo: {
            type: db.Sequelize.TEXT
        }
    }
}

module.exports = Post = db.sequelize.define(tabela.nome, tabela.schema);

// const criarTabela = (tabela, reload=false) => {
//     Post = db.sequelize.define(tabela.nome, tabela.schema);
//     Post.sync({force:reload})
// }

//criarTabela(tabela, true);
