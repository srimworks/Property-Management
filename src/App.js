import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NavBar from './reusable/NavBar';
import Home from './components/Home';
import ProfileDashboardNav from './reusable/ProfileDashboardNav';

import Results from './components/Results';
import ProfileNav from './reusable/ProfileNav';
import MyActivity from './components/ProfileDashboard/MyActivity';
import MyTransactions from './components/ProfileDashboard/MyTransactions';
import EditProfile from './components/ProfileDashboard/EditProfile';
import ContactForm from './components/ContactForm';
import LoginPage_1 from './components/SignIn/LoginPage_1';
import LoginPage_2 from './components/SignIn/LoginPage_2';
import LoginPage_3 from './components/SignIn/LoginPage_3';



const AppRouter = () => {
  return (
    <>
       <NavBar/>
      <Outlet />
    </>
  );
};

const AppDashboard=()=>{
  // const [dropdownActive , setActiveDropdown]=useState(false)
  return(
    <>
      {/* <DashboardNavbar /> */}
      <div className='dashboard-overall'>
        {/* <ProfileDashboardNav/> */}
        {/* <ProfileNav/> */}
        <Outlet/>
    </div>

    </>
  )
}


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
        element: <Results/>,
        path: "/search-results",
      },
   ]} ,

   {
    element: <AppDashboard/>,
    path: "/",
    children: [
      {
        element: <ProfileDashboardNav/>,
        path: "/profiledashboard",
      },
      {
        element:<MyActivity/>,
        path: "/activity",
      },
      {
        element: <MyTransactions/>,
        path: "/transactions",
      },
      {
        element: <EditProfile/>,
        path: "/edit-profile",
      },
      {
        element: <ContactForm/>,
        path: "/contact",
      },
      {
        element: <LoginPage_1/>,
        path: "/login-1",
      },
      {
        element: <LoginPage_2/>,
        path: "/login-2",
      },
      {
        element: <LoginPage_3/>,
        path: "/login-3",
      },

   ]} ,
     
])


const App = () => {
  return (
    <div>
        <AppRouter/>
        <AppDashboard/>
    </div>
  )
}

export default App