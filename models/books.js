const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

var bookSchema = mongoose.Schema({
        book: {
            type: String,
            required: true
            },
        author: {
            type: String,
            required: true
            },
        booknumber: {
            type: Long
            //required: true
            }, 
        link: {  
            type: String,
            required: true
        },
});
module.exports = mongoose.model("Book", bookSchema);