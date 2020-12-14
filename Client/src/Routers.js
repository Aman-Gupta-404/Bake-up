import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/core/Home";
import Signup from "./components/admin/Signup";
import Login from "./components/admin/Login";
import PrivateRoute from "./components/admin/helper/PrivateRoute";
import AdminRoute from "./components/admin/helper/AdminRoute";
import AdminDahs from "./components/Pages/AdminDahs";
import AddCategory from "./components/admin/AddCategory";
import AllCategory from "./components/admin/AllCategory";
import AddProducts from "./components/admin/AddProducts";
import AllProducts from "./components/admin/AllProducts";
import ProductPage from "./components/customerPages/ProductPage";
import Cart from "./components/customerPages/Cart";
import UserDash from "./components/Pages/UserDash";
import About from "./components/core/About";
import Checkout from "./components/customerPages/Checkout";

function Routers() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route
            path="/product/:productId"
            exact
            render={(props) => <ProductPage {...props} />}
          />
          <PrivateRoute
            path="/cart"
            exact
            component={(props) => <Cart {...props} />}
          />
          <PrivateRoute
            path="/checkout"
            exact
            component={(props) => <Checkout {...props} />}
          />
          <PrivateRoute path="/dashboard" exact component={UserDash} />
          {/* <PrivateRoute path="/dashboard" component={UserDashboard} /> */}
          <AdminRoute path="/admin/dashboard" component={AdminDahs} />
          <AdminRoute path="/admin/addcategory" component={AddCategory} />
          <AdminRoute path="/admin/viewcategory" component={AllCategory} />
          <AdminRoute path="/admin/addproducts" component={AddProducts} />
          <AdminRoute path="/admin/viewproducts" component={AllProducts} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routers;
