import React from "react";
import Base from "./Base";

function About() {
  return (
    <div>
      <Base>
        <div className="container about mt-5">
          <h2>About Bake-Up</h2>
          <p>Bake up is a simple e-commerce bakery website.</p>
          <br />
          <h2>Technologies used</h2>
          <p>
            Node.JS and express is used for the backend of the website. MongoDB
            is used for the database and React is used for the frontend
          </p>
          <p>Redux is also used for the state management of the website.</p>
          <br />
          <h2>Contact</h2>
          <p>Email: ag9139563@gmail.com</p>
        </div>
      </Base>
    </div>
  );
}

export default About;
