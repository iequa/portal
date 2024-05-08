import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Button from "../Button/Button";
import { tokenStorage } from "../../utils/StoredToken";

const RecordsCalendar = ({calendarType, title}) => {

    const [CalendarType, setCalendarType] = useState();
    const [CalendarData, setCalendarData] = useState([]);
    const [SelectedElement, setSelectedElement] = useState("");

    const dayArray = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const [Week, setWeek] = useState([]);


    useEffect(() => {
        let localWeek = prepareWeek();
        setWeek(localWeek);
        setCalendarType("Donation");
    },[])

    useEffect(() => {
        if (CalendarType && Week.length === 7) {
            const days = Week.map( ({day, month, year}) => ({day, month, year}));
            api.getCalendarData({
                body: { type: CalendarType, days: days },
                resolveCallback: (response) => {
                    let res = response.dates;
                    res.forEach((el) =>{
                        const dt = new Date(el);
                        const hrs = dt.getHours().toString();
                        const mnts = dt.getMinutes().toString();
                        const day = dt.getDate().toString().length === 1 ? '0' + dt.getDate().toString() : dt.getDate().toString();
                        let time = `${hrs.length === 1 ? '0' + hrs : hrs}:${mnts.length === 1 ? '0' + mnts : mnts}`;
                        let r = Week.find(f => f.day == day && f.times.some((item) => item.available && item.time === time));
                        console.log(r);
                        r.times.forEach( (timeObj) => {
                            if (timeObj.time === time) {
                                timeObj.available = false;
                            }
                        })
                    })
                    setCalendarData(res);
                    setCalendarType(response.type)
                },
            });
        }
    }, [Week])

    function highlightSelection(e) {
        let btnConfirm = document?.getElementsByClassName("btn__confirm");
        if (e.target.className === "calendar__time__item") {
            e.target.className = "calendar__time__item selected";
            let elem = document?.getElementById(SelectedElement);
            if (elem) {
                elem.className = "calendar__time__item";
            }
            btnConfirm[0].style.display = "block";
            setSelectedElement(e.target.id);
        }
        else {
            btnConfirm[0].style.display = "none";
            let elem = document?.getElementById(SelectedElement);
            if (elem) {
                elem.className = "calendar__time__item";
            }
            setSelectedElement("");
        }
    }

    function tryAddRecord() {
        let selectedDate = document?.getElementsByClassName("calendar__time__item selected");
        if (selectedDate?.length === 1) {
            const id = Number.parseInt(selectedDate[0].id.slice(5, 6)); //id строки из которой берётся дата
            const time = selectedDate[0].innerHTML; // время
            let dayToSelect = Week.filter((headerEl, index) => { 
                if(index === id) {
                    return {headerEl} 
                } else return;
            });
            let dts0 = dayToSelect[0];
            //Дата по человечески
            let selectedDatetime = {

                day: dts0.day.length === 1 ? "0" + dts0.day : dts0.day, 
                month: dts0.month.length === 1 ? "0" + dts0.month : dts0.month,
                year: dts0.year,
                time: time,
            };
            console.log(selectedDatetime);
            api.setServiceProvisionDate({
                body: {selectedDatetime : selectedDatetime},
                resolveCallback: (response) => {
                    let localWeek = prepareWeek();
                    setWeek(localWeek);
                }
            })
        }
    }

    return (
        <div className="calendar__common">
            <h3 className="calendar__title">{title}</h3>
            <div className="calendar__date__headers">
                {Week.map((headerEl, index) => {return(<h4 key={index} className="calendar__date__title">{headerEl.day}-{headerEl.month}</h4>)})}
            </div>
            <div className="calendar__date__items">
                {Week ? (Week.map((element, index) => {
                    let i = 0;
                    return (
                        <div key={index} className="calendar__date__items__rows">
                            {element.times.length > 0 ? element.times.map(el => {
                                const childIndex = `item ${index}_${i++}`;
                                return (
                                    <p 
                                    id={childIndex} 
                                    key={childIndex} 
                                    className={el.available ? "calendar__time__item" : "calendar__time__item not__avaliable"} 
                                    onClick={(e) => highlightSelection(e)}>
                                        {el.time}
                                    </p>
                                )
                            }) : ""}
                        </div>
                )})) : (<div>Запись недоступна</div>)}
            </div>
            <Button selector={"btn__confirm"} size={"medium"} content={"Выбрать"} onClick={() => tryAddRecord()}/>
        </div>
    )

    function prepareWeek() {
        let localWeek = new Array(7);
        let date = new Date();
        for(let i = 0; i < 7; i++){
            let dateToWeek = new Date(date.getTime());
            localWeek[i] = {
                dayType: date.getDay(), 
                day: date.getDate(), 
                month: date.getMonth() + 1, //Идёт с нуля
                year: date.getFullYear(),
                date: dateToWeek,
                times: [
                    {available: true, time: "08:00"}, 
                    {available: true, time: "08:15"},
                    {available: true, time: "08:30"},
                    {available: true, time: "08:45"},
                    {available: true, time: "09:00"},
                    {available: true, time: "09:15"},
                    {available: true, time: "09:30"},
                    {available: true, time: "09:45"},
                    {available: true, time: "10:00"},
                    {available: true, time: "10:15"},
                    {available: true, time: "10:30"},
                    {available: true, time: "10:45"}
                ]
            };
            date.setDate(date.getDate() + 1);
        }
        return localWeek;
    }
}

export default RecordsCalendar;