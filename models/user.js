const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

var userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    salt: {
      type: String,
      required: true,
    },
    encry_pass: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    favourites: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: false,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("password").set(function (plainPassword) {
  this.salt = uuidv4();
  this.encry_pass = this.encrypt(plainPassword);
});

userSchema.methods.encrypt = function (password) {
  if (!password) {
    return "";
  }
  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(password)
      .digest("hex");
  } catch (err) {
    return "";
  }
};

userSchema.methods.authenticate = function (password) {
  if (!password) {
    return false;
  }
  return this.encrypt(password) === this.encry_pass;
};

module.exports = mongoose.model("User", userSchema);
