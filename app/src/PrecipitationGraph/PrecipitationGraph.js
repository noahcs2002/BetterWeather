import React from "react";
import './PrecipitationGraph.scss';
import Visualisation from "../Vis/Visualisation";

export default function Precipitation({data}) {
    const xData=data.daily.xData;
    var yLows=[]
    const title='Precipitation Chances';
    const xAxis='Day';
    const yAxis='Rain Chance';

    data.weeklyPeriods.forEach(period => {
        if (!period.probabilityOfPrecipitation.value) {
            yLows.push(0);
        }
        else {
            yLows.push(period.probabilityOfPrecipitation.value);
        }
    });

    return (
        <div className="precip">
            <h2> Precipitation Chances: </h2>
            <Visualisation xData={xData} yHighs = {[]} yLows={yLows} title={title} xAxis={xAxis} yAxis={yAxis} type='s'/>
        </div>
    )
}