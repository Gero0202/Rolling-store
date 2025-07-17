import { usersManager } from "../dao/dao.factory.js"
import env from "../helpers/setEnv.helper.js"

const register = async (req, res) => {
    const response = req.user
    res.json201(response, "Registered")
}

const login = async (req, res) => {
    const response = req.user
    const token = req.token
    const opts = { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: "Strict", secure: env.NODE_ENV === "production" }
    res.cookie("token", token, opts).json200(response, "logged in")
}

const online = async (req, res) => {

    if (!req.user.user_id) {
        res.json401("Invalid credentials")
    }
    const { user_id, email, rol, name, avatar, city } = req.user


    res.json200({ user: { user_id, email, rol, name, avatar, city } })
}

const signout = async (req, res) => {
    res.clearCookie("token").json200(null, "Signed out")

}

const badAuth = async (req, res) => {
    res.json401("Bad Auth from redirect")
}

const verifyAccount = async (req, res) => {
    const { email, code } = req.body
    const user = await usersManager.readBy({ email, verifyCode: code })
    if (!user) return res.json401("Codigo o email incorrecto")

    if (!user.verifyCodeExpires || user.verifyCodeExpires < Date.now()) {
        return res.json401("El código ha expirado")
    }

    await usersManager.updateById(user._id, { isVerify: true, verifyCode: null,  verifyCodeExpires: null })
    res.json200("VERIFIED")
}

export { register, login, online, signout, badAuth, verifyAccount }