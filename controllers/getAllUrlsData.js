import connectToDB from "../connectToDB.js";
import Url from "../models/urlSchema.js";

const getAllUrlsData = async (req, res) => {
    try {
        const {_id} = req.user;
        connectToDB();
        const urls = await Url.find({owner: _id});
        if(!urls) {
            return res.status(404).json({
                "success": false,
                "message": "No URLs found"
            })
        }

        res.status(201).json({
            "success": true,
            "totalUrls": urls.length,
            "allUrlsData": urls
        })
        
    }
    catch (error) {
        return res.status(500).json({
            "success": false,
            "errorMessage": error.message
        })
    }
}

export default getAllUrlsData