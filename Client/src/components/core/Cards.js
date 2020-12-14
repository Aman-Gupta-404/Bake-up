import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ImageHelper from "./helper/ImageHelper";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import { getSingleProduct } from "../customerPages/pageHelper";
import { Add_Product_TO_CART, REMOVE } from "../../redux/Cart/CartTypes";
import { useState } from "react";
import { addProductToCart, removefromCart } from "./helper/ProductsHelper";
import { useEffect } from "react";

function Cards(props) {
  const { _id, name, price, description, image } = props.data;

  const [cart, setCart] = useState(props.cart);

  const preLoad = () => {
    const arr = store.getState().cartReducer.products;
    arr.forEach((productId) => {
      if (_id === productId) {
        // setCart(true);
        return;
      }
    });
  };

  const cartButton = () => {
    // if (cart) {
    //   return (
    //     <Button id="GreyButton" value="inCart">
    //       Remove
    //     </Button>
    //   );
    // } else {
    //   return (
    //     <Button id="cardButton" value="notCart" onClick={addCart}>
    //       Add to cart
    //     </Button>
    //   );
    // }

    return (
      <Button
        id={cart ? "GreyButton" : "cardButton"}
        value={cart ? "remove" : "add"}
        onClick={cartButtonClick}
      >
        {cart ? "Remove" : "Add to cart"}
      </Button>
    );
  };

  const showAddButton = () => {
    return (
      !cart && (
        <Button id="cardButton" value="add" onClick={addCart}>
          Add to cart
        </Button>
      )
    );
  };

  const showRemoveButton = () => {
    return (
      cart && (
        <Button id="GreyButton" value="remove" onClick={removeFromCart}>
          Remove
        </Button>
      )
    );
  };

  const cartButtonClick = (e) => {
    e.preventDefault();
    if (e.target.value === "add") {
      addCart();
      return;
    } else {
      removeFromCart();
    }
  };

  const addCart = (e) => {
    e.preventDefault();
    const userId = store.getState().userReducer.user._id;
    const accessToken = store.getState().userReducer.accessToken;

    // check if the user is logged in
    if (store.getState().userReducer.isLoggedIn) {
      getSingleProduct(_id).then((res) => {
        if (res.error) {
          return null;
        } else {
          // making the api call to add the cart product to database
          addProductToCart(_id, userId, accessToken)
            .then((res) => {
              if (res.error) {
                throw res.error;
              } else {
                // console.log("The add porduct responce is: ", res);
                // console.log("")
                // storing the data in redux
                store.dispatch({
                  type: Add_Product_TO_CART,
                  payload: _id,
                });
                setCart(true);
                return;
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      });
      // store.dipatch
    } else {
      alert("please login to add product to cart");
    }
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    const userId = store.getState().userReducer.user._id;
    const accessToken = store.getState().userReducer.accessToken;

    removefromCart(_id, userId, accessToken).then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        store.dispatch({
          type: REMOVE,
          payload: _id,
        });
        props.reloadFunction();
        setCart(false);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, [cart]);

  const displayDots = () => {
    if (description.length > 50) {
      return <span>...</span>;
    }
  };

  return (
    <div>
      <Link to={`/product/${_id}`} id="cardLink">
        <Card style={{ width: "18rem" }} id="itemCard" text="white">
          <ImageHelper _id={_id} Admindisplay={false} />

          <Card.Body className="text-dark">
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>
                {description.substr(0, 50)}
                {displayDots()}
              </span>
              <br />
              <br />
              <span>
                <span className="font-weight-bold">Price: </span>&#x20B9;
                <span>{price}</span>
              </span>
            </Card.Text>
            {/* {cartButton()} */}
            {showAddButton()}
            {showRemoveButton()}
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default Cards;
