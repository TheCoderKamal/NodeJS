const express = require("express");
const port = 1005;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let student = [
    {id: Date.now(), name: "Kamal", city: "Rajkot"},
]

app.get("/", (req, res) => {
    res.render("home", {student});
})

app.post("/add", (req, res) => {
    req.body.id = Date.now();
    student.push(req.body);
    res.redirect("/")
    res.end();
});

app.get("/delete", (req, res) => {
    student = student.filter(item => item.id != req.query.id);
    res.redirect("/");
    res.end();
});

app.get("/update/:id", (req, res) => {
    let data = student.find(item => item.id == req.params.id);
    res.render("update", {data});
    res.end();
});

app.post("/update", (req, res) => {
    console.log(req.body);
    
    student.forEach(item => {
        if(item.id == req.body.id){
            item.name = req.body.name;
            item.city = req.body.city;
        }else{
            item
        }
    })

    res.redirect("/");
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})