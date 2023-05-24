import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const router = Router()
const Manager= new ProductManager()

const ProdList = Manager.getProducts()

router.get("/", (req, res) => {
    res.render('realtimeproducts', {ProdList})
})

router.post("/realtimeproducts", (req, res)=> {
    const data = req.body

    if(!data.tittle || !data.price || !data.category || !data.description || !data.stock){
        res.send("Campos incompletos")
    } else {
        Manager.addProduct(data)
        res.render('realtimeproducts')
    }
})

export default router