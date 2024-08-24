import { configureStore } from "@reduxjs/toolkit";
import chatclickedUser from "../states/chatclickedUser";
import usermessages from "../states/usermessages";
import timelinestate from "../states/timelinestate";

export const store=configureStore({
    reducer:{
        chatclickedUser:chatclickedUser,
        usermessages:usermessages,
        timelinestate:timelinestate
    }
})