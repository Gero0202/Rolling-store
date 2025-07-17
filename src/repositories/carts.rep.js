import cartsManager from "../dao/mongo/carts.mongo.js";
import CartsDto from "../dto/carts.dto.js";

const addProductToCartRep = async(product_id, user_id, quantity) => {
    const data = new CartsDto({product_id, user_id, quantity})
    return await cartsManager.addProductToCart(data)
}    
const readProductsFromUserRep = async(user_id) => await cartsManager.readProductsFromUser(user_id)
const updateQuantityRep = async(cart_id, quantity) => await cartsManager.updateQuantity(cart_id, quantity)
const removeProductFromCartRep = async(cart_id) => await cartsManager.removeProductFromCart(cart_id)
const totalToPayRep = async(user_id) => await cartsManager.totalToPay(user_id)
const updatedCartStateRep = async(user_id, state) => await cartsManager.updateState(user_id, state)
const clearCartRep = async(user_id) => await cartsManager.clearCart(user_id)

export { addProductToCartRep, readProductsFromUserRep, updateQuantityRep , removeProductFromCartRep, totalToPayRep, updatedCartStateRep, clearCartRep }