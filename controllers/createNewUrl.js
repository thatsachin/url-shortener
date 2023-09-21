import isValidUrl from "../validUrlChecker.js";
import generateShortUrl from "../generateShortURLName.js";
import Url from "../models/urlSchema.js";
import connectToDB from "../connectToDB.js";


const createNewUrl = (req, res) => {
    const { _id } = req.user;

    try {

        const { longurl } = req.body;
        if(!longurl || !isValidUrl(longurl)) {
            return res.status(404).json({
                "success": false,
                "message": "Please provide a valid URL",
            });
        }

        const shortURL = generateShortUrl(6);
        connectToDB();
        const urlMapping = new Url({
            originalUrl: longurl,
            shortUrl: shortURL,
            owner: _id,
        })

        urlMapping.save();
        
        res.status(200).json({
            "success": true,
            "message": "URL created successfully",
            "originalURL": urlMapping.originalUrl,
            "shortenedURL": urlMapping.shortUrl,
            "owner": urlMapping.owner,
            "creationDate": urlMapping.creationDate
        })
    } catch(error) {
        res.status(500).json({
            "success": false,
            "errorMessage": error.message,
        });
    }  
}

export default createNewUrl