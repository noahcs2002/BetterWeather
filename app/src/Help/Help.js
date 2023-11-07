import React from "react";
import Navbar from "../Navbar/Navbar";
import './help.scss';


/**
 * React component for FAQs and other help
 * @returns Help component
 * @since V1.3.0
 * @author Noah Sternberg
 */
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
            ' search (e.g. Lexington, VA).',
            id : 1
        },
        {
            q : 'I searched for ____ and got something weird in response. What should I do?', 
            a : 'Go to the \'feedback\' button in the top right of the screen! Sometimes we get'
                + ' some weird stuff back from our services, and we will try and '
                + ' fix it ASAP!', 
            id : 2
        },
        {
            q : 'Where are you getting this information?', 
            a : 'The National Weather Service\'s free data.',
            id : 3
        },
        {
            q: 'Why does the site not have data for ____ ?',
            a: 'Our data comes from the National Weather Service. If the data is missing for your city or area, ' +
            ' then we recommend trying to search for a different area nearby to your desired area, or include a state in the search field for a more refined search.',
            id : 4
        }
    ]

    return (
        <div>
            <Navbar/>
            <div key={'faq'} className="help-container">
                <h2 className="help-title"> FAQs and Helpful Information </h2>
                {faqs.map(faq => (
                    <div key={faq.id} id={faq.id} className="help">
                         <div key={faq.q}className="qa"><p>Q:</p><p>{faq.q} </p></div> 
                         <div key={faq.a}className="qa"><p>A:</p><p>{faq.a}</p></div> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Help;