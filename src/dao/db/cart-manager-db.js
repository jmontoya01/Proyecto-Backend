const CartModel = require("../models/cart.model.js")

class CartManager {
    async createCart() {
        try {
            const newCart = new CartModel({products: []})
            await newCart.save()
            return newCart
        } catch (error) {
            console.log("Error al crear un nuevo carrito de compras", error)
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId)
            if(!cart) {
                console.log("No existe el carrito con el id")
                return null 
            }
            return cart
        } catch (error) {
            console.log("Error al traer el carrito de compras", error)
        }
    }

    async addProductCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId)
            const productExist = cart.products.find(item => item.product.toString() === productId)

            if(productExist) {
                productExist.quantity += quantity
            } else {
                cart.products.push({product: productId, quantity})
            }

            //marcamos la propiedad products como modificada antes de guardar
            cart.markModified("products")

            await cart.save()
            return cart
        } catch (error) {
            console.log("Error al agregar un producto", error)
        }
    }

}

module.exports = CartManager