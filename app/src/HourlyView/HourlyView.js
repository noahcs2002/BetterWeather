import React from "react";
import './HourlyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function HourlyView({data}) {
    const xData=['12:00', "1:00", '2:00', '3:00', '4:00', '5:00', '6:00'];
    const yData=[82, 80, 82, 83, 85, 86, 89];
    const title="Hourly Trends";
    const xAxis='Hour' ;
    const yAxis="Temperature";
    return (
        <div className="hourly">
            <h2> Hourly View: </h2>
            <Visualisation xData={xData} yData={yData} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}