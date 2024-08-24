import { createSlice } from "@reduxjs/toolkit";
export const timelinestate=createSlice({
    name:'timelinestate',
    initialState:[],
    reducers:{
        addTimeline:(state,action)=>{
            state.push(action.payload)
        }   
    }

})

export const {addTimeline}=timelinestate.actions
export default timelinestate.reducer