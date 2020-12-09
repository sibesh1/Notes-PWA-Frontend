import React from "react";

function Footer() {
  const footerStyle = {
    color: "#4ECDC4",
    fontStyle: "italic",
    fontSize: 16,
    margin: "auto",
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        A Simple Notes App By <strong>Sibesh Behera</strong>
      </em>
    </div>
  );
}

export default Footer;
