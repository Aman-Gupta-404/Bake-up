import store from "../../../redux/store";

export const getAllCategories = () => {
  return fetch(`${process.env.REACT_APP_BACKENDURL}//category/getcategory`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const createCategory = (category, token, userId) => {
  // const userId = store
  return fetch(
    `${process.env.REACT_APP_BACKENDURL}/category/create/${userId}`,
    {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(
    `${process.env.REACT_APP_BACKENDURL}/category/delete/${categoryId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });
};

// Products function
export const createProduct = (product, userId, token) => {
  return fetch(`${process.env.REACT_APP_BACKENDURL}/product/upload/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(
    `${process.env.REACT_APP_BACKENDURL}/product/delete/${productId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
      return {
        error: true,
      };
    });
};
