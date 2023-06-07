import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";
import CartManager from "../Managers/CartManager.js";
import handlebars from "express-handlebars";
import session from "express-session";

const VistasRouter = Router()
const PManager = new ProductManager()
const CManager = new CartManager()
const HB = handlebars.create({})

VistasRouter.get("/", async (req, res)=> {
    
    let limit = req.query.limit
    if(!limit) limit=10
    let page = req.query.page
    if(!page) page=1
    
    const category = req.query.category
    const sort = req.query.sort
    const resultado = await PManager.getProductsPaginated(limit, page, category, sort)
    
    resultado.prevlink = resultado.hasPrevPage ? `/products/?limit=${limit}&page=${resultado.prevPage}` : ``
    resultado.nextlink = resultado.hasNextPage ? `/products/?limit=${limit}&page=${resultado.nextPage}` : ``

    const user = req.session.user
    res.render("home", {resultado, user})
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