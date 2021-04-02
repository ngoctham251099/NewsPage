const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    name: String,
},{
    collection: 'Categories'
})

const CategoriesModel = mongoose.model('CategoriesModel', CategoriesSchema);

module.exports = CategoriesModel;