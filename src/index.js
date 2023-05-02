import  express  from "express";
import handlebars  from "express-handlebars";
import ProductRouter from "./Routers/productsRouter.js";
import CartRouter from "./Routers/cartsRouter.js";
import VistasRouter from "./Routers/vistasRouter.js";
import RtpRouter from "./Routers/rtpRouter.js";
import __dirname from "./utils.js"
import { Server } from "socket.io";
const app = express();
app.engine("handlebars", handlebars.engine())
app.set("vistas", __dirname+"/views")
app.set("view engine", "handlebars")

app.use(express.json())

app.use("/api/products", ProductRouter)

app.use("/api/carts", CartRouter)

app.use("/", VistasRouter)

app.use("/productosentiemporeal", RtpRouter)



const httpServer = app.listen(8080, ()=> console.log ("Server up"))
const ServerSocket = new Server (httpServer)
ServerSocket.on("connection", socketClient => {
    socketClient.on("ProdList", ProdList => {
        ServerSocket.emit(ProdList)
    })
})

