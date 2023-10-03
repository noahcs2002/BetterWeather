import React from "react";
import './HourlyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function HourlyView({data}) {
    const xData=data.hourly.xData
    const yHighs=data.hourly.yHighs;
    const yLows=data.hourly.yLows;
    const title=data.hourly.title;
    const xAxis=data.hourly.xAxis;
    const yAxis=data.hourly.yAxis;

    return (
        <div className="hourly">
            <h2> Hourly Outlook: </h2>
            <Visualisation xData={xData} yHighs={yHighs} yLows={yLows} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}