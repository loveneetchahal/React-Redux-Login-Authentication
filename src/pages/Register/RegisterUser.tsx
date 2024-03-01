import React, { useState, ChangeEvent } from "react";
import { styled, Grid, Button, makeStyles, Modal } from "@material-ui/core";
import { Label, Pair } from "../../components/uiComponents/CommonStyles";
import { TextField } from "../../components/uiComponents";
import { AuthenticateUser } from "../../Services/DataProvider";
import { Link, NavLink } from 'react-router-dom';
import Left_nav from "../../components/layout/Left-nav/Left_nav";

const RegisterUser = () =>{
    const classes = useStyles();
    const [loginMessage, setLoginMessage] = useState<string>("");
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [userRegistration, setUserRegisteration]=useState({
        username: "",
        email: "",
        address: "",
        phoneno: "",
        password: ""
    });
    const handleInputs = (e: { target: { name: any;value:any; }; }) =>{
        const name= e.target.name;   
        const value= e.target.value;  //console.log(name);
        setUserRegisteration({...userRegistration,[name] : value})
    }
    const onSubmits=(e: { preventDefault: () => void; })=>{    
        const name=e.preventDefault();
        const LoginModel =  {  email: userRegistration.email,password: userRegistration.password,provider: "Manually" };
        let res = AuthenticateUser(LoginModel);
           
    }
    
     return(
      <div className="holder">
      <Left_nav/>
      <div className="page-container">
          <SignInWrap>
          <SiginForm>
            <SigninContainer>          
              <SignInForm>
              <div className={classes.formInnerDiv}>
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <Heading>Sign In</Heading>
                  </div>
                  <form onSubmit={onSubmits}>
                  <Pair>
                    <Label className={classes.label}>Fullname</Label>
                    <TextField type="text" name="username" id="username" onChange={handleInputs} value={userRegistration.username}
                    size="small" varian="filled" themeType="blue"/>
                  </Pair>
                  <Pair>
                    <Label className={classes.label}>Email</Label>
                    <TextField type="text" name="email" id="email"  onChange={handleInputs}
                    value={userRegistration.email}
                    size="small" varian="filled" themeType="blue"/>
                  </Pair>
                  <Pair>
                    <Label className={classes.label}>Address</Label>
                    <TextField type="text" name="address" id="address"  onChange={handleInputs}
                    value={userRegistration.address}
                    size="small" varian="filled" themeType="blue"/>
                  </Pair>
                  <Pair>
                    <Label className={classes.label}>PhoneNo</Label>
                    <TextField type="text" name="phoneno" id="phoneno" onChange={handleInputs}
                    value={userRegistration.phoneno}
                    size="small" varian="filled" themeType="blue"/>
                  </Pair>  
                  <Pair className={classes.passwordMargin}>
                    <Grid container>
                      <Grid item xs>
                        <Label className={classes.label}>Password</Label>
                      </Grid>                    
                    </Grid>
                    <TextField type="password" name="password" id="password" onChange={handleInputs}
                    value={userRegistration.password}
                    size="small" varian="filled" themeType="blue"
                    />
                  </Pair>
                  <Button fullWidth variant="contained"  color="primary" type="submit" 
                  className={classes.submit}>Sign in</Button>                
                  {showMessage ? (
                    <Message>
                      <MessageContent>{loginMessage}</MessageContent>
                    </Message>
                  ) : null} 
                  <Link className="btn-primary" to="userList" >UsersList</Link><br/><br/><br></br>
                  <Link className="btn-primary" to="validate-form" >Form validate</Link><br/>
                  <NavLink to="/itemlist"  className="Nav_link" activeClassName="activeRoute"
      activeStyle={{ color: 'teal' }}>another validate</NavLink>
                  </form>
                  </div>
              </SignInForm>
          </SigninContainer>
        </SiginForm>
        </SignInWrap>
      </div>
    </div>  
     );
};
const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%",
      marginTop: "35px",
    },
    submit: {
      margin: "12px 0px 16px",
      background: "#5683fd",
      padding: "10px",
    },
    Subheading: {
      color: "#5683fd !important",
      fontWeight: 600,
    },
    link: {
      textDecoration: "none !important",
      "& hover": {
        textDecoration: "none !important",
      },
    },
    label: {
      fontSize: "11px !important",
    },
    modalHandler: {
      cursor: "pointer",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
    button: {
      background: "#f47b22",
      color: "white",
    },
    formInnerDiv: {
      width: "60%",
    },
    passwordMargin: {
      marginTop: "15px",
    },
    requestTrial: {
      textAlign: "center",
    },
  }));
export default RegisterUser;
const Heading = styled("h2")({    
  });
const SignInWrap = styled("div")({
    width: "100%"
  });
  const Message = styled("div")({
    paddingBottom: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const SiginForm = styled("div")({
    width: "100%",
    height: "30vh",
  });
  const SigninRightBanner = styled("div")({
    width: "55%",
    float: "right",
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  });
  
  const SigninContainer = styled("div")({
    width: "80%",
    marginLeft:"100px",
    marginRight:"100px",
    marginBottom:"100px",
    marginTop:"10px",
    paddingTop: "10px",
  });
  
  const MessageContent = styled("span")({
    color: "#ec5858",
    fontWeight: 600,
  });
  
  const SignInForm = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    marginTop: "1%",
  });
  const SignInHeading = styled("p")({
    fontSize: "35px",
    marginBottom: "0px",
    color: "#707685",
  });
  const Subheading = styled("p")({
    color: "#B0BAC9",
    fontSize: "14px",
    marginBottom: "5px",
    letterSpacing: "1.13px",
  });