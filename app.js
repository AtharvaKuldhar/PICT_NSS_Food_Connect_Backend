import express from "express";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.NODE_ENV === "production" 
            ? ["https://your-frontend-domain.com"] 
            : ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

// Test endpoint
app.get("/", (req, res) => {
    res.json({ message: "NSS Food Connect Backend is running!" });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/volunteer", volunteerRoutes);

export { app };