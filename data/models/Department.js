const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String,
},{
    collection: 'Department'
})

const departmentModel = mongoose.model('departmentModel', departmentSchema);

module.exports = departmentModel;