/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import React from "react";
function Footer(props) {
  var divStyle = {
    background: "red",
    marginTop: "200px"
  };

  const logoStyle = {
    color: "black",
    fontFamily: "Snell Roundhand, cursive"
  };

  return (
    <div className="App " style={divStyle}>
      <footer className="page-footer">
        <div className="footer-copyright marginforfooter">
          <div className="container">
            © 2019 Copyright Text
            <a
              className="grey-text text-lighten-4 right"
              href="#!"
              style={logoStyle}
            >
              JP
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
