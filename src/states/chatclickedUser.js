import { createSlice } from "@reduxjs/toolkit";

export const chatclickedUser=createSlice({
    name:'chatclickedUser',
    initialState:[],
    reducers:{
        addUser:(state,action)=>{
            const {id,name,msg}=action.payload
            const existingItem=state.find(item=>item.id===id)
            if(!existingItem)
            {
              state.push(action.payload)
            }
            else{
              existingItem.name = name;
              existingItem.msg=msg
            }
        },
        deleteUser:(state,action)=>{
           return state.filter(item=>item.id!==action.payload)
        },
        
        updateMsg:(state,action)=>{
          const {id,msg}=action.payload
          const existingItem=state.find(item=>item.id==id)
          if(existingItem)
          {
            existingItem.msg=msg
          }
        }
        
        
    }
})
export const {addUser,deleteUser,updateMsg}=chatclickedUser.actions
export default chatclickedUser.reducer