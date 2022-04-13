const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        book: String,
        author: String,
        booknumber: String,
        link: String,
    });
module.exports = mongoose.model("Book", bookSchema);