import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "./static/logo_true.svg";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import DonorBloodlight from "./Components/DonorBloodlight/DonorBloodlight";
import NewsWidget from "./Components/NewsWidget/NewsWidget";

const StyleClass = "menu-item";
const ActiveElem = "menu-item-active";

const App = () => {
  const navigate = useNavigate();

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

  return (
    <div className="plot" onClick={handleMouseClick}>
      <div>
        <Header 
        HeaderText={"Портал службы крови Тульской области"}
        Logo={Logo}
        onImageClick={()=>navigate("/about")}
        />
        <Menu />
        <DonorBloodlight/>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
