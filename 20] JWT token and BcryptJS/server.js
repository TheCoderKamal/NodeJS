const express = require('express');
const session = require("express-session");

const port = 1234;

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

app.use(express.urlencoded());


app.use("/", require("./routes/adminRoutes"));

app.listen(port, err => {
    err? console.log('Error:', err) : console.log(`Server is running on port ${port}`);
})