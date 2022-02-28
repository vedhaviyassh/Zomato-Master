import express from "express";
import bcrypt from "bcryptjs";

//Modals
import { userModel } from "../../database/user";

const Router = express.Router();

/*
Route       /signup 
Des         Signing using email and password
Params      None
Access      Public
Method      POST
*/

Router.post("/signup", async(req,res) => {
    try {
        const {email, password, fullname, phoneNumber} = req.body.credentials;

        const checkUserByEmail = await userModel.findOne({email});
        const checkUserByPhone = await userModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone) {
            return res.json({error: "User already exists!!!!"});
        }
        
        //hashing users password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //save to DB
        await userModel.create({
           ...req.body.credentials,
           password: hashedPassword 
        });

        //JWT Token
        const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

        return res.status(200).json({token, status: "success"});
    } catch (error) {
        return res.status(500).json({error: console.error(message)});
    }
});