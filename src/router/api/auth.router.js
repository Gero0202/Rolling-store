import CustomRouter from "../custom.router.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, online, signout, badAuth, verifyAccount } from "../../controllers/auth.controllers.js";
import { loginRateLimiter, registerLimiter, verifyLimiter } from "../../middlewares/rateLimiter.js";
import { validateLoginFields } from "../../middlewares/validateLoginFields.js";


class AuthRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/register", ["public"], registerLimiter,passportCb("register"), register)
        this.create("/login", ["public"], loginRateLimiter, validateLoginFields ,passportCb("login"), login)
        this.create("/online", ["user", "admin"], online)
        this.create("/signout", ["user", "admin"], signout)
        this.create("/verify", ["public"], verifyLimiter,verifyAccount)
        this.read("/bad-auth", badAuth)
    }
}



const authRouter = new AuthRouter()
export default authRouter.getRouter()