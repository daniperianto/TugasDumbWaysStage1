const DataProject = require("./src/assets/js/data-project.js");
const DataProjectRepository = require("./src/assets/js/data-project-repository.js");
const Account = require("./src/assets/js/account.js");
const AccountRepository = require("./src/assets/js/account-repository.js");
const { alert, notification } = require("./src/assets/js/alert.js")
const upload = require("./src/assets/middleware/upload-file.js");
const express = require("express");
const session = require("express-session");
const projectRepository = new DataProjectRepository();
const accountRepository = new AccountRepository();
const path = require("path");
const app = express();
const PORT = 5000;



// setup to call hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// setup session express
app.use(session({
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "tugasStage1"
}));

// set static file server
app.use(express.static("src/assets"));
app.use(express.static("src/assets/uploads"));

// parsing data from client
app.use(express.urlencoded({ extended: false}));

// run local server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routing
app.get("/", (req, res) => res.render("index", {isLogin: req.session.isLogin, user: req.session.user}));
app.get("/add-project", (req, res) => res.render("add-project", {isLogin: req.session.isLogin, user: req.session.user}));
app.get("/testimonials", (req, res) => res.render("testimonials", {isLogin: req.session.isLogin, user: req.session.user}));
app.get("/contact", (req, res) => res.render("contact", {isLogin: req.session.isLogin, user: req.session.user}));
app.get("/facebook", (req, res) => res.render("facebook"));
app.get("/twitter", (req, res) => res.render("twitter"));

app.get("/register", (req, res) => {
    res.render("register")
    if(req.session.isLogin) res.redirect("/")
});

app.get("/login", (req, res) => {
    res.render("login")
    if(req.session.isLogin) res.redirect("/")
});

app.get("/logout", (req, res) => {
    req.session.isLogin= false
    res.redirect("/")
});

app.get("/projects", async function (req, res) {
    try {
        const projects = await projectRepository.findAll();
        projects.forEach( (project) => {
            if(req.session.idUser == project.author_id) {
                project.isTheAuthor = true;
            } else {
                project.isTheAuthor = false;
            }
        })

        res.render("projects", {
            blogs : projects,
            isLogin: req.session.isLogin,
            idUser: req.session.idUser,
            user: req.session.user
        } );
    } catch (error) {
        console.log(error);
    }
})

app.get("/edit-project/:id", async function (req, res) {
    const { id } = req.params;
    const dataProject = await projectRepository.getDataProjectById(id);

    res.render("edit-project", {dataProject, id, isLogin: req.session.isLogin, user: req.session.user});
})

let realId = 0;
app.get("/project-details/:id", async function (req, res) {
    const { id }= req.params;
    if(/^-?[\d.]+(?:e-?\d+)?$/.test(id)) realId = id;
    
    const dataProject = await projectRepository.getDataProjectById(realId);
    const descriptionArray = dataProject.description.split("\n");
    console.log(dataProject)

    res.render("project-details", {dataProject, descriptionArray, isLogin: req.session.isLogin, user: req.session.user});
})

app.get("/delete-project/:id", async function (req, res) {
    const { id } = req.params;
    await projectRepository.deleteDataProjectById(id);

    res.redirect("/projects");
})

app.post("/register", async function (req, res) {
    const account = new Account(req.body, false);

    await accountRepository.addAccount(account);

    console.log(account);
    res.redirect("/login");
})

app.post("/login", async function (req, res) {
    const { email, password } = req.body;
    const account = await accountRepository.getAccountByEmail(email);
    
    if (!account) {
        res.redirect("/login")
        return alert("Email doesn't exist!");
    }
    if (!account.isRightPassword(password)) {
        res.redirect("login")
        return alert("Wrong Password!")
    }

    req.session.isLogin = true;
    req.session.user = account.username;
    req.session.idUser = account.id;
    notification("Login success!");

    res.redirect("/");
})

app.post("/add-project", upload.single("upload-image"), async function (req, res) {
    const image = req.file.filename;
    const dataProject = new DataProject(req.body, req.session.idUser);
    dataProject.image = image;

    // Validation Input
    if (dataProject.title === "") return alert("Project title must be filled");
    if (dataProject.title.length > 20 ) return alert("Project title max character is 20");
    if (dataProject.start_date === "") return alert("Start date must be filled");
    if (dataProject.end_date === "") return alert("End date must be filled");
    if (dataProject.description === "") return alert("Description must be filled");
    if (dataProject.durationInDays <= 0) return alert("End date cannot be less than start date");

    await projectRepository.addDataProject(dataProject);

    res.redirect("/projects");
})

app.post("/edit-project/:id", upload.single("upload-image"), async function (req, res) {
    const { id } = req.params;
    const image = req.file.filename;
    const dataProject = new DataProject(req.body);
    dataProject.image = image;

    // Validation Input
    if (dataProject.title === "") return alert("Project title must be filled");
    if (dataProject.title.length > 20 ) return alert("Project title max character is 20");
    if (dataProject.start_date === "") return alert("Start date must be filled");
    if (dataProject.end_date === "") return alert("End date must be filled");
    if (dataProject.description === "") return alert("Description must be filled");
    if (dataProject.durationInDays <= 0) return alert("End date cannot be less than start date");

    await projectRepository.editDataProjectById(id, dataProject);

    res.redirect("/projects");
})