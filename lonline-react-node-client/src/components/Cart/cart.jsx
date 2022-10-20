import React, {Fragment, useEffect, useState} from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../Homepage/navbar";
import Announcement from "../Homepage/announcement";
import Footer from "../Homepage/footer";
import {getUserID} from "../Util/Common";
import axios from 'axios';
import {Link} from 'react-router-dom';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};

`;

const StyledLink  = styled(Link)`
    text-decoration: none;
    color: black;

`;


const TopButtonRemove = styled.button`
  padding: 10px;
  font-weight: 600;
  width: 6em;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemTexts = styled.span`
  font-size: 18px
`;

const SummaryItemPrice = styled.span``;

const SummaryItemPrices = styled.span`
  font-size: 18px
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Naira = styled.span`
    &:before {
    content: 	"\u20A6";
    
    
  }
 

`

const weights = styled.div`
  font-weight: 100;
`






const SmallTitle = styled.h3`
  font-weight: 600;
`;

const Cart = () => {

  const [data, setdata] = useState([]);
  const userID = getUserID();
  const [cartlength, setcartLength] = useState('');

  const refresh = () => {
    window.location.reload();
  };

  const cartAction  = (prod_id, action) => {
    axios.post("http://localhost:5000/cart-action/" + action, {
      userID : userID,
      prod_id : prod_id
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
      axios.post("http://localhost:5000/cartinfo", {
          userID : userID
        })
        .then((res) => {
            setdata(res.data.data);
            setcartLength(res.data.cartlength);
           
         })
         .catch((err) => console.log(err));
        },[]);

  const itemsPrice = data.reduce((a, c) => a + c.quantity * c.unitprice, 0);
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice +  shippingPrice;


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton ><StyledLink to="/products-list">CONTINUE SHOPPING</StyledLink></TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cartlength})</TopText>
           {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {data.map((item) => (
          <React.Fragment>
            <Product>
              <ProductDetail>
                <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.prod_name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.prod_id}
                  </ProductId>
                  <TopButtonRemove type="filled" onClick={() => {cartAction(item.prod_id, "delete"); refresh();}} >
                    Remove
                  </TopButtonRemove>
                  {/*
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                  */}
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={() =>  {cartAction(item.prod_id, "add"); refresh();}} />
                  <ProductAmount>{item.quantity}</ProductAmount>
                  {item.quantity >= 2 &&
                  <Remove onClick={() =>  {cartAction(item.prod_id, "remove"); refresh();}} />
                  } 
                </ProductAmountContainer>
                <ProductPrice> &#8358;{(item.unitprice * item.quantity).toLocaleString()}</ProductPrice>
              </PriceDetail>
            </Product>
          </React.Fragment>
          ))}
            <Hr />
          </Info>
          <Summary>
            {cartlength != 0 ? (
              <Fragment>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Items Price</SummaryItemText>
                  <SummaryItemPrice> &#8358;{itemsPrice.toLocaleString(undefined, {maximumFractionDigits:2})}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>&#8358;{shippingPrice.toLocaleString(undefined, {maximumFractionDigits:2})}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>&#8358;5.90 </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemTexts>Total</SummaryItemTexts>
                  <SummaryItemPrices>&#8358;{totalPrice.toLocaleString(undefined, {maximumFractionDigits:2})}</SummaryItemPrices>
                
                </SummaryItem>
                <Button>CHECKOUT NOW</Button>
              </Fragment>
              ) : (
                    <SmallTitle>Cart is Empty</SmallTitle>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;