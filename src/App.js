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

import Results from './components/Results'
import SingleProductPage from './components/SingleProductPage';
import PostProperty from './components/PostProperty';


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
        <NavBar/>
        <ProfileDashboardNav/>
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
      {
        element: <SingleProductPage/>,
        path: "/single-product-page",
      },
      {
        element: <PostProperty/>,
        path: "/post-property",
      },
            {
        element: <ContactForm/>,
        path: "/contact",
      },
   ]} ,

   {
    element: <AppDashboard/>,
    path: "/",
    children: [

      {
        element:<MyActivity/>,
        path: "/profile",
      },
      {
        element: <MyTransactions/>,
        path: "/profile/properties",
      },
      {
        element: <EditProfile/>,
        path: "/profile/edit-profile",
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