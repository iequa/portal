import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const ServiceProvisionPopup = ({ id, innerElement, title, selector}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [InnerElement, setInnerELement] = useState();

    useEffect(() => {
      if (innerElement) {
        setInnerELement(innerElement);
      }
    })

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div id={id}>
        <button onClick={togglePopup}>Open Popup</button>
        {isOpen && (
          <div id="popup" className= {selector ? selector : "service__popup"}>
            <h1 className="popup__title">{title}</h1>
            <Button selector="close__btn" content={"Закрыть окно"} onClick={togglePopup} size={"small"}/>
            {InnerElement}
          </div>
        )}
      </div>
    )
}

export default ServiceProvisionPopup;