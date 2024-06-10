import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const ServiceProvisionPopup = ({ id, innerElement, title, selector, openNow = false, buttonText, buttonSelector}) => {

    const [isOpen, setIsOpen] = useState(openNow);

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
        {!openNow && (<button className={buttonSelector ? buttonSelector : "btn__select__serv"} onClick={togglePopup}>{buttonText ? buttonText : "Open Popup"}</button>)}
        {isOpen && (
          <div id="popup" className= {selector ? selector : "service__popup"}>
            <h1 className="popup__title">{title}</h1>
            <div className="close__btn" onClick={togglePopup}>X</div>
            {InnerElement}
          </div>
        )}
      </div>
    )
}

export default ServiceProvisionPopup;