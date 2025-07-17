import { Router } from "express";
import setupResponses from "../middlewares/setupResponses.mid.js";
import setupPolicies from "../middlewares/setupPolicies.mid.js";

class CustomRouter {
    constructor() {
        this.router = Router()
        this.use(setupResponses)
    }
    getRouter = () => this.router
    applyMiddlewares = (cbs) =>
        cbs.map(cb => async (req, res, next) => {
            try {
                await cb(req, res, next)
            } catch (error) {
                next(error)
            }
        })
    create = (path, policies,...cbs) => this.router.post(path,  setupPolicies(policies) ,this.applyMiddlewares(cbs))
    read = (path, policies,...cbs) => this.router.get(path, setupPolicies(policies) , this.applyMiddlewares(cbs))
    update = (path, policies,...cbs) => this.router.put(path,  setupPolicies(policies) ,this.applyMiddlewares(cbs))
    destroy = (path, policies,...cbs) => this.router.delete(path,  setupPolicies(policies) ,this.applyMiddlewares(cbs))
    use = (path, ...cbs) => this.router.use(path, this.applyMiddlewares(cbs))   
}

export default CustomRouter