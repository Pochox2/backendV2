import { Router } from "express";
import userModel from "../models/usersmodel.js";

const router = Router()

router.get("/register", (req, res) => {
    res.render('sessions/register')
})

router.post("/register",  async (req, res)=> {
    const data = req.body
    if(data.email=="adminCoder@coder.com"){
        data.rol= "admin"
    } else {
        data.rol= "user"
    }
    const user = new userModel(data)
    await user.save()
    res.redirect("/session/login")
})

router.get("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email, password}).lean().exec()
    if (!user) {
        return res.render("errors/base", {
            error: "Email o contraseña incorrectos"
        })
    }
    if(user.email=="adminCoder@coder.com"){
        user.rol="admin"
    } else {
        user.rol="user"
    }
    req.session.user= {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        rol: user.rol
    }

    res.redirect("/products")
})

router.get("logout", (req, res)=>{
    req.session.destroy(err=> {
        if(err){
            res.render("errors/base", {error: err})
        } else {
            res.redirect("/session/login")
        }
    })
})
export default router