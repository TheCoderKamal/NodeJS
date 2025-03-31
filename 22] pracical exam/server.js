const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 1234;

// Database Connection
const db = require("./config/db");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// Session Configuration
app.use(
    session({
        name: "local",
        secret: "admin",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 10 },
    })
);

// Routes
// app.get("/", (req, res) => {
//     res.render("users/registration");
// });

app.use("/user", require("./routes/userRoute"));

// Start Server
app.listen(port, (err) =>
    err ? console.log(err) : console.log("Server running on port:", port)
);
