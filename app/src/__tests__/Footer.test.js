import React from "react";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import Footer from "../Footing/Footer";

const versionNumber = 'V1.2.3';

test('Footer renders', () => {
    render(<Footer versionNumber={versionNumber}/>)
    const e = screen.getByText(versionNumber);
    expect(e).toBeInTheDocument();
})