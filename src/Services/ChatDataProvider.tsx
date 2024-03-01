import axios from "axios";
import { MessageModel } from "../Entities/MessageModel";
import ApiUrl from '../components/Utility/ApiUrl';
import { ApiUrlModel } from "../Entities/ApiUrlModel";
import { User } from "../Entities/User";

export const config = {
   headers: {
     'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
   }
}
export const  SendMessage=(message:MessageModel) =>{
    return axios.post(ApiUrl("apiSendMessage"), message,config);
 }

export const  GetMessageData=(TopicID:string) =>{
    const param =new ApiUrlModel("");
    param.id=TopicID;
    return axios.get(ApiUrl("apiGetMessage",param),config);
 }

 export const  DeleteMessage=(MessageID:string) =>{
    const param =new ApiUrlModel("");
    param.id=MessageID;
    return axios.delete(ApiUrl("apiDeleteMessage",param),config);
 }

 export const SearchUserByNameOrEmail=(UserName:string)=>{
   const param =new ApiUrlModel("");
   param.username=UserName;
   return axios.get(ApiUrl("apiSearchUserByNameOrEmail",param),config);
 }
 export const CheckUserIsOnline=(UserId:string)=>{
  const param =new ApiUrlModel("");
  param.id=UserId;
  return axios.get(ApiUrl("apiCheckUserIsOnline",param),config).then((response:any) => response.data.data)
}
 
 export const AddNewUserToChatList=(user:User)=>{
  return axios.post(ApiUrl("apiAddNewUserToChatList"),user,config).then((response:any) => response.data.data);         
 }

 export const GetAllSubscribedTopics=(UserId:string)=>{
   const param =new ApiUrlModel("");
   param.id=UserId;
   return axios.get(ApiUrl("apiGetTopicListByUserId",param),config).then((response:any) => response.data.data)
 }