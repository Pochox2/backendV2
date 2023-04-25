import { Router } from "express";
import CartManager from "../Managers/CartManager.js";

const CartRouter = Router()
const Manager = new CartManager()

CartRouter.get("/:cartid", (req, res) => {
    const cartid = req.params.cartid
    const cart = Manager.getProductsCartId(cartid)
    if(cart==false){
        res.send("El carro no existe")
    } else {
        res.send(cart)
    }
})

CartRouter.post("/", (req, res)=> {
    Manager.CartCreate()
    res.send("Carro creado")
})

CartRouter.post("/:cartid/products/:prodid", (req, res) => {
    const cartid=req.params.cartid
    const prodid=req.params.prodid
    Manager.addProductCart(cartid, prodid)
    res.send("Producto agregado al carro")
})

export default CartRouter   