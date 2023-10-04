import React from "react";
import Navbar from "../Navbar/Navbar";
import './About.scss'

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="about-container">
                <div className="about">
                    <h2> About Better Weather </h2>
                    <p> 
                        BetterWeather is a simplistic weather app designed to make finding weather information
                        easy. When I open weather apps, I am berated by ads, weird UIs, and a bunch of information that
                        I don't need. So I created BetterWeather with the solution to those problems in mind. 
                        No ads, no weird UIs, and minimal information. Just the hourly trends, weekly trends, and some 
                        information about where the info comes from, like the weather station, so you know where to go to get
                        more information.
                    </p>
                </div>
                <div className="attribution">
                    <h2> Attribution </h2>
                    <ul>
                        <li> <em> Logo provided by <a target="_blank" className="link" href="https://icons8.com/"> https://icons8.com/ </a></em></li>
                        <li> <em> Weather API provided by <a target="_blank" className="link" href="https://www.weather.gov/documentation/services-web-api"> The National Weather Service </a></em></li>
                        <li> <em> Geocoding API provided by <a target="_blank" className="link" href="https://openweathermap.org/api/geocoding-api">OpenWeatherMap </a></em></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;