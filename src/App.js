import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NavBar from './reusable/NavBar';
import Home from './components/Home';
import Results from './components/Results';

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
      {
        element: <Results  />,
        path: "/search-results",
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