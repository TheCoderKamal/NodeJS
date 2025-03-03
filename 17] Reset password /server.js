const express = require("express");
const port = 1234;
const path = require("path");

const app = express();
const db = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/", require("./routes/route"));    
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, err => {
    err ? console.log("error : ", err) : console.log("Server is starting on port : ", port);
})