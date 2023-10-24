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
            q : 'Why are the numbers I\'m seeingly slightly different than ____\'s app ?', 
            a : 'The data we get is from the National Weather Service, and numbers might vary by a degree or two.',
            id : 3
        },
        {
            q : 'Where are you getting this information?', 
            a : 'The National Weather Service\'s free data.',
            id : 4
        },
        {
            q: 'Why does the site not have data for ____ ?',
            a: 'Our data comes from the National Weather Service. If the data is missing for your city or area, ' +
            ' then we recommend trying to search for a different area, or include a state in the search field.',
            id : 5
        },
        {
            q: 'How can I get in touch?',
            a: 'If you need to get in contact with us, you can use the Google Forms provided in the Feedback tab, or send us an email' +
            ' at betterweather.contact@gmail.com. We will try and respond within 48 buisness hours.',
            id : 6
        }
    ]

    return (
        <div>
            <Navbar/>
            <div key={'faq'} className="help-container">
                <h2> FAQs and Helpful Information </h2>
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