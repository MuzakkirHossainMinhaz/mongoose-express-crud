/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`🌐 Server is running on http://localhost:${PORT}`);
        });

        // connect to database
        await mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
            console.log("⚡️ Successfully connected to the database");
        });
    } catch (err) {
        console.log(err);
    }
}

main();
