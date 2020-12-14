const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// get user by ID paramater
exports.getUserById = (req, res, next, id) => {
  const validationError = validationResult(req);
  // console.log(validationError);
  if (!validationError.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }
  User.findById(id, function (err, user) {
    if (err || !user) {
      return res.status(404).json({
        message: "something went wrong",
        error: err,
      });
    }
    const { isAdmin, _id, firstName, lastName, email, cart } = user;
    const userObject = {
      isAdmin,
      _id,
      firstName,
      lastName,
      email,
      cart,
    };
    req.user = userObject;
    next();
  });
};

// update User
exports.updateUser = (req, res) => {
  const errors = validationResult(req);
  // console.log(validationError);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", error: errors.array() });
  }
  const { firstName, lastName, email } = req.body;

  const id = req.user._id;
  const updatedUser = {
    firstName,
    lastName,
    email,
  };

  if (!(id && firstName && lastName && email)) {
    return res.status(400).json({
      message: "please check the entries",
    });
  }

  User.findByIdAndUpdate(id, updatedUser, { new: true }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong while updating the user",
        error: err,
      });
    }
    const { firstName, lastName, email } = user;
    return res.status(200).json({
      firstName,
      lastName,
      email,
    });
  });
};

// delete request
exports.deleteUser = (req, res) => {
  const id = req.user._id;
  User.findByIdAndDelete(id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong, unable to delete the user",
        error: err,
      });
    }
    return res.status(200).json({
      message: "Successfully deleted the user",
    });
  });
};

exports.addProductToCart = (req, res) => {
  const productDetails = req.body.cart; //the data is an array
  // req;
  /*
    the body contains productId
  */
  const singleProduct = productDetails[0];
  const id = req.user._id;
  const cart = req.user.cart;
  const updatedUser = {
    cart: [...cart, singleProduct],
  };

  // User.findById(_id, function(err, user) {
  //   if(err || !user) {
  //     return res.status(404).json({
  //       error: err
  //     })
  //   }
  //   updatedUser = {
  //     ...user,
  //     cart:
  //   }
  // })

  User.findByIdAndUpdate(id, updatedUser, { new: true }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong while updating the cart data",
        error: err,
      });
    }
    // console.log(user);
    return res.status(200).json({
      cart: user.cart,
    });
  });
};

exports.removeCartProduct = (req, res) => {
  const productDetails = req.body.cart; //the data is an array

  /*
    the body contains productId
  */

  const id = req.user._id;
  let cart = req.user.cart;
  const removeId = productDetails[0];
  const updatedUser = cart.filter((item) => {
    if (item == removeId) {
      return false;
    } else {
      return true;
    }
  });

  const updatedCart = {
    cart: [...updatedUser],
  };

  User.findByIdAndUpdate(id, updatedCart, { new: true }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong while updating the cart data",
        error: err,
      });
    }
    return res.status(200).json({
      cart: user.cart,
    });
  });
};

exports.getCartProducts = (req, res) => {
  return res.status(200).json({
    cart: req.user.cart,
  });
};
