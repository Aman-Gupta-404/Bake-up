const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
} = require("./helper/authHelper");

// signup controller
exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const data = req.body;
  if (data) {
    const newData = User(data);
    newData
      .save()
      .then((res) => {
        return;
      })
      .catch((err) => console.log(`error: ${err}`));
    return res.send({
      success: true,
      message: "Signup successfull",
    });
  }
};

// Login controller
exports.login = (req, res) => {
  // checkin for validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0] });
  }
  const loginData = req.body;
  console.log("Login Data is: ", loginData);

  User.findOne({ email: loginData.email }, function (err, user) {
    if (err) {
      return res.status(404).json({
        error: true,
        message: "The entered email id is wrong",
      });
    }
    if (!user.authenticate(loginData.password)) {
      return res.status(400).json({
        error: true,
        message: "The entered password is wrong",
      });
    }
    const userId = user._id;

    var accessToken = createAccessToken(userId);
    var refreshToken = createRefreshToken(userId);

    const oneDayToSeconds = 24 * 60 * 60; //24 hours validity time for cookies

    res.cookie("refjid", refreshToken, {
      maxAge: oneDayToSeconds,
      // You can't access these tokens in the client's javascript
      httpOnly: true,
      // Forces to use https in production
      secure: process.env.NODE_ENV === "production" ? true : false,
      // secure: true,
      // secure: true,
    });

    const { firstName, lastName, email, _id, isAdmin, cart } = user;
    return res.json({
      _id,
      firstName,
      lastName,
      email,
      accessToken,
      isAdmin,
      cart,
    });
  });
};

// TODO: add the authorizzation in logout path
exports.logUserOut = (req, res) => {
  res.clearCookie("refjid");
  res.json({
    success: true,
    message: "Logout successful",
  });
};

// check the login token - to check if the user is logged in
exports.isSignedIn = (req, res, next) => {
  const atuhToken = req.headers.authorization;

  if (!atuhToken) {
    res.status(401).json({
      message: "You are not logged in!",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const options = { expiresIn: "1h", issuer: "http://localhost:5000" };
  try {
    var result = jwt.verify(token, process.env.TOKEN_SECRET, options);
    // console.log("Result: ", result);
  } catch (err) {
    // console.log(err);
    res.status(401).json({
      message: "An error occured in the authentication",
      error: err,
    });
  }
  // set the req object with a property of _id
  req.auth = {
    _id: result.data,
  };
  next();
};

// to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  var result = req.user && req.auth && req.auth._id == req.user._id;

  if (!result) {
    return res.status(403).json({
      message: "You are not authenticated!",
    });
  }
  next();
};

// controller to check the admin user
exports.isAdmin = (req, res, next) => {
  const result = req.user.isAdmin === 1;
  if (!result) {
    res.status(403).json({
      message: "You are not authorised to access this route!",
    });
  }
  next();
};

exports.refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies;
  const token = refreshToken.refjid;

  if (token == undefined) {
    return res.json({
      success: false,
      message: "No refresh token available",
    });
  } else {
    // no seperate code

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const id = decoded.data;
    User.findById({ _id: id }, (err, user) => {
      if (err || !user) {
        // console.log("The error is: ", err);
        return res.json({
          success: false,
          message: "user not found",
        });
      }

      // const createAccessToken = (userId) => {
      //   var accessToken = jwt.sign(
      //     {
      //       data: userId,
      //     },
      //     process.env.TOKEN_SECRET,
      //     { expiresIn: "1d", issuer: process.env.HOST_URI }
      //   );
      //   return accessToken;
      // };

      var returnAccessToken = createAccessToken(user._id);
      const { _id, firstName, lastName, email, isAdmin, cart } = user;
      refreshUser = {
        _id,
        firstName,
        lastName,
        email,
        accessToken: returnAccessToken,
        isAdmin,
      };
      // console.log("the user is: ", refreshUser);
      return res.json({
        _id,
        firstName,
        lastName,
        email,
        accessToken: returnAccessToken,
        isAdmin,
        cart,
      });
    });
  }
};
