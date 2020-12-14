const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  deleteCategory,
  createCategory,
  getAllCategory,
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Get category by id
router.param("categoryId", getCategoryById);
router.param("userId", getUserById);

// create category route
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// get all Category route
router.get("/category/getcategory", getAllCategory);

// deleteCategory
router.delete(
  "/category/delete/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
