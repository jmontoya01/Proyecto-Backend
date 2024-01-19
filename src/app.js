const express = require("express")
const app = express()
const PUERTO = 8080
const productsRouter = require("./routes/products.router.js")
const cartsRouter = require("./routes/carts.router.js")


//handlebars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.get("/", (req, res) => {
    res.render("index")
})



//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("./src/public"))

//Routes

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)



app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

