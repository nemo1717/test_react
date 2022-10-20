import styled from "styled-components";
import PopularProductList from "./popProductList";
import { useState, useEffect } from "react";
import Axios from 'axios'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const PopularProduct = () => {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    Axios
      .get("http://localhost:5000/popular-products")
      .then((res) => {
         console.log(res.data)
         setData(res.data)
       })
       .catch((err) => console.log(err));
      },[]); 

  return (
    <Container>
      {data.map((item) => (
        <PopularProductList item={item} key={item.prod_id} />
      ))}
    </Container>
  );
};

export default PopularProduct;