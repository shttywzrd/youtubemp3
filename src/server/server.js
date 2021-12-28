const { exec } = require('child_process');
const express = require("express");
const addRequestId = require("express-request-id") ();
const NodeCache = require("node-cache");
const app = express();
const cache = new NodeCache();

app.listen(8080, "0.0.0.0" ,() => console.log("listening at 8080"));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express.json());
app.use(addRequestId);

app.post("/", (req, res) => {
    console.log("Starting Conversion...");
    exec(`youtube-dl -o "E:/YouTubeMP3-React/youtubemp3/src/server/download/${req.id}.%(ext)s" "${req.body.url}"`,
        (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stderr);
            console.log(stdout);
            cache.set(req.id, req.body.title, 60);
            res.status(200).json({id: req.id});
        });
});

app.get("/download/:id", (req, res) => {
    let title = cache.take(req.params.id);
    res.setHeader('Content-type', 'audio/mpeg');
    res.download(`E:/YouTubeMP3-React/youtubemp3/src/server/download/${req.params.id}.mp3`, `${title}.mp3`);
});