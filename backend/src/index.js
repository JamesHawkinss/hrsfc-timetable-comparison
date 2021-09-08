const config = require("./config");
const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors({
    origin: config.corsDomains,
}));

app.get("/", (req, res) => {
    res.json({ hello: "world"});
});

app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`)
});
