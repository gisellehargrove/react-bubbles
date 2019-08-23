import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


const Login = props => {
  const [creds, setCreds] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
  });


  const handleChange = e => {
    // setCreds({
    //   ...creds,
    //   [e.target.name]: e.target.value
    // });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('http://localhost:5000/api/login', creds)
    .then(response => {
      localStorage.setItem('userToken', response.data.payload);
      props.history.push('/bubblePage');
    })
    .catch(err => {
      console.log(err);
    })

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
