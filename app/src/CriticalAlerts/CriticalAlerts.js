import React from "react";
import './CriticalAlerts.scss';

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