const mongoose = require('mongoose')
const booksSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    book_title: {
        type: String,
        required: true
    },
    book_content: {
        type: String,
        required: true
    }
    // private: {
    //     boolean: true,
    //     required: true
    // }
})
module.exports = mongoose.model('books', booksSchema)



