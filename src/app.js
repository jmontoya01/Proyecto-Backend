const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))

const PUERTO = 8080

const ProductManager = require("./product-manager.js")

const manager = new ProductManager("./src/products.json")


app.get("/products", async (req, res) => {
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


app.get('/products/:pid', async (req, res) => {

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



app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

