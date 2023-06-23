import React from 'react'
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import Auth from './Auth';

const router = createBrowserRouter([
  { path: "*", Component: Root }
]);

export default function App() {
  return <RouterProvider router={router} />
}

function Root() {

  return (
    <Routes>
      <Route path="/" element={<Auth />}/>
    </Routes>
  )
};
