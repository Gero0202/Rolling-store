import CustomRouter from "./custom.router.js"
import {
    indexView,
    productView,
    registerProductView,
    contactView,
    usView,
    getCartView,
    removeProductFromCartView,
    updateCartStateView,
    addProductToCartView,
    clearCartView,
    registerView,
    loginView,
    profilView,
    verifyView
} from "../controllers/views.controllers.js"




class ViewsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.read("/", ["public"],indexView)
        this.read("/product/:pid", ["public"],productView)
        // 🚫 Desactivada en produccion por seguridad. Vista para crear productos solo para admins.
        //this.read("/register-product", ["admin"], registerProductView)
        this.read("/contact", ["public"],contactView)
        this.read("/us", ["public"],usView)
        this.read("/cart", ["user"], getCartView)
        this.create("/cart/add/:pid", ["user"], addProductToCartView)
        this.create("/cart/remove/:cart_id", ["user"], removeProductFromCartView)
        this.create("/cart/checkout", ["user"], updateCartStateView)
        this.create("/cart/clear", ["user"], clearCartView)
        this.read("/register", ["public"],registerView)
        this.read("/login", ["public"],loginView)
        this.read("/profile", ["user", "admin"], profilView)
        this.read("/verify", ["public"] ,verifyView)
    }
}


const viewsRouter = new ViewsRouter()
export default viewsRouter.getRouter()