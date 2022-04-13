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