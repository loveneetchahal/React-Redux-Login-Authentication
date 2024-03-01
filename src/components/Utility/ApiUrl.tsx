import React from "react";
import { ApiUrlModel } from "../../Entities/ApiUrlModel";

const apiAuthenticateUser="apiAuthenticateUser";
const getuserslist="getuserslist";
const registeruser="registeruser";
const apiSendMessage="apiSendMessage";
const apiGetMessage="apiGetMessage";
const apiDeleteMessage="apiDeleteMessage";
const apiSearchUserByNameOrEmail="apiSearchUserByNameOrEmail";
const apiAddNewUserToChatList="apiAddNewUserToChatList";
const apiCheckUserIsOnline="apiCheckUserIsOnline";
const apiGetTopicListByUserId="apiGetTopicListByUserId";

const apiPath = process.env.REACT_APP_API_URL;

const SignalapiPath = "https://localhost:7274";//"https://chatbookdev.azurewebsites.net";// process.env.REACT_SIGNAL_HUB_AND_API;
const STS_apiPath= "https://lmssts.azurewebsites.net";

const ApiUrl = (url:string,param=new ApiUrlModel("")) =>{    
    switch(url)
    {
        case apiAuthenticateUser:return `${STS_apiPath}/api/${param.username}/Login`;
        case getuserslist:return `${STS_apiPath}/v1.0/user/GetUserList`;
        case registeruser:return `${STS_apiPath}/v1.0/user/RegisterUser`;
        case apiSendMessage:return `${SignalapiPath}/api/chat/SaveMessage`;
        case apiGetMessage:return `${SignalapiPath}/api/chat/GetMessagesByTopic?id=${param.id}`;
        case apiDeleteMessage:return `${SignalapiPath}/api/chat/${param.id}`;   
        case apiSearchUserByNameOrEmail:return `${STS_apiPath}/api/Auth/SearchUser?keyWord=${param.username}`; 
        case apiAddNewUserToChatList:return `${SignalapiPath}/api/chat/SaveUsers`; 
        case apiCheckUserIsOnline:return `${SignalapiPath}/api/chat/GetUserIsOnline?id=${param.id}`;
        case apiGetTopicListByUserId:return `${SignalapiPath}/api/chat/GetTopicListByUserId?id=${param.id}`;
        default:return '';
    }
}
export default ApiUrl;

