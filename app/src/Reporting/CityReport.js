import React from "react";
import Navbar from "../Navbar/Navbar";
import './Report.scss';

const CityReport = () => {

    const click = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSeSgNyoPu2BuovrdX4Q3w931P9D6ri1U2u5sq_i8vgq2-DM_Q/viewform?usp=sf_link');
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
                    <p className="clickable" onClick={click}> https://docs.google.com/forms/d/e/1FAIpQLSeSgNyoPu2BuovrdX4Q3w931P9D6ri1U2u5sq_i8vgq2-DM_Q/viewform?usp=sf_link </p>
                </div>
            </div>
        </div>
    )

}

export default CityReport;