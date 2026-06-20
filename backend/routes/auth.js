const { Router } = require('express');
const router = Router();
const argon2 = require("argon2");
const { ZodUserSchema, UserModel, NotesModel } = require('../db/index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async(req, res)=>{
    const {
        firstname,
        lastname,
        username,
        email,
        password
    } = req.body;


    try{
        const payload = {
            firstname,
            lastname,
            username,
            email,
        };
        
        const result = ZodUserSchema.safeParse(payload);
        if (!result.success){
            const fieldErrors = result.error.flatten().fieldErrors;
            return res.json({
                fieldErrors
            });
        }
        
        const userExists = await UserModel.findOne({username});
        if (userExists){
            return res.status(400).json({
                message: "User already exists!"
            });
        }
        
        const emailUsed = await UserModel.findOne({email});
        if (emailUsed){
            return res.status(400).json({
                message: "Found existing user linked with this email!"
            });
        }
        const user = await UserModel.create({
            firstname,
            lastname,
            username,
            password: passwordHash,
            email
        });
        
        const passwordHash = await argon2.hash(password);
        const token = jwt.sign({
            sub: user._id,
            email,
            role: 'user'
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        
        res.status(201).json({
            token,
            message: "User registered successfully!"
        });
    } catch(error){
        return res.status(500).json({
            message: "Some error occured, pls try again."
        });
    }
});

router.post('/login', async (req, res)=>{
    const { username, password } = req.body;

    try{
        const user = await UserModel.findOne({username});
        if (!user){
            return res.json({
                message: "No such user exists!"
            });
        }
        const storedHash = user.password;
        const isValid = await argon2.verify(storedHash, password);
        if (isValid){
            const token = jwt.sign({
                sub: user._id,
                email: user.email,
                role: 'user'
            }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            return res.json({
                token,
                message: "Login successful!"
            });
        } else{
            return res.status(401).json({
                message: "Invalid password!"
            })
        }
    } catch(error){
        return res.status(500).json({
            message: "Some error occured, pls try again."
        });
    }
});

module.exports = router;