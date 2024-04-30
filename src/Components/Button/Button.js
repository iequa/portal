import React from "react";

function setSize(size) {
  switch (size) {
    case "large":
      return { fontSize: "18px" ,width: "250px", height: "48px" };
    case "medium":
      return { fontSize: "14px", width: "200px", height: "40px" };
    case "small":
      return { fontSize: "16px", width: "150px", height: "32px" };
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
