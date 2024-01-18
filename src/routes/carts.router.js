const express = require("express")
const router = express.Router()
const cartManager = require("../controllers/cart-manager.js")
const manager = new cartManager("./src/models/carts.json")

router.post("/", async (req, res) => {
    try {
        const newCart = await manager.createCarts()
        res.json(newCart)
    } catch (error) {
        console.error("Error al crear un nuevo carrito de compras", error)
        res.status(500).json({ error: "Error del servidor"})
    }
})

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid)

    try {
        const cart = await manager.getCartById(cartId)
        res.json(cart.products)
    } catch (error) {
        console.error("Error al obtener el carrito", error)
        res.status(500).json({error: "Error del servidor"})
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = req.params.pid
    const quantity = req.body.quantity || 1
    
    try {
        const updateCart = await manager.addProductToCart(cartId, productId, quantity)
        res.json(updateCart.products)
    } catch (error) {
        console.error("Error al agregar productos al carrito de compras", error)
        res.status(500).json({ error: "Error del servidor"})
    }
})



module.exports = router