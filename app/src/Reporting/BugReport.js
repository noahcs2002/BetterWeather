import React from "react";
import Navbar from "../Navbar/Navbar";
import './Report.scss';

const BugReport = () => {

    const formURL = 'https://forms.gle/jFh43d2ZiPZpVZg98';
    
    const click = () => {
        window.open(formURL);
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
                    <p className="clickable" onClick={click}> {formURL} </p>
                </div>
            </div>
        </div>
    )

}

export default BugReport;