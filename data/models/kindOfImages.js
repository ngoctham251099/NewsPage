const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kindImagesSchema = new Schema({
    name: String, 
    price: Number
},{
    collection: 'KindOfImages'
})

const kindImagesModel = mongoose.model('kindImagesModel', kindImagesSchema);

module.exports = kindImagesModel;
