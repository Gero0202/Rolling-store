import crypto from "crypto";

const { PERSISTENCE } = process.env;

class CartsDto {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex");
        }

        this.product_id = data.product_id; 
        this.user_id = data.user_id;
        this.quantity = data.quantity || 1;
        this.state = data.state || "reserved";

        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}

export default CartsDto;