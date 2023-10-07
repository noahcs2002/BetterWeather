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
            <div>
              <p className="loading-caveat"> This might take a second. Things like your browser, your internet, and the location you're 
                requesting data for influence load times. Thank you for being patient!
              </p>
            </div>
      </div>  
    );
}