import { readAllService, readByIdService } from "../services/products.service.js"
import { totalToPayService, removeProductFromCartService, updatedCartStateService, clearCartService, addProductToCartService } from "../services/carts.service.js"
import { Types } from "mongoose"


const indexView = async (req, res) => {

    const all = await readAllService()
    const data = {
        title: "Home",
        products: all
    }
    return res.status(200).render("index", data)
}

const productView = async (req, res) => {
    const { pid } = req.params

    const one = await readByIdService(pid)
    const data = {
        title: "Producto",
        product: one
    }
    return res.status(200).render("product", data)
}

const registerProductView = (req, res) => {
    const data = {
        title: "Register Product"
    };
    return res.status(200).render("registerProduct", data);
};

const contactView = (req, res) => {
    const data = {
        title: "Contacto"
    };
    return res.status(200).render("contact", data);
}

const usView = (req, res) => {
    const data = {
        title: "Nosotros"
    };
    return res.status(200).render("us", data);
}


const getCartView = async (req, res) => {
    const uid = req.user.user_id;

    const cartData = await totalToPayService(uid)
    const data = {
        title: "Carrito",
        cart: cartData[0]
    }

    return res.status(200).render("cart", data);
};



const removeProductFromCartView = async (req, res) => {
    const { cart_id } = req.params;

    await removeProductFromCartService(cart_id)
    const uid = req.user.user_id;

    const cartData = await totalToPayService(uid)
    const data = {
        title: "Carrito",
        cart: cartData[0],
        message: "Producto eliminado del carrito"
    };
    return res.status(200).render("cart", data);
};





const updateCartStateView = async (req, res) => {
    const uid = req.user.user_id;

    await updatedCartStateService(uid, "paid")

    const cartData = await totalToPayService(uid)
    const data = {
        title: "Carrito",
        cart: cartData.length > 0 ? cartData[0] : null,
        message: "Compra realizada con éxito"
    };
    return res.status(200).render("cart", data);
};



const addProductToCartView = async (req, res) => {
    const { pid } = req.params;

    if (!pid || typeof pid !== 'string') {
        return res.status(400).json({ status: 'error', message: 'ID de producto invalido o ausente.' });
    }
    if (!Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ status: 'error', message: 'Formato de ID de producto no válido.' });
    }


    const uid = req.user.user_id;
    const quantity = 1;

    await addProductToCartService(pid, uid, quantity)

    const updatedCartData = await totalToPayService(uid)
    const data = {
        title: "Carrito",
        cart: updatedCartData[0],
        message: "Producto agregado al carrito"
    }

    return res.status(200).render("cart", data);
};

const clearCartView = async (req, res) => {
    const uid = req.user.user_id;


    await clearCartService(uid)

    const cartData = await totalToPayService(uid)
    const data = {
        title: "Carrito",
        cart: cartData[0],
        message: "El carrito ha sido vaciado exitosamente"
    };

    return res.status(200).render("cart", data);
};

const registerView = async (req, res) => {
    res.status(200).render("registerUser", { title: "Register form" })
}

const loginView = async (req, res) => {
    res.status(200).render("login", { title: "Login form" })
}

const profilView = async (req, res) => {
    const { name, email, city, avatar } = req.user

    const data = {
        title: "Perfil",
        user: { name, email, city, avatar }
    }

    return res.status(200).render("profile", data)
}

const verifyView = async (req, res) => {
    res.status(200).render("verify", { title: "Verify form" })
}





export { indexView, productView, registerProductView, contactView, usView, getCartView, removeProductFromCartView, updateCartStateView, addProductToCartView, clearCartView, registerView, loginView, profilView, verifyView }