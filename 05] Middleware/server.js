const express = require("express");
const port = 1003;
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

// to connect views and public folder : 
app.use("/public", express.static(path.join(__dirname, "public")));

// it is a middleware :
// basically middleware is use to do in between the execution of request like in this example first middleware runs and give message "hello guys" and then next() ke through hum (req, res) => {} wale section pe pahoch jate hai.
const middle = (req, res, next) => {
    console.log("Hello guys");
    next();
};

app.get("/", middle, (req, res) => {
    res.render("home");
});

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
});