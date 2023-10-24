import React from "react";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import Feedback from "../Feedback/Feedback";
import { BrowserRouter } from "react-router-dom";
import { TestContextProvider } from "../_Other/TestContextProvider";

const cityFormURL = 'https://forms.gle/42TKjUJhjP9qQrfc7';
const bugFormURL = 'https://forms.gle/jFh43d2ZiPZpVZg98';
const feedbackFormURL = 'https://forms.gle/ALuQpbixFDAoAsFLA';

test('Bug Renders', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Feedback/>
            </TestContextProvider>
        </BrowserRouter>
    )
    const e = screen.getByText(/Report a Bug/i);
    const url = screen.getByText('https://forms.gle/jFh43d2ZiPZpVZg98');
    expect(e).toBeInTheDocument();
    expect(url).toBeInTheDocument();
})

test('City renders', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Feedback/>
            </TestContextProvider>
        </BrowserRouter>
    )
    const e = screen.getByText(/Report a Strange City/i);
    const url = screen.getByText('https://forms.gle/42TKjUJhjP9qQrfc7');
    expect(e).toBeInTheDocument();
    expect(url).toBeInTheDocument();
})

test('Feeback renders', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Feedback/>
            </TestContextProvider>
        </BrowserRouter>
    )
    const e = screen.getByText(/Suggest an Improvement/i);
    const url = screen.getByText('https://forms.gle/ALuQpbixFDAoAsFLA');
    expect(e).toBeInTheDocument();
    expect(url).toBeInTheDocument();
})