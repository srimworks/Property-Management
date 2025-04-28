import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NavBar from './reusable/NavBar';
import Home from './components/Home';
import ProfileDashboardNav from './reusable/ProfileDashboardNav';
import ProfileDashboard from './components/ProfileDashboard';
import Results from './components/Results';


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