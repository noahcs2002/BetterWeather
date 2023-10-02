import React from "react";
import './HourlyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function HourlyView({data}) {
    const xData=data.xData
    const yData=data.yData;
    const title=data.title;
    const xAxis=data.xAxis;
    const yAxis=data.yAxis;

    return (
        <div className="hourly">
            <h2> Hourly View: </h2>
            <Visualisation xData={xData} yData={yData} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}