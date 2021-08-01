import React, { useState } from 'react';
import CustomButton from './customButton';
import { auth, signInWithGoogle } from '../api/firebase';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const emailHandleChange = event => {
    const name = event.target.value;
    setEmail(name);
  }

  const passwordHandleChange = event => {
    const name = event.target.value;
    setPassword(name);
  }

  return (
    <div className="LoginPage">
      Login Page
      <form onSubmit={handleSubmit}>
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
        <div>
          <CustomButton label="ログイン" />
          <button onClick={signInWithGoogle}>Google SignIn</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;