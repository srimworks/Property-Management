import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NavBar from './reusable/NavBar';
import Home from './components/Home';

const AppRouter = () => {
  return (
    <>
       <NavBar/>
      <Outlet />
    </>
  );
};


export const Routes = createBrowserRouter([
  {
    element: <AppRouter />,
    path: "/",
    children: [
      {
        element: <Home/>,
        path: "/",
      },
   ]}   
])


const App = () => {
  return (
    <div>
        <AppRouter/>
    </div>
  )
}

export default App