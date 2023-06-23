import React, { useCallback, useState } from "react";
// import axios from 'axios';
import Input from './Input';
import logo from '../../public/images/logo.png';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [view, setView] = useState('login');

    const toggleView = useCallback(() => {
        setView((currentView) => currentView === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        console.log("login feature here");
    })

    const register = useCallback(async () => {
      console.log('Register feature here')
    })

    return (
      <div className="relative h-screen w-full bg-[url('/Users/peelintaters/Desktop/solo-project/public/images/background.png')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5 flex items-center justify-center">
               {/* <img src={logo} alt="logo" className="h-24 mr-4" /> */}
               <span className="text-white text-4xl font-semibold mt-8 mb-8">ℝ𝕒𝕥𝕖 𝕥𝕙𝕖 𝕄𝕖𝕞𝕖</span>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-2xl mb-8 font-semibold">
                {view === 'login' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {view === 'register' && (
                  <Input
                    label="Username"
                    onChange={((e) => setName(e.target.value))}
                    id="name"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={view === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
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