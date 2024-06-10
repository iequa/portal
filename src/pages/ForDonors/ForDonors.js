import React, { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import Button from "../../Components/Button/Button";
import ServiceProvisionPopup from "../../Components/ServiceProvisionPopup/ServiceProvisionPopup";
import RecordsCalendar from "../../Components/RecordsCalendar/RecordsCalendar";
import { tokenStorage } from "../../utils/StoredToken";
import DonorBloodlight from "../../Components/DonorBloodlight/DonorBloodlight";

const ForDonors = () => {

    const [services, setServices] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [tId, setTId] = useState();

    useEffect (()=> {
        
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
            <h2 className="all__news__title">Для доноров</h2>
            <h1>Донорство</h1>
            <p>
                <strong>Донорство крови</strong> — добровольное жертвование собственной крови или её компонентов для последующего переливания нуждающимся больным или получения медицинских препаратов (шифр МКБ-10 Z52.0 Донор крови). Донор происходит от лат. donare — «дарить».</p>
            <p>Ежегодно переливания крови нужны полутора миллионам россиян - огромное количество людей ежедневно нуждается в ней. Для того, чтобы снять острую нуждаемость в донорской крови, необходимо, чтобы примерно пять процентов населения стали донорами.</p>
            <p>Та кровь, которую сдадите вы, может спасти чью-то жизнь, подарить кому-то будущее.</p>
            <DonorBloodlight/>
            <p>Донором может являться любой здоровый человек старше 18 лет. Для получения подробной информации перейдите в раздел "Документы"</p>
            <ServiceProvisionPopup
                title={"Запись на донацию"}
                buttonText={"Проверить свободные даты"}
                buttonSelector={"btn__select__donor"}
                innerElement = {
                <RecordsCalendar
                    title={"Даты для записи"}
                    calendarType={"Donation"}
                />
                }
            />
        </div>
    )
};

export default ForDonors;