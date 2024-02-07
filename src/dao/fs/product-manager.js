const { error, clear } = require("console");

const fs = require("fs").promises


class ProductManager {
    static ultiId = 0

    constructor(path) {
        this.products = [];
        this.path = path
    };

    async addProduct(nuevoObjeto) {

        let { title, description, price, img, code, stock, thumbnails } = nuevoObjeto

        if (!title || !description || !price || !img || !code || !stock || !thumbnails) {
            console.log("Todos los campos son hobligatorios para continuar ")
            return
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo tiene que ser unico")
            return
        }

        const newProduct = {
            id: ++ProductManager.ultiId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct)

        await this.guardarArchivo(this.products)

    }

    async getProducts() {
        try {
            const arrayProducts = await this.leerArchivo()
            return arrayProducts
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error
        }
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo()
            const buscar = arrayProductos.find(item => item.id === id)
            if (!buscar) {
                console.log("Producto no encontrado")
            } else {
                console.log("Producto encontrado con éxito")
                return buscar
            }

        } catch {
            console.log("error al leer el archivo", error)
        }

    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8")
            const arrayProductos = JSON.parse(respuesta)
            return arrayProductos

        } catch (error) {
            console.log("Error al leer el archivo", error)
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))

        } catch (error) {
            console.log("Error al guardar el archivo", error)
        }
    }


    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo()
            const index = arrayProductos.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado)
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("No se encontro el producto")
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error)
        }
    }

    async borrarProducto(id) {
        try {
            const arrayProductos = await this.leerArchivo()
            const index = arrayProductos.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProductos.splice(index, 1)
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("No se encontro el producto")
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error)
        }
    }

}

module.exports = ProductManager