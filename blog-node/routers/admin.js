const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require("../models/Categoria");
require("../models/Postagem")

const Categoria = mongoose.model("categoria")
const Postagem = mongoose.model("postagens")

router.get('/', (req, res) => res.render('admin/index'))

router.get("/categoria", (req, res) => {
    Categoria.find()
    .then((categorias)=>{
        res.render('categoria/categorias', {listaCategoria: categorias});
    })
    .catch((error)=>{
        console.log(error);
    })})

router.get("/categoria/adicionar", (req, res) =>{
    res.render("categoria/adicionar")
})

router.post("/categoria/banco/salvar", (req, res) => {
    const { nome, slug } = req.body;
    let array_erros = [];

    if(!nome  || typeof nome == undefined || nome === null)
        array_erros.push({text: "nome invalido"})
    
    if(!slug  || typeof slug == undefined || slug === null)
        array_erros.push({text: "slug invalido"})

    if(array_erros.length > 0){
        res.render("categoria/adicionar", {erros: array_erros})
    }else {
        new Categoria({nome, slug})
        .save()
        .then(()=> {
            req.flash("success_msg", "Categoria salva com sucesso")
            res.redirect("/admin/categoria")
        })
        .catch((error)=> {
            console.log(error)
            req.flash("error_msg", "Erro ao salvar. Favor tentar novamente")
            res.redirect("/admin/categoria/adicionar")
        })
    }    
})

router.get("/categoria/editar/:id", (req, res) =>{
   Categoria.findOne({ _id: req.params.id })
   .then((categoria)=>{
        res.render("categoria/editar", {categoria: categoria})
   })


})

router.post("/categoria/banco/editar", (req, res) => {
    const {id, nome, slug} = req.body;
    Categoria.findOneAndUpdate( id, {nome, slug})
    .then(() => res.send("salvo com sucesso"))
    .catch((error)=> res.send(`Erro ao atualizar ${nome}`))
})


router.post("/categoria/banco/deletar", (req, res) => {
    Categoria.remove({_id: req.body.id})
    .then(()=>{
        req.flash("success_msg", "deletado com sucesso")
        res.redirect("/admin/categoria")
    })
    .catch((error) => {
        req.flash("error_msg", "erro  ao deletar")
        res.redirect("/admin/categoria")
    })
})

router.get("/postagem", (req, res) => {

    Postagem.find()
    .populate("categoria")
    .then((postagem) => {
        res.render("postagem/postagens", { listaPosts:postagem })
    })
    .catch((error) => {
        console.error(error);
        res.redirect("/admin/postagem");
    })
})

router.get("/postagem/adicionar", (req, res) => {
    Categoria.find().then((categorias) =>{
        res.render("postagem/adicionar", {listaCategoria: categorias})
    })
    .catch((error) => {
        req.flash("error_msg", "Erro ao acessar o banco")
        res.redirect("postagem/adicionar")
    })
    
})

router.post("/postagem/banco/salvar", (req, res)=>{
    const {titulo, slug, descricao, conteudo, categoria} = req.body;
    
    const erros = [];

    if(categoria == "0"){
        erros.push({texto: "Categoria invalida"})
    }

    if(erros.length > 0){
        res.render("admin/postagem/adicionar", {erros:erros})
    }else{
        new Postagem({
            titulo, slug, descricao, conteudo, categoria
        })
        .save()
        .then(()=>{
            req.flash("success_msg", "Postagem foi salva com sucesso")
            res.redirect("/admin/postagem")
        })
        .catch((error) => {
            console.error(error);
            req.flash("error_msg", "Nao foi possivel salvar no banco")
            res.render("admin/postagem")
        })
    }
})

router.get("/postagem/editar/:id", (req, res) => {
   Postagem.findById(req.params.id)
   .then((dados) => {
        Categoria.find()
        .then((categorias) => {
            res.render("postagem/editar", {dados: dados, categorias: categorias})
        })
        .catch((error) => {
            console.error(error);
            res.render("postagem/editar")
        })
   })
   .catch((error) => {
       console.error(error);
       res.render("postagem/editar")
   })


})

router.post("/postagem/banco/editar", (req, res)=>{
    const {id, titulo, slug, descricao, conteudo, categoria} = req.body;

    Postagem.findOneAndUpdate(id,{
        titulo, 
        slug, 
        descricao, 
        conteudo, 
        categoria
    })
    .then(()=>{
        req.flash("success_msg", "Salvo com sucesso")
        res.redirect("/admin/postagem")
    })
    .catch((error)=>{
        req.flash("error_msg", "Erro ao salvar")
        res.redirect("/admin/postagem")
    })

})


router.post("/postagem/banco/deletar", (req, res) => {
    const {delete_id} = req.body;

    Postagem.remove({_id: delete_id})
    .then(()=>{
        res.redirect("/admin/postagem")
    })
    .catch((error)=>{
        req.flash("error_msg", "erro interno")
        res.redirect("/admin/postagem")
    })

})
module.exports = router;