import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const ProductRouter = Router()
const Manager = new ProductManager()

ProductRouter.get("/", async (req, res) => {


    const resultado = await Manager.getProductsPaginated(100)
    console.log(resultado)
    resultado.prevLink = resultado.hasPrevPage ? `/?page=${resultado.prevPage}` : ''
    resultado.nextLink = resultado.hasNextPage ? `/?page=${resultado.nextPage}` : ''
    res.json(resultado)
})

ProductRouter.get("/:pid", async (req, res) =>{
    const pid =req.params.pid
    const product= await Manager.getProductsbyId(pid)
    res.render("detalles", {product})
})

ProductRouter.post("/", async (req, res) => {
    const data = req.body
    if(!data.tittle || !data.description || !data.price || !data.stock|| !data.category){
        res.send("Faltan datos")
    }else{
        await Manager.addProduct(data)
        res.send("Producto creado")
    }
})

ProductRouter.put("/:pid", async (req, res) =>{
    const pid= req.params.pid
    const data= req.body
    await Manager.updateProd(pid, data)
    res.send("Producto actualizado")
})

ProductRouter.delete("/:pid", async (req, res) => {
    const pid=req.params.pid
    await Manager.removeProduct(pid)
    res.send("Producto eliminado")
})


export default ProductRouter   