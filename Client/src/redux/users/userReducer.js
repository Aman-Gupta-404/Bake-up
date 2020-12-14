const { ADD_USER, REMOVE_USER, UPDATE_USER } = require("./userTypes");

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      state = {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        accessToken: action.payload.accessToken,
        user: {
          ...state.user,
          _id: action.payload.user._id,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: action.payload.user.email,
          isAdmin: action.payload.user.isAdmin,
        },
      };
      return state;
    }
    case REMOVE_USER: {
      state = {
        ...state,
        isLoggedIn: false,
        accessToken: "",
        user: {
          ...state.user,
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          isAdmin: null,
        },
      };
      return state;
    }
    case UPDATE_USER: {
      state = {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
      };
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
