import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { connectDB } from "./Config/database.js";

import authRoutes from "./Routes/auth.routes.js"; 
import userRoutes from "./Routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true })); 

connectDB();

app.get("/", (req, res) => {
    res.json({ message: "Opinion Management System Running" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);


app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error", error: err.message });
});

export default app;