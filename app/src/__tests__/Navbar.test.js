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

test('Link tests', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );
    const home = screen.getByText(/Home/i);
    const help = screen.getByText(/Help/i);
    const about = screen.getByText(/About/i);
    const feedback = screen.getByText(/Feedback/i);

    expect(home).toBeInTheDocument();
    expect(help).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(feedback).toBeInTheDocument();
})

test('Home click test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );

    const home = screen.getByRole('link', {name: 'Home'});
    expect(home).toHaveAttribute('href', '/');
})

test('Help click test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );

    const home = screen.getByRole('link', {name: 'Help'});
    expect(home).toHaveAttribute('href', '/help');
})

test('About click test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );

    const home = screen.getByRole('link', {name: 'About'});
    expect(home).toHaveAttribute('href', '/about');
})

test('Feedback click test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Navbar/>
            </TestContextProvider>
        </BrowserRouter>
    );

    const home = screen.getByRole('link', {name: 'Feedback'});
    expect(home).toHaveAttribute('href', '/feedback');
})