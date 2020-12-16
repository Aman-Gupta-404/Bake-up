const { default: store } = require("../../../redux/store");

exports.getAllProducts = () => {
  // console.log("Api call being made");
  // return fetch(`${process.env.REACT_APP_BACKENDURL}/products/allproducts`, {
  return fetch(`/api/products/allproducts`, {
    method: "GET",
  })
    .then((result) => {
      console.log(result);
      return result.json();
    })
    .catch((err) => {
      return err;
    });
};

exports.addProductToCart = (productId, userId, token) => {
  const cartData = store.getState().cartReducer.products; //this is an array of cart products

  const data = {
    cart: [productId],
  };
  return fetch(`/api/user/cart/add/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

exports.removefromCart = (productId, userId, token) => {
  // let cartData = store.getState().cartReducer.products; //this is an array of cart products

  const cartData = {
    cart: [productId],
  };
  // cartData.filter((item) => {
  //   return item._id !== productId;
  // });
  // console.log(cartData);

  return fetch(`/api/user/cart/delete/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};
