import React, { useEffect, useState } from "react";
import './Loading.scss';

const LoadingAnimation = () => {
    const [dots, setDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots) => (dots + 1) % 4);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <div className="animation">{`Loading Weather Data${'.'.repeat(dots)}`}</div>;
}   

export default LoadingAnimation;