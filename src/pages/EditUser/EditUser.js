import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../utils/api"
import InputNumber from "../../Components/Input/InputNumber";
import InputString from "../../Components/Input/InputString";
import Button from "../../Components/Button/Button";

const EditUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sendData, setSendData] = useState();
  const [errorMessages, setErrorMessages] = useState();
  const [message, setMessage] = useState();
  let data = sendData;

  useEffect(() => {
    document.title = "Редактирование записи";
    const id = searchParams.get("id");
    api.getUserInfo({
      body: { id: id },
      resolveCallback: (response) => {
        setSendData(response.Data);
      },
    });
  }, []);

  function submit() {
    setMessage("");
    setErrorMessages([]);
    setSendData(data);
    api.editUserInfo({
      body: { user: sendData },
      resolveCallback: (response) => {
        if (response.ErrorMessages) {
          setErrorMessages(response.ErrorMessages);
        }
        if (response.Message) {
          setMessage(response.Message);
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
          errorMessages.map((error, i) => {
            return (
              <p key={i} style={{ color: "red" }}>
                {error}
              </p>
            );
          })
        ) : (
          <p style={{ color: "green" }}>{message}</p>
        )}
      </div>

      <div>
        <h1>Редактирование записи</h1>
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
        {
          <Button
            selector={"btn-comp"}
            onClick={submit}
            content={"Изменить запись"}
          />
        }
      </div>
    </div>
  );
};
export default EditUser;
