export const getSingleProduct = (productId) => {
  return fetch(`/api/product/${productId}`, {
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
  return fetch(`/api/user/cart/get/${userId}`, {
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
