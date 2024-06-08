import React, { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import Button from "../../Components/Button/Button";
import ServiceProvisionPopup from "../../Components/ServiceProvisionPopup/ServiceProvisionPopup";
import RecordsCalendar from "../../Components/RecordsCalendar/RecordsCalendar";
import { tokenStorage } from "../../utils/StoredToken";

const PayServices = () => {

    const [services, setServices] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [tId, setTId] = useState();

    useEffect (()=> {
        api.getPayServices({
            resolveCallback: (response) => {
                setServices([...response.serviceInfos]);
            }
        });
    },[])

    function handleClick(e) {
        if (!tokenStorage.isLogged()) {
            tokenStorage.setInfoMessage("Для записи требуется авторизация");
            return;
        }
        let targetId = e.target.id;
        setTId(targetId);
        setButtonPressed(!buttonPressed);
    }

    return (
        <div className="base">
            <h2 className="all__news__title">Услуги</h2>
            <div className="services__list">
                <div className="elem services__header">
                    <div>Название услуги</div>
                    <div>Стоимость услуги</div>
                </div>
                {services?.map(el => {
                    return(
                        <div
                            className="elem"
                            key={el.id}>
                            <div>{el.name}</div>
                            <div>{el.cost} ₽</div>
                            <Button
                                id={el.id}
                                selector={"btn__select__serv"}
                                onClick={(e)=> handleClick(e)} 
                                size={"medium"} 
                                content={"Запись"}
                            />
                        </div>
                )
                })}
            </div>
            {buttonPressed ?
                <ServiceProvisionPopup
                title={"Запись на платную услугу"}
                openNow={true}
                innerElement = {
                <RecordsCalendar
                    title={"Даты для записи"}
                    calendarType={"PaymentService"}
                    typeId={tId}
                />
                }
                />
            : ""}
            
        </div>
    )
};

export default PayServices;