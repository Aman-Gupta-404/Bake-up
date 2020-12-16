import store from "../../../redux/store";

export const updateUser = (user) => {
  const { _id, firstName, lastName, email } = user;

  const updatedUserData = {
    firstName,
    lastName,
    email,
  };

  return fetch(`/api/user/update/${_id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + store.getState().userReducer.accessToken,
    },
    body: JSON.stringify(updatedUserData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      // console.log("error is: ", err);
      throw err;
    });
};
