import  express  from "express";
import ProductRouter from "./Routers/productsRouter.js";
import CartRouter from "./Routers/cartsRouter.js";
const app = express();

app.use(express.json())

app.use("/api/products", ProductRouter)

app.use("/api/carts", CartRouter)

app.listen(8080, () => console.log ("Server up"))