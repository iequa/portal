import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { render } from 'react-dom'

import reactRender from '@bbob/react/es/render'
import reactPreset from '@bbob/preset-react/es'
import { api } from "../../utils/api";
import Button from "../Button/Button";


const NewsWidget = () => {
    
    const toReact = input => reactRender(input, reactPreset())
    const navigate = useNavigate();

    const [newsPreviews, setNewsPreviews] = useState([]);

    function onClick(e) {
        let elemId = "" + e.nativeEvent.srcElement.id;
        let elem = e.nativeEvent.srcElement;
        while (!elemId.includes("news__elem__")) {
            elem = elem.parentElement;
            elemId = elem.id;
        }
        let idFromString = "";
        let offset = "news__elem__".length;
        for (let i = offset; i < elemId.length; i++) {
            if (parseInt(elemId[i])) {
                idFromString += elemId[i];
            }
        }
        navigate("/news?id=" + idFromString);
    }

    useEffect(() => {
        api.getNewsPreviews({
            page: -1,
            resolveCallback: (response) => {
                let arr = [];
                response.newsPreviewData.forEach((elem) => {
                    let arrelem = {
                        shortTitle: elem.shortTitle,
                        shortBody: elem.shortBody,
                        image:  elem.image,
                        date: elem.date,
                        id: elem.id
                    }
                    arr.push(arrelem);
                });
                setNewsPreviews(arr);
            },
          });
    },[])

    
    return (
        <div id="widget">
            <h1 className="all__news__title">Наши новости</h1>
            <div className="all__elements__block">
                {newsPreviews.map((elem) => {
                    return(
                        <div id={`news__elem__${elem.id}`} className="news__block__elem" onClick={onClick} key={`news__elem__${elem.id}`}>
                            <h3 className="prev__short__title">{elem.shortTitle}</h3>
                            {elem.image != null ?
                                <img className="prev__img" src={elem.image != null ? `data:image/jpeg;base64,${elem.image}` : ""}/>
                            : ""}
                            <p className="prev__short__body">{elem.shortBody}</p>
                            <label className="prev__date">{new Date(elem.date).toLocaleDateString()}</label>
                        </div>
                    )
                })}
            </div>
            <Button 
                selector={"ref__button"} 
                content={"Все новости"} 
                onClick={()=>navigate("/news-list")}
            />
        </div>
    )
}

export default NewsWidget;