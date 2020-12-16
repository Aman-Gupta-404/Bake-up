import store from "../../../redux/store";
import { REMOVE_USER } from "../../../redux/users/userTypes";

export const signUp = (data) => {
  return fetch(`/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return {
        message: "An error occured in fetching data",
        error: err,
      };
    });
};

// function to handle login of the user
export const loginUser = (user) => {
  return fetch(`/api/login`, {
    method: "POST",
    // credentials: "include",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log(err);
      return {
        message: "An error occured in fetching data",
        error: err,
      };
    });
  // console.log(loginUser);
  // return loginUser;
};

// function to store the user data in local storage
export const storeUser = (user) => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("bakeUser", JSON.stringify(user));
  }
};

export const logoutUser = () => {
  return fetch(`/api/logout`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      console.log(res);

      return {
        success: true,
      };
    })
    .catch((err) => {
      throw err;
    });
};

export const isAuthenticated = () => {
  const flag = store.getState().userReducer.isLoggedIn;
  // if (flag) {
  //   return true;
  // } else {
  //   return false;
  // }
  return flag;
};

export const isAdmin = () => {
  const flag = store.getState().userReducer.user.isAdmin;
  // if (flag) {
  //   return true;
  // } else {
  //   return false;
  // }
  return flag;
};

export const refreshAccessToken = () => {
  return fetch(`/api/refresh_token`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return {
        success: false,
        error: err,
      };
    });
};
