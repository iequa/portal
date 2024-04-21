import React, { useEffect, useReducer, useState } from "react";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api"
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import NewsWidget from "../../Components/NewsWidget/NewsWidget";
import DonorBloodlight from "../../Components/DonorBloodlight/DonorBloodlight";

const Main = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    document.title = "Главная страница";
    api.getUsersList({
      page: 0,
      resolveCallback: (response) => {
        setCurrentPage(response.CurrentPage);
        setPeople(response.Data);
        setPagesCount(response.PagesCount);
      },
    });
  }, []);

  useEffect(() => {
    api.getUsersList({
      page: currentPage,
      resolveCallback: (response) => {
        if (response?.ErrorMessages) {
          setErrorMessages(response.ErrorMessages);
        } else {
          setErrorMessages([]);
        }
        setPeople(response.Data);
        setPagesCount(response.PagesCount);
      },
    });
  }, [currentPage]);

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
      <p/>
      <div className="table">
        {errorMessages.length === 0 ? (
          people?.length === 0 ? (
            <p>Пользователи отсутствуют</p>
          ) : (
            <div>
              <p>Пользователи</p>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Возраст</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((user) => {
                    return (
                      <tr className="listItem" key={user.ID}>
                        <td>{user.UserName}</td>
                        <td>{user.Age}</td>
                        <td>
                          <Button
                            key={user.ID}
                            size={"small"}
                            selector={"btn-comp"}
                            onClick={() => EditUser(user.ID)}
                            content={"Изменить"}
                          />
                          <Button
                            key={user.ID + "second"}
                            size={"small"}
                            selector={"btn-comp"}
                            onClick={() => DeleteUser(user.ID)}
                            content={"Удалить"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          errorMessages.map((e) => e)
        )}
      </div>
      <Button
        Size={"medium"}
        selector={"btn-comp usr-add"}
        onClick={() => AddUser()}
        content={"Добавить пользователя"}
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
};

export default Main;
