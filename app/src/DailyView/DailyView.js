import React from "react";
import './DailyView.scss';
import Visualisation from "../Vis/Visualisation";

/**
 * Display the daily weather forecast
 * @param {*} The data to display
 * @returns React Module to display the daily view for the weather
 * @author Noah Sternberg
 * @since V1.0.0
 */
export default function DailyView({data}) {
    
    // Take data from the 'daily' part of the data it's passed.
    const xData=data.daily.xData
    const yHighs=data.daily.yHighs;
    const yLows=data.daily.yLows;
    const title=data.daily.title;
    const xAxis=data.daily.xAxis;
    const yAxis=data.daily.yAxis;

    return (
        <div className="daily">
            <h2>Weekly Outlook:</h2>
            <Visualisation xData={xData} yHighs={yHighs} yLows={yLows} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}