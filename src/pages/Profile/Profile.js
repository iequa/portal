import React, { useEffect, useState } from "react";
import { tokenStorage } from "../../utils/StoredToken";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenStorage.isLogged()) {
            api.getUserInfo(
                {
                    body: {},
                    resolveCallback: (response) => {
                        setUserInfo({
                            name: response.name,
                            surname: response.surname,
                            gender: response.gender,
                            serviceInfos: [...response.serviceInfos],
                        });
                    }
                }
            )
                
        }
        else {
            navigate("/");
        }
    },[]);

    return (
    <div>
        <div className="main__label info__header">
            Информация о пользователе
        </div>
        <div className="main__info">
            <div className="main__label">
                Фамилия:
            </div>
            <div className="main__value">
                {userInfo?.surname}
            </div>
            <div className="main__label">
                Имя:
            </div>
            <div className="main__value">
                {userInfo?.name}
            </div>
            <div className="main__label">
                Пол:
            </div>
            <div className="main__value">
                {userInfo?.gender}
            </div>
        </div>
        <div className="services__info">
            <div className="services__label__main">
                Оказанные услуги
            </div>
            {userInfo?.serviceInfos?.length > 0 ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">№ П/П</th>
                            <th scope="col">Тип услуги</th>
                            <th scope="col">Название (описание) услуги</th>
                            <th scope="col">Дата предоставления услуги</th>
                            <th scope="col">Стоимость услуги</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userInfo?.serviceInfos?.map((si, index) => {
                        return (
                        <tr className="listItem" key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {si.type}
                            </td>
                            <td>
                                {si.name}
                            </td>
                            <td>
                                {si.provision_date}
                            </td>
                            <td>
                                {si?.cost ? si.cost : "Безвоздмездно"}
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                : 
                    <label>Услуг не найдено</label>
                }
        </div>
    </div>)
}

export default Profile;