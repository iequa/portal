import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import reactRender from '@bbob/react/es/render'
import reactPreset from '@bbob/preset-react/es'
import { api } from "../../utils/api";


const News = () => {
    
    const toReact = input => reactRender(input, reactPreset())
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = React.useState(
        searchParams.get("id")
    );

    const [page, setPage] = useState(null);

    useEffect (() => {
        setSearchParams({ id });
        setId(searchParams.get("id"));
    },[])

    useEffect(() => {
        if (id) {
            api.getNewsById({
                pageId: id,
                resolveCallback: (response) => {
                    setPage({
                        title: response.title,
                        body: response.body,
                        date: response.date,
                        image: response.image
                    })
                },
            })
        }
    }, [id])

    return(
        <div className="news__place">
            <h1 className="news__title">{page?.title}</h1>
            <img className="news__img" src={page?.image != null ? `data:img/jpeg;base64,${page?.image}` : ''}/>
            <div className="news__body">
                {page?.body?.length > 0 ? toReact(page?.body) : toReact("")}
            </div>
            <p className="news__date">{page?.date}</p>
        </div>
    )
}

export default News;