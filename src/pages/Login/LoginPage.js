import React from "react";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";

const LoginPage = () => {

    let data = {
        userName: "",
        userPass: ""
    }

    function sendData() {
        console.log("sendSOme");
    }

    return (
        <div>
            <label>Login</label>
            <InputString
            value={data?.userPass}
            onChange={(val) => {
              data.userName = val.target.value;
            }}
            />
            <br/>
            <label>Pass</label>
            <InputString
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