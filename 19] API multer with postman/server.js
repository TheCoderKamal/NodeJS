const express = require('express');
const path = require('path');
const port = 1234;

const app = express();

const db = require('./config/db');

app.use(express.urlencoded());
app.use("/", require('./routes/adminRoute'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server is running on port : " + port);
});