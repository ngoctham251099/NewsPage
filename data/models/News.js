const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    avatar: String,
    thumbnail: String,
    content : String,
    author: String,
    date_submitted: Date,
    status: String,
    summary: String,
    IdUser: String,
    images: {
        type: Array
    },
    kindNews: String,
    categories: String,
    idDepartment: String,
    note: String,
    idBTV: String,
    idTBBT: String,
    idPriceOfKind: String,
    idPriceOfImages: String,
    isPostedFanpage: {
        type: Boolean,
        default: false,
    },
    isCheckedBTV: {
        type: Boolean,
        default: false,
    },
    isCheckedTBBT: {
        type: Boolean,
        default: false,
    },

    isCheckedRefuseBTV: {
        type: Boolean,
        default: false,
    },
    
    isCheckedRefuseTBBT: {
        type: Boolean,
        default: false,
    },
    date_BTV: Date,
    date_TBBT: Date
}, {
    collection: 'News'
});
const newsModel = mongoose.model('newsModel', newsSchema);

module.exports = newsModel;