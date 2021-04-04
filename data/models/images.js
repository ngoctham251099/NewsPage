const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    name: String,
    price: Number
},{
    collection: 'Images'
})

const imagesModel = mongoose.model('imagesModel', imagesSchema);

module.exports = imagesModel;