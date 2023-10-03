import React from "react";
import './DailyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function DailyView({data}) {
    const xData=data.xData
    const yHighs=data.yHighs;
    const yLows=data.yLows;
    const title=data.title;
    const xAxis=data.xAxis;
    const yAxis=data.yAxis;

    return (
        <div className="daily">
            <h2> Weekly Outlook: </h2>
            <Visualisation xData={xData} yHighs={yHighs} yLows={yLows} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}