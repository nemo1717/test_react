import React,{useState} from 'react'; 
import Axios from 'axios'
//import { Redirect, Route } from "react-router";
import {useHistory} from "react-router-dom"


const Form = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    //const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);
    let history =  useHistory();
    
    const login = () => {
   
        //setLoading(true);
        Axios.post('http://localhost:5000/contact-us',{
            email: email,
            phone: phone,
            name: name,
            message: message
        }).then((response) => {
            if(response.data === "unauthenticated" ){
                setLoginStatus(response.data)
                //setLoading(false);
            }
            if(response.data.data === "authenticated" ){
                //<Redirect to = "/register" />
                //setLoginStatus(response.data)
               // setLoading(false);
               console.log(response.data.token, response.data.user )
                
                history.push('/dashboard')
                console.log(response.data.user)
            }
        })
    }
    return (
      <div className="container">
        <div className="contact-form">
            <h1>Contact Us</h1>
            <h1>{loginStatus}</h1>
           
            
            <input type="text" placeholder = "Full Name...." onChange = {(e)=>{setName(e.target.value) }} required  />
            <input type="text" placeholder = "Email...." onChange = {(e)=>{setEmail(e.target.value) }} required  />
            <input type="text" placeholder = "Phone Number...." onChange = {(e)=>{setPhone(e.target.value) }} required />
            <input type="text" placeholder = "Type your message here...." onChange = {(e)=>{setMessage(e.target.value) }} required />
            <button onClick = {login}  >Login</button>    
        </div>   
      </div>
  );
}

export default Form;