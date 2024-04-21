import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const [width, setWidth] = useState();
    const navigate = useNavigate()

    useEffect(()=> {
        setWidth(innerWidth);
    }, [width])

    function click(route) {
        if (route) {
            navigate(route);
        }
    }

    function click_mobile(route) {
        let elem = document.getElementById("mob__menu");
        if (elem.className === "mob__menu") {
            elem.className = "hidden";
        } else if (elem.className){
            elem.className = "mob__menu";
        }
        click(route);
    }

    return (
        <div>
            <div className="menublock">
                <Button 
                    selector={"menubutton"}
                    content={"Об учреждении"}
                    onClick={() => click("/about")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Контактная информация"}
                    onClick={() => click("/contacts")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Донорам"}
                    onClick={() => click("/for-donors")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Акции"}
                    onClick={() => click("/actions")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"План мероприятий"}
                    onClick={() => click("/events")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Документы"}
                    onClick={() => click("/documents")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Медицинские работники"}
                    onClick={() => click("/personal")}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Платные услуги"}
                    onClick={() => click("/payment-services")}
                />
            </div>
            <Button 
                    selector={"mob__menu__button_main"}
                    content={"Основное меню"}
                    onClick={() => click_mobile("")}
                />
            <div id="mob__menu" className="hidden">
                <div>
                    <nav>
                        <ul className="mob__menu__list">
                            <li className="mob__menu__button" onClick={() => click_mobile("/about")}>Об учреждении</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/contacts")}>Контактная информация</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/for-donors")}>Донорам</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/actions")}>Акции</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/events")}>План мероприятий</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/documents")}>Документы</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/personal")}>Медицинские работники</li>
                            <li className="mob__menu__button" onClick={() => click_mobile("/payment-services")}>Платные услуги</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Menu;