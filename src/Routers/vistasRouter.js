import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const VistasRouter = Router()
const Manager = new ProductManager()

const ProdList = Manager.getProducts()

VistasRouter.get("/", (req, res)=> {
    res.render("home", {ProdList})
})

export default VistasRouter