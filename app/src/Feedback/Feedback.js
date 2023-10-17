import React from "react";
import './Feedback.scss';
import Navbar from "../Navbar/Navbar";

const Feedback = () => {

    const cityFormURL = 'https://forms.gle/42TKjUJhjP9qQrfc7';
    const bugFormURL = 'https://forms.gle/jFh43d2ZiPZpVZg98';
    const feedbackFormURL = 'https://forms.gle/ALuQpbixFDAoAsFLA';

    const clickBug = () => {
        window.open(bugFormURL);
    }
    const clickCity = () => {
        window.open(cityFormURL);
    }

    const feedbackClick = () => {
        window.open(feedbackFormURL);
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
                    <p className="clickable" onClick={clickBug}> {bugFormURL} </p>
                </div>
                <div className="about">
                    <h2> Report a Strange City </h2>
                    <p> 
                        Please use the link below to access a Google Form for reporting weird city names.
                        For instance, if you search for 'Nashville' and get something that isn't Nashville,
                        report it here, and we'll try and fix it ASAP.
                    </p>
                    <p className="clickable" onClick={clickCity}> {cityFormURL} </p>
                </div>
                <div className="about">
                    <h2> Suggest an Improvement </h2>
                    <p> 
                        Feel free to use the following Google Form to suggest improvements, give general feedback, or 
                        send us a message you didn't want to use the above forms for!
                    </p>
                    <p className="clickable" onClick={feedbackClick}> {feedbackFormURL} </p>
                </div>
            </div>
        </div>
    )
}

export default Feedback;