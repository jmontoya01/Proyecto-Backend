const express = require("express")
const router = express.Router()

const ProductManager = require("../controllers/product-manager.js")
const manager = new ProductManager("./src/models/carrito.json")

//Routes

router.get("/carts", async (req, res) => {
    try {
        const carts = await manager.leerArchivo()
        res.json(carts)
    } catch (error) {
        console.error("Error al optener el carrito de compras", error)
        res.json({error: "Error del servidor"})
    }

})

module.exports = router