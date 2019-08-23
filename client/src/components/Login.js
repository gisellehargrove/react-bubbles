import React, { useState } from "react";
import axios from 'axios';


const Login = () => {
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  });


  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {

  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='form-container'>
      <form onSubmit={e => handleSubmit(e)}>
        <input onChange={e => handleChange(e)} placeholder='username' value={creds.username} />
        <input onChange={e => handleChange(e)} placeholder='password' value={creds.password} />
        <button>Login</button>
      </form>

    </div>
  );
};

export default Login;
