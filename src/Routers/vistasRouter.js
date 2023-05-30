import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";
import CartManager from "../Managers/CartManager.js";
import handlebars from "express-handlebars"

const VistasRouter = Router()
const PManager = new ProductManager()
const CManager = new CartManager()
const HB = handlebars.create({})

VistasRouter.get("/products", async (req, res)=> {
    const resultado = await PManager.getProductsPaginated(100)
    resultado.prevlink = resultado.hasPrevPage ? `/?page=${resultado.prevPage}` : ``
    resultado.nextlink = resultado.hasNextPage ? `/?page=${resultado.nextPage}` : ``
    res.render("home", resultado)
})

VistasRouter.get("/cart/:cid", async (req, res)=>{
    const cid = req.params.cid
    const cartElegido = await CManager.getProductsCartId(cid)
    HB.handlebars.registerHelper("subtotal", function(){
        return this.quantity*this.pid.price
    })
    res.render("cart", {
        cartElegido,
        cid
    })
})

export default VistasRouter