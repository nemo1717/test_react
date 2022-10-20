import React, {  useState } from "react";
import {
  Input,
  SubmitButton,
} from "./accountCommon";
import { Marginer } from "../marginer";
import styled from 'styled-components';
import Axios from 'axios';
import {useHistory} from "react-router-dom";
import { motion } from 'framer-motion/dist/es/index';




const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
  width: 300px;
  min-height: 580px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopCountainer =  styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    #665a5a 20%,
    #fad992 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

const SmallTexts = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const BoxContainers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const SmallText = styled.h5`
  color: #270101;
  font-weight: 500;
  font-size: 12px;
  z-index: 10;
  margin: 0;
  margin-top: 5px;
`;

function validateInfo(values) {
    let errors = {};

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }

    if (!values.password2) {
        errors.password2 = 'Password is required';
      } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
      }
      
    return errors;
  }


export function ChangePassword(props) {
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordReg2, setPasswordReg2] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [params, setParams] = useState("");
  const [errors, setErrors] = useState({});
  let history =  useHistory({});
  const propes = props

  

  const changepassword = (e) => {
    e.preventDefault();
    setParams(propes.match.params.id);
   

    //const token = e.props.match.params.id;
    //const tokens = this.props.match.params.id;
    //console.log(this.e)

    const values = {
      password: passwordReg,
      password2: passwordReg2
    };

    setErrors(validateInfo(values))
    const returnedErrors = validateInfo(values)
    if (Object.keys(returnedErrors).length === 0){
      Axios.post('http://localhost:5000/reset',{
       
          password: passwordReg,
          password2: passwordReg2,
          token: params
      }).then((response) => {
  
        if(response.data === "notreset" ){
          setSignupStatus("We are unable to set your password. please try again later");
        }
        if(response.data === "reset" ){
            setSignupStatus("password sucessfully changed");
    
        }  
      })
    }
}

  return (
    <AppContainer>
        <BoxContainer>
            <TopCountainer>
            <BackDrop />
                <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <SmallTexts>Please submit a new password</SmallTexts>
                </HeaderContainer>
            </TopCountainer>
            <InnerContainer>
                <BoxContainers>
                    <FormContainer >
                        <SmallText>{signupStatus}</SmallText>
                        <Input type="password" placeholder="Password"  onChange = {(e)=>{setPasswordReg(e.target.value); }} required = "required" />
                        {errors.password && <SmallText>{errors.password}</SmallText>}
                        <Input type="password" placeholder="Confirm Password" onChange = {(e)=>{setPasswordReg2(e.target.value);}} required = "required" />
                        {errors.password2 && <SmallText>{errors.password2}</SmallText>}
                    </FormContainer>
                    <Marginer direction="vertical" margin={10} />
                    <SubmitButton type="submit" onClick = {changepassword} >Submit</SubmitButton>
                    <Marginer direction="vertical" margin="1em" />
                </BoxContainers>
            </InnerContainer>
        </BoxContainer>
  </AppContainer>
  );
}