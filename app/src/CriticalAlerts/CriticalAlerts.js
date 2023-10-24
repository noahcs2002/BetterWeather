import React from "react";
import './CriticalAlerts.scss';

/**
 * A react component for critical alerts 
 * @param {alerts, setStateFunction} -> The alerts to display and the function to dismiss them
 * @returns A component showing alerts
 * @since V1.2.0
 * @author Noah Sternberg
 */

const CriticalAlerts = ({alerts, setStateFunction}) => {
    const handleDismissClick = () => {
        setStateFunction(false);
    }

    return (
        <div className="alert">
            <p> {alerts[0].properties.headline} </p>
            <p> {alerts[0].properties.description}</p>
            <p onClick={handleDismissClick} className="dismiss"> Dismiss </p>
        </div>
    )
}

export default CriticalAlerts;