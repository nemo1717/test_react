import React from 'react'; 
//import {Redirect} from "react-router-dom"
import {useHistory} from "react-router-dom";
import {getUser,  removeUserSession, getUserID} from "./Util/Common"


function Dashboard() {
  let history =  useHistory();

  const userid = getUserID();
  //const tokens = getToken();
  //console.log(tokens)
  console.log(userid)
  const Logout = () => {
    removeUserSession();
    history.push('/');

  }

  /*
  if (!authorized) {
    return <Redirect to = "/login" />;
  }
*/
 
    return (

      <div className="container">
        <h1>You should be here after login {userid}</h1>
        <input type="button" value = "Logout" onClick = {Logout} />
      </div>

    );      
}

export default Dashboard;