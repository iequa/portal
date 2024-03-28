import React from "react";
import Button from "../Button/Button";

const Menu = () => {

    function click() {
        console.log("click");
    }

    return(
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
    );
}
export default Menu;