const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  updateProduct,
  deleteProduct,
  getImage,
} = require("../controllers/products");
const { getUserById } = require("../controllers/user");
const {
  createProduct,
  getProductById,
  getProduct,
  getALlProducts,
} = require("../controllers/products");

router.param("userId", getUserById);

// for storing data through Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + uuidv4());
  },
});

var upload = multer({
  storage: storage,
});

// params
router.param("productId", getProductById);

// uploading the product route
router.post(
  "/product/upload/:userId",
  upload.single("photo"),
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// retreving the product
router.get("/product/:productId", getProduct);

// retreving the product image
router.get("/product/image/:productId", getImage);

// updating the product
router.put(
  "/product/update/:productId",
  upload.single("product"),
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// deleting the product
router.delete(
  "/product/delete/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/products/allproducts", getALlProducts);

module.exports = router;
