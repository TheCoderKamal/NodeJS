const http = require("http");
const port = 1008;

const handleServer = (req, res) => {
    res.write("<h1>Server is started</h1>");
    res.end();
}

const server = http.createServer(handleServer);
server.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})