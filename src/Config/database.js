import mongoose from "mongoose";
import { Role } from "../Models/role.model.js"; 

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/OpinionManagement", {
        });

        console.log("database connected");

        const roles = ["User", "Admin"];
        for (const roleName of roles) {
            const roleExists = await Role.findOne({ name: roleName });
                if (!roleExists) {
                    await Role.create({ name: roleName });
                    console.log(`Rol creado: ${roleName}`);
        }
    }

    } catch (error) {
        console.log("Error trying to connect to database:", error.message);
        process.exit(1); 
    }
};