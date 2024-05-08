import React, { useEffect, useState } from "react";
import Login from "../LoginComponent/Login";
import { tokenStorage } from "../../utils/StoredToken";
import { useNavigate } from "react-router-dom";

const Header = ({HeaderText, Logo, onImageClick}) => {

  const navigate = useNavigate();
  // const [log, setLog] = useState(false);

  // useEffect(() => {
  //   if () {
  //     setLog(true);
  //   } else {
  //     setLog(false);
  //   }
  // })

    return (
        <div className="logo">
          <img className="mainimage" onClick={onImageClick} src={Logo} />
          <div className="mainimage maintext">
            <h1 className="mainimage maintext" onClick={onImageClick}>
              {HeaderText}
            </h1>
          </div>
          {console.log(tokenStorage)}
          {tokenStorage.isLogged() ? <label onClick={() => navigate("/profile")}>{tokenStorage.getUserName()}</label> : <Login/>}
        </div>
    );
}
export default Header;