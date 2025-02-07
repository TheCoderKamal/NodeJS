const express = require("express");
const port = 3000;
const path = require("path")
const app = express();

const db = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"public")));

app.use("/", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})