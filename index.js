import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
import {app} from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on PORT: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to database: ${err}`);
    });