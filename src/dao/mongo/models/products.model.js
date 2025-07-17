import { Schema, model } from "mongoose";

const collection = "products"
const schema = new Schema({
    title: { type: String, required: true, index: true },
    category: { type: String, default: "none", enum: ["vinilo", "cd"] ,index: true }, 
    stock: { type: Number, default: 10 },
    price: { type: Number, default: 10 },
    thumbnails: { type: [String], default: ["https://i.pinimg.com/736x/00/22/f7/0022f79582483ded38a7011bc101f34a.jpg"] }

}, { timestamps: true })


const Product = model(collection, schema)
export default Product 