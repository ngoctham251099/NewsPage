const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    name: Array,
    idNews: String
},{
    collection: 'Images'
})

const imagesModel = mongoose.model('imagesModel', imagesSchema);

module.exports = imagesModel;