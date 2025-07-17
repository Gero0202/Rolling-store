import { config } from "dotenv";
import args from "./setArgs.helper.js"

const { mode } = args
const path = ".env" + (mode && "." + mode)

config({ path })
const SERVER_PORT = process.env.SERVER_PORT
const MONGO_URL = process.env.MONGO_URL
const COOKIE_KEY = process.env.COOKIE_KEY
const SESSION_KEY = process.env.SESSION_KEY
const SECRET = process.env.SECRET
const PERSISTENCE = process.env.PERSISTENCE
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN
const FRONT_URL = process.env.FRONT_URL
const BACK_URL = process.env.FRONT_URL
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET
const NODE_ENV = process.env.NODE_ENV

const env = {
    SERVER_PORT, MONGO_URL, COOKIE_KEY, SESSION_KEY, SECRET, PERSISTENCE, MP_ACCESS_TOKEN, FRONT_URL, BACK_URL, MP_WEBHOOK_SECRET, NODE_ENV
}
export default env