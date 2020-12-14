const jwt = require("jsonwebtoken");
const User = require("../../models/user");
// const {createAccessToken} = require('./')

exports.createAccessToken = (userId) => {
  var accessToken = jwt.sign(
    {
      data: userId,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d", issuer: process.env.HOST_URI }
  );
  return accessToken;
};

exports.createRefreshToken = (userId) => {
  var refreshToken = jwt.sign(
    {
      data: userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15m", issuer: process.env.HOST_URI }
  );
  return refreshToken;
};

exports.VerifyRefreshToken = (refToken, cb) => {
  // return jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, function (
  //   err,
  //   decoded
  // ) {
  //   if (err) {
  //     console.log("Loging error: ", err);
  //     return "";
  //   } else {
  //     // bar
  //     const _id = decoded.data;
  //     // finding the user in database
  //     User.findById({ _id }, function (error, user) {
  //       if (error || !user) {
  //         return "";
  //       }

  //       const createAccessToken = (userId) => {
  //         var accessToken = jwt.sign(
  //           {
  //             data: userId,
  //           },
  //           process.env.TOKEN_SECRET,
  //           { expiresIn: "1d", issuer: process.env.HOST_URI }
  //         );
  //         return accessToken;
  //       };

  //       var returnAccessToken = createAccessToken(user._id);
  //       const { _id, firstName, lastName, email, isAdmin } = user;
  //       return {
  //         _id,
  //         firstName,
  //         lastName,
  //         email,
  //         accessToken: returnAccessToken,
  //         isAdmin,
  //       };
  //     });
  //   }
  // });

  // -----

  let refreshUser;

  const decoded = jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET);
  const id = decoded.data;
  // console.log(id);
  User.findById({ _id: id }, (err, user) => {
    if (err || !user) {
      // console.log("The error is: ", err);
      return "";
    }

    const createAccessToken = (userId) => {
      var accessToken = jwt.sign(
        {
          data: userId,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d", issuer: process.env.HOST_URI }
      );
      return accessToken;
    };

    var returnAccessToken = createAccessToken(user._id);
    const { _id, firstName, lastName, email, isAdmin } = user;
    refreshUser = {
      _id,
      firstName,
      lastName,
      email,
      accessToken: returnAccessToken,
      isAdmin,
    };
    // return {
    //   _id,
    //   firstName,
    //   lastName,
    //   email,
    //   accessToken: returnAccessToken,
    //   isAdmin,
    // };
  });
  // return refreshUser;
  cb(refreshUser);
};
