import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    tittle:{
        type: String,
        required: true
    }, 
    description:{
        type: String,
        required: true
    }, 
    price: {
        type:Number,
        required:true, 
        min: 0
    },
    status: Boolean,
    category: {
        type: String,
        required:true,
        enum: ["COLLARES", "PULSERAS" ],
        default:"COLLARES"
    },
    thumbnail: {
        type:String,
        default:"../../public/img/logo.jpeg"
    },
    code: {
        type:String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min:0
    }

})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model (productsCollection, productsSchema)
export default productsModel

