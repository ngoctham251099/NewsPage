const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Users = require('../data/models/Users');

const systemUser = {
  name: 'admin1',
    username: 'admin1',
    password: bcrypt.hashSync('admin1', bcrypt.genSaltSync(8), null),
    email: 'admin1@yopmail.com',
    department: 'admin',
    power: '1',
};

const systemUser2 = {
  name: 'admin2',
    username: 'admin2',
    password: bcrypt.hashSync('admin2', bcrypt.genSaltSync(8), null),
    email: 'admin2@yopmail.com',
    department: 'admin2',
    power: '2',
};

const systemUser3 = {
  name: 'admin3',
    username: 'admin3',
    password: bcrypt.hashSync('admin3', bcrypt.genSaltSync(8), null),
    email: 'admin3@yopmail.com',
    department: 'admin3',
    power: '3',
};

const systemUser4 = {
  name: 'admin4',
    username: 'admin4',
    password: bcrypt.hashSync('admin4', bcrypt.genSaltSync(8), null),
    email: 'admin4@yopmail.com',
    department: 'admin4',
    power: '4',
};

const systemUser5 = {
  name: 'admin5',
    username: 'admin5',
    password: bcrypt.hashSync('admin5', bcrypt.genSaltSync(8), null),
    email: 'admin5@yopmail.com',
    department: 'admin5',
    power: '5',
};



const insertSystemUser = () => new Users(systemUser).save();
const insertSystemUser2 = () => new Users(systemUser2).save();
const insertSystemUser3 = () => new Users(systemUser3).save();
const insertSystemUser4 = () => new Users(systemUser4).save();
const insertSystemUser5 = () => new Users(systemUser5).save();




const mongoUrl = 'mongodb://localhost:27017';
const dbName =  'NewsPage';
const option = {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
}

const connectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl + '/' + dbName, option, err => {
      if (err) {
        reject(err);
      }
      resolve(mongoose);
    });
  });
};

module.exports.up = async function() {
  const db = await connectDb();
  await insertSystemUser();
  await insertSystemUser2();
  await insertSystemUser3();
  await insertSystemUser4();
  await insertSystemUser5();

  await db.disconnect();
};

// module.exports.down = async function() {
//   const db = await connectDb();
//   await Promise.all([Users.deleteOne({ username: systemUser.username })]);
//   await db.disconnect();
// };
