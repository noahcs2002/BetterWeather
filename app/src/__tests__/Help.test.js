import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import { TestContextProvider } from "../_Other/TestContextProvider";
import Help from "../Help/Help";

test('Render test', () => {
    render(
        <BrowserRouter>
            <TestContextProvider>
                <Help/>
            </TestContextProvider>
        </BrowserRouter>
    )

    const search = screen.getByText(/What can I search for/i);
    const searchedFor = screen.getByText(/I searched for ____ and got something/i);
    const numbers = screen.getByText(/Why are the numbers/i)
    const where = screen.getByText(/Where are you getting this information?/i);
    const why = screen.getByText(/Why does the site not have data for ____ ?/i);
    const how = screen.getByText(/How can I get in touch?/i);

    expect(search).toBeInTheDocument();
    expect(searchedFor).toBeInTheDocument();
    expect(numbers).toBeInTheDocument();
    expect(where).toBeInTheDocument();
    expect(why).toBeInTheDocument();
    expect(how).toBeInTheDocument();
})