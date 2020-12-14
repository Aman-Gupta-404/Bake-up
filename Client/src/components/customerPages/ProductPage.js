import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Add_Product_TO_CART, REMOVE } from "../../redux/Cart/CartTypes";
import store from "../../redux/store";
import Base from "../core/Base";
import ImageHelper from "../core/helper/ImageHelper";
import {
  addProductToCart,
  removefromCart,
} from "../core/helper/ProductsHelper";
import { getSingleProduct } from "./pageHelper";

function ProductPage(props) {
  const [product, setProduct] = useState({
    _id: props.match.params.productId,
    name: "",
    description: "",
    price: "",
    category: "",
    error: "",
  });

  const [isCart, setIsCart] = useState(false);
  const [cartError, setCartError] = useState(false);

  const { _id, name, description, price, category } = product;

  const getProduct = () => {
    getSingleProduct(product._id).then((res) => {
      if (res.error) {
        setProduct({
          ...product,
          error: res.error,
        });
      } else {
        // console.log(res);

        // checking if the product is in cart
        const tempArr = store.getState().cartReducer.products;
        tempArr.map((item) => {
          // console.log(item);
          if (item === product._id) {
            setIsCart(true);
          }
        });
        setProduct({
          ...product,
          name: res.product.name,
          description: res.product.description,
          price: res.product.price,
          category: res.product.category,
        });
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addCart = (e) => {
    e.preventDefault();
    const productId = _id;
    const userId = store.getState().userReducer.user._id;
    const token = store.getState().userReducer.accessToken;
    addProductToCart(productId, userId, token).then((res) => {
      if (res.error) {
        setCartError(true);
        return alert("something went wrong");
      } else {
        store.dispatch({ type: Add_Product_TO_CART, payload: _id });
        setIsCart(!isCart);
      }
    });
  };

  const removeCart = (e) => {
    e.preventDefault();

    const productId = _id;
    const userId = store.getState().userReducer.user._id;
    const token = store.getState().userReducer.accessToken;
    removefromCart(productId, userId, token).then((res) => {
      if (res.error) {
        return alert("something went wrong");
        setCartError(true);
      } else {
        store.dispatch({ type: REMOVE, payload: _id });
        setIsCart(!isCart);
      }
    });
  };

  // Show cart buttons
  const showAddCart = () => {
    // console.log(isCart);
    if (!isCart) {
      return (
        <Button id="brightButton" onClick={addCart}>
          Add to cart
        </Button>
      );
    } else {
      return null;
    }
  };

  const showRemoveCart = () => {
    if (isCart) {
      return (
        <Button id="GreyButton" onClick={removeCart}>
          Remove
        </Button>
      );
    } else {
      return null;
    }
  };

  // const errorAlert = () =>{
  //   if(error)
  //   return (alert)
  // }

  return (
    <Base>
      <div className="mt-5 ">
        <div className="row">
          <div className="col-5 justify-content-center text-center ">
            <ImageHelper _id={_id} Admindisplay={true} />
          </div>
          <div className="col-7 ">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {/* <p>Category: {product.category}</p> */}
            <p>Price: {product.price}</p>
            {showAddCart()}
            {showRemoveCart()}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default ProductPage;
