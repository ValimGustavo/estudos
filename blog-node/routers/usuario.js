const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")

const Usuario = mongoose.model("usuarios")

router.get("/registrar", (req, res) => {
    res.render("usuario/registrar")
})


module.exports = router;