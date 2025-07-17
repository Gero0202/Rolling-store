import CustomRouter from "../custom.router.js"
import { addProductToCart, readProductsFromUser, updateQuantity, removeProductFromCart, totalToPay } from "../../controllers/carts.controllers.js"


class CartsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["user"] ,addProductToCart)
        this.read("/users", ["user"] , readProductsFromUser)
        this.read("/total", ["user"] , totalToPay)
        this.update("/:cart_id", ["user"] , updateQuantity)
        this.destroy("/:cart_id", ["user"] , removeProductFromCart)
    }
}


const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()