import React, { useEffect, useState } from "react";
import Login from "../LoginComponent/Login";
import { tokenStorage } from "../../utils/StoredToken";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { api } from "../../utils/api";

const Header = observer(({HeaderText, Logo, onImageClick, tokenStorage}) => {

  const navigate = useNavigate();
  
  function logout() {
    api.processLogout({
      resolveCallback: (response) => {
        if (response) {
          const ls = window.localStorage;
          ls.removeItem("sessionData");
          tokenStorage.setIsLogged(false);
          navigate("/");
        }
      }
    })
  }

  return (
      <div className="logo">
        <img className="mainimage" onClick={onImageClick} src={Logo} />
        <div className="mainimage maintext">
          <h1 className="mainimage maintext">
            {HeaderText}
          </h1>
        </div>
        {tokenStorage.isLogged() 
        ? 
        <div className="log__block">
          <label onClick={() => navigate("/profile")}>
            {tokenStorage.getUserName()}
          </label>
          <p onClick={() => logout()}> (Выйти)</p>
        </div>
        : <Login tokenStorage={tokenStorage}/>}
      </div>
  );
})
export default Header;