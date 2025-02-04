const express = require("express");
const port = 3000;
const path = require("path")
const app = express();

const db = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/", require("./routes/route"));
app.use("/add-book", require("./routes/route"));
app.use("/delete/:id", require("./routes/route"));
app.use("/edit/:id", require("./routes/route"));
app.use("/update-book", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})