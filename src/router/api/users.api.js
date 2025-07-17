import CustomRouter from "../custom.router.js";
import { createUser, getAllUsers, destroyUser, readOneUser, updateUser } from "../../controllers/users.controllers.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";



class UsersRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        // Se usa register para crear al user
        //this.create("/", ["public"], isValidUser, createUser)
        this.read("/", ["admin"], getAllUsers)
        this.read("/:uid", ["user", "admin"], readOneUser)
        this.update("/:uid", ["user", "admin"], updateUser)
        this.destroy("/:uid", ["admin"], destroyUser)
    }
}


const usersRouter = new UsersRouter()
export default usersRouter.getRouter()