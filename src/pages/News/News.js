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
        api.getNewsForPage({
            pageId: id,
            resolveCallback: (response) => {
                setPage({
                    title: response.title,
                    body: response.body,
                    date: response.date,
                    img: response.img
                })
            },
          })
    }, [id])

    return(
        <div>
            <h1>{page?.title}</h1>
            <div>
                {page?.body?.length > 0 ? toReact(page?.body) : toReact("")}
            </div>
            <p>{page?.date}</p>
            <img src={page ? `data:img/jpeg;base64,${page?.img}` : ''}/>
        </div>
    )
}

export default News;