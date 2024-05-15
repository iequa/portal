import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "./static/logo_true.svg";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import { tokenStorage } from "./utils/StoredToken";
import { observer } from "mobx-react";
import PopupMenu from "./Components/PopupMenu/PopupMenu";
import { api } from "./utils/api";
import LoginPage from "./pages/Login/LoginPage";
import InfoLabel from "./Components/InfoLabel/InfoLabel";

const AppContext = createContext(tokenStorage);

const App = observer (() => {
  const tokenStorage = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const ls = window.localStorage;
    let session = ls.getItem("sessionData");
    if (session) {
      tokenStorage.setSessionInfo(JSON.parse(session));
    }
  },[])

  useEffect(() => {
    if (tokenStorage.getSessionInfo() != null) {

      let login = tokenStorage.getSessionInfo().login;
      let pass = tokenStorage.getSessionInfo().pass;
      let allText = login + "||" +  pass;
      let pass2 = "";
      for (let i = 0; i < allText.length; i++) {
          pass2 += allText.charCodeAt(i) << 1;
      }
      var sha256Hash = CryptoJS.SHA256(pass2).toString();
      api.processLogin ({
          login: login,
          value: sha256Hash,
          resolveCallback: (response) => {
              if (response.token) {
                  tokenStorage.setToken(response.token, login, pass);
                  tokenStorage.setIsLogged(true);
                  tokenStorage.setUserInfo({
                      name: response.name,
                      pol: response.gender,
                      nextDonationDate: response.nextDonationDate,
                      specialFunctions: response.specialFunctions,
                  })
                  tokenStorage.popupStore.setOpenPopUp(false)
              }
          },
          errorCallback: (err)=>{
          tokenStorage.setIsLogged(false);
          tokenStorage.setLoginWindow(true)
          tokenStorage.popupStore.title = "Вход в учётную запись"
          tokenStorage.popupStore.setMain(<LoginPage
          tokenStorage={tokenStorage} />)
          tokenStorage.popupStore.setOpenPopUp(false)
          }
      })
    }
  },[tokenStorage])

  const handleMouseClick = (e) => {
    let elcl = e.target.className;
        if (elcl !== "mob__menu" && elcl !== "mob__menu__button_main") {
          let elem = document.getElementById("mob__menu");
          elem.className = "hidden";
        }
    }

  function ClickHandle(page) {
    return navigate(page);
  }

  function handleAuth (parameters) {
    
  }

  return (
   <>
   <div className="plot" onClick={handleMouseClick}>
      <div>
        <Header 
          HeaderText={"Портал службы крови Тульской области"}
          Logo={Logo}
          onImageClick={()=>navigate("/about")}
          tokenStorage={tokenStorage}
        />
        <Menu tokenStorage={tokenStorage}/>
      </div>
      <Outlet tokenStorage={tokenStorage}/>
    </div>
    <PopupMenu popupStore={tokenStorage.popupStore}/>
    <InfoLabel 
      tokenStorage={tokenStorage}
    />
    </>
  );
});

export default App;
