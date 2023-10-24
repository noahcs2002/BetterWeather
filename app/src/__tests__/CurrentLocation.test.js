import React from "react";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';


test('Simple render test', () => {
    const mockData = 'foo bar';
    render(<CurrentLocation searchText={mockData}/>);
    const e = screen.getByText(/foo bar/i);
    expect(e).toBeInTheDocument();
})