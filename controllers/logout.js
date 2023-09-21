const logout = (req, res) => {

    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(404).json({
                "success": false,
                "message": "Login first!"
            })
        }
        
        res.cookie('token', '', 
        {   maxAge: 0, 
            secure: true,
            sameSite: "None" });

        return res.status(200).json({
            "success": true,
            "message": "Logged out successfully"
        });
    }
    catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message,
        });
    }
}

export default logout