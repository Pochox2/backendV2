import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const ProductRouter = Router()
const Manager = new ProductManager()

ProductRouter.get("/", (req, res) => {
    const limite = req.query.limite
    let lista = Manager.getProducts()
    if(limite) {
        lista = lista.slice(0, limite)
    }
    res.send(lista)
})

ProductRouter.post("/", (req, res) => {
    const data = req.body
    if(!data.tittle || !data.description || !data.price || !data.stock|| !data.category){
        res.send("Faltan datos")
    }else{
        Manager.addProduct(data)
        res.send("Producto creado")
    }
})

ProductRouter.put("/:productid", (req, res) =>{
    const productid =req.params.productid
    const data= req.body
    Manager.updateProd(productid, data.prop, data.cambio)
    res.send("Producto actualizado")
})

ProductRouter.delete("/:productid", (req, res) => {
    const productid=req.params.productid
    Manager.removeProduct(productid)
    res.send("Producto eliminado")
})

ProductRouter.get("/:productid", (req, res) =>{
    const productid =req.params.productid
    const product=Manager.getProductsbyId(+productid)
    res.send(product)
})

export default ProductRouter   