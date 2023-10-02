import React from "react";
import './CurrentLocation.css';

export default function CurrentLocation({ searchText }) {
    return (
        <div className="container">
            <h2> Currently displaying information for {searchText} </h2>
        </div>
    )
}