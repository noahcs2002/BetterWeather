import React from "react";
import Plot from 'react-plotly.js'
import './Visualisation.scss';

/**
 * Visualisation used for weather data
 * @param {*} The data needed for the visualisation
 * @returns React Module to display
 * @author Noah Sternberg
 * @since V1.0.0
 * @note This uses the Plotly.JS library
 * @updated V1.9.3
 */
export default function Visualisation({xData, yHighs, yLows, xAxis, yAxis, title, type}) {
    var plotTitle = title;
    // Add more replacements to this as they become necessary!
    const replacements = [
        {current: 'Nashville-Davidson metropolitan government (balance), TN' , replacement: 'Nashville, TN'},
        {current: 'Lexington-Fayette urban county, KY' , replacement: 'Lexington, KY'},
    ]

    replacements.forEach(entry => {
        if (plotTitle.includes(entry.current)) {
            plotTitle = plotTitle.replace(entry.current, entry.replacement);
        }
    });

    const highValues = {
        x: xData,
        y: yHighs,
        mode:'lines',
        type: 'bar',
        marker: {color:'708090', size:8},
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
            type:'bar',
            marker: {color:'0f7096', size:8},
            name: 'Low',
            text: yLows.map(v => `${v}`),
            textposition : 'inside', 
            hoverinfo: 'name+y',
        };
    }
    
    const data = yHighs ? ([highValues, lowValues]) : ([highValues]);
    const yAxisLayout = type==='s' ? ({title: yAxis, range:[0,100]}) : ({title: yAxis});

    const layout = {
        title: plotTitle,
        xaxis: {title: xAxis},
        yaxis: yAxisLayout
    };

    return (
        <div className="visualisation">
            <Plot data={data} layout={layout} style={{width: '100%', height:'400px'}} config= {{displayModeBar: false, staticPlot:true}}/>
        </div>
    )  
}
