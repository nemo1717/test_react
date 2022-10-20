import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../Homepage/navbar";
import Announcement from "../Homepage/announcement";
import Newsletter from "../Homepage/newsletter";
import Footer from "../Homepage/footer";
import axios from 'axios'
import React, { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import {getUserID} from "../Util/Common";
import {useHistory} from "react-router-dom";
 

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Naira = styled.h1`

  content: "\20A6" ;
`

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;

`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const SelectedProduct = (props) => {
  const [ data, setData ] = useState([]);
  const userID = getUserID();
  //const [params, setParams] = useState("");
  const propes = props;
  let history =  useHistory();
  const {state : {cart},} = CartState();

  const refresh = () => {
    window.location.reload()
  }

  const token = propes.match.params.id

  useEffect(() => {
    axios.post("http://localhost:5000/selected-product", {
        prod_id : token,
      })
      .then((res) => {
        setData(res.data);

       })
       .catch((err) => console.log(err));
      },[]);

  

  //console.log(data[0]);
  const addCart = () => {
    console.log(userID)
    if(!userID){
      //history.push('/login');
      history.push({
        pathname: '/login',
        state: "Please login to continue"
      })
    }
    else{
      axios.post("http://localhost:5000/cart", {
        prod_id : token,
        userID : userID
      })
      .then((res) => {
         console.log(res.data);
         history.push('/cart');
  
       })
       .catch((err) => console.log(err));
      }
    }

  return (

    <Container>
      
   {data.map((item) => (
     <React.Fragment key={item.prod_id}>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>{item.prod_name}</Title>
          <Desc>
            {item.product_state}
          </Desc>
          <Price>
          {item.unitprice.toLocaleString()}
          </Price>
          {/*
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer> */}
          <br/>
          <br/>
          <AddContainer>
            <Button onClick = {addCart} >ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      </React.Fragment>
      ))}
    </Container>
  
  );
};

export default SelectedProduct;