import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const Menu = () => {
    const [width, setWidth] = useState();

    useEffect(()=> {
        setWidth(innerWidth);
    }, [width])

    function click() {
        let elem = document.getElementById("mob__menu")
        if (elem.className === "mob__menu") {
            elem.className = "hidden";
        } else {
            elem.className = "mob__menu";
        }
        console.log("click ");
    }

    return (
        <div>
            <div className="menublock">
                <Button 
                    selector={"menubutton"}
                    content={"Об учреждении"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Контактная информация"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Донорам"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Акции"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"План мероприятий"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Документы"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Медицинские работники"}
                    onClick={click}
                />
                <Button 
                    selector={"menubutton"}
                    content={"Платные услуги"}
                    onClick={click}
                />
            </div>
            <Button 
                    selector={"mob__menu__button_main"}
                    content={"Основное меню"}
                    onClick={click}
                />
            <div id="mob__menu" className="hidden">
                <div>
                    <nav>
                        <ul className="mob__menu__list">
                            <li className="mob__menu__button" onClick={click}>Об учреждении</li>
                            <li className="mob__menu__button" onClick={click}>Контактная информация</li>
                            <li className="mob__menu__button" onClick={click}>Донорам</li>
                            <li className="mob__menu__button" onClick={click}>Акции</li>
                            <li className="mob__menu__button" onClick={click}>План мероприятий</li>
                            <li className="mob__menu__button" onClick={click}>Документы</li>
                            <li className="mob__menu__button" onClick={click}>Медицинские работники</li>
                            <li className="mob__menu__button" onClick={click}>Платные услуги</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Menu;