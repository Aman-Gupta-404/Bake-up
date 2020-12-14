export const getSingleProduct = (productId) => {
  return fetch(`${process.env.REACT_APP_BACKENDURL}/product/${productId}`, {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const getCartProducts = (userId, token) => {
  return fetch(`${process.env.REACT_APP_BACKENDURL}/user/cart/get/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};
