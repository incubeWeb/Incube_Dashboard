import React, { createContext, useContext, useState } from 'react';

const SheetContext = createContext();

export const SheetProvider = ({ children }) => {
    const [sheetJson1, setSheetJson] = useState([]);
    const [percentage1,setpercentage1]=useState('');
    return (
        <SheetContext.Provider value={{ sheetJson1, setSheetJson ,percentage1,setpercentage1}}>
            {children}
        </SheetContext.Provider>
    );
};

export const useSheet = () => useContext(SheetContext);
