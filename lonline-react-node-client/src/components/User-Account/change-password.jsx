import styled from "styled-components";
import { mobile } from "../responsive";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Marginer } from "../marginer";
import Axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import validate from './validateInfo'



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
`;





const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const MutedLink = styled.a`
  font-size: 13px;
  color: rgba(51, 51, 51, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

const BoldLink = styled.a`
  font-size: 13px;
  color: rgb(1, 1, 44);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
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
        errors.password2 = 'Confirm Password is required';
      } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
      }
      
    return errors;
  }

const ChangePassword = (props) => {
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordReg2, setPasswordReg2] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [params, setParams] = useState("");
    const [errors, setErrors] = useState({});
    const [validLink, setvalidLink] = useState(false);

    let history =  useHistory({});
    const propes = props;
    const param = useParams();
    console.log(param)
    const url = `http://localhost:5000/verify-password/${param.token}`

    useEffect(() =>  {
      const verifyUrl = async () => {
        await Axios.get(url)
        .then((res) => {
            console.log(res.data)
            if (res.data === "validLink") {
              setvalidLink(true)
            } 
         })
         .catch((err) => console.log(err));
      };
      verifyUrl();
    }, [param, url]);

  
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

      const paramss = propes.match.params.id

      console.log(paramss);
  
      setErrors(validateInfo(values))
      const returnedErrors = validateInfo(values)
      if (Object.keys(returnedErrors).length === 0){
        Axios.post('http://localhost:5000/reset',{
         
            password: passwordReg,
            password2: passwordReg2,
            token: paramss
        }).then((response) => {
    
          if(response.data === "notreset" ){
            setSignupStatus("We are unable to set your password. please try again later");
          }
          if(response.data === "reset" ){
              setSignupStatus("password sucessfully changed. please sign-in with new password.");
          }  
        })
      }
  }
    
  return (
    <Container>
      {validLink ? (   
            <Wrapper>
              <Title>Type New Password</Title>
              <Form>
                  <SmallText>{signupStatus}</SmallText>
                  <Input type="password" placeholder="Password"  onChange = {(e)=>{setPasswordReg(e.target.value); }} required = "required" />
                  {errors.password && <SmallText>{errors.password}</SmallText>}
                  <Input type="password" placeholder="Confirm Password" onChange = {(e)=>{setPasswordReg2(e.target.value);}} required = "required" />
                  {errors.password2 && <SmallText>{errors.password2}</SmallText>}
                  <Marginer direction="vertical" margin="0.6em" />
                  <BoldLink href="/login" >
                      <b>Sign-in</b>
                  </BoldLink>
                  <Marginer direction="vertical" margin="0.6em" />
                  <Button type="submit" onClick = {changepassword} >Submit</Button>
              </Form>
            </Wrapper>       
      ) : (
        <h1 >404 Not Found <br/> <h6>password reset Link is invalid or has expired</h6></h1>
        
      )}
    </Container>
  );
};

export default ChangePassword;