import React from "react";
import './info.scss';

/**
 * Simple react component for additional weather information
 * @param data 
 * @returns A react component representing additional information from the forecast 
 * @author Noah Sternberg
 * @since V1.1.0 Hot Fix
 */
const Info = (data) => {
    const today = data.data.todaysForecast;
    return (
        <div className="info">
            <h2>Today at a glance</h2>
            <div className="extra">
                <h2>Brief Overview</h2>
                <p> {today.detailedForecast} </p>

                <h2>Humidity</h2>
                <p> {today.relativeHumidity.value}%</p>

                <h2>Wind</h2>
                <p> {today.windSpeed} {today.windDirection} </p>

                <h2>Precipitation</h2>
                {
                    today.probabilityOfPrecipitation.value !== null 
                    ? ( <p>{today.probabilityOfPrecipitation.value}%</p> ) 
                    : (<p> 0% </p>)
                }
            </div>
        </div>
    )
}

export default Info;