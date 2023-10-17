const DataProject = require("./src/assets/js/data-project.js");
const DataProjectRepository = require("./src/assets/js/data-project-repository.js");
const alert = require("./src/assets/js/alert.js");
const express = require("express");
const repository = new DataProjectRepository();
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
app.get("/facebook", (req, res) => res.render("facebook"));
app.get("/twitter", (req, res) => res.render("twitter"));

app.get("/projects", async function (req, res) {
    try {
        res.render("projects", {blogs : await repository.findAll()});
    } catch (error) {
        console.log(error);
    }
})

app.get("/edit-project/:id", (req, res)=> {
    const { id } = req.params;
    const dataProject = repository.getDataProjectById(id);

    res.render("edit-project", {dataProject, id});
})

app.get("/project-details/:id", (req, res) => {
    const { id } = req.params;
    const dataProject = repository.getDataProjectById(id);
    const descriptionArray = dataProject.description.split("\n");

    res.render("project-details", {dataProject, descriptionArray});
})

app.get("/delete-project/:id", (req, res) => {
    const { id } = req.params;
    repository.deleteDataProjectById(id);

    res.redirect("/projects");
})

app.post("/add-project", (req, res) => {
    const dataProject = new DataProject(req.body);

    // Validation Input
    if (dataProject.title === "") return alert("Project title must be filled");
    if (dataProject.title.length > 20 ) return alert("Project title max character is 20");
    if (dataProject.start_date === "") return alert("Start date must be filled");
    if (dataProject.end_date === "") return alert("End date must be filled");
    if (dataProject.description === "") return alert("Description must be filled");
    if (dataProject.durationInDays <= 0) return alert("End date cannot be less than start date");

    repository.addDataProject(dataProject);

    res.redirect("/projects");
})

app.post("/edit-project/:id", (req, res) => {
    const { id } = req.params;
    const dataProject = new DataProject(req.body);

    // Validation Input
    if (dataProject.title === "") return alert("Project title must be filled");
    if (dataProject.title.length > 20 ) return alert("Project title max character is 20");
    if (dataProject.start_date === "") return alert("Start date must be filled");
    if (dataProject.end_date === "") return alert("End date must be filled");
    if (dataProject.description === "") return alert("Description must be filled");
    if (dataProject.durationInDays <= 0) return alert("End date cannot be less than start date");

    repository.editDataProjectById(id, dataProject);

    res.redirect("/projects");
})