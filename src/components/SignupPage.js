import React, { useState } from 'react';
import { auth } from '../api/firebase';
import CustomButton from './customButton';
import { useHistory } from 'react-router-dom';

const SignupPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } 
    
    try {
      await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      history.push('/');

    } catch (error) {
        console.error(error);
    }
  }

  const displayNameHandleChange = event => {
    setDisplayName(event.target.value);
    console.log(displayName);
  }

  const emailHandleChange = event => {
    setEmail(event.target.value);
    console.log(email);
  }

  const passwordHandleChange = event => {
    setPassword(event.target.value);
    console.log(password);  
  }

  const confirmPasswordHandleChange = event => {
    setConfirmPassword(event.target.value);
    console.log(confirmPassword);
  }

  return (
    <div>
      Sign Up
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input 
            name="displayName" 
            type="text" 
            onChange={displayNameHandleChange}
            value={displayName} 
            required 
          />
        </label>
        <label>
          email
          <input 
            name="email" 
            type="email" 
            onChange={emailHandleChange}
            value={email} 
            required 
          />
        </label>
        <label>
          password
          <input 
            name="password" 
            type="password" 
            onChange={passwordHandleChange}
            value={password} 
            required 
          />
        </label>
        <label>
          confirm password
          <input 
            name="confirmPassword" 
            type="password" 
            onChange={confirmPasswordHandleChange}
            value={confirmPassword} 
            required 
          />
        </label>
        <CustomButton label='submit'/>
      </form>
    </div>
  )
}

export default SignupPage;