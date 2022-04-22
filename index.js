const express = require("express")
const app = express();
const homeController = require("./controllers/homeController");
const httpStatus = require("http-status-codes");

const plainTextContentType = {
    "Content-Type": "text/plain",
};

const methodOverride = require("method-override");

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(express.static("public"))

app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

app.get(
    "/",
    homeController.getAllBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("home", { books: req.data});
    }
);

app.get(
    "/home",
    homeController.getAllBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("home", { books: req.data});
    }
);

app.get(
    "/books", 
    homeController.getAllBooks,
    (req, res, next) => {
        console.log(req.data);
        res.send(req.data);
    }
);

app.get(
    "/books/:bookNumber", 
    homeController.sendReqBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("books", { books: req.data});
    }
);

app.get("/addNewBook", homeController.new);
app.post("/create", homeController.create, homeController.redirectView);
app.delete("/books/:id/delete", homeController.delete, homeController.redirectView);

app.get(
    "/DeleteABook",
    homeController.getAllBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("deleteABook", { books: req.data});
    }
);

app.post("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const Book = require("./models/books");

app.listen(app.get("port"), () => {
console.log(`The Server has started and is running at http://localhost:${app.get("port")}`);
});