import styled from "styled-components";
import Product from "./productItem";
import { useState, useEffect } from "react";
import Axios from 'axios'
import {getUserID} from "../Util/Common";
import {useHistory} from "react-router-dom";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const Products = () => {
  const [ data, setData ] = useState([]);
  const userID = getUserID();
  let history =  useHistory();


  useEffect(() => {
    Axios
      .get("http://localhost:5000/product-list")
      .then((res) => {
         setData(res.data)
       })
       .catch((err) => console.log(err));
      },[]); 
  
      const  addCart = (prodID) => {
        if(!userID){
          history.push('/accountindex');
        }
        else{
          Axios.post("http://localhost:5000/cart", {
            prod_id : prodID,
            userID : userID
          })
          .then((res) => {
             console.log(res.data);
      
           })
           .catch((err) => console.log(err));
          }
        }

  return (
    <Container>
      {data.map((item) => (
        <Product   item={item} key={item.prod_id} addCart = {addCart} />
      ))}
    </Container>
  );
};

export default Products;