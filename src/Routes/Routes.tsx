//import React, { useState, useEffect } from "react";
//import { styled } from "@material-ui/core";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
//import Cookies from "universal-cookie";
import SigninPage from "../pages/Auth/SigninPage";
import RegisterUser from "../pages/Register/RegisterUser";
import UsersList from "../pages/Register/UsersList";
import ValidateForm from "../pages/Register/ValidateForm";
import Validate from "../pages/Register/Validate";
import ItemList from "../pages/Register/ItemList";
import Left_nav from "../components/layout/Left-nav/Left_nav";
import Header from "../components/layout/header/Header";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ProtectedRoute from "../pages/ProtectedRoute";
import Logout from "../pages/Auth/Logout";
import DataTableCrud from "../pages/PrimeNgCrud/DataTableCrud";
import ReactPrimeForm from "../pages/ReactPrimePages/ReactPrimeForm";
import ChatBox from "../components/ChatComponents/ChatBox";
import ChatBot from "../components/ChatComponents/ChatBot";
import ChatClient from "../components/ChatComponents/ChatClient";
import SignalRChatBot from "../components/ChatComponents/SignalRChatBot";
import TestButton from "../pages/Register/TestButton";
const Routes = () => {
  const cookies = new Cookies();
  const Token=cookies.get('SecureToken');
  let token=false;
  if(Token!==undefined){
    if(Token.accesstoken!==undefined){
      token=true;
    }
  }
  const location = useLocation();
  useEffect(() => {}, [location.key]);
  
  return (
    <Switch>
      <div className="App">        
        <Route
          path="/" 
          render={() => (Token === undefined ? <SigninPage /> : <Redirect to="/SignalRChatbot" />)}
        />
        <Route exact={true} path="/change-password" component={Logout} />
        <Route exact={true} path="/register-user" component={RegisterUser} />
        <ProtectedRoute exact={true} path="/logout" isAuth={token} Component={Logout} />
        <ProtectedRoute exact={true} path="/userList" isAuth={token} Component={UsersList} /> 
        <ProtectedRoute exact={true} path="/validate-form" isAuth={token} Component={ValidateForm} />  
        <ProtectedRoute exact={true} path="/validate" isAuth={token} Component={Validate} />         
        <ProtectedRoute exact={true} path="/Dashboard" isAuth={token} Component={Left_nav} /> 
        <ProtectedRoute exact={true} path="/header" isAuth={token} Component={Header} />
        <ProtectedRoute exact={true} path="/itemlist"  isAuth={token} Component={ItemList} />  
        <ProtectedRoute exact={true} path="/datatable" isAuth={token} Component={DataTableCrud} /> 
        <ProtectedRoute exact={true} path="/primeform" isAuth={token} Component={ReactPrimeForm} /> 
        <ProtectedRoute exact={true} path="/chatbotUi" isAuth={token} Component={ChatClient} />
        <ProtectedRoute exact={true} path="/chatbot" isAuth={token} Component={ChatBot} />  
        <ProtectedRoute exact={true} path="/SignalRChatbot" isAuth={token} Component={SignalRChatBot} />       
      </div>
    </Switch>
  );
};

export default Routes;

