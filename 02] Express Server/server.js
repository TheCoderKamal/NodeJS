const express = require("express");
const port = 1009;

let app = express();

app.get("/", (req, res) => {
    res.write("<h1>Server started</h1>");
    res.end();
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
});