import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import axios from 'axios'
import {useHistory} from "react-router-dom";
import { getUserID, removeUserSession } from '../Util/Common';
import {Link} from 'react-router-dom';



const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
      font-size: 14px;
      cursor: pointer;
      ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}

`
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const MenuItem = styled.a`
  font-size: 13px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  text-decoration: none;
  color: #0000EE;
  :hover {
    text-decoration: underline;
  }
`;

const StyledLink  = styled(Link)`
    text-decoration: none;
    color: #0000EE;

`;

const StyledLinkLogo  = styled(Link)`
    text-decoration: none;
    color: black;

`;

const  Navbar = () => {
    const [cartlength, setcartLength] = useState('');
    const userID = getUserID();
    let history =  useHistory();

    const Logout = () => {
        removeUserSession();
        history.push('/home');
    }

    useEffect(() => {
        axios.post("http://localhost:5000/cartinfo", {
            userID : userID
          })
          .then((res) => {
              setcartLength(res.data.cartlength)
           })
           .catch((err) => console.log(err));
          },[]);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo><StyledLinkLogo to="/" >LAYAN.</StyledLinkLogo></Logo>
                </Center>
                {userID  ? (
                    <Right>
                        <MenuItem onClick={Logout} >Logout</MenuItem>
                            <MenuItem href = '/cart'>
                        </MenuItem>
                    </Right>
                    ) : (
                    <Right>
                        <MenuItem ><StyledLink to={'/register'}>REGISTER</StyledLink></MenuItem>
                        <MenuItem ><StyledLink to={'/login'}>SIGN-IN</StyledLink></MenuItem>
                        <MenuItem >
                        <Badge badgeContent='0' color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        </MenuItem>
                    </Right>
                )}

            </Wrapper>
        </Container>
    )
}

export default Navbar

 
