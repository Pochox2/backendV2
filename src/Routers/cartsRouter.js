import { Router } from "express";
import CartManager from "../Managers/CartManager.js";

const CartRouter = Router()
const Manager = new CartManager()

CartRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid
    const cart = await Manager.getProductsCartId(cid)
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

CartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cid=req.params.cid
    const pid=req.params.pid
    const resultado = await Manager.addProductCart(cid, pid)
    res.send(resultado)
})

CartRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid
    const newData = req.body
    await Manager.updateCart(cid, newData)
    res.send("Cart actualizado")
})

CartRouter.put("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body
    const newQuantity = quantity.quantity
    await Manager.updateProductQty(cid, pid, newQuantity)
    res.send("cantidad actualizada")
})

CartRouter.delete("/:cid/products/:pid", async (req, res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    await Manager.removeProductFromCart(cid, pid)
    res.send("Producto eliminado")
})

CartRouter.delete("/:cid", async (req, res) => {
    const cid = req.params.cid
    await Manager.removeCart(cid)
    res.send(`cart ${cid} elimnado`)
})


export default CartRouter   