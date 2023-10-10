import React from "react";
import './Visualisation.scss';
import Plot from 'react-plotly.js'

/**
 * Visualisation used for weather data
 * @param {*} The data needed for the visualisation
 * @returns React Module to display
 * @author Noah Sternberg
 * @since V1.0.0
 * @note This uses the Plotly.JS library
 */
export default function Visualisation({xData, yHighs, yLows, xAxis, yAxis, title, type}) {

    // Store the trace for the high values

    const graphType = type=='s' ? ('scatter') : ('bar');
    console.log('Graph type : , ', graphType);

    const highValues = {
        x: xData,
        y: yHighs,
        mode:'lines',
        type: graphType,
        marker: {color:'042048', size:8},
        name: 'High',
        text: yHighs.map(v => `${v}`),
        textposition : 'inside', 
        hoverinfo: 'name+y'
    };

    // Start the trace for the lows.
    var lowValues = {};

    // If we have lows passed in, construct the lows
    if (yLows) {
        lowValues = {
            x: xData,
            y: yLows,
            mode:'lines',
            type:graphType,
            marker: {color:'3498db', size:8},
            name: 'Low',
            text: yLows.map(v => `${v}`),
            textposition : 'inside', 
            hoverinfo: 'name+y',
        };
    }
    
    const data = yHighs ? ([highValues, lowValues]) : ([highValues]);
    const yAxisLayout = type=='s' ? ({title: yAxis, range:[0,100]}) : ({title: yAxis});

    const layout = {
        title: title,
        xaxis: {title: xAxis},
        yaxis: yAxisLayout
    };

    return (
        <div className="visualisation">
            <Plot data={data} layout={layout} style={{width: '100%', height:'400px'}} config= {{displayModeBar: false, staticPlot:true}}/>
        </div>
    )
}