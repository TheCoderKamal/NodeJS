const http = require("http");
const port = 3005;

const portHandle = (req, res) => {
    res.write("<h1>Hello World !!!</h1>");
    res.end();
}

let server = http.createServer(portHandle);
server.listen(port, (err) => {
    err ? console.log(err) : console.log("Server is running on port : ", port);
})