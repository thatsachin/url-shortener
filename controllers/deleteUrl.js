import Url from "../models/urlSchema.js";
import connectToDB from "../connectToDB.js";

const deleteUrl = async (req, res) => {
    try {
        const {_id} = req.user;
        const {shorturlid} = req.params;
        if(!shorturlid) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide a valid Short URL Id.",
            });
        }
        connectToDB();
        const urlMapping = await Url.findOneAndDelete({
            owner : _id,
            shortUrl: shorturlid
        });

        if(!urlMapping) {
            return res.status(404).json({
                "success": false,
                "message": "No URL found to delete."
            })
        }

        res.status(200).json({
            "success": true,
            "message": "Short URL deleted successfully.",
            "data": urlMapping
        })
    }
    catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message
        })
    }
}

export default deleteUrl