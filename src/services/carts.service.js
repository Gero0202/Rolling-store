import {addProductToCartRep, readProductsFromUserRep, updateQuantityRep , removeProductFromCartRep, totalToPayRep, updatedCartStateRep, clearCartRep} from "../repositories/carts.rep.js"
import { productsManager } from "../dao/dao.factory.js"

const addProductToCartService = async(product_id, user_id, quantity) =>  {

    const product = await productsManager.readById(product_id)

    if (!product) {
        throw new Error("Producto no encontrado.")
    }

    if (quantity !== 1) {
        throw new Error("La cantidad de productos debe ser 1")
    }

    if (product.stock < quantity) {
        throw new Error("Stock insuficiente para la cantidad solicitada")
    }

    const updateCart = await addProductToCartRep(product_id, user_id, quantity)

    return updateCart
}
    
const readProductsFromUserService = async(user_id) => await readProductsFromUserRep(user_id)
const updateQuantityService = async(cart_id, quantity) => await updateQuantityRep(cart_id, quantity)
const removeProductFromCartService = async(cart_id) => await removeProductFromCartRep(cart_id)
const totalToPayService = async(user_id) => await totalToPayRep(user_id)
const updatedCartStateService = async(user_id, state) => await updatedCartStateRep(user_id, state)
const clearCartService = async(user_id) => await clearCartRep(user_id)

export { addProductToCartService, readProductsFromUserService, updateQuantityService , removeProductFromCartService, totalToPayService, updatedCartStateService, clearCartService }