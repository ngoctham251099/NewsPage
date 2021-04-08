const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceOfKindSchema = new Schema(
  {
    name: String,
    price: String,
    idKind: String
  },
  {
    collection: "PriceOfKind",
  }
);

const PriceOfKind = mongoose.model("PriceOfKind", PriceOfKindSchema);

module.exports = PriceOfKind;