const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kindSchema = new Schema({
    name: String,
},{
    collection: 'KindsOfNews'
})

const kindModel = mongoose.model('kindModel', kindSchema);

module.exports = kindModel;
