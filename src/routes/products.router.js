const express = require("express")
const router = express.Router()

const ProductManager = require("../dao/db/product-manager-db.js")
const manager = new ProductManager()


//Routes

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await manager.getProducts()
        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        console.error("Error al cargar los productos", error)
        res.status(500).json({ error: "error interno del servidor" })
    }
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    try {
        const product = manager.getProductsById(id)

        if (!product) {
            return res.json({ error: "producto no encontrado" })
        }
        res.json(product)

    } catch (error) {
        console.error("Error al buscar el producto", error)
        res.status(500).json({ error: "error interno del servidor" })
    }
})

router.post("/", async (req, res) =>{
    const newProduct = req.body
    try {
        await manager.addProduct(newProduct)
        res.status(201).json({message: "Producto agregado con éxito"})
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({ error: "Error interno del servidor"})
    }
    
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const updateProduct = req.body

    try {
        await manager.updateProduct(id, updateProduct)
        res.json({message: "Producto actualizado exitosamente"})
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({error: "Error interno del servidor"})
    }
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid

    try {
        await manager.deleteProduct(id)
        res.json({message: "Producto eliminado con éxito"})
    } catch (error) {
        console.error("Error al eliminar el producto", error)
        res.status(500).json({error: "Error interno del servidor"})
    }
})

module.exports = router