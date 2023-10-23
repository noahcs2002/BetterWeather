import React, { createContext, useContext } from "react";

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