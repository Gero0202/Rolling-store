import { Types } from "mongoose";
import Manager from "./manager.mongo.js";
import Cart from "./models/carts.model.js";

class CartsManager extends Manager {
    constructor() {
        super(Cart)
    }
    addProductToCart = async (data) => {
        try {

            const { product_id, user_id, quantity } = data

            const existing = await Cart.findOne({
                product_id,
                user_id,
                state: "reserved"
            })

            if (existing) {
                existing.quantity += quantity
                await existing.save()
                return existing
            }

            const one = await this.create({ ...data })
            return one
        } catch (error) {
            throw error
        }
    }
    readProductsFromUser = async (user_id) => {
        try {
            const all = await this.readAll({ user_id })
            return all
        } catch (error) {
            throw error
        }
    }
    updateQuantity = async (cart_id, quantity) => {
        try {
            const filter = { _id: cart_id}
            const data = { quantity }
            const one = await this.updateOne(filter, data)
            return one
        } catch (error) {
            throw error
        }
    }
    removeProductFromCart = async (cart_id) => {
        try {
            const one = await this.destroyById(cart_id)
            return one
        } catch (error) {
            throw error
        }
    }
    totalToPay = async (uid) => {
        try {
            const pipeline = [
                { $match: { user_id: new Types.ObjectId(uid), state: "reserved" } },
                { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "product" } },
                { $unwind: "$product" },
                { $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" } },
                { $unwind: "$user" },
                { $addFields: {
                    subtotal: { $multiply: ["$product.price", "$quantity"]}
                }},
                { $group : {
                    _id: "$user_id",
                    email: { $first: "$user.email" },
                    products: {
                        $push: {
                            product_id: "$product_id",
                            cart_id: "$_id",
                            title: "$product.title",
                            price: "$product.price",
                            quantity: "$quantity",
                            subtotal: "$subtotal",
                            state: "$state"
                        }
                    },
                    total: { $sum: "$subtotal"}
                }},
                { $project: { _id: 0}}
            ]
            const total = await this.model.aggregate(pipeline)
            return total
        } catch (error) {
            throw error
        }
    }

    

    updateState = async (uid, state) => {
        try {
            const filter = { user_id: uid }
            const data = { state }
            const one = await this.updateMany(filter, data)
            return one
        } catch (error) {
            throw error
        }
    }

    clearCart = async (uid) => {
        try {
            const filter = { user_id: uid , state: "reserved"}
            const one = await this.destroyMany(filter)
            return one
        } catch (error) {
            throw error
        }
    }
}

const cartsManager = new CartsManager()
export default cartsManager