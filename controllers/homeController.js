const { resolve } = require("path");
const Book = require("../models/books");


exports.sendReqBooks = (req, res, next) => {
    let num = req.params.bookNumber;
    Book.findOne({"booknumber": num}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};
exports.new = (req, res) => {
        res.render("addNewBook");
    };
exports.create = (req, res, next) => {
    let bookParams = {
        book: req.body.bookName,
        author: req.body.authorName,
        link: req.body.link
    };
    Book.create(bookParams)
        .then(books => {
            res.locals.redirect = "/home";
            res.locals.books = books;
            next();
        })
        .catch(error => {
            console.log(`Error saving book: ${error.message}`);
            next(error);
        });
    };
exports.redirectView = (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    };
exports.delete = (req, res, next) => {
    let bookId = req.params.id;
    Book.findByIdAndRemove(bookId)
        .then(() => {
            res.locals.redirect = "/home";
            next();
        })
        .catch(error => {
            console.log(`Error deleting book by ID: ${error.message}`);
            next();
        });
}