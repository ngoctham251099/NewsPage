const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Kinds = require("../data/models/KindOfNews");

const kind1 = {
  name: "Tin Sưu Tầm",
  unitPrice: 1000,
};

const kind2 = {
  name: "Tin/Bài Viết",
  unitPrice: 10000,
};

const kind3 = {
  name: "Tin/Bài Viết, Ảnh",
  unitPrice: 20000,
};

const kind4 = {
  name: "Ảnh Thiết Kế",
  unitPrice: 5000,
};

const insertKind1 = () => new Kinds(kind1).save();
const insertKind2 = () => new Kinds(kind2).save();
const insertKind3 = () => new Kinds(kind3).save();
const insertKind4 = () => new Kinds(kind4).save();

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
  await insertKind1();
  await insertKind2();
  await insertKind3();
  await insertKind4();
  await db.disconnect();
};
