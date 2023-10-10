import React from "react";
import Navbar from "../Navbar/Navbar";
import './Report.scss';

const BugReport = () => {

    const click = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSd_QVm9TdS6XiDQr7uGNNHgiX13jHXJfL0pT271zxQL3G20VQ/viewform');
    }

    return (
        <div>
            <Navbar/>
            <div className="about-container">
                <div className="about">
                    <h2> Report a bug </h2>
                    <p> 
                        Please click the link below to fill out a Google Form for reporting bugs. If your browser does not support
                        redirecting links, feel free to copy the text and paste it into the browser.
                    </p>
                    <p className="clickable" onClick={click}> https://docs.google.com/forms/d/e/1FAIpQLSd_QVm9TdS6XiDQr7uGNNHgiX13jHXJfL0pT271zxQL3G20VQ/viewform </p>
                </div>
            </div>
        </div>
    )

}

export default BugReport;