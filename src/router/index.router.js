import CustomRouter from "./custom.router.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";
//import MpRouter from "./mp.router.js";


class Router extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.use("/", viewsRouter)
        this.use("/api", apiRouter)

        // 💳 Rutas de Mercado Pago (Checkout Pro)
        // 📦 Incluyen preferencia, webhook y vistas de éxito/fallo/pendiente
        // 🛑 Actualmente desactivado para evitar pagos reales en entorno demo
        //this.use("/mercadopago", MpRouter)
    }
}


const router = new Router()
export default router.getRouter()



