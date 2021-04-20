const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceImagesSchema = new Schema(
  {
    name: String,
    price: String,
    idImages: String
  },
  {
    collection: "PriceImages",
  }
);

const PriceImages = mongoose.model("PriceImages", PriceImagesSchema);

module.exports = PriceImages;
