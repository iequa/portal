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

const StyleClass = "menu-item";
const ActiveElem = "menu-item-active";
const AppContext = createContext(tokenStorage);

const App = observer (() => {
  const tokenStorage = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const login = "";
    const pass = "";
    let allText = login + "||" +  pass;
    let pass2 = "";
    //console.log(allText)
    for (let i = 0; i < allText.length; i++) {
        pass2 += allText.charCodeAt(i) << 1;
    }
    var sha256Hash = CryptoJS.SHA256(pass2).toString();
    //console.log("1: " + sha256Hash);
    //const str = "000";
    //let strres = "";
    //var sha256Hash2 = CryptoJS.SHA256(sha256Hash).toString();
    //console.log("2 " + sha256Hash2);
    api.processLogin ({
        login: login,
        value: sha256Hash,
        resolveCallback: (response) => {
            if (response.token) {
                tokenStorage.setToken(response.token);
                tokenStorage.setIsLogged(true);
                tokenStorage.setUserInfo({
                    name: response.name,
                    pol: response.gender,
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
  },[tokenStorage])

  function GetStyle(page) {
    if (window.location.pathname === page) {
      return ActiveElem;
    } else {
      return StyleClass;
    }
  }

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
   <><div className="plot" onClick={handleMouseClick}>
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
    </>
  );
});

export default App;
