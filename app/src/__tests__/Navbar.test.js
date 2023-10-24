import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../Navbar/Navbar.js';
import 'jest-canvas-mock';
import { BrowserRouter, Router } from "react-router-dom";
import { TestContextProvider } from "../_Other/TestContextProvider";

test('Simple render test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );
    const e = screen.getByText(/BetterWeather/i);
    expect(e)
})