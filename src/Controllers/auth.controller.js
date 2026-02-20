import { User } from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                error: "All the fields are required" 
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                error: "the email is already registered" 
            });
        }

        const user = await User.create({ 
            name: name.trim(), 
            email: email.toLowerCase(), 
            password,
            roles: roles || 'USER'
        });
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                createdAt: user.createdAt
            }
        });
        
    } catch (err) {
        console.error("Error in register:", err);
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                error: "Email and password are required" 
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ 
                error: "Invalid credentials" 
            });
        }

        console.log("Registered Password:", password);
        console.log("Password on DB:", user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        console.log("¿valid Password?:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: "Invalid credentials" 
            });
        }

        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                roles: user.roles
            },
            process.env.JWT_SECRET || 'SecretKey',
            { expiresIn: '8h' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles
            }
        });
        
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ error: "Error in the server" });
    }
};