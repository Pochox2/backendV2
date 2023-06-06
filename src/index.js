import mongoose from "mongoose";
import handlebars  from "express-handlebars";
import  express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";


import ProductRouter from "./Routers/productsRouter.js";
import CartRouter from "./Routers/cartsRouter.js";
import VistasRouter from "./Routers/vistasRouter.js";
import router from "./Routers/sessionRouter.js"; 
mongoose.set("strictQuery", false)

const app = express();
const ur = "mongodb+srv://leooinsua79:elvisreloco@quartz.qk2xdtr.mongodb.net/"

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)
app.use("/products", VistasRouter)
app.use("/session", router)

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

app.use(session({
    store: MongoStore.create({
        mongoUrl: ur,
        dbName: "Quartz"
    }),
    secret: "adminCod3r123",
    resave: true,
    saveUninitialized: true
}))

try {
    await mongoose.connect(ur)
    console.log("Mongo conectado")
    app.listen(8080, ()=> console.log("Server up"))
} catch(err) {
    console.log(err)
}
