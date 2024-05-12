import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { observer } from "mobx-react";

const PopupMenu = observer(({ popupStore}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [InnerElement, setInnerELement] = useState();

    useEffect(()=>{
        setIsOpen(popupStore.openPopUp)
    },[popupStore.openPopUp])

    console.log(!popupStore.openPopUp)

    if(!popupStore.openPopUp)
    return false

    return (
      <div  className="popup-menu__container">
        <div className="popup-menu__block">
        <header className="popup-menu__block_header">
            <h2>{popupStore.title}</h2>
            </header>
        <main>{popupStore.main}</main>
        <footer className="popup-menu__block_footer">
          {popupStore.footer}
          </footer>
        </div>
        
      </div>
    )
})

export default PopupMenu;