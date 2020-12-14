const Products = require("../models/products");
const fs = require("fs");
const path = require("path");

exports.createProduct = (req, res) => {
  console.log(req.body);
  var obj = {
    name: req.body.name,
    price: req.body.price,
    image: {
      data: fs.readFileSync(path.join("./uploads/" + req.file.filename)),
      contentType: req.file.mimetype,
    },
    description: req.body.description,
    category: req.body.category,
  };
  const newProduct = Products(obj);
  newProduct
    .save()
    .then((responce) => {
      // console.log("Save responce: ", responce);
      return res.status(200).json(newProduct);
    })
    .catch((err) => {
      res.send({
        error: err,
      });
    });
};

// get product by Id param
exports.getProductById = (req, res, next, id) => {
  Products.findById(id, function (err, product) {
    if (err || !product) {
      return res.status(400).json({
        message: "Something went wrong",
        error: err,
      });
    }
    // console.log("found product is: ", product);
    req.product = product;
    next();
  });
};

// get Product
exports.getProduct = (req, res) => {
  req.product.image = undefined;
  // console.log(req.product);
  res.status(200).json({
    product: req.product,
  });
};

// getting the image
exports.getImage = (req, res) => {
  // sending binary data
  // console.log(res);
  if (req.product.image.data) {
    // res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
};

// Update Product
exports.updateProduct = (req, res) => {
  const id = req.product._id;
  if (!id) {
    return res.status(404).json({
      message: "Could not find the Id",
    });
  }
  const updatedProduct = {
    name: req.body.name,
    image: {
      data: fs.readFileSync(path.join("./uploads/" + req.file.filename)),
      contentType: req.file.mimetype,
    },
    description: req.body.description,
    category: req.body.category,
  };

  Products.findByIdAndUpdate(id, updatedProduct, function (err, product) {
    if (err) {
      return res.status(500).json({
        message: "The product was not updated",
        error: err,
      });
    }
    return res.status(200).json({
      message: "The product was updated",
    });
  });
};

// delete request
exports.deleteProduct = (req, res) => {
  const id = req.product._id;
  if (!id) {
    return res.status(404).json({
      message: "Could not find the product",
    });
  }
  Products.findByIdAndDelete(id, function (err, product) {
    if (err || !product) {
      return (
        res.status(500),
        json({
          message: "Something went wrong while deleting the product",
          error: err,
        })
      );
    }
    return res.status(200).json({
      message: "The product was successfully deleted",
    });
  });
};

exports.getALlProducts = (req, res) => {
  Products.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send("Something went wrong");
    });
};
