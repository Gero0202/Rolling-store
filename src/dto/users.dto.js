import crypto from "crypto"
import { createHash } from "../helpers/hash.helper.js"
const { PERSISTENCE } = process.env

class UsersDto {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.name = data.name
        this.date = data.date
        this.city = data.city
        this.email = data.email
        this.password = createHash(data.password)
        this.rol = data.rol || "user"
        this.avatar = "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
        this.isVerify = data.isVerify || false
        this.verifyCode = crypto.randomBytes(12).toString("hex") || null
        this.verifyCodeExpires = data.verifyCodeExpires || null
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }

}

export default UsersDto