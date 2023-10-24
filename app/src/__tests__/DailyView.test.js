import React from "react";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
// import Visualisation from "../Vis/Visualisation";
// import DailyView from "../DailyView/DailyView";



const mockData = {
    daily : {
        xData : [1,2,3,4,5],
        yHighs : [11,11,11,11,11],
        yLows : [1,1,1,1,1],
        title : 'foo',
        xAxis : 'x axis',
        yAxis : 'y axis'
    }
}

test('Simple render test', () => {

})