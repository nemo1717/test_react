import React,{useState} from 'react'; 
import Axios from 'axios'
//import { Redirect, Route } from "react-router";
import {useHistory} from "react-router-dom"
import { setUserSession } from './Util/Common';

function Login() {
    const [password, setPassword] = useState("");
    const [email, setUsername] = useState("");
    const [uname, setcomp] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    //const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(false);
    let history =  useHistory();
    
    const login = () => {
   
        //setLoading(true);
        Axios.post('http://localhost:5000/login',{
            email: email,
            password: password,
            uname: uname,
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
                setUserSession(response.data.token, response.data.user)
                history.push('/dashboard')
                console.log(response.data.user)
            }
        })
    }
    return (
      <div className="container">
        <div className="Login">
            <h1>Login</h1>
            <h1>{loginStatus}</h1>
           
            
            <input type="text" placeholder = "Username..." onChange = {(e)=>{setUsername(e.target.value) }} required  />
            <input type="text" placeholder = "password..." onChange = {(e)=>{setPassword(e.target.value) }} required  />
            <input type="text" placeholder = "company..." onChange = {(e)=>{setcomp(e.target.value) }} required />
            <button onClick = {login}  >Login</button>    
        </div>   
      </div>
  );
}

export default Login;