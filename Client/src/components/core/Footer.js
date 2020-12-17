import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

function Footer() {
  const footerdisplay = () => {
    return (
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 mt-5 footer-about">
                <h2 className="head">Bake Up</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Soluta deserunt harum, voluptas nemo veritatis autem obcaecati
                  quo fuga voluptates aliquam ab ex dicta, placeat sunt saepe,
                  id architecto quae hic.
                </p>
              </div>
              <div className="col-md-4 col-lg-4 mt-5 footer-contact">
                <h2 className="head">Contact</h2>
                <p>
                  <LocationOnIcon id="material-icon" />
                  <span> Bangalore, India</span>
                </p>
                <p>
                  <PhoneIcon id="material-icon" />
                  <span> Phone: 0123456789</span>
                </p>
                <p>
                  <EmailIcon id="material-icon" />
                  <span> Email: ag9139563@gmail.com</span>
                </p>
              </div>
              <div className="col-md-4 col-lg-4 mt-5 footer-about ">
                <h2 className="head">Follow Us</h2>
                <p id="social-Icons text-start">
                  <FacebookIcon className="ml-3" />
                  <TwitterIcon className="ml-3" />
                  <InstagramIcon className="ml-3" />
                  <LinkedInIcon className="ml-3" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return <div>{footerdisplay()}</div>;
}

export default Footer;
