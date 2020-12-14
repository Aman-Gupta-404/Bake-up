const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
  addProductToCart,
  getCartProducts,
  removeCartProduct,
  getUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { body, validationResult } = require("express-validator");

// middle wares
router.param("userId", getUserById);

// Update Route
router.put(
  "/user/update/:userId",
  [
    body("firstName").isLength({ min: 2 }),
    body("lastName").isLength({ min: 2 }),
  ],
  isSignedIn,
  isAuthenticated,
  updateUser
);

router.put(
  "/user/cart/add/:userId",
  isSignedIn,
  isAuthenticated,
  addProductToCart
);

router.put(
  "/user/cart/delete/:userId",
  isSignedIn,
  isAuthenticated,
  removeCartProduct
);

router.get(
  "/user/cart/get/:userId",
  isSignedIn,
  isAuthenticated,
  getCartProducts
);

// Delete user route
router.delete("/user/delete/:userId", isSignedIn, isAuthenticated, deleteUser);

module.exports = router;
