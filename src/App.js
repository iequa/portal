import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "./Components/Button/Button";
import Logo from "./static/logo_true.svg";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";

const StyleClass = "menu-item";
const ActiveElem = "menu-item-active";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
  function GetStyle(page) {
    if (window.location.pathname === page) {
      return ActiveElem;
    } else {
      return StyleClass;
    }
  }

  function ClickHandle(page) {
    return navigate(page);
  }

  return (
    <div className="plot">
      <div>
        <Header 
        HeaderText={"Портал службы крови Тульской области"}
        Logo={Logo}
        />
        <Menu />
        <div className="menu">
          <Button
            selector={GetStyle("/home")}
            onClick={(e) => ClickHandle("/home")}
            content={"Главная страница"}
          ></Button>

          <Button
            selector={GetStyle("/about")}
            onClick={(e) => ClickHandle("/about")}
            content={"Страница 2"}
          />

          <Button
            selector={GetStyle("/third")}
            onClick={(e) => ClickHandle("/third")}
            content={"Страница3"}
          ></Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
