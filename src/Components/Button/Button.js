import React from "react";

function setSize(size) {
  switch (size) {
    case "large":
      return { width: "250px", height: "60px" };
    case "small":
      return { width: "150px", height: "40px", fontSize: "small" };
    case "medium":
      return { width: "200px", height: "50px" };
    default:
      return { };
  }
}

const Button = ({ selector, content, onClick, size }) => {
  return (
    <button className={selector} onClick={onClick} style={setSize(size)}>
      {content}
    </button>
  );
};

export default Button;
