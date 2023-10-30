import React from "react";
import Navbar from "../Navbar/Navbar";
import './About.scss'

/**
 * Display the about tab for the quick links
 * @returns React Module to display about in quicklinks
 * @author Noah Sternberg
 * @since V1.0.0
 */
const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="about-container">
                <div className="about">
                    <h2 className="about-title">About Better Weather</h2>
                    <p>
                        BetterWeather is a simplistic weather app designed to make finding weather information
                        easy. When I open weather apps, I am berated by weird UIs and a bunch of information that
                        I don't need. So I created BetterWeather with the solution to those problems in mind. 
                        No weird UIs and just the information you really need: the hourly trends, weekly trends, rain chances, and wind.
                    </p>
                </div>
                <div className="attribution">
                    <h2 className="attribution-title">Attribution</h2>
                    <ul>
                        <li> <em> Logo provided by <a target="_blank" className="link" href="https://icons8.com/" rel="noreferrer"> icons8 </a></em></li>
                        <li> <em> Weather API provided by <a target="_blank" className="link" href="https://www.weather.gov/documentation/services-web-api" rel="noreferrer"> The National Weather Service </a></em></li>
                        <li> <em> Geocoding API provided by <a target="_blank" className="link" href="https://openweathermap.org/api/geocoding-api" rel="noreferrer">OpenWeatherMap </a></em></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;