import React, { useEffect, useState } from "react";
import InputString from "../../Components/Input/InputString";
import { api } from "../../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputRichText from "../../Components/Input/InputRichText";
import Button from "../../Components/Button/Button";

const NewsEditor = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();
  const [id, setId] = useState(searchParams.get("id") ?? 0);
  const [page, setPage] = useState({
    id: 0, 
    shortTitle: '',
    shortBody: '',
    title: '',
    body: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
  });

  const imgComp = document.getElementById('imgedit');

  useEffect(() => {
    setSearchParams({ id });
    document.title = id && id === '0' ? "Создание новости" : "Редактрование новости";
    setId(searchParams.get("id"));
  }, []);

  useEffect(() => {
    if (id !== '0') {
      api.getNewsById({
        pageId: id,
        resolveCallback: (response) => {
            setPage({
                id: id, 
                shortTitle: response.shortTitle,
                shortBody: response.shortBody,
                title: response.title,
                image: response.image,
                body: response.body,
                date: new Date(response.date).toISOString().split('T')[0],
            })
        },
      })
    }
  }, [id])

  function handleChange(e) {
    let file = e?.target?.files[0];
      let fileInfo = `
        <p>Название файла: ${file?.name}</p>
        <p>Размер: ${file?.size} bytes</p>
        <p>Тип: ${file?.type}</p>
      `;
      let obj = URL.createObjectURL(file);
      document.getElementById('fileInfo').innerHTML = fileInfo;
      var promise = getBase64(file);
      promise.then(function(result) {
        page.image = result;
      });
      imgComp.src = obj;
      if (document.getElementById('btn__del')) {
        document.getElementById('btn__del').className = "";
      }
  }

  function deleteImage() {
    imgComp.src = "";
    page.image = null;
    document.getElementById('btn__del').className = "hide";
    document.getElementById('fileInfo').innerHTML = "";
  }

  function getBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  return (
    <div className="editor__main__container">
      <p className="editor__label__component">Изображение для новости</p>
      <img id="imgedit" className="news__img" src={page?.image != null ? `data:img/jpeg;base64,${page?.image}` : ''}/>
      {page?.image != null ? <Button id={"btn__del"} content={"Удалить изображение"} onClick={deleteImage}/> : ""}  
      <input type="file" id="fileInput" onChange={handleChange} accept="image/png, image/jpeg"/>
      <div id="fileInfo"></div>
      <p className="editor__label__component">Заголовок первью</p>
      <InputString
        id={"shortTitle"}
        editor={"editor__input"}
        value={page?.shortTitle}
        onChange={(val) => {
          page.shortTitle = val.target.value;
        }}
        maxLength={30}
      />
      <p className="editor__label__component">Описание первью</p>
      <InputRichText
        id={"shortBody"}
        editor={"editor__rtb"}
        value={page?.shortBody}
        onChange={(val) => {
          page.shortBody = val.target.value;
        }}
      />
      <p className="editor__label__component">Основной заголовок</p>
      <InputString
        id={"title"}
        editor={"editor__input"}
        value={page?.title}
        onChange={(val) => {
          page.title = val.target.value;
        }}
        maxLength={50}
      />
      <p className="editor__label__component">Содержимое новости</p>
      <InputRichText
        id={"body"}
        editor={"editor__rtb"}
        value={page?.body}
        onChange={(val) => {
          page.body = val.target.value;
        }}
      />
      <p className="editor__label__component">Дата новости</p>
      <InputString
        id={"date"}
        editor={"editor__input"}
        value={page?.date}
        onChange={(val) => {
          page.date = val.target.value;
        }}
        type={"date"}
      />
      <Button
        content={"Применить изменения"}
        onClick={()=> id == 0 ?
          api.createNewsData({
              data: page, 
              resolveCallback: (response) => {
                navigate("/news-editor?id=" + response.id);
              }
          })
          :
          api.setNewsData({
            id: id,
            data: page, 
          })
        }
      />
    </div>
  );
};

export default NewsEditor;
