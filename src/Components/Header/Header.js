import React from "react";
import Login from "../LoginComponent/Login";

const Header = ({HeaderText, Logo, onImageClick}) => {
    return (
        <div className="logo">
          <img className="mainimage" onClick={onImageClick} src={Logo} />
          <div className="mainimage maintext">
            <h1 className="mainimage maintext" onClick={onImageClick}>
              {HeaderText}
            </h1>
          </div>
          <Login />
        </div>
    );
}
export default Header;