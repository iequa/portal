import React, { useEffect, useState } from "react";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { observer } from "mobx-react";

const LoginPage = observer(({tokenStorage}) => {

    const recaptchaRef = React.createRef();
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
        userLog: "",
        userPass: "",
        userPassSecond: "",
        userName: "",
        userSurname: "",
        userDate: "",
        userPhone: "",
    }

    function sendData() {
        if (grecaptcha.getResponse() == ""){
            tokenStorage.setErrorMessage("Пройдите капчу");
        } else {
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
                            nextDonationDate: response.nextDonationDate,
                            specialFunctions: response.specialFunctions,
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
    }

    function getCryptPass(login, pass) {
        let allText = login + "||" +  pass;
        let pass2 = "";
        for (let i = 0; i < allText.length; i++) {
            pass2 += allText.charCodeAt(i) << 1;
        }
        return CryptoJS.SHA256(pass2).toString();
    }

    function sendRegData() {
        if (grecaptcha.getResponse() == ""){
            tokenStorage.setErrorMessage("Пройдите капчу");
        } else {
            const login = document.getElementById("log").value;
            const pass = document.getElementById("pass").value;
            const pass2 = document.getElementById("pass-approve").value;
            if (pass !== pass2) {
                tokenStorage.setErrorMessage("Введённые пароли не совпадают");
                return;
            }
            const sha256Hash = getCryptPass(login, pass);
            api.processRegister ({
                login: login,
                value: sha256Hash,
                name: data.userName,
                surname: data.userSurname,
                date: data.userDate,
                number: data.userPhone,
                resolveCallback: (response) => {
                    tokenStorage.popupStore.setOpenPopUp(false)
                }
            })
        }
    }

    return (
        
        <div className="login-page__container">
            {tokenStorage.loginWindow ? 
            <>
            <div className="login-page__block">
            <label>Логин</label>
            <InputString
                id={"log"}
                value={data?.userLog}
                onChange={(val) => {
                data.userLog = val.target.value;
                }}
            />
            </div>
            <div className="login-page__block"> 
            <label>Пароль</label>
            <InputString
                id={"pass"}
                value={data?.userPass}
                onChange={(val) => {
                data.userPass = val.target.value;
                }}
                type={"password"}
            />
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc4GOIpAAAAAN-_WCV3JmJx_8bNQe1EI4xbr2xf"
                onChange={console.log("asd")}
            />
            <Button content={"Войти"} onClick={() => sendData()}/>
            </> 
            :
            <><div className="login-page__block">
                <label>Введите свой email</label>
                <InputString
                    id={"log"}
                    value={data?.userLog}
                    onChange={(val) => {
                    data.userLog = val.target.value;
                    }}
                />
            </div>
            <div className="login-page__block"> 
                <label>Введите свой пароль</label>
                <InputString
                    id={"pass"}
                    value={data?.userPass}
                    onChange={(val) => {
                    data.userPass = val.target.value;
                    }}
                    type={"password"}
                />
            </div>
            <div className="login-page__block"> 
            <label>Повторите пароль</label>
            <InputString
                id={"pass-approve"}
                value={data?.userPassSecond}
                onChange={(val) => {
                data.userPassSecond = val.target.value;
                }}
                type={"password"}
            />
            </div>
            <div className="login-page__block"> 
                <label>Ваше имя</label>
                <InputString
                    id={"name"}
                    value={data?.userName}
                    onChange={(val) => {
                    data.userName = val.target.value;
                    }}
                />
            </div>
            <div className="login-page__block"> 
                <label>Ваша фамилия</label>
                <InputString
                    id={"surname"}
                    value={data?.userSurname}
                    onChange={(val) => {
                    data.userSurname = val.target.value;
                    }}
                />
            </div>
            <div className="login-page__block"> 
                <label>Ваша дата рождения в формате ДД.ММ.ГГГГ</label>
                <InputString
                    id={"date"}
                    value={data?.userDate}
                    onChange={(val) => {
                    data.userDate = val.target.value;
                    }}
                />
            </div>
            <div className="login-page__block"> 
                <label>Ваш номер телефона в формате 89ХХХХХХХХХ</label>
                <InputString
                    id={"phone"}
                    value={data?.userPhone}
                    onChange={(val) => {
                    data.userPhone = val.target.value;
                    }}
                />
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc4GOIpAAAAAN-_WCV3JmJx_8bNQe1EI4xbr2xf"
                onChange={() =>{}}
            />
            <Button content={"Зарегистрироваться"} onClick={() => sendRegData()}/></>}
        </div>
    )
})

export default LoginPage;