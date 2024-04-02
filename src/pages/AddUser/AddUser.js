import React, { useEffect, useState } from "react";
import { api } from "../../utils/api"
import InputNumber from "../../Components/Input/InputNumber";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [sendData, setSendData] = useState();
  const [message, setMessage] = useState();
  const [errorMessages, setErrorMessages] = useState();
  let data = sendData;

  useEffect(() => {
    document.title = "Добавление записи";
    setSendData({
      UserName: "",
      Age: 0,
    });
  }, []);

  function submit() {
    setMessage("");
    setErrorMessages([]);
    setSendData(data);
    api.addUser({
      body: { user: sendData },
      resolveCallback: (response) => {
        if (response.ErrorMessages && response.ErrorMessages.length > 0) {
          setErrorMessages(response.ErrorMessages);
        } else {
          navigate(`/EditUser?id=${response?.Id}`);
        }
      },
    });
  }

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="messages-place">
        {errorMessages?.length > 0 ? (
          errorMessages.map((error, key) => {
            return <p style={{ color: "red" }}>{error}</p>;
          })
        ) : (
          <p style={{ color: "green" }}>{message}</p>
        )}
      </div>

      <div>
        <h1>Создание записи</h1>
      </div>
      <div>
        <p>
          Имя
          <br />
          <InputString
            value={sendData?.UserName}
            onChange={(val) => {
              data.UserName = val.target.value;
            }}
          />
        </p>
        <p>
          Возраст
          <br />
          <InputNumber
            type="number"
            value={sendData?.Age}
            onChange={(val) => {
              data.Age = Number(val.target.value);
            }}
          />
        </p>
        <Button
          selector={"btn-comp"}
          onClick={submit}
          content={"Создать запись"}
        ></Button>
      </div>
    </div>
  );
};
export default AddUser;
