import crypto from "crypto"
const { PERSISTENCE } = process.env

class ProductDto {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.title = data.title
        this.category = data.category || "none"
        this.thumbnails = data.thumbnails || "https://i.pinimg.com/736x/00/22/f7/0022f79582483ded38a7011bc101f34a.jpg"
        this.stock = data.stock || 10
        this.price = data.price || 10
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }

}

export default ProductDto