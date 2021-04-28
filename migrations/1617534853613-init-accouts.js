const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Users = require("../data/models/Users");

const ADMIN_ROLE = 1;

const systemUser = {
  name: "admin",
  username: "admin",
  password: bcrypt.hashSync("admin", bcrypt.genSaltSync(8), null),
  email: "admin@yopmail.com",
  department: "admin",
  power: ADMIN_ROLE,
};

const insertSystemUser = () => new Users(systemUser).save();

const mongoUrl = "mongodb://localhost:27017";
const dbName = "NewsPage";
const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const connectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl + "/" + dbName, option, (err) => {
      if (err) {
        reject(err);
      }
      resolve(mongoose);
    });
  });
};

module.exports.up = async function () {
  const db = await connectDb();
  await insertSystemUser();
  await db.disconnect();
};

// module.exports.down = async function() {
//   const db = await connectDb();
//   await Promise.all([Users.deleteOne({ username: systemUser.username })]);
//   await db.disconnect();
// };
