import React, { useEffect, useState } from "react";

const InfoLabel = ({textMessage}, {errorMessage}) => {

    const [message, setMessage] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (textMessage) {
            setMessage(textMessage);
        }
        if (errorMessage) {
            setError(errorMessage);
        }
    },[textMessage, errorMessage])

    return (
        <div className="info__label">
            {message ? <div className="positive"> {message} </div> : ""}
            {error ? <div className="negative"> {error} </div> : ""}
        </div>
    )
}

export default InfoLabel;