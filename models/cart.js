const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: false,
    },
  ],
});

module.exports = new mongoose.model("Cart", cartSchema);
