import React from "react";
import ServiceProvisionPopup from "../ServiceProvisionPopup/ServiceProvisionPopup";
import LoginPage from "../../pages/Login/LoginPage";

const Login = () => {

    return (
        <div onClick={console.log("clk")}>
            Войти
            <ServiceProvisionPopup
                title={"Вход в учётную запись"}
                innerElement = {<LoginPage/>}
            />
        </div>
    )
}

export default Login;