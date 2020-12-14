const Category = require("../models/category");

// get category by id
exports.getCategoryById = (req, res, next, id) => {
  if (!id) {
    return res.status(404).json({
      message: "something went wrong inn finding the product",
    });
  }
  Category.findById(id, function (err, singleCategory) {
    if (err || !singleCategory) {
      return res.status(404).json({
        message: "Could not find the category",
        error: err,
      });
    }

    req.category = {
      _id: singleCategory.id,
      name: singleCategory.name,
    };
    next();
  });
};

// create category
exports.createCategory = (req, res) => {
  const category = req.body.category;
  // console.log(req.body);
  const obj = {
    name: category,
  };
  const newCategory = Category(obj);
  newCategory
    .save()
    .then((data) => {
      return;
    })
    .catch((err) => {
      // console.log(err);
      return res.json({
        error: err,
      });
    });
  return res.status(200).json({
    message: "The product was successfully saved",
    success: true,
  });
};

// get all category
exports.getAllCategory = (req, res) => {
  Category.find()
    .then((responce) => {
      // console.log(responce);
      return res.status(200).json(responce);
      // return res.send("Success");
    })
    .catch((err) => {
      return res.json({
        message: "Something went wrong",
        error: err,
      });
    });
};

// delete category
exports.deleteCategory = (req, res) => {
  // console.log("The category is: ", req.category);
  const id = req.category._id;
  Category.findByIdAndDelete(id, function (err, category) {
    if (err || !category) {
      return res.status(404).json({
        message: "Something went wrong",
        error: err,
      });
    }
    return res.status(200).json({
      message: "The category was successfully deleted",
    });
  });
};
