import React from 'react';
import './Login.css';

export default function Login() {
  return(
    <div className="login">
      <h1>Sign in</h1>
      <form>
        <label>Username <br/></label>

        <input type="text" /><br/><br/>

        <label>Password <br/></label>

        <input type="password" />
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}