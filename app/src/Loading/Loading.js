import React from "react";
import './Loading.scss';
import LoadingAnimation from "./LoadingAnimation";

export default function Loading() {
    return(
      <div className="loading">
            <LoadingAnimation/>
      </div>  
    );
}