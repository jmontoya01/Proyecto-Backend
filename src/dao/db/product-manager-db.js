const ProductModel = require("../models/products.model.js")

class ProductManager {
    async addProduct(nuevoObjeto) {

        let { title, description, price, img, code, stock, category, thumbnails } = nuevoObjeto

        if (!title || !description || !price || !img || !code || !stock ||!category) {
            console.log("Todos los campos son hobligatorios para continuar", error)
            return
        }

        const productExists = await ProductModel.findOne({ code: code })
        if (productExists) {
            console.log("El código debe ser único", error)
            return
        }

        const newProduct = new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
        })

        await newProduct.save()
    }

    async getProducts() {
        try {
            const products = await ProductModel.find()
            return products
        } catch (error) {
            console.log("Error al optener los productos", error)
        }
    }

    async getProductsById(id) {
        try {
            const product = await ProductModel.findById(id)

            if (!product) {
                console.log("Producto no encontrado", error)
                return null
            }
            console.log("Producto encontrado con éxito!!")
            return product
        } catch (error) {
            console.log("Error al buscar el producto por id", error)
        }
    }

    async updateProduct(id, productoActualizado) {
        try {

            const productUpdate = await ProductModel.findByIdAndUpdate(id, productoActualizado)

            if (!productUpdate) {
                console.log("No se encontro el producto")
                return null
            }
            console.log("Producto actualizado con éxito")
            return productUpdate

        } catch (error) {
            console.log("Error al actualizar el producto", error)
        }
    }

    async deleteProduct(id){
        try {
            const deleteP = await ProductModel.findByIdAndDelete(id)

            if(!deleteP){
                console.log("No se encontro producto para eliminar")
                return null
            }

            console.log("Se elimino el producto correctamente")

        } catch (error) {
            
        }
    }

}

module.exports = ProductManager