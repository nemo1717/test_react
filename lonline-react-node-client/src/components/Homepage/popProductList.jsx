import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import styled from "styled-components";
  import { Link} from "react-router-dom";
  import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
})
  
  const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

  const descInfo = styled.div`

    margin:auto;
    justify-content: center;
    align-items: center;
  `

  const descriptions = styled.h1`
      color: #fff;
      font-weight: bolder;
      font-size: 20px;
      margin: auto;
      margin-top: 15px;
  `;

    const StyledLink  = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color:black ;
    }
    `;
  
  const PopularProductList = ({ item }) => {
    var isVerified = true;
    var rentFrequency = 'monthly';
    var title = item.title;
    var price = item.price 
    return (
      <StyledLink to={`/selecto/${item.prop_id}`} >
        <Container>
          <Circle />
          <Image src="/static/media/batcart.cc7fc319.png" />
          <Info >
            <Icon>
              <ShoppingCartOutlined />
            </Icon>
            <Icon>
              <SearchOutlined />
            </Icon>
            <Icon>
              <FavoriteBorderOutlined />
            </Icon>
          </Info>
        </Container>

        {item.prop_cat == 1 ? 
          <Box w='full'>
            <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
              {item.bedroom} <FaBed /> | {item.bathroom} <FaBath /> | {millify(item.size)} sqft <BsGridFill />
            </Flex >
            <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
              <Text textStyle='h1' fontWeight='bold' >&#8358; {price.toLocaleString()}{item.rent_frequency && `/${item.rent_frequency}`}</Text>    
            </Flex>
            <Flex>
              <Text  fontSize='lg' >{title.length > 30 ? title.substring(0, 30) + '...' : title}</Text>
            </Flex>
          </Box>
        : null} 

        {item.prop_cat == 2 ? 
          <Box w='full'>
            <Flex alignItems='center' p='1'  w='250px' color='blue.400'>
              {millify(item.size)} sqft &nbsp; <BsGridFill />
            </Flex >
            <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
              <Text textStyle='h1' fontWeight='bold' >&#8358; {price.toLocaleString()}{item.rent_frequency && `/${item.rent_frequency}`}</Text>    
            </Flex>
            <Flex>
              <Text  fontSize='lg' >{title.length > 30 ? title.substring(0, 30) + '...' : title}</Text>
            </Flex>
          </Box>
        : null} 
        
      </StyledLink>
      
    );
  };
  
  export default PopularProductList;