import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import connectToDB from "../connectToDB.js";
import isValidEmail from "../validEmailChecker.js";


const register = async (req, res) => {
    try {

        const token = req.cookies.token;
        if(token) {
            res.cookie('token', '', 
            {   maxAge: 0, 
                secure: true,
                sameSite: "None" });
        }

        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password) {
            return res.status(404).json({
                "success": false,
                "message": "All fields are required.",
            });
        }

        if(!isValidEmail(email)) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide a valid email.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        connectToDB();
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
        })
        await user.save();
        return res.status(200).json({ 
            message: 'Registered Successfully.',
            success: true
        });
    }
    catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message,
        });
    }
}

export default register