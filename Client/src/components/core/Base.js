import React from "react";
import NavbarMenu from "./NavbarMenu";
import Footer from "./Footer";
function Base(props) {
  return (
    <div>
      <NavbarMenu />
      <main className="mainBody">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Base;
