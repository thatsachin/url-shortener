import connectToDB from "../connectToDB.js";
import Url from "../models/urlSchema.js";
import isValidUrl from "../validUrlChecker.js";


const updateUrl = async (req, res) => {
    try {
        const {_id} = req.user;
        const {shorturlid} = req.params;
        const {newOriginalUrl} = req.body;
        if(!newOriginalUrl || !isValidUrl(newOriginalUrl)) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide a valid new Destination URL.",
            });
        }
        if(!shorturlid) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide a valid Short URL Id.",
            });
        }
        connectToDB();

        const checkingIfShortUrlExists = await Url.findOne({
            shortUrl: shorturlid,
            owner: _id
        });

        if(!checkingIfShortUrlExists) {
            return res.status(404).json({
                "success": false,
                "message": "No URL found to update."
            })
        }

        const urlMapping = await Url.findOneAndUpdate({
            shortUrl: shorturlid,
            owner: _id,
            }, 
            {
            originalUrl: newOriginalUrl
        });       

        res.status(200).json({
            "success": true,
            "message": "Short URL Destination updated successfully."
        })
    }
    catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message
        })
    }
}

export default updateUrl