const express = require('express');
const port = 1234;

const app = express();

const db = require('./config/db');
app.use(express.urlencoded());
app.use("/", require('./routes/adminRoute'));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is running on port ${port}`);
});