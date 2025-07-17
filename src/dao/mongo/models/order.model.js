/**
 * 🛒 Esquema de Mongoose para el modelo de Orden de Compra.
 * Define la estructura de los datos de una orden, incluyendo los items comprados,
 * el total, el estado de la orden y la información relevante de Mercado Pago para el seguimiento del pago.
 */

// import { Schema, model, Types } from "mongoose";

// const collection = "orders"

// const schema = new Schema({
//     user_id: { type: Types.ObjectId, ref: "users", required: true },
//     items: [{
//         product_id: { type: Types.ObjectId, ref: "products", required: true },
//         title: String,
//         quantity: Number,
//         price: Number,
//         subtotal: Number,
//     }],
//     total: { type: Number, required: true },
//     status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
//     mp_payment_id: String,
//     mp_status: String,
//     mp_merchant_order: String
// }, { timestamps: true })

// const Order = model(collection, schema)
// export default Order