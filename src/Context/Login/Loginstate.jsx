import { createContext, useState } from "react";

const Logincontext=createContext();



const Loginstate=({children})=>{
    const [login, setLoginIn] = useState(false);
    return(
        <Logincontext.Provider value={{login,setLoginIn}}>
            {children}
        </Logincontext.Provider>
    )
}
export {Logincontext};
export default Loginstate;