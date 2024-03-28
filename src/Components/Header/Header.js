import React from "react";

const Header = ({HeaderText, Logo}) => {
    return (
        <div className="logo">
          <img className="mainimage" src={Logo} />
          <h1 className="maintext">
            {HeaderText}
          </h1>
        </div>
    );
}
export default Header;