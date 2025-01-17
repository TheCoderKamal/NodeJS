const { closeDelimiter } = require("ejs");
const express = require("express");
const port = 2003;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

let tasks = [];

app.get("/", (req, res) => {
    res.render("home", {tasks});
});

app.post("/add", (req, res) => {
    req.body.id = Date.now();
    tasks.push(req.body);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const task = tasks.find(task => task.id == req.params.id);
    res.render("update", {task})
});

app.post("/update", (req, res) => {
    console.log(req.body);
    tasks.forEach(task => {
        if(task.id == req.body.id){
            task.title = req.body.title;
            task.description = req.body.description;
        }else{
            task
        }
    });

    res.redirect("/");
});

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
});