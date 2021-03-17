const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String,unique: true},
    department: {type: String,},
    power: {type: String},
    resetPasswordToken: String,
    resetPasswordExpires: Date
},{
    collection: 'Users'
});

// phương thực sinh chuỗi hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
// kiểm tra password có hợp lệ không
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  

const usersModel = mongoose.model('usersModel', userSchema);
module.exports = usersModel;