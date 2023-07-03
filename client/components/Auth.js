import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SignIn from "./SignIn";

const Auth = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [view, setView] = useState('login');
    const navigate = useNavigate();

    const toggleView = useCallback(() => {
        setView((currentView) => currentView === 'login' ? 'register' : 'login');
        setError('');
        setEmail('');
        setUsername('');
        setPassword('');
    }, []);
  
    const login = useCallback(async () => {
      if (!username) {
        setError("Username is required");
        return;
      }
      if (!password) {
        setError("Password is required");
        return;
      }
      try {
        const res = await axios.post('api/login', {
          username,
          password
        })
  
        localStorage.setItem('username', username);
        localStorage.setItem('avatar', res.data.avatar);

        setIsLoggedIn(true);
        navigate('/');
      } catch (err) {
        if (err.response) {
          setError('Incorrect username or password');
        }
        setPassword('');
      }

    }, [username, password]);

    const register = useCallback(async () => {
      const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      // Check if the input value matches the email pattern
      const isValidEmail = emailPattern.test(email);

      if (!email) {
        setError('Email is required');
        return;
      }
      if (!username) {
        setError('Username is required');
        return;
      }
      if (!password) {
        setError('Password is required');
        return;
      }
      if (!isValidEmail) {
        setError('Invalid email address.')
        setEmail('')
        return;
      }

      try {
        await axios.post('api/register', {
          email,
          username,
          password
        })

        login();
      } catch (err) {
        console.log(err.response);
        if (err.response && err.response.status === 422) {
          setError('Email or username already taken.');
        } else if (err.response.status === 500) {
          setError('Email or username already exists.')
        } else {
          setError('Error registering user.');
        }
        setEmail('');
        setUsername('');
        setPassword('');
      }
    }, [email, password, username, login, setError]);

    const handleKeyDown = useCallback((e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          view === 'login' ? login() : register();
      }
    }, [login, register, view]);

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleKeyDown]);

    return (
      <div className={`relative h-screen w-full bg-no-repeat bg-center bg-fixed bg-cover`}>
        <div className="bg-zinc-900 w-full h-full lg:bg-opacity-50">
          <div className="px-12 py-5 flex flex-col items-center justify-center">
              <div className="text-white text-4xl font-semibold mt-20 mb-4">ℝ𝕒𝕥𝕖 𝕥𝕙𝕖 𝕄𝕖𝕞𝕖</div>
          </div>
          <div className="flex justify-center">
          <SignIn
                  view={view}
                  username={username}
                  password={password}
                  email={email}
                  error={error}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  login={login}
                  register={register}
                  toggleView={toggleView}
                />
            </div>
          </div>
        </div>
    )
}

export default Auth;