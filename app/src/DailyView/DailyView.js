import React from "react";
import './DailyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function DailyView({data}) {
    const xData=data.xData
    const yData=data.yData;
    const title=data.title;
    const xAxis=data.xAxis;
    const yAxis=data.yAxis;

    console.log(xData);
    console.log(yData);
    console.log(xAxis);
    console.log(yAxis);
    console.log(title);

    return (
        <div className="daily">
            <h2> Daily View: </h2>
            <Visualisation xData={xData} yData={yData} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}