import mongoose from "mongoose";
import handlebars  from "express-handlebars";
import  express  from "express";


import ProductRouter from "./Routers/productsRouter.js";
import CartRouter from "./Routers/cartsRouter.js";
import VistasRouter from "./Routers/vistasRouter.js";

mongoose.set("strictQuery", false)
const app = express();
const ur = "mongodb+srv://leooinsua79:quimtech29@quartz.qk2xdtr.mongodb.net/"

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)
app.use("/", VistasRouter)

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

try {
    await mongoose.connect(ur)
    console.log("Mongo conectado")
    app.listen(8080, ()=> console.log("Server up"))
} catch(err) {
    console.log(err)
}
