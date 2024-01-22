const express = require("express")
const app = express()
const PUERTO = 8080

const productsRouter = require("./routes/products.router.js")
const cartsRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")


//handlebars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.get("/", (req, res) => {
    res.render("index", {title: "Proyecto Backend"})
})

//multer
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("Se cargo el archivo con exito ")
})

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("./src/public"))

//Routes

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)



app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

