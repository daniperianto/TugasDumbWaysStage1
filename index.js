const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

// setup to call hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set static file server
app.use(express.static("src/assets"));

// parsing data from client
app.use(express.urlencoded({ extended: false}));

// run local server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routing
app.get("/", (req, res) => res.render("index"));
app.get("/add-project", (req, res) => res.render("add-project"));
app.get("/testimonials", (req, res) => res.render("testimonials"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/blog-details", (req, res) => res.render("blog-details"));
app.get("/facebook", (req, res) => res.render("facebook"));
app.get("/twitter", (req, res) => res.render("twitter"));

app.post("/add-project", (req, res) => {
    const { title, start_date, end_date, description, node_js, react_js, next_js, typescript } = req.body;

    console.log(`title = ${title}`);
    console.log(`start date = ${start_date}`);
    console.log(`end-date = ${end_date}`);
    console.log(`description = ${description}`);
    console.log(`node js = ${node_js ? "yes" : "no"}`);
    console.log(`react js = ${react_js ? "yes" : "no"}`);
    console.log(`next js = ${next_js ? "yes" : "no"}`);
    console.log(`typescript = ${typescript ? "yes" : "no"}`);
})