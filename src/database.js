const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jeffquetas:jeff1302@cluster0.zqiftye.mongodb.net/ecomerce?retryWrites=true&w=majority")
    .then(() => console.log("Conexión exitosa con Mongodb"))
    .catch(() => console.log("Ocurrio un error al conectar Mongodb") )
