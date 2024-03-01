import React, { Props } from 'react';
import { Route,Redirect } from 'react-router-dom';

interface IProps {
    path: string;
    Component: React.ComponentType<{}>
    isAuth: any;    
    exact:any
}
const ProtectedRoute= ({isAuth,Component,...rest}: IProps) => {  
    return (        
      <Route 
      {...rest} 
        render={(props)=>{
        if(isAuth){                     
            return <Component/>;
        }else{
            return(
                <Redirect to='/' />
            );
        }
    }}
    />
    );
}
  export default ProtectedRoute;

