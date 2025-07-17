import { verifyToken } from "../helpers/token.helper.js"

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        if (policies.includes("public")) return next()

        const token = req?.cookies?.token
        const data = verifyToken(token)
        const { rol, user_id } = data
        if (!rol || !user_id) return res.json401()
        const roles = {
            user: policies.includes("user"),
            admin: policies.includes("admin")
        }
        if(roles[rol]){
            req.user = data
            return next()
        }else{
            res.json403()
        }
    } catch (error) {
        next(error)
    }
}

export default setupPolicies