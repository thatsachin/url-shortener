import connectToDB from "../connectToDB.js"
import Url from "../models/urlSchema.js"
import isValidUrl from "../validUrlChecker.js";

const redirectToOriginalUrl = async (req, res, next) => {
    try {
        const shortUrl = req.params.shorturlid;

        connectToDB();
        const checkingIfShortUrlExists = await Url.findOne({shortUrl: shortUrl});

        if(!checkingIfShortUrlExists) {
            return res.status(404).json({
                "success": false,
                "message": "No URL found."
            })
        }

        if(!isValidUrl(checkingIfShortUrlExists.originalUrl)) {
            res.status(200).json({
                "success": false,
                "message": "Original URL is invalid.",
                "data": checkingIfShortUrlExists.originalUrl
            })
        }
        const goto = checkingIfShortUrlExists.originalUrl;
        const urlRegex = /^((http|https):\/\/)[^\s()<>]+(?:\.[^\s()<>]+)+\/?$/;
        const urlIsValid = urlRegex.test(goto);
        if(!urlIsValid) {
            const validGotoURL = (`http://${goto}`).toString();
            return res.redirect(validGotoURL);   
            // return res.status(200).json({
            //     "success": true,
            //     "message": "Short URL found successfully.",
            //     "validGotoURL": validGotoURL,
            //     "goto": goto
            // }) 
        }
        res.redirect(goto);
        // res.status(200).json({
        //     "success": true,
        //     "message": "Short URL found successfully.",
        //     "data": validGotoURL,
        //     "goto": goto
        // })
    }
    catch(error) {
        return res.status(500).json({
            "success": false,
            "errorMessage": error.message
        })
    }
}

export default redirectToOriginalUrl