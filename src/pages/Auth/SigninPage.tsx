import React, { useState, ChangeEvent } from "react";
import { apiAuthenticateUser } from "../../components/Utility/index";
import Cookies from "universal-cookie";
//import {useSelector,useDispatch} from "react-redux"
import { LoginModel } from "../../Entities/LoginModel";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { styled, Grid, Link, Button, makeStyles, Modal } from "@material-ui/core";
import Image from "../../components/Assets/SignInPage/SignInBanner.jpg";
//import logo from "../../components/Assets/logo.svg";
//import { Label } from "../../components/uiComponents/CommonStyles";
import { TextField } from "../../components/uiComponents";
import { Label, Pair } from "../../components/uiComponents/CommonStyles";
//import { Console } from "console";
import {AuthenticateUser} from "../../Services/DataProvider";
import Routes from "../../Routes/Routes";
import { Form } from 'react-final-form';
//import { Provider } from "react-redux";



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SigninPage = () => {
  const classes = useStyles();
  const cookies = new Cookies();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState<string>("shaileshkumar@yopmail.com");
  const [password, setPassword] = useState<string>("1234566");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  
  const signin = () => {
    
     const LoginModel =  {  email: email,password: password,provider: "Manually" };
    (async () => {
      try {
        let res:any = await AuthenticateUser(LoginModel);
        if (res.data.statusCode === 200) {         
          const decoded: any = jwtDecode(res.data.data.accessToken);
          localStorage.setItem('AccessToken', res.data.data.accessToken);
          localStorage.setItem('UserId', decoded.UserId);
          let date = new Date();
          date.setTime(date.getTime() + (3 * 1 * 60 * 60 * 1000));
          cookies.set('SecureToken', {UserID: decoded.UserId,
              accesstoken:res.data.data.accessToken,role:decoded.role}, {
            path: '/',expires: date,sameSite:'strict'
        });
        window.location.href = "/datatable";
        }else {
          setShowMessage(true);
          setLoginMessage("Wrong Email or Password");
        }
      } catch (err) {
        setShowMessage(true);
        setLoginMessage("Something went wrong");
        console.log(err);
      }
    })();
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
       
      </p>
      <Button className={classes.button} variant="contained" onClick={handleModalClose}>
        OK
      </Button>
    </div>
  );

  return (
    <SignInWrap>
      <SiginForm>
        <SigninContainer>          
          <SignInForm>
            <div className={classes.formInnerDiv}>
              <SignInHeading>Sign in to Evolvous</SignInHeading>
              <Subheading>Please enter credentials to proceed.</Subheading>
              <form className={classes.form} noValidate>
                <Pair>
                  <Label className={classes.label}>Username</Label>
                  <TextField
                    size="small"
                    varian="filled"
                    themeType="blue"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setemail(e.target.value);
                    }}
                  />
                </Pair>
                <Pair className={classes.passwordMargin}>
                  <Grid container>
                    <Grid item xs>
                      <Label className={classes.label}>Password</Label>
                    </Grid>
                    <Grid item>
                      {/* <Link className={classes.link} href="/change-password"> */}
                      <Label
                        className={`${classes.label} ${classes.modalHandler}`}
                        onClick={handleModalOpen}
                      >
                        Forgot Password?
                      </Label>
                      {/* </Link> */}
                    </Grid>
                  </Grid>
                  <TextField
                    type="password"
                    size="small"
                    varian="filled"
                    themeType="blue"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Pair>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signin}
                >
                  Sign in
                </Button>
                {showMessage ? (
                  <Message>
                    <MessageContent>{loginMessage}</MessageContent>
                  </Message>
                ) : null}                
              </form>
            </div>
          </SignInForm>
        </SigninContainer>
      </SiginForm>

      <SigninRightBanner></SigninRightBanner>

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </SignInWrap>
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
    width: "100%",
  },
  passwordMargin: {
    marginTop: "15px",
  },
  requestTrial: {
    textAlign: "center",
  },
}));

export default SigninPage;

const SignInWrap = styled("div")({
  width: "100%",
  margin: "0px",
});
const Message = styled("div")({
  paddingBottom: "7px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const SiginForm = styled("div")({
  width: "45%",
  float: "left",
  height: "100vh",
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
  width: "60%",
  margin: "0px auto",
  paddingTop: "20px",
});

const MessageContent = styled("span")({
  color: "#ec5858",
  fontWeight: 600,
});

const SignInForm = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  height: "80%",
  marginTop: "25%",
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


