const express = require("express");
const port = 2003;

const app = express();

const db = require("./config/db")
const schema = require("./model/firstSchema.model")

app.set("view engine", "ejs");
app.use(express.urlencoded());


app.get("/", async (req, res) => {
    await schema.find({}).then((data)=>{
        res.render("home", {data});
    })
})

app.post("/add", async (req, res) => {
    await schema.create(req.body).then(()=>{
        res.redirect("/")
    })
})

app.get("/delete/:id", async (req, res) => {
   await schema.findByIdAndDelete(req.params.id).then(()=>{
    res.redirect("/");
   })
})

app.get("/edit/:id", async (req, res) => {
    await schema.findById(req.params.id).then((task)=>{
        res.render("update", {task});
    })
})

app.post("/update", async (req, res) => {
 await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
    res.redirect("/");
 })
    
})

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})