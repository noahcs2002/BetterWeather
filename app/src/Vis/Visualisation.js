import React from "react";
import './Visualisation.scss';
import Plot from 'react-plotly.js'

export default function Visualisation({xData, yHighs, yLows, xAxis, yAxis, title}) {

    const highValues = {
        x: xData,
        y: yHighs,
        mode:'lines',
        type:'bar',
        marker: {color:'042048', size:8},
        name: 'High',
        text: yHighs.map(v => `${v}`),
        textposition : 'inside', 
        hoverinfo: 'name+y'
    };

    const lowValues = {
        x: xData,
        y: yLows,
        mode:'lines',
        type:'bar',
        marker: {color:'3498db', size:8},
        name: 'Low',
        text: yLows.map(v => `${v}`),
        textposition : 'inside', 
        hoverinfo: 'name+y',
        // fill: 'tonexty',
        // fillcolor: 'rgba(53, 246, 120, .73)'
    };

    const layout = {
        title: title,
        xaxis: {title: xAxis},
        yaxis: {title: yAxis}
    };

    return (
        <div className="visualisation">
            <Plot data={[highValues, lowValues]} layout={layout} style={{width: '100%', height:'400px'}}/>
        </div>
    )
}