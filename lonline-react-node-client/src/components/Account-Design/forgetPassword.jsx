import React, { useContext, useState } from "react";
import { AccountContext } from "./accountContext";
import Axios from 'axios'
//import { Redirect, Route } from "react-router";
import {useHistory} from "react-router-dom"
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



export function ForgetPassword(props) {
  const { switchToSignup } = useContext(AccountContext);

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
  
    return errors;
  }

  const forgetpassword = (e) => {

    e.preventDefault();

    const values = {
      email: email
 
    };
    setError(validateInfo(values));
    const errorReturned = validateInfo(values)
   
    //setLoading(true);
    if (Object.keys(errorReturned).length === 0) {
        Axios.post('http://localhost:5000/forget-password',{
            email: email
        }).then((response) => {
            console.log(response)
            if(response.data === "invalidPassword" ){
                setLoginStatus("the email is not in our record. please try again or signup")
            }
            if(response.data === "tokenSend" ){
                setLoginStatus("We have sent you a message to your email to reset your passoword. Please follow the instruction in your email to change password. Thanks. ")
                console.log("yasoooo");
                console.log(response.data )
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

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick = {forgetpassword} >Submit</SubmitButton>
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