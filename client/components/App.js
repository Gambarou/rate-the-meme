import React from 'react'
import {
  Routes,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Auth from './Auth';
import Home from './Home';

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />
}

function Root() {

  return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  )
};

