import isValidEmail from "../validEmailChecker.js";
import jwt from "jsonwebtoken";
import connectToDB from "../connectToDB.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(token) {
            res.cookie('token', '', { maxAge: 0 });
        }
        const {email, password} = req.body;

        if(!email || !password) {
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
        connectToDB();
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                "success": false,
                "message": "User not found.",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(404).json({
                "success": false,
                "message": "Invalid password.",
            });
        }

        const jwtToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        const expires = new Date(Date.now() + 7 * 24 * 3600000); // 7 days in milliseconds.

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: true,
            expires,
            sameSite: "None"
        });

        res.status(200).json({
            "success": true,
            "message": "Logged in successfully."
        })

    }
    catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message
        })
    }
}

export default login