import React, { useEffect, useReducer, useState } from "react";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api"
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import NewsWidget from "../../Components/NewsWidget/NewsWidget";
import DonorBloodlight from "../../Components/DonorBloodlight/DonorBloodlight";
import ServiceProvisionPopup from "../../Components/ServiceProvisionPopup/ServiceProvisionPopup";
import RecordsCalendar from "../../Components/RecordsCalendar/RecordsCalendar";
import { observer } from "mobx-react";

const Main = observer(({tokenStorage}) => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    document.title = "Главная страница";
  }, []);

  function changeCurrentPage(newPage) {
    setCurrentPage(newPage);
  }

  function EditUser(id) {
    navigate(`/EditUser?id=${id}`);
  }

  function AddUser() {
    navigate("/AddUser");
  }

  function DeleteUser(id) {
    api.deleteUser({
      body: { id: id, page: currentPage },
      resolveCallback: (response) => {
        setCurrentPage(response.CurrentPage);
        setPeople(response.Data);
        setPagesCount(response.PagesCount);
      },
    });
    return navigate("/home");
  }

  return (
    <div>
      <DonorBloodlight/>
      <NewsWidget/>
      <ServiceProvisionPopup
        title={"Запись на донацию"}
        innerElement = {
          <RecordsCalendar
            title={"Даты для записи"}
            calendarType={"Donation"}
          />
        }
      />
      <div>
        <Pagination
          currentPage={currentPage}
          countOfPages={pagesCount}
          onClick={changeCurrentPage}
        />
        <p />
      </div>
    </div>
  );
});

export default Main;
