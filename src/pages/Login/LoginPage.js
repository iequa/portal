import React, { useEffect, useState } from "react";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api";
import { tokenStorage } from "../../utils/StoredToken";
import { observer } from "mobx-react";

const LoginPage = observer(({tokenStorage}) => {

    const [message, setMessage] = useState("")

    useEffect(()=>{
        tokenStorage.popupStore.footer = getFooter()
    },[tokenStorage.loginWindow])

    function getFooter () {
        if(tokenStorage.loginWindow){
            return (
                <div className="popup__footer" 
                onClick={(e)=>{
                    tokenStorage.setLoginWindow(!tokenStorage.loginWindow)}}>
                    <div>Зарегистрироваться</div>
                </div>
            )
        } else {
            return (
                <div className="popup__footer" 
                onClick={(e)=>{
                    tokenStorage.setLoginWindow(!tokenStorage.loginWindow)}
                    }>
                    <div>Войти</div>
                </div>
            )
        }
    }

    let data = {
        userName: "",
        userPass: ""
    }

    function sendData() {
        const ls = window.localStorage;
        const login = document.getElementById("log").value;
        const pass = document.getElementById("pass").value;
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
                    })
                    tokenStorage.popupStore.setOpenPopUp(false)
                }
            },
            errorCallback: (err)=>{
                tokenStorage.setIsLogged(false);
                tokenStorage.popupStore.setOpenPopUp(false)
            }
        })
    }

    return (
        
        <div className="login-page__container">
            {tokenStorage.loginWindow ? 
            <>
            <div className="login-page__block">
            <label>Логин</label>
            <InputString
                id={"log"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            </div>
            <div className="login-page__block"> 
            <label>Пароль</label>
            <InputString
                id={"pass"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            </div>
           
            <Button content={"Войти"} onClick={() => sendData()}/>
                {message}
            </> 
            :
            <><div className="login-page__block">
            <label>Введите свой email</label>
            <InputString
                id={"log"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            </div>
            <div className="login-page__block"> 
            <label>Введите свой пароль</label>
            <InputString
                id={"pass"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            </div>
            <Button content={"Зарегистрироваться"} onClick={() => sendData()}/></>}
            {message}
        </div>
    )
})

export default LoginPage;