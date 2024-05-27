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
        if (response?.respFile) {
          api.saveFile(response?.respFile, response?.respFileName);
        }
      }
    })
  }

  return (
    <div className="stats__base">
      <h2 className="stats__header">Отчётность</h2>
      <div>
        Выберите промежуток дат, за который хотите получить отчёт:
        <div className="label__date">
          Начало:
          <InputOther
            id={"startDate"}
            type={"date"}
            onChange={(val) => {
              setStartDate(val.target.value);
              }}
          />
        </div>
        <div className="label__date">
          Конец:
          <InputOther
            id={"endDate"}
            type={"date"}
            onChange={(val) => {
              setEndDate(val.target.value);
              }}
          />
        </div>
        <Button
          selector={"stats__btn"}
          content={"Создать отчёт"}
          onClick={() => sendRequest()}
        />
      </div>
    </div>
  );
};

export default Stats;
