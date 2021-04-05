const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Kinds = require('../data/models/KindOfNews');


const kind1 = {
  name: 'kind 1',
  unitPrice: 1000
};

const kind2 = {
  name: 'kind 2',
  unitPrice: 1000
};




const insertKind1 = () => new Kinds(kind1).save();
const insertKind2 = () => new Kinds(kind2).save();



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
  await insertKind1();
  await insertKind2();
  await db.disconnect();
};

// module.exports.down = async function() {
//   const db = await connectDb();
//   await Promise.all([Users.deleteOne({ username: systemUser.username })]);
//   await db.disconnect();
// };
