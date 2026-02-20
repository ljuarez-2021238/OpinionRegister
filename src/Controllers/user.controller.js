import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "The email is already registered" });
        }

        const newUser = new User({ 
            name, 
            email, 
            password,
            roles: roles || "USER" 
        });

        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
};