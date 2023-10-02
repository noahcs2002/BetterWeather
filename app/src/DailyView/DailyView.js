import React from "react";
import './DailyView.scss';
import Visualisation from "../Vis/Visualisation";

export default function DailyView() {
    // Poll from API eventually
    const xData=['10/1','10/2','10/3','10/4','10/5','10/6','10/7'];
    const yData=[82, 81, 79, 73, 72, 68, 64];
    const title="Daily Trends";
    const xAxis='Day' ;
    const yAxis="Temperature";
    return (
        <div className="daily">
            <h2> Daily View: </h2>

            <Visualisation xData={xData} yData={yData} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}