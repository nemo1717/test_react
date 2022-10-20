import React, { useContext, useState } from "react";
import { AccountContext } from "./accountContext";
import Axios from 'axios'
//import { Redirect, Route } from "react-router";
import {useHistory} from "react-router-dom"
import { setUserSession } from '../Util/Common';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  SmallText,
} from "./accountCommon";
import { Marginer } from "../marginer";

export function LoginForm(props) {
  const { switchToSignup, switchToForgetPassword } = useContext(AccountContext);

  const [password, setPassword] = useState("");
  const [email, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [errors, setError] = useState({});
    //const [loading, setLoading] = useState(false);
  let history =  useHistory();

  function validateInfo(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    return errors;
  }

  const login = (e) => {

    e.preventDefault();

    const values = {
      email: email,
      password: password,
    };
    setError(validateInfo(values));
    const errorReturned = validateInfo(values)
   
    //setLoading(true);
    if (Object.keys(errorReturned).length === 0) {
      Axios.post('http://localhost:5000/login',{
          email: email,
          password: password,
  
      }).then((response) => {
          if(response.data === "unauthenticated" ){
              setLoginStatus("the email and password doesn't match our record. please try again or signup")
              //setLoading(false);
          }
          if(response.data.data === "authenticated" ){
              setUserSession(response.data.token, response.data.user, response.data.userID )
              history.push('/dashboard')
              console.log(response.data.user)
          }
      })
    }
}

  return (
    <BoxContainer>
      <FormContainer>
        <SmallText>{loginStatus}</SmallText>
        <Input type="email" placeholder="Email" onChange = {(e)=>{setUsername(e.target.value) }} />
        {errors.email && <SmallText>{errors.email}</SmallText>}
        <Input type="password" placeholder="Password" onChange = {(e)=>{setPassword(e.target.value) }} />
        {errors.password && <SmallText>{errors.password}</SmallText>}
      
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <BoldLink href="#" onClick={switchToForgetPassword}>
        Forget your password?
      </BoldLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick = {login} >Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign-up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}