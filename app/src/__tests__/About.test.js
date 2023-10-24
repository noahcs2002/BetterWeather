import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from "../About/About";
import { BrowserRouter } from "react-router-dom";
import { TestContextProvider } from "../_Other/TestContextProvider";

test('Simple about render test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <About/>
            </TestContextProvider>
        </BrowserRouter>
    )
    const e = screen.getByText(/About Better Weather/i);
    expect(e).toBeInTheDocument();
});

test('Attribution test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <About/>
            </TestContextProvider>
        </BrowserRouter>
    )
    const e = screen.getByText(/Attribution/i);
    expect(e).toBeInTheDocument(); 
})