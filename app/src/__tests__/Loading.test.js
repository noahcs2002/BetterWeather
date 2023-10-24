import React from "react";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import Loading from "../Loading/Loading";

test('Render', () => {
    render(<Loading/>)
    const e = screen.getByText(/This might take a second./i)
    expect(e).toBeInTheDocument();
})