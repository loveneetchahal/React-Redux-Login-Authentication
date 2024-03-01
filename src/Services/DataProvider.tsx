import axios from "axios";
import ApiUrl from "../components/Utility/ApiUrl";
import {  getuserslist, registeruser } from "../components/Utility/index";
import { ApiUrlModel } from "../Entities/ApiUrlModel";
import { LoginModel } from "../Entities/LoginModel";

export const GetUsersList=()=>{
    return axios.get(getuserslist);
}
export const  AuthenticateUser=(login: LoginModel) =>{
    const param =new ApiUrlModel("");
    param.username="Auth"; 
   return axios.post(ApiUrl("apiAuthenticateUser",param), login);
}
export const  RegisteUsers=(drName:string,usercode:string,registrationNo:string,emailId:string) =>{
    const register =  {  drName: drName,usercode: usercode,registrationNo:registrationNo, 
        emailId:emailId,qualification:"",specialization:"",mobileno:"",address:"",cityTown:"",
        state:"",pinCode:"",geoLocation:{longitude:"",latitude:""},registerIp:""
    };
    return axios.post(registeruser,register);
}