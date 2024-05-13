import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

const InfoLabel = observer(({tokenStorage}) => {

    const [messages, setMessages] = useState({});

    useEffect(() => {
        setMessages(tokenStorage.messages);
    },[])

    useEffect (() => {
        if (messages.infoMessage || messages.errorMessage) {
            var x = document.getElementById("info__label");
            // Добавить "show" класс для DIV
            x.className = "info__label show";
            // После 3 секунд, извлеките класс show из DIV
            setTimeout(function(){ x.className = x.className.replace("info__label show", "info__label"); }, 3000);
            setTimeout(function(){tokenStorage.clearMessages()}, 3000);
        }
    })

    return (
        <div id="info__label" className="info__label">
            {<div className="positive">{messages?.infoMessage}</div>}
            {<div className="negative">{messages?.errorMessage}</div>}
        </div>
    )
})

export default InfoLabel;