import connectMongo from "../helpers/mongo.helper.js";

const { PERSISTENCE } = process.env

let dao = {}

switch (PERSISTENCE) {
    case "memory":
        break;
    case "fs":
        break;
    default: //mongo
       await connectMongo(process.env.MONGO_URL)
        
        const { usersManager, productsManager } = await import("./mongo/manager.mongo.js")
        const { default: cartsManager } = await import("./mongo/carts.mongo.js")
        dao = { productsManager, usersManager, cartsManager }
        break;
}

const { productsManager, usersManager, cartsManager } = dao
export { productsManager, usersManager, cartsManager }
export default dao