import "./src/helpers/setEnv.helper.js"
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import express from "express"
import router from "./src/router/index.router.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import { engine } from "express-handlebars";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import socketHelper from "./src/helpers/socket.helper.js";
import args from "./src/helpers/setArgs.helper.js";
//import routerMpTest from "./src/router/mpTest.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express()
const PORT = process.env.SERVER_PORT
const ready = async () => {
    console.log("server is ready " + PORT);
    console.log("server is ready on mode " + args.mode);
}
const httpServer = createServer(server);
httpServer.listen(PORT, ready)


const socketServer = new SocketServer(httpServer);
socketServer.on("connection", socketHelper)
export { socketServer }


server.engine("handlebars", engine({
    helpers: {
        groupProducts: (products) => {
            const grouped = {};

            products.forEach(product => {
                if (grouped[product.product_id]) {
                    grouped[product.product_id].quantity += product.quantity;
                } else {
                    grouped[product.product_id] = { ...product };
                }
            });

            return Object.values(grouped);
        },
        multiply: (a, b) => a * b,
        uppercase: (text) =>{
            return text.toUpperCase()
        }
    }
}))
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan("dev"))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser(process.env.COOKIE_KEY))

/**
 * 🧪 Router para pruebas de webhook de Mercado Pago.
 */
//server.use("/mercadopagoTest", routerMpTest)
server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)
