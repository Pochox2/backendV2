import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const ProductRouter = Router()
const Manager = new ProductManager()

ProductRouter.get("/", (req, res) => {
    const limite = req.query.limit
    let lista = Manager.getProducts()
    if(limite) {
        lista = lista.slice(0, limite)
    }
    res.send(lista)
})

export default ProductRouter   