import React from "react";
import './CriticalAlerts.scss';

const CriticalAlerts = ({alerts}) => {
    console.log('Alerts received: ', alerts);

    return (
        <div className="alert">
            <p> {alerts[0].properties.headline} </p>
            <p> {alerts[0].properties.description}</p>
        </div>
    )
}

export default CriticalAlerts;