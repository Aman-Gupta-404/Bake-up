import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routers from "./Routers";
import { useState } from "react";
import { useEffect } from "react";
import { ADD_USER, REMOVE_USER } from "./redux/users/userTypes";
import { refreshAccessToken } from "./components/admin/helper/authHelper";
import { GET_CART_PRODUCTS } from "./redux/Cart/CartTypes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshAccessToken().then((res) => {
      // console.log(res);
      if (res.success === false) {
        // console.log("unsuccessful responce!: ", res);
        store.dispatch({
          type: REMOVE_USER,
        });
        setLoading(false);
      } else {
        // console.log(res);
        const {
          accessToken,
          _id,
          firstName,
          lastName,
          email,
          isAdmin,
          cart,
        } = res;
        const payloadBody = {
          isLoggedIn: true,
          accessToken: accessToken,
          user: {
            _id,
            firstName,
            lastName,
            email,
            isAdmin,
          },
        };
        store.dispatch({
          type: ADD_USER,
          payload: payloadBody,
        });

        // dispatching the cart data
        store.dispatch({ type: GET_CART_PRODUCTS, payload: cart });
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
