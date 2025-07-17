import { socketServer } from "../../app.js";
import { createService, readAllService } from "../services/products.service.js";


async function socketHelper(socket) {
    console.log("socket ID: ", socket.id);
    try {
        
        const products = await readAllService()
        socket.emit("products", products);
        socket.on("new-product", async data => {
            
            await createService(data)
            
            const products = await readAllService()
            socketServer.emit("products", products)
        })
    } catch (error) {
        console.error("Error reading products:", error);
    }
    
}

export default socketHelper;