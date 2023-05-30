import cartsModel from "../models/carritomodel.js"


class CartManager {
   

    getCarts = async() => {
        const listCart = await cartsModel.find({}).lean().exec()
        return (listCart)
    }

    getProductsCartId = async(cid) => {
        const cartAmostrar = await cartsModel.findOne({_id: cid}).populate("products.pid").lean().exec()
        return (cartAmostrar)
    }

    getCartId = async (cid) => {
        try {
        const cart = await cartsModel.paginate({_id: cid}, {
            limit: 1,
            page: 1,
            lean: true
        })
        return (cart) 
        } catch (err){
            console.log(err)
        }
    }

    generateId= async () =>{
        let list= await this.getCarts()
        if(list.length === 0) return 1
        return list[list.length-1].cid +1
    }

    CartCreate = async () => {
        const cartNew = { products:[]}
        const cartGenerado = new cartsModel(cartNew)
        await cartGenerado.save()
        return cartGenerado
    }

    addProductCart = async (cid, pid) => {
        const cartElegido = await cartsModel.findOne({_id: cid})
        const repetido = cartElegido.products.find(y => y.pid == pid)

        if (repetido != undefined) {
            repetido.quantity++
        } else {
            cartElegido.products.push({ 
                pid: pid,
                quantity: 1})}
       const resultado = await cartsModel.updateOne({_id : cid}, cartElegido)
       console.log(resultado)
       console.log(`Producto ${pid} añadido al carrito ${cid}`)
    }
    


    removeCart= async(cid)=>{
        const removed= await cartsModel.removeCart({_id:cid})
        console.log(removed)
    }

    removeProductFromCart= async(cid, pid)=>{
        const cartElegido= await cartsModel.findOne({_id: cid})
        const productToRemove= cartElegido.products.find(y => y.pid == pid)
        const idx= cartElegido.products.findIndex(y => y.pid == pid)
        if(productToRemove.quantity > 1){
            productToRemove.quantity = productToRemove.quantity-1
        }else{
            cartElegido.products.splice(idx, 1)
        }
        const resultado= await cartsModel.updateOne({_id:cid}, cartElegido)
        console.log(`Producto ${pid} eliminado del carrito ${cid}`)
        console.log(resultado)
    }
    updateCart= async(cid, newData)=>{
        const cartToUpdate= await cartsModel.findOne({_id:cid})
        cartToUpdate.products=[]
        cartToUpdate.products.push(newData)
        const resultado= await cartsModel.updateOne({_id:cid}, cartToUpdate)
        console.log(resultado)
    }
    updateProductQty= async(cid, pid, newQty)=>{
        const cartToUpdate= await cartsModel.findOne({_id:cid})
        const productIdy = cartToUpdate.products.findIndex(y => y.pid == pid)
        cartToUpdate.products.splice(productIdy, 1)
        cartToUpdate.products.push({
            pid: pid,
            quantity: newQty
        })
        const resultado= await cartsModel.updateOne({_id:cid}, cartToUpdate)
        console.log(resultado)
    }
}

    



export default CartManager

