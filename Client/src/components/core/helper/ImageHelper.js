import React from "react";
import Card from "react-bootstrap/Card";
// function ImageHelper({ image }) {
//   return (
//     <>
//       <img src={imgUrl} />
//     </>
//   );
// }

function ImageHelper({ _id, Admindisplay }) {
  const imgUrl = `${process.env.REACT_APP_BACKENDURL}/product/image/${_id}`;
  if (Admindisplay) {
    return (
      <>
        <img id="productImage" variant="top" src={imgUrl} />
      </>
    );
  } else {
    return (
      <>
        <Card.Img id="cardImage" variant="top" src={imgUrl} />
      </>
    );
  }
}

export default ImageHelper;
