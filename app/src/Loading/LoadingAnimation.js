import React, { useEffect, useState } from "react";
import './Loading.scss';

/**
 * Loading animation
 * @returns React Module to display the loading animation
 * @author Noah Sternberg
 * @since V1.0.0
 */
const LoadingAnimation = () => {
    const [dots, setDots] = useState(0);

    // Effect to show loading -> loading . -> loading .. -> loading ...
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots) => (dots + 1) % 4);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <div className="animation"> {`Loading Weather Data${'.'.repeat(dots)}`} </div>;
}   

export default LoadingAnimation;