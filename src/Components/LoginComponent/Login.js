import React, { useState } from "react";
import ServiceProvisionPopup from "../ServiceProvisionPopup/ServiceProvisionPopup";
import LoginPage from "../../pages/Login/LoginPage";
import { observer } from "mobx-react";

const Login = observer(({tokenStorage}) => {

    const [registration, setRegistration] = useState(false)
    const [title, setTitle] = useState("Вход в учётную запись");

    

    function openPopUp () {
        tokenStorage.setLoginWindow(true)
        tokenStorage.popupStore.title = "Вход в учётную запись"
        tokenStorage.popupStore.setMain(<LoginPage 
        tokenStorage={tokenStorage} />)
        tokenStorage.popupStore.setOpenPopUp(true)
    }

    return (
        <div onClick={(e)=>{openPopUp()}}>
            Войти
            {/* <ServiceProvisionPopup
                title={"Вход в учётную запись"}
                innerElement = {<LoginPage/>}
            /> */}
        </div>
    )
})

export default Login;