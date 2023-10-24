import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import CriticalAlerts from "../CriticalAlerts/CriticalAlerts";
import '@testing-library/jest-dom/extend-expect';
import Maintenance from "../Maintenance/Maintenance";

test('Render', () => {
    render(<Maintenance/>)
    const e = screen.getByText(/Site Under Maintenance/i)
    expect(e).toBeInTheDocument();
})