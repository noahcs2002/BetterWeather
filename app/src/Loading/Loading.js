import React from "react";
import './Loading.scss';
import LoadingAnimation from "./LoadingAnimation";

/**
 * Loading screen
 * @returns React Module to display the loading screen.
 * @author Noah Sternberg
 * @since V1.0.0
 */
export default function Loading() {
    return(
      <div className="loading">
            <LoadingAnimation/>
      </div>  
    );
}