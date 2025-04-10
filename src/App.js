import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NavBar from './reusable/NavBar';

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
        element: "",
        path: "",
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