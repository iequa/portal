import React from "react";

const Header = ({HeaderText, Logo, onImageClick}) => {
    return (
        <div className="logo">
          <p onClick={onImageClick}><img className="mainimage" src={Logo} /></p>
          <h1 className="maintext">
            {HeaderText}
          </h1>
        </div>
    );
}
export default Header;