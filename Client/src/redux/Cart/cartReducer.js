const {
  Add_Product_TO_CART,
  GET_CART_PRODUCTS,
  REMOVE,
} = require("./CartTypes");

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS: {
      state = {
        ...state,
        products: [...action.payload],
      };
      return state;
    }
    case Add_Product_TO_CART: {
      state = {
        ...state,
        products: [...state.products, action.payload],
      };
      return state;
    }
    case REMOVE: {
      state = {
        ...state,
        products: state.products.filter((item) => {
          // return item !== action.payload;
          if (item == action.payload) {
            return false;
          } else {
            return true;
          }
        }),
      };
      return state;
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
