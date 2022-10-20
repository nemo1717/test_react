import styled from "styled-components";
import {mobile} from "../responsive";
import { Marginer } from "../marginer";
import React, { useContext, useState } from "react";
import Axios from 'axios';
import {useHistory} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  margin: 10px 0;
  padding: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
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

const ForgetPassword = () => {

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
    <Container>
      <Wrapper>
        <Title>Change Password</Title>
        <Marginer direction="vertical" margin={10} />
        <Form>
          <SmallText>{loginStatus}</SmallText>
          <Input type="email" placeholder="Email" onChange = {(e)=>{setUsername(e.target.value) }} />
          {errors.email && <SmallText>{errors.email}</SmallText>}

          <Marginer direction="vertical" margin={10} />
          <Button type="submit" onClick = {forgetpassword} >SUBMIT</Button>
          <Marginer direction="vertical" margin={8} />
          <MutedLink>
            Don't have an account?
            <BoldLink href="/register" >
                Sign-up
            </BoldLink>
          </MutedLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;