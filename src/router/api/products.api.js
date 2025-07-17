import CustomRouter from "../custom.router.js";
import { readOneProduct, readProducts, createProduct, updateProduct, destroyProduct, pidParam } from "../../controllers/products.controllers.js";
//import isValidProduct from "../../middlewares/isValidProduct.mid.js";

class ProductsRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }
    init = () =>{
        // 🚫 Desactivada en producción por seguridad. Insercion directa a DB de productos solo para admins.
        //this.create("/", ["admin"], isValidProduct, createProduct)
        this.read("/", ["public"],readProducts)
        this.read("/:pid", ["public"],readOneProduct)
        this.update("/:pid", ["admin"], updateProduct)
        this.destroy("/:pid", ["admin"], destroyProduct)
        this.router.param("pid", pidParam)
    }
}


const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()