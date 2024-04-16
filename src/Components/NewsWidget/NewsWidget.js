import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { render } from 'react-dom'

import reactRender from '@bbob/react/es/render'
import reactPreset from '@bbob/preset-react/es'
import { api } from "../../utils/api";


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

    const [res, setRes] = useState(toReact('[b]Super [i]easy[/i][/b] [u]to[/u] render'));
    useEffect(() => {
        api.getNewsPreviews({
            page: 0,
            resolveCallback: (response) => {
                let arr = [];
                response.newsPreviews.forEach((elem) => {
                    let arrelem = {
                        shortTitle: elem.shortTitle,
                        previewImage:  elem.previewImage,
                        id: elem.id
                    }
                    arr.push(arrelem);
                });
                setNewsPreviews(arr);
            },
          });
    },[])

    
    return (
        <div id="test">
            <h1 className="all__news__title">Наши новости</h1>
            <div className="all__elements__block">
                {newsPreviews.map((elem) => {
                    return(
                        <div id={`news__elem__${elem.id}`} className="news__block__elem" onClick={onClick} key={`news__elem__${elem.id}`}>
                            <h2 className="prev__news__title">{elem.shortTitle}</h2>
                            <img className="prev__img" src={`data:image/jpeg;base64,${elem.previewImage}`}/>
                        </div>
                    )
                })}
            </div>
            {res}
        </div>
    )
}

export default NewsWidget;