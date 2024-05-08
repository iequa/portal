import React from "react";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api";
import { tokenStorage } from "../../utils/StoredToken";

const LoginPage = () => {

    let data = {
        userName: "",
        userPass: ""
    }

    function sendData() {
        const login = document.getElementById("log").value;
        const pass = document.getElementById("pass").value;
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
                }
                console.log(response);
            },
        })
    }

    return (
        <div>
            <label>Login</label>
            <InputString
                id={"log"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            <br/>
            <label>Pass</label>
            <InputString
                id={"pass"}
                value={data?.userPass}
                onChange={(val) => {
                data.userName = val.target.value;
                }}
            />
            <Button content={"Войти"} onClick={() => sendData()}/>
        </div>
        
    )
}

export default LoginPage;