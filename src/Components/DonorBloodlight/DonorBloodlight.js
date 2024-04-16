import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";

const DonorBloodlight = () => {
    const [bloodData, setBloodData] = useState(
        [
            {
                name: "O(I)",
                rhs: [
                    {
                        name: "Rh+",
                        value: 5,
                    },
                    {
                        name: "Rh-",
                        value: 5,
                    }
                ] 
            },
            {
                name: "A(II)",
                rhs: [
                    {
                        name: "Rh+",
                        value: 5,
                    },
                    {
                        name: "Rh-",
                        value: 5,
                    }
                ] 
            },
            {
                name: "B(III)",
                rhs: [
                    {
                        name: "Rh+",
                        value: 5,
                    },
                    {
                        name: "Rh-",
                        value: 5,
                    }
                ] 
            },
            {
                name: "AB(IV)",
                rhs: [
                    {
                        name: "Rh+",
                        value: 5,
                    },
                    {
                        name: "Rh-",
                        value: 5,
                    }
                ] 
            }
        ]
    );

    useEffect(() => {
        api.getDonorBloodData({
            resolveCallback:(response)=> {
                if (!response) {
                    setBloodData(
                        [
                            {
                                    name: "O(I)",
                                    rh: [
                                        {
                                            name: "Rh+",
                                            value: 1,
                                        },
                                        {
                                            name: "Rh-",
                                            value: 2,
                                        }
                                    ] 
                            },
                        ]
                    )
                } else {
                    const res = response.bloodData;
                    setBloodData(res)
                }
            }
        });
        // SetBloodData(
            // [
            //     {
            //         name: "O(I)",
            //         rh: [
            //             {
            //                 name: "Rh+",
            //                 value: 1,
            //             },
            //             {
            //                 name: "Rh-",
            //                 value: 2,
            //             }
            //         ] 
            //     },
            //     {
            //         name: "A(II)",
            //         rh: [
            //             {
            //                 name: "Rh+",
            //                 value: 1,
            //             },
            //             {
            //                 name: "Rh-",
            //                 value: 2,
            //             }
            //         ] 
            //     },
            //     {
            //         name: "B(III)",
            //         rh: [
            //             {
            //                 name: "Rh+",
            //                 value: 1,
            //             },
            //             {
            //                 name: "Rh-",
            //                 value: 4,
            //             }
            //         ] 
            //     },
            //     {
            //         name: "AB(IV)",
            //         rh: [
            //             {
            //                 name: "Rh+",
            //                 value: 3,
            //             },
            //             {
            //                 name: "Rh-",
            //                 value: 3,
            //             }
            //         ] 
            //     }
            // ]
        // )
    },[])

    function getColorClass(num) {
        switch (num) {
            case 1:
                return "needed";
            case 2:
                return "particallyneeded";
            case 3:
                return "notneeded";
            case 4:
                return "plasmaonly";
            default:
                return "";
        }
    }

    return (
        <div>
            <h2 className="lightname">Донорский светофор</h2>
            <div className="lightlist">
                {bloodData.map(elem => {
                    return (
                        <div key={elem.name} style={{border: "1px solid black"}}>
                            <h3 className="bloodtext">{elem.name}</h3>
                            <div className="rh">
                            {elem.rhs.map(r => {
                                return (
                                    <div key={elem.name + r.name} className={`base__lightelem ` + getColorClass(r.value)}>
                                        <h4 style={{display: "contents"}}>{r.name}</h4>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <div>
                <div className="tutor__box">
                        <div className="base__lightelem notneeded"/>
                        <p className="text__tutor">- означает, что в учреждении имеется достаточный запас крови данной группы и резус-принадлежности и с визитом в Службу крови можно повременить.</p>
                    </div>
                    <hr/>
                    <div className="tutor__box">
                        <div className="base__lightelem particallyneeded"/>
                        <p className="text__tutor">- означает, что в учреждении присутствует потребность в крови данной группы и резус-принадлежности, рекомендуем запланировать визит для плановой донации.</p>
                    </div>
                    <hr/>
                    <div className="tutor__box">
                        <div className="base__lightelem needed"/>
                        <p className="text__tutor">- означает, что в учреждении сложилась повышенная потребность в крови данной группы и резус-принадлежности, рекомендуем запланировать визит для плановой донации.</p>
                    </div>
                    <hr/>
                    <div className="tutor__box">
                        <div className="base__lightelem"/>
                        <p className="text__tutor">- донорский светофор не обновлялся более 3-х недель.</p>
                    </div>
                    <hr/>
                    <div className="tutor__box">
                        <div className="base__lightelem plasmaonly"/>
                        <p className="text__tutor">- учреждение не имеет экстренных потребностей ввиду заготовки исключительно донорской плазмы</p>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default DonorBloodlight;