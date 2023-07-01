import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Input from './Input';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

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
        const res = await axios.post('api/register', {
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
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full border border-zinc-700">
              <h2 className="text-white text-3xl mb-8 font-bold">
                {view === 'login' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {view === 'register' && (
                  <Input
                    label="Email"
                    onChange={((e) => setEmail(e.target.value))}
                    id="email"
                    type="email"
                    value={email}
                  />
                )}
                <Input
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  value={username}
                />
                <Input
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
                {error && <p className="text-red-500 text-sm px-4 m-auto">{error}</p>}
              </div>
              <button onClick={view === "login" ? login : register} className="bg-blue-600 py-3 text-white rounded-md w-full mt-10 hover:bg-blue-700 transition">
                {view === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center"> 
                <div className="
                      w-10
                      h-10
                      bg-white
                      rounded-full
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      hover:opacity-80
                      transition
                    ">
                      <FcGoogle size={30} />
                    </div>
                <div className="
                      w-10
                      h-10
                      bg-white
                      rounded-full
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      hover:opacity-80
                      transition
                    ">
                      <FaGithub size={30} />
                    </div>
              </div>
                <p className="text-neutral-500 mt-12 text-sm">
                  {view === "login" ? "First time using Rate the Meme?" : "Already have an account?"}
                  <span onClick={toggleView} className="text-white ml-1 hover:underline cursor-pointer">
                    {view === "login" ? "Create an account" : "Login"}
                  </span>        
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Auth;