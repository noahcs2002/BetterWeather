import React from "react";
import './CurrentLocation.scss';
/**
 * 
 * @param {*} The search text (location) to display
 * @returns React Module to display the current location.
 * @author Noah Sternberg
 * @since V1.0.0
 */
export default function CurrentLocation({ searchText }) {
    return (
        <div>
            <h2> Currently displaying information for {searchText} </h2>
        </div>
    )
}