import fs from "fs"


class CartManager {
    constructor() {
        this.path="./src/data/cart.json"
    }

    getCarts = () => {
        const listCart = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        return (listCart)
    }

    getProductsCartId(cartid) {
        const cart = this.getCartId(cartid)
        if(cart === -1) {
            return false }
        return(cart.products)
    }

    getCartId = (cartid) => {
        const carts = this.getCarts()
        const cartElegido = carts.find(cart => cart.cartid === parseInt(cartid))
        if (cartElegido) {
            return cartElegido
        }
        return 0 
        
    }

    IdGenerator = () => {
        let carts = this.getCarts()
        if(carts.lenght === 0) {
            return 1
        }
        return carts[carts.lenght-1].cartid +1
    }

    CartCreate = () => {
        let carts = this.getCarts()
        const cartid = parseInt(this.IdGenerator())
        const cartNew = {cartid, products:[]}
        carts.push(cartNew)
        fs.writeFileSync(this.path, JSON.stringify(carts, null))
        console.log("Carro creado")
    }

    addProductCart = () => {
        let carts = this.getCarts()
        const cartIndex = carts.findIndex(cart => cart.cartid == parseInt(cartid))
        const prodIndex = carts[cartIndex].products.findIndex(p => p.prodid == parseInt(prodid))

        if (prodIndex== -1) {
            let productAdd={"prodid" : +prodid, "quantity":1}
            carts[cartIndex].products.push(productAdd)
        } else {
            carts[cartIndex].products[prodIndex].quantity++
        }
        fs.writeFileSync(this.path, JSON.stringify(carts, null))
        console.log("Producto agregado al carrito")
    }

}

export default CartManager

