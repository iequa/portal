import React from "react";

const Header = ({HeaderText, Logo, onImageClick}) => {
    return (
        <div className="logo">
          <div>
            <img className="mainimage" onClick={onImageClick} src={Logo} />
          </div>
          <div className="mainimage maintext">
            <h1 className="mainimage maintext" onClick={onImageClick}>
              {HeaderText}
            </h1>
          </div>
          
        </div>
    );
}
export default Header;