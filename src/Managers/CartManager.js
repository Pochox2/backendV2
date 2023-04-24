const fs= require("fs");


class CartManager {
    constructor() {
        this.products = []
        this.index = 0
        this.path= "./desafio2.json"
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t" ))
    }

    getProducts = () => {
        const listProduct = fs.readFileSync(this.path, "utf-8")
        return (listProduct)
    }

    getProductsbyId(id) {
        const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        const product=productos.find((a) => a.id===id);
        if(product) {
            return product}
        else {
            console.log("El id no coincide con ningun producto");
            return null;
        }
    }

    addProduct = (tittle, description, price, thumbnail, code, stock) => {
        this.index++
        const id = this.index
        const newProduct = {id, tittle, description, price, thumbnail, code, stock}
        if (!tittle || !description || !price || !thumbnail || !code || !stock) {
            return console.error("Faltan datos")
            } 
        
        const ProductRep = this.products.some((product) => product.code === code)
            if (ProductRep) {
                return console.error("El codigo del producto ya existe")
            }  else {
                this.products.push(newProduct)
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
            }    
    }

    removeProduct = (id) => {
        const remove = this.products.findIndex(prod=>prod.id === id)
        if (remove !== -1) {
            this.products.splice(remove, 1)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
        }
        else {
            return console.log("El id no coincide con el de ningun producto")
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

