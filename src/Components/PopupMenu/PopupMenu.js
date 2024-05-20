import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { observer } from "mobx-react";

const PopupMenu = observer(({ popupStore}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [InnerElement, setInnerELement] = useState();

    useEffect(()=>{
        setIsOpen(popupStore.openPopUp)
    },[popupStore.openPopUp])

    function openClosePopUp (e) {
      const popup = document.querySelector('.popup-menu__container')
      if (e.target.className === popup.className) {
        ClosePopUp()
      }
    }

    function ClosePopUp (parameters) {
      popupStore.setOpenPopUp(false)
    }

    if(!popupStore.openPopUp)
    return false

    return (
      <div  className="popup-menu__container" onClick={(e)=>{openClosePopUp(e)}}>
        <div className="popup-menu__block">
        <header className="popup-menu__block_header">
            <h2>{popupStore.title}</h2>
            {popupStore.crose ? <div className="popup-menu__crose" onClick={ClosePopUp}>SVG</div> : null}
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