import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const RtpRouter=Router()
const Manager= new ProductManager()

const ProdList = Manager.getProducts()

RtpRouter.get("/", (req, res) => {
    res.render('ProductosTiempoReal', {ProdList})
})

RtpRouter.post("/", (req, res)=> {
    const data = req.body

    if(!data.tittle || !data.price || !data.category || !data.description || !data.stock){
        res.send("Campos incompletos")
    } else {
        Manager.addProduct(data)
        res.render('ProductosTiempoReal')
    }
})

export default RtpRouter