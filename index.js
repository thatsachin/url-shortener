import express from "express";
import "dotenv/config";
import router from "./routes/urlRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", router);
     
app.listen(process.env.PORT, () => {
    console.log("Server running on port 5200");
})



// app.get("/", (req, res) => {
//     const date = new Date();
//     const utcDate = date.toISOString();

//     console.log(utcDate);

//     res.send("Hello World from URL Shortener App!");
// })

// const isValidUrl = (url) => {
//     const regex = /^(?:http:\/\/|https:\/\/)?([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?(\/[^\s]*)?$/;
//     return regex.test(url);
// };

// app.post("/getshorturl", (req, res) => {
//     try {
    
//         const { longurl } = req.body;
//         if(!longurl || !isValidUrl(longurl)) {
//             return res.status(404).json({
//                 "success": false,
//                 "message": "Please provide a valid URL",
//             });
//         }

//         const shortURL = generateShortUrl(6);
//         const urlMapping = new UrlMapping({
//             originalURL: longurl,
//             shortenedURL: shortURL,
//             creationDate : Date.now(),
//         })

//         urlMapping.save();
        
//         res.send(`got this, ${shortURL} for ${longurl}, ${isValidUrl(longurl)}`);
//     } catch(error) {
//         res.status(500).json({
//             "success": false,
//             "errorMessage": error.message,
//         });
//     }  
// })

// app.get("/go/:shorturl", async (req, res) => {
//     try {
//         const { shorturl } = req.params;
//         // const urlMapping = await UrlMapping.findOne({shortenedURL: shorturl});

//         const urlMapping = await UrlMapping.findOneAndUpdate(
//             { shortenedURL: shorturl },
//             { lastAccessedDate: Date.now() },
//             { $inc: { clickCount: 1 } },
//             { new: true }
//           );

//         if(!urlMapping) {
//             return res.status(404).json({
//                 "success": false,
//                 "message": "URL not found",
//             });
//         }

//         res.setHeader('Connection', 'close');
//         res.redirect(301, urlMapping.originalURL);

//         // console.log(Date.now());
//         // res.status(201).json({
//         //     "success": true,
//         //     "originalURL": urlMapping.originalURL,
//         //     "shortenedURL": urlMapping.shortenedURL,
//         //     "clickCount": urlMapping.clickCount,
//         //     "lastAccessedDate": urlMapping.lastAccessedDate
//         // })
//     } catch(error) {
//         res.status(500).json({
//             "success": false,
//             "errorMessage": error.message,
//         });
//     }
// })