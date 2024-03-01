import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { MessageModel } from '../Entities/MessageModel';

interface MessageData {
    clientuniqueid: string;
    type: string;
    message: string;
    date: Date;
  }
// Define the initial state using that type
const initialState :MessageData[]=[]

export const SaveChatMessages = createSlice({
  name: 'Messages',
  initialState,
  reducers: { 
      StoreMessages: (state=initialState, action: PayloadAction<MessageData>) => {  
          let prevdata=[];
          let Msg: MessageData = {
            clientuniqueid: action.payload.clientuniqueid,
            type: action.payload.type,
            message: action.payload.message,
            date: action.payload.date
            }     
            state.push(Msg);
    },
  },
})

export const { StoreMessages } = SaveChatMessages.actions
export default SaveChatMessages.reducer