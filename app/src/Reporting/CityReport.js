import React from "react";
import Navbar from "../Navbar/Navbar";
import './Report.scss';

const CityReport = () => {

    const formURL = 'https://forms.gle/42TKjUJhjP9qQrfc7';
    
    const click = () => {
        window.open(formURL);
    }

    return (
        <div>
            <Navbar/>
            <div className="about-container">
                <div className="about">
                    <h2> Report a Strange City </h2>
                    <p> 
                        Please use the link below to access a Google Form for reporting weird city names.
                        For instance, if you search for 'Nashville' and get something that isn't Nashville,
                        report it here, and we'll try and fix it ASAP.
                    </p>
                    <p className="clickable" onClick={click}> {formURL} </p>
                </div>
            </div>
        </div>
    )

}

export default CityReport;