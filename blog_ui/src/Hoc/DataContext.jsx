import React, { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export const DataProvide = ({ children }) => {
    const [currentData, setCurrentData] = useState({});
    const setValues = (values) => {
        setCurrentData((prevData) => ({
            ...prevData,
            ...values,
        }));
    };
    return (
        <DataContext.Provider value={{ currentData, setValues }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
