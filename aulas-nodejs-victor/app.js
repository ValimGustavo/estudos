const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const Post = require('./models/Post');
const ROTAS = require('./conf-app/rotas');
const PORTAS = require('./conf-app/portas');


const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get(ROTAS.POSTAGEM.cadastrar, (req, res) =>{
    res.render('formulario')
})

app.get(ROTAS.SITE.home, (req, res) =>{
    Post.findAll()
    .then((listaPostsVindaDoBanco) => {
        res.render('home',          
                {
                    posts:listaPostsVindaDoBanco,
                    caminho: ROTAS.POSTAGEM.deletar
                }
        )        
    }).catch((erro)=>{
        console.log(error);
        res.send("<h1>Desculpe, tivemos problema para carregar os posts</h1>");
    })
    
});

app.post(ROTAS.POSTAGEM.salvar, (req, res) => {
    const {titulo, conteudo} = req.body;

    Post.create({titulo, conteudo})
    .then(
        () => res.redirect(ROTAS.SITE.home)
    ).catch((error)=>{
        console.log(error);
        res.send("Infelizmente, nao foi possivel salvar a postagem")
    })
})

app.get("/deletarPostagem/:id", (req, res) => {
    Post.destroy({where: {"id" : req.params.id}})
    .then(() =>
        res.redirect(ROTAS.SITE.home)
    )
    .catch((error)=>{
        console.log(error);
        res.send("Desculpe, tivemos um problema para deletar");
    })
});



app.listen(PORTAS.LISTEN_DOOR, function(req, res){
    console.log(`start server port: ${PORTAS.LISTEN_DOOR}`)
})

