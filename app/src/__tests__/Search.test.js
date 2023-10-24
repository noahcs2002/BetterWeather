import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import SearchBar from "../Search/SearchBar";
import { Exception } from "sass";

const samples = [
    'e.g. Lexington, KY',
    'e.g. Murray, KY',
    'e.g. Seattle, WA',
    'e.g. Portland',
    'e.g. Mount Carmel',
    'e.g. Evansville',
    'e.g. New York City, NY',
    'e.g. Chicago, IL',
    'e.g. Palm Beach, FL',
    'e.g. Fairbanks'
]

test('Renders', () => {
    const spy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
    render(<SearchBar/>);
    const e = screen.getByRole('textbox');
    expect(e).toHaveAttribute('placeholder', samples[0]);
})

test('Passes search value correctly', () => {
    const mockFunction = jest.fn();
    render(<SearchBar onSearch={mockFunction}/>);
    const search = screen.getByAltText(/Search Icon/i);
    fireEvent.click(search);
    expect(mockFunction).toHaveBeenCalled();
}) 

test('Enter works', () => {
    const mockFunction = jest.fn();
    const spy = jest.spyOn(global.Math, 'random').mockReturnValue(0);
    render(<SearchBar onSearch={mockFunction}/>);
    const e = screen.getByPlaceholderText(/e.g. Lexington, KY/i)
    fireEvent.keyDown(e, {key: 'Enter', code:'Enter'});
    expect(mockFunction).toHaveBeenCalled();   
})