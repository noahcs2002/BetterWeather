import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import Info from "../AdditionalInformation/Info";

const mockData = {
    hourly : {
        yHighs : [1,2,3,4,5],
        yLows : [6,7,8,9,0]
    },
    todaysForecast : {
        detailedForecast : "'foo'",
        relativeHumidity : {
            value: 3.14
        },
        windSpeed : 2.82,
        windDirection : 'bar',
        probabilityOfPrecipitation : {
            value: 54
        }
    }
}

test('Briew overview test', () => {
    render(<Info data={mockData}/>);
    const e = screen.getByText(/Brief Overview/i);
    const passed = screen.getByText(/'foo'/i);
    expect(e).toBeInTheDocument();
    expect(passed).toBeInTheDocument();
});

test('Wind test', () => {
    render(<Info data={mockData}/>);
    const e = screen.getByText(/Wind/i);
    const passedOne = screen.getByText(/2.82/i);
    const passedTwo = screen.getByText(/bar/i);
    expect(e).toBeInTheDocument();
    expect(passedOne).toBeInTheDocument();
    expect(passedTwo).toBeInTheDocument();
});

test('Humidity test', () => {
    render(<Info data={mockData}/>);
    const e = screen.getByText(/Humidity/i);
    const passed = screen.getByText(/3.14/i);
    expect(e).toBeInTheDocument();
    expect(passed).toBeInTheDocument();
});

test('Precipitation test', () => {
    render(<Info data={mockData}/>);
    const e = screen.getByText(/Precipitation/i);
    const passed = screen.getByText(/54%/i);
    expect(e).toBeInTheDocument();
    expect(passed).toBeInTheDocument(); 
});

test('Precipitation test no value', () => {
    const specificData = {
        hourly: {
            yHighs: [1,2,3,4,5],
            yLows: [6,7,8,9,0]
        },
        todaysForecast : {
            detailedForecast : "'foo'",
            relativeHumidity : {
                value: 3.14
            },
            windSpeed : 2.82,
            windDirection : 'bar',
            probabilityOfPrecipitation : {
                value: null
            }
        }
    }
    render(<Info data={specificData}/>);
    const e = screen.getByText(/Precipitation/i);
    const passed = screen.getByText(/0%/);
    expect(e).toBeInTheDocument();
    expect(passed).toBeInTheDocument();
});

