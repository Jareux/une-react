import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import login from '../local_json/login.json';
import "./game.css"

localStorage.setItem("userAuthentication", false.toString());

export default function Login() {

  
const [loginValue, setloginValue] = useState("")
const [passwordValue, setpasswordValue] = useState("")
const [errorMessage, setErrorMessage] = useState("")


const [linkButton, setLinkButton] = useState( 
  <div>
    <button 
    type="button"
    onClick ={()=> setErrorMessage("Invalid Login")}
    >
      Login
  </button>
  
  </div>   
)

function validateUser (tempuser:any, tempPass:any) {
  if (login.username === tempuser && login.password === tempPass){
  localStorage.setItem("userAuthentication", true.toString());  
    setLinkButton(
        <Link to="/">
    <button type="button">
      Login
  </button>
  </Link>
    )
  }
}




let updateUsername = (e:any) => {
    setloginValue(e.target.value);
    validateUser(e.target.value, login.password)
  }

let updatePassword = (e:any) => {
    setpasswordValue(e.target.value);
    validateUser(login.username, e.target.value);
  }

  return (
    <div className="game_screen">
    <div>Login</div>
    <div>
    <input 
      onChange={updateUsername}
      
      defaultValue="Username">      
    </input>
    </div>
    <div>
    <input
      onChange={updatePassword} 
      defaultValue="Password">
    </input>
    </div>

    
    
    {linkButton}
    <div>{errorMessage}</div>




    </div>
  );
}