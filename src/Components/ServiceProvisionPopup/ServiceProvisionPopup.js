import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const ServiceProvisionPopup = ({ innerCalendarElement, title }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [InnerCalendarElement, setInnerCalendarELement] = useState();


    

    useEffect(() => {
      if (innerCalendarElement) {
        setInnerCalendarELement(innerCalendarElement);
      }
    })

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div>
        <button onClick={togglePopup}>Open Popup</button>
        {isOpen && (
          <div id="popup" className="service__popup">
            <h1 className="popup__title">{title}</h1>
            <Button selector="close__btn" content={"Закрыть окно"} onClick={togglePopup} size={"small"}/>
            {InnerCalendarElement}
          </div>
        )}
      </div>
    )
}

export default ServiceProvisionPopup;