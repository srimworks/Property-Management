import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import NavBar from './reusable/NavBar';
import Home from './components/Home';
import ProfileDashboardNav from './reusable/ProfileDashboardNav';

import Results from './components/Results';
import SearchResults from './components/SearchResults';
import PropertyDetails from './components/PropertyDetails';
import ProfileNav from './reusable/ProfileNav';
import MyActivity from './components/ProfileDashboard/MyActivity';
import MyTransactions from './components/ProfileDashboard/MyTransactions';
import EditProfile from './components/ProfileDashboard/EditProfile';
import ContactForm from './components/ContactForm';

import SingleProductPage from './components/SingleProductPage';
import PostProperty from './components/PostProperty';
import Footer from './reusable/Footer';

const AppRouter = () => {


  return (
    <>
       <NavBar />
      <Outlet />
      <Footer/>
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
        element: <PropertyDetails/>,
        path: "/property/:propertyId",
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
      }

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
        <RouterProvider router={Routes} />
    </div>
  )
}

export default App;