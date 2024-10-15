const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const Registers = require(".model/user_registration");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("landing")

} );

app.get("/login", (req, res) => {
    res.render("login")

} );

app.post("/login", async (req, res) => {
    try{

    } catch (error) {
        res.status(400).send(error);
    }

} );

app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})