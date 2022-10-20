import React, { useContext, useState } from "react";
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
import { AccountContext } from "./accountContext";
import Axios from 'axios';
import {useHistory} from "react-router-dom";
import validate from './validateInfo'

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [emailReg, setemailReg] = useState("");
  const [nameReg, setnameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordReg2, setPasswordReg2] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [errors, setErrors] = useState({});
  let history =  useHistory({});

  const register = (e) => {
    e.preventDefault();

    const values = {
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      password2: passwordReg2
    };

    setErrors(validate(values))
    const returnedErrors = validate(values)
    if (Object.keys(returnedErrors).length === 0){
      Axios.post('http://localhost:5000/regos',{
          name: nameReg,
          email: emailReg,
          password: passwordReg,
          pass2: passwordReg2
      }).then((response) => {
  
        if(response.data === "registered" ){
          setSignupStatus("email already register. please sign-in or reset password");
        }
        if(response.data === "welcome" ){
          history.push('/dashboard');
        }  
      })
    }
}

  return (
    <BoxContainer>
      <FormContainer >
        <SmallText>{signupStatus}</SmallText>
        <Input type="text" placeholder="Full Name"  onChange = {(e)=>{setnameReg(e.target.value);}} required aria-required />
        {errors.name && <SmallText>{errors.name}</SmallText>}
        <Input type="email" placeholder="Email" onChange = {(e)=>{setemailReg(e.target.value);}} required = "required"/>
        {errors.email && <SmallText>{errors.email}</SmallText>}
        <Input type="password" placeholder="Password"  onChange = {(e)=>{setPasswordReg(e.target.value); }} required = "required" />
        {errors.password && <SmallText>{errors.password}</SmallText>}
        <Input type="password" placeholder="Confirm Password" onChange = {(e)=>{setPasswordReg2(e.target.value);}} required = "required" />
        {errors.password2 && <SmallText>{errors.password2}</SmallText>}
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick = {register} >Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign-in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}