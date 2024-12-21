import { createContext, useState } from "react";

const ShowAutomationWindowContext=createContext();

const ShowAutomationWindowState=({children})=>{
    const [Automationvalue,setAutomationvalue]=useState(false);
    return (
        <ShowAutomationWindowContext.Provider value={{Automationvalue,setAutomationvalue}}>
            {children}
        </ShowAutomationWindowContext.Provider>
    )
}

export {ShowAutomationWindowContext};
export default ShowAutomationWindowState;