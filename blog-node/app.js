const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const admin = require('./routers/admin') //importa as rotas de admin
const usuario = require("./routers/usuario")
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Postagem");
require("./models/Categoria");

const Postagem = mongoose.model("postagens")
const Categoria = mongoose.model("categoria")

app.use(session({
    secret: "meuSegredoDeSessao",
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); 
app.use((req, res, next) => {
    res.locals.sucess_msg = req.flash("sucess_msg")
    res.locals.error_msg = req.flash("error_msg")
    next();
})

//configuracao da engine de visualizao que sera usada na aplicacao
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars')

//configuracao para poder mexer com body da requisicao
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//importando rotas
app.use('/admin', admin);
app.use('/usuario', usuario)

//tornado publico o usod de recursos da pasta public
app.use(express.static(path.join(__dirname, "public")))

//mongoose
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("banco conectado"))
    .catch((error) => console.log(error))


app.get("/", (req, res) => {
    Postagem.find().populate("categoria").sort({data:"desc"})
    .then((postagens)=>{
        res.render("index", {postagens: postagens})
    })
    .catch((error)=>{
        console.error(error);
        req.flash("error_msg", "Erro interno")
        res.render("index");
    })

    
})
router = 
//visualizando postagem
app.get("/postagem/:slug", (req, res) => {
   console.log(req.params.slug)
   Postagem.findOne({slug: req.params.slug})
   .then((postagem)=>{
       if(postagem){
            res.render("postagem/conteudo", {post: postagem})
       }else{
           req.flash("error_msg", "Post nao encontrado")
           res.redirect("/");
       }
   })
   .catch((error)=>{
       req.flash("error_msg", "Erro interno")
   })
})

app.get("/categorias/listar", (req, res) => {
    Categoria.find()
    .then((categorias) => {
        res.render("categoria/listar", {categorias: categorias})
    })
    .catch((error) => {
        console.error(error);
        req.flash("error_msg", "categoria nao encontrada")
        res.redirect("/");

    })
})

app.get("/categorias/listar/:id", (req, res) => {
    Postagem.find({"categoria":req.params.id})
    .then((postagens)=>{
        console.log(postagens)
        res.render("categoria/especifica", {posts: postagens})
    })
    .catch((error)=>{
        console.error(error);
        req.flash("error_msg", "categoria nao encontrada")
        res.redirect("/");
    })
})


const PORT = 9089;
app.listen(PORT, ()=> console.log(`Servidor iniciado: ${PORT}`))