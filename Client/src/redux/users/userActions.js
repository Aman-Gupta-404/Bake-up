const { ADD_USER } = require("./userTypes");

export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
