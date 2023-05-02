import fs from "fs"

class ProductManager {
    constructor() {
        this.path= "./src/data/products.json"
        this.index = 0
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
    
    codeGenerator = () => {
        const codedigs="abcdefghi0123456"
        let string = "";
        for (let i = 0; i < 6; i++) {
            string += codedigs.charAt(Math.floor(Math.random() * codedigs.length));
        }
        return string
    }

    codeValidator = () => {
        const products = this.getProducts()
        let code;
        let code1;
        do {
            code = this.codeGenerator()
            code1 = products.find(p => p.code) == code
        } while (code1 != undefined)
        return code
    }

    addProduct = (tittle, description, price, category, stock, thumbnail) => {
        this.index++
        const id = this.index
        let products = this.getProducts()
        const code = this.codeValidator()
        thumbnail ? thumbnail : thumbnail="vacio"
        const newProduct = {id, tittle, description, code, price, category, status:true, stock, thumbnail}        
        products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(products, null))
        console.log("Producto creado")
    }

    removeProduct = (id) => {

        const remove = this.getProductsbyId(id)
        let products = this.getProducts()
        if (remove !== -1) {
            this.products.splice(remove, 1)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
        }
        else {
            return console.log("El id no coincide con el de ningun producto")
        }
    }

    

    updateProd = (prodid, data) => {
        let products = this.getProducts()
        const prodtoUpdate = products.findIndex(prod=>prod.id == prodid)
        const prod = this.getProductsbyId(prodid)


        if (prod.id == prodid) {
           if (prodtoUpdate != 1) {
            products[prodtoUpdate]={...products[prodtoUpdate], ...data}
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
            console.log("El producto ha sido actualizado") 
           } else {
                console.log("El id no coincide con el de ningun producto")
           }
        }else {
             console.log("No pudo haber modificaciones")
        }
    }

}

export default ProductManager;