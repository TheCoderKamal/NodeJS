const express = require("express");
const port = 5000;
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/service-details", (req, res) => {
    res.render("service-details");
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port); 
})