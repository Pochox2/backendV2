import fs from "fs"

class ProductManager {
    constructor() {
        this.products = []
        this.index = 0
        this.path= "../data/productos.json"
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t" ))
    }

    getProducts = () => {
        const listProduct = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        return (listProduct)
    }

    getProductsbyId(id) {
        try {
        const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        const product=productos.find((a) => a.id===id);
        if(product) {
            return product}
        else {
            console.log("El id no coincide con ningun producto");
            return null;
        }}
        catch(error) {
            console.error(error)
        }

    }

    addProduct = (tittle, description, code, price, status, stock, thumbnail) => {
        this.index++
        const id = this.index
        thumbnail ? thumbnail : thumbnail="vacio"
        const newProduct = {id, tittle, description, code, price, status:true, stock, thumbnail}
        if (!tittle || !description || !price || !code || !stock || !status) {
            return console.error("Faltan datos")
            } 
        
        const ProductRep = this.products.some((product) => product.code === code)
            if (ProductRep) {
                return console.error("El codigo del producto ya existe")
            }  else {
                this.products.push(newProduct)
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
                console.log("Producto añadido")
            }    
    }

    removeProduct = (id) => {
        try {
        const remove = this.products.findIndex(prod=>prod.id === id)
        if (remove !== -1) {
            this.products.splice(remove, 1)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
        }
        else {
            return console.log("El id no coincide con el de ningun producto")
        }}
        catch (error) {
            console.log(error)
        }
    }

    updateProd = (id, prop, cambio) => {
        const prodtoUpdate = this.products.findIndex(prod=>prod.id === id)
        if (prodtoUpdate !== -1) {
            this.products[prodtoUpdate][prop]=cambio
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
        }
        else {
            return console.log("El id no coincide con el de ningun producto")
        }
    }

}

export default ProductManager;