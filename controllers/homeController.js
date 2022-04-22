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
module.exports = {
    new: (req, res) => {
        res.render("addNewBook");
    },
    create: (req, res, next) => {
        let bookParams = {
            name: req.body.bookName,
            author: req.body.authorName,
            bookNumber: req.body.bookNumber,
            link: req.body.link
        };
        Book.create(bookParams)
            .then(book => {
                res.locals.redirect = "/home";
                res.locals.book = book;
                next();
            })
            .catch(error => {
                console.log(`Error saving book: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }
    //delete: (req, res, next) => {

    //}
};