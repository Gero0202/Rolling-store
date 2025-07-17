import { addProductToCartService, readProductsFromUserService, updateQuantityService, removeProductFromCartService, totalToPayService, updatedCartStateService, clearCartService } from "../services/carts.service.js";


const addProductToCart = async (req, res) => {

    const { product_id, quantity } = req.body
    const user_id = req.user.user_id


    const one = await addProductToCartService(product_id, user_id, quantity)
    res.json201(one)

}

const readProductsFromUser = async (req, res) => {
   
    const user_id = req.user.user_id
    const all = await readProductsFromUserService(user_id)
    if (all.length > 0) {
        return res.json200(all)
    }
    return res.json404()
    
}

const updateQuantity = async (req, res) => {
    
    const { cart_id } = req.params
    const { quantity } = req.body
    const one = await updateQuantityService(cart_id, quantity)
    if (one) {
        res.json200(one) 
    }
    res.json404()
    
};

const removeProductFromCart = async (req, res) => {
    
    const { cart_id } = req.params
    const one = await removeProductFromCartService(cart_id)
    if (one) {
        res.json200(one)
    }
    res.json404()
   
}

const totalToPay = async (req, res) => {
    const user_id = req.user.user_id
    const total = await totalToPayService(user_id)
    res.json200(total)
}

const updateCartState = async (req, res) => {
    const user_id = req.user.user_id;
    const updated = await updatedCartStateService(user_id, "paid");
    if (updated) {
        return res.json200(updated);
    }
    return res.json404();
};

const clearCart = async (req, res) => {
    const user_id = req.user.user_id;
    const result = await clearCartService(user_id);
    res.json200(result); 
};



export { addProductToCart, readProductsFromUser, updateQuantity, removeProductFromCart, totalToPay, updateCartState, clearCart }
