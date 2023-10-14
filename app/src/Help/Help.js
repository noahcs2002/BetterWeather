import React from "react";
import Navbar from "../Navbar/Navbar";
import './help.scss';

const Help = () => {

    // Copy, paste, and uncomment this template
    // {
    //     q : '', 
    //     a : ''
    // },

    const faqs = [
        {
            q : 'What can I search for?',
            a : 'You can search for a city (e.g. Seattle) or a city with a state for a more refined' +
            ' search (e.g. Lexington, VA).'
        },
        {
            q : 'I searched for ____ and got something weird in response. What should I do?', 
            a : 'Go to the \'feedback\' button in the top right of the screen! Sometimes we get'
                + ' some weird stuff back from our services, and we will try and '
                + ' fix it ASAP!' 
        },
        {
            q : 'Why are the numbers I\'m seeingly slightly different than ____\'s app ?', 
            a : 'The data we get is from the National Weather Service, and numbers might vary by a degree or two.'
        },
        {
            q : 'Where are you getting this information?', 
            a : 'The National Weather Service\'s free data.'
        },
        {
            q: 'Why does the site not have data for ____ ?',
            a: 'Our data comes from the National Weather Service. If the data is missing for your city or area, ' +
            ' then we recommend trying to search for a different area, or include a state in the search field.'
        }
    ]

    return (
        <div>
            <Navbar/>
            <div className="help-container">
                <h2> FAQ's and Helpful Information </h2>
                {faqs.map(faq => (<>
                    <div id={faq} className="help">
                        <p> <div className="qa">Q:</div> {faq.q} </p>
                        <p> <div className="qa">A:</div> {faq.a} </p>
                    </div>
                </>))}
            </div>
        </div>
    )
}

export default Help;