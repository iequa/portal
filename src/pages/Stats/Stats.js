import React, { useEffect, useState } from "react";
import InputOther from "../../Components/Input/InputOther";
import Button from "../../Components/Button/Button";
import { tokenStorage } from "../../utils/StoredToken";
import { api } from "../../utils/api";

const Stats = () => {

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    document.title = "Stats";
  }, []);

  function sendRequest() {
    const regex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
    const first = startDate;
    const second = endDate;
    console.log(`first: ${first}; second:${second}`);
    if (!regex.test(first)) {
      tokenStorage.setErrorMessage('Первая дата не задана!');
      return;
    } else if (!regex.test(second)) {
      tokenStorage.setErrorMessage('Вторая дата не задана!');
      return;
    }
    
    api.getDateStat ({
      firstDate: new Date(first).toISOString(),
      secondDate: new Date(second).toISOString(),
      resolveCallback: (response) => {
        api.saveFile(response?.respFile, response?.respFileName);
      }
    })
  }

  return (
    <div>
      <div>Отчётность</div>
      <div>
        Выберите промежуток дат, за который хотите получить отчёт:
        <div>
          Начало
          <InputOther
            id={"startDate"}
            type={"date"}
            onChange={(val) => {
              setStartDate(val.target.value);
              }}
          />
        </div>
        <div>
          Конец
          <InputOther
            id={"endDate"}
            type={"date"}
            onChange={(val) => {
              setEndDate(val.target.value);
              }}
          />
        </div>
        <Button
          content={"Создать отчёт"}
          onClick={() => sendRequest()}
        />

      </div>
    </div>
  );
};

export default Stats;
