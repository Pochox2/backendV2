import { Router } from "express";

const CartRouter = Router()

CartRouter.get("/", (req, res) => {
    res.send("Chill")
})

export default CartRouter   