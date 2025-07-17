import CustomRouter from "../custom.router.js";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import authRouter from "./auth.router.js";



class ApiRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }
    init = () =>{
        this.use("/products", productsRouter)
        this.use("/users", usersRouter)
        this.use("/carts", cartsRouter)
        this.use("/auth", authRouter)
    }
}


const apiRouter = new ApiRouter()
export default apiRouter.getRouter()