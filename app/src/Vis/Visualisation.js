import React from "react";
import './Visualisation.scss';
import Plot from 'react-plotly.js'

export default function Visualisation({xData, yData, xAxis, yAxis, title}) {

    const trace = {
        x: xData,
        y: yData,
        mode:'lines',
        type:'scatter',
        marker: {color:'green', size:8},
    };

    const layout = {
        title: title,
        xaxis: {title: xAxis},
        yaxis: {title: yAxis}
    };

    return (
        <div className="visualisation">
            <Plot data={[trace]} layout={layout} style={{width: '100%', height:'400px'}}/>
        </div>
    )
}