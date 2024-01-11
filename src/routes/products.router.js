const express = require("express")
const router = express.Router()

const ProductManager = require("../controllers/product-manager")
const manager = new ProductManager("./src/models/products.json")


//Routes

router.get("/products", async (req, res) => {
    try {
        const arrayProducts = await manager.leerArchivo()

        let limit = parseInt(req.query.limit)

        if (limit) {
            const arrayLimit = arrayProducts.slice(0, limit)
            return res.send(arrayLimit)
        } else {
            return res.send(arrayProducts)
        }


    } catch (error) {
        return res.send("Error al cargar los productos", error)
    }
})

router.get('/products/:pid', async (req, res) => {

    try {
        let pid = parseInt(req.params.pid)

        const searchId = await manager.getProductById(pid)

        if (searchId) {
            return res.send(searchId)
        } else {
            res.send("Id de producto no encontrado")
        }

    } catch (error) {
        console.error(error)
        res.send("Error al buscar el id del producto")
    }
})

module.exports = router