import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Auth from "./Auth";
import Home from "./Home";

// Your App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('api/check-session');
        if (!res.data.loggedIn) {
          setIsLoggedIn(false);
        } else {
          console.log('We are logged in')
          localStorage.setItem('userId', res.data.userId);
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Handle error or redirect to the appropriate route
        console.log(error);
      }
    };

    checkSession();
  }, [isLoggedIn, userId])

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        {isLoggedIn ? (
            <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
          ) : (
            <Route path="/" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;


