import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URL}${DB_NAME}`
        );
        console.log(
            `MonogDB connected to DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (err) {
        console.log("MONGO CONNECTION FAILED: ", err);
        process.exit(1);
    }
};

export default connectDB