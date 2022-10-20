import React,{useState} from 'react'; 
import Axios from 'axios';

function Register() {

        const [usernameReg, setUsernameReg] = useState("");
        const [passwordReg, setPasswordReg] = useState("");
        const [passwordReg2, setPasswordReg2] = useState("");
        
        const register = () => {
            Axios.post('http://localhost:5000/regos',{
                username: usernameReg,
                password: passwordReg,
                pass2: passwordReg2
            }).then((response) => {
                console.log(response)
            })
        }
        return (
            <div className = "reg" >
                <div className = "registration" >
                    <h1>Registration</h1>

                    <label htmlFor="username">Username</label>
                    <input type="text"
                        onChange = {(e)=>{
                            setUsernameReg(e.target.value);
                        }} 
                    />

                    <label htmlFor="password">Password</label>
                    <input type="text" 
                        onChange = {(e)=>{
                            setPasswordReg(e.target.value);
                        }} 
                    />

                    <label htmlFor="pass2">Confirm Password</label>
                    <input type="text" 
                        onChange = {(e)=>{
                            setPasswordReg2(e.target.value);
                        }} 
                    />
                    
                    <button onClick = {register} >Register</button>

                </div>
            </div>

         );
    
}

export default Register;
