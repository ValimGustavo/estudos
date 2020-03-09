const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require("../models/Categoria");

const Categoria = mongoose.model("categoria")

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
module.exports = router;