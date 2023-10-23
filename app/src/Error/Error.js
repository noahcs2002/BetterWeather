import React from "react";
import { useState, useEffect } from "react";

const Error = () => {
    const [isVisible, setVisiblity] = useEffect(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setVisiblity(false);
    //     }, 4999);

    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [])

    return (
        <div>
            <p> Error loading weather, please try again! </p>
        </div>
    );
}

export default Error;