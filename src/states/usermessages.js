import { createSlice } from "@reduxjs/toolkit";

export const usermessages=createSlice({
    name:'usermessages',
    initialState:[],
    reducers:{
        addMessage:(state,action)=>{
            const {boxId,message}=action.payload
            const existingItem=state.find(item=>item.boxId===boxId)
            if(!existingItem)
            {
              state.push(action.payload)
            }
            else{
                existingItem.boxId = boxId;
                existingItem.message=message
            }
        },
       
    }
})

export const {addMessage}=usermessages.actions
export default usermessages.reducer