import { express } from "express";
import ProductRouter from "./Routers/productsRouter";
// import CartRouter from "./Routers/cartsRouter";import { NextFunction } from "express"

const app = express();

app.use("/api/products", ProductRouter)

// app.use("/api/carts", CartRouter)

app.lister(8080, () => console.log ("Server up"))