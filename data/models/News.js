const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    avatar: String,
    content : String,
    author: String,
    date_submitted: Date,
    status: String,
    IdUser: String,
    department: String,
    images: {
        type: Array
    },
    kindNews: String,
    categories: String,
    note: String
}, {
    collection: 'News'
});
const newsModel = mongoose.model('newsModel', newsSchema);

module.exports = newsModel;