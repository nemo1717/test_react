import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { CartReducer } from "./Reducer";
import Axios from "axios"

const Cart = createContext();
const Context = ({children}) => {

    const [products, setProducts] = useState({})

    const GetProducts = () => {
     Axios
        .get("http://localhost:5000/product-list")
        .then((res) => {
            setProducts(res.data)
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=> {
        GetProducts()
      },[]);
      
    const [state, dispatch] = useReducer(CartReducer, {
        product: products,
        cart: [{'Forgo' : 1}],
      });

    return (
        <div>
            <Cart.Provider value={{ state, dispatch}}>
                {children}
            </Cart.Provider>
            
        </div>
    )
}

export default Context


export const CartState = () => {

    return useContext(Cart);

}


