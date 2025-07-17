import { connect } from "mongoose";

async function connectMongo(link) {
    try {
        await connect(link)
        console.log("mongo db connected");
    } catch (error) {
        console.log(error);

        throw error
    }
}

export default connectMongo