const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Users = require("../data/models/Users");

const ADMIN_ROLE = 1;
const TRUONG_BAN_BT_ROLE = 2;
const BAN_BT_ROLE = 3;
const CTV_ROLE = 4;
const THU_KY_ROLE = 5;

const systemUser = {
  name: "admin",
  username: "admin",
  password: bcrypt.hashSync("admin", bcrypt.genSaltSync(8), null),
  email: "admin@yopmail.com",
  department: "admin",
  power: ADMIN_ROLE,
};

const systemUser2 = {
  name: "truongbanbientap",
  username: "truongbanbientap",
  password: bcrypt.hashSync("truongbanbientap", bcrypt.genSaltSync(8), null),
  email: "truongbanbientap@yopmail.com",
  department: "truongbanbientap",
  power: TRUONG_BAN_BT_ROLE,
};

const systemUser3 = {
  name: "banbientap",
  username: "banbientap",
  password: bcrypt.hashSync("banbientap", bcrypt.genSaltSync(8), null),
  email: "banbientap@yopmail.com",
  department: "banbientap",
  power: BAN_BT_ROLE,
};

const systemUser4 = {
  name: "congtacvien",
  username: "congtacvien",
  password: bcrypt.hashSync("congtacvien", bcrypt.genSaltSync(8), null),
  email: "congtacvien@yopmail.com",
  department: "congtacvien",
  power: CTV_ROLE,
};

const systemUser5 = {
  name: "thuky",
  username: "thuky",
  password: bcrypt.hashSync("thuky", bcrypt.genSaltSync(8), null),
  email: "thuky@yopmail.com",
  department: "thuky",
  power: THU_KY_ROLE,
};

const insertSystemUser = () => new Users(systemUser).save();
const insertSystemUser2 = () => new Users(systemUser2).save();
const insertSystemUser3 = () => new Users(systemUser3).save();
const insertSystemUser4 = () => new Users(systemUser4).save();
const insertSystemUser5 = () => new Users(systemUser5).save();

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
