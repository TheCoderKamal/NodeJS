const express = require("express");
const port = 1234;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const passportt = require("./middleware/passport");

const app = express();
const db = require("./config/db");

app.use(
    session({
        name: "local",
        secret : "admin",
        resave : true,
        saveUninitialized : false,
        cookie : {maxAge : 1000 * 60 * 10}
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.AuthenticatedUser);

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/", require("./routes/route"));    
app.use("/category", require("./routes/categoryRoute"));

app.listen(port, err => {
    err ? console.log("error : ", err) : console.log("Server is starting on port : ", port);
})