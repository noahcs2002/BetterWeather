import React, { createContext, useContext } from "react";

/**
 * This class is a token class for unit testing. It sets up a test environment for tests to 
 * use as their context, specifically for routing.
 */

export const testContext = createContext();

export const TestContextProvider = ({ children }) => {
    const contextValue = {
        basename: '/test'
    }

    return <testContext.Provider value={contextValue}>{children}</testContext.Provider>;
};

export const UseTestContext = () => {
    return useContext(testContext);
}