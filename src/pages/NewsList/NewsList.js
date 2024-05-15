import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { api } from "../../utils/api";
import Pagination from "../../Components/Pagination/Pagination";
import { tokenStorage } from "../../utils/StoredToken";

const NewsList = () => {
  useEffect(() => {
    document.title = "All news";
  }, []);

  const navigate = useNavigate();

    const [newsPreviews, setNewsPreviews] = useState([]);
    const [page, setPage] = useState(0);
    const [countOfPages, setCountOfPages] = useState(0);

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
      fetchPage();
    },[page])

    function fetchPage() {
      api.getNewsPreviews({
        page: page,
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
            setCountOfPages(response.pagesCount);
            setPage(response.page);
            setNewsPreviews(arr);
        },
      });
    }

    function changeCurrentPage(newPage) {
      console.log(newPage);
      setPage(newPage);
    }
    
    return (
      <div>
        <div id="widget">
            <h1 className="all__news__title">Список новостей</h1>
            <div className="news__elements__block">
                {newsPreviews.map((elem) => {
                    return(
                        <div key={`news__elem__${elem.id}`}>
                          <div id={`news__elem__${elem.id}`} className="news__block__elem" onClick={onClick}>
                              <h3 className="prev__short__title">{elem.shortTitle}</h3>
                              {elem.image != null ?
                                  <img className="prev__img" src={elem.image != null ? `data:image/jpeg;base64,${elem.image}` : ""}/>
                              : ""}
                              <p className="prev__short__body">{elem.shortBody}</p>
                              <label className="prev__date">{new Date(elem.date).toLocaleDateString()}</label>
                          </div>
                          {tokenStorage.getUserSpecFuncAvaliability() ? <div onClick={() => navigate("/news-editor?id=" + elem.id)}>Редактировать</div> : ""}
                        </div>
                    )
                })}
            </div>
        </div>
        <Pagination
          currentPage={page}
          countOfPages={countOfPages}
          onClick={changeCurrentPage}
        />
      </div>
        
    )
};

export default NewsList;
