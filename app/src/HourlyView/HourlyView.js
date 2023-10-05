import React from "react";
import './HourlyView.scss';
import Visualisation from "../Vis/Visualisation";

/**
 * Display the hourly view for the data passed in
 * @param {*} The data to display
 * @returns React Module to display
 * @author Noah Sternberg
 * @since V1.0.0
 */
export default function HourlyView({data}) {
    // Take the data from the 'hourly' part of the data passed in
    const xData=data.hourly.xData
    const yHighs=data.hourly.yHighs;
    const yLows=data.hourly.yLows;
    const title=data.hourly.title;
    const xAxis=data.hourly.xAxis;
    const yAxis=data.hourly.yAxis;

    return (
        <div className="hourly">
            <h2> Hourly Outlook: </h2>
            <Visualisation xData={xData} yHighs = {[]} yLows={yLows} title={title} xAxis={xAxis} yAxis={yAxis}/>
        </div>
    )
}