const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        book: {
            type: String,
            required: true
            },
        author: {
            type: String,
            required: true
            },
        booknumber: {
            type: String,
            required: true
            }, 
        link: {  
            type: String,
            required: true
        },
});
module.exports = mongoose.model("Book", bookSchema);