const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  isSignedIn,
  refreshAccessToken,
  logUserOut,
  isAuthenticated,
} = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.get("/test", (req, res) => {
  res.send("The test page is working!");
});

// Sign Up Route for creating the user
router.post(
  "/signup",
  [
    check("firstName").isLength({ min: 2 }),
    check("lastName").isLength({ min: 2 }),
    check("email").isEmail(),
    check("password").isLength({ min: 5, max: 15 }),
    // body("phoneNumber").isMobilePhone(),
  ],
  signUp
);

// Login Route
router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 5, max: 15 })],
  login
);

// logout route
router.get("/logout", logUserOut);

// protected route
router.get("/private", isSignedIn, (req, res) => {
  // console.log("the req obj: ", req.auth);
  res.send("You have accessed the private route");
});

// route to refresh the token using refresh token
router.post("/refresh_token", refreshAccessToken);

module.exports = router;
