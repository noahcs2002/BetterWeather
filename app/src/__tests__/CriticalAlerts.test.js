import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import CriticalAlerts from "../CriticalAlerts/CriticalAlerts";
import '@testing-library/jest-dom/extend-expect';

test('Render critical alerts', () => {
    const alert = [{
        properties : {
            headline: 'foo',
            description: 'bar'
        }
    }];
    const traceFunction = function(prop){};

    render(<CriticalAlerts alerts={alert} setStateFunction={traceFunction}/>);
    const e = screen.getByText('foo');
    expect(e).toBeInTheDocument();
});

test('Dismiss dismisses when clicked', () => {
     const alert = [{
        properties : {
            headline: 'foo',
            description: 'bar'
        }
    }];

    const mockSetStateFunction = jest.fn();
    const { getByText } = render(<CriticalAlerts alerts={alert} setStateFunction={mockSetStateFunction}/>);
    
    const dismissButton = getByText('Dismiss');
    fireEvent.click(dismissButton);

    expect(mockSetStateFunction).toHaveBeenCalledWith(false);
});