import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import NavBar from "./reusable/NavBar";
import Home from "./components/Home";
import ProfileDashboardNav from "./reusable/ProfileDashboardNav";

import Results from "./components/Results";
import SearchResults from "./components/SearchResults";
import PropertyDetails from "./components/PropertyDetails";
import ProfileNav from "./reusable/ProfileNav";
import MyActivity from "./components/ProfileDashboard/MyActivity";
import MyTransactions from "./components/ProfileDashboard/MyTransactions";
import EditProfile from "./components/ProfileDashboard/EditProfile";
import ContactForm from "./components/ContactForm";

import SingleProductPage from "./components/SingleProductPage";
import PostProperty from "./components/PostProperty";
import Footer from "./reusable/Footer";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminDashHome from "./components/AdminDashboard/AdminDashHome";
import AdminDashMange from "./components/AdminDashboard/AdminDashMange";
import AdminDashProperty from "./components/AdminDashboard/AdminDashProperty";
import AdminDashUserList from "./components/AdminDashboard/AdminDashUserList";
import AdminLogin from "./components/AdminDashboard/AdminLogin";

const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const AppDashboard = () => {
  // const [dropdownActive , setActiveDropdown]=useState(false)
  return (
    <>
      {/* <DashboardNavbar /> */}
      <div className="dashboard-overall">
        {/* <ProfileDashboardNav/> */}
        {/* <ProfileNav/> */}
        <NavBar />
        <ProfileDashboardNav />
      </div>
    </>
  );
};

export const Routes = createBrowserRouter([
  {
    element: <AppRouter />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Results />,
        path: "/search-results",
      },
      {
        element: <PropertyDetails />,
        path: "/property/:propertyId",
      },
      {
        element: <SingleProductPage />,
        path: "/single-product-page",
      },
      {
        element: <PostProperty />,
        path: "/post-property",
      },
      {
        element: <ContactForm />,
        path: "/contact",
      },
    ],
  },

  {
    element: <AppDashboard />,
    path: "/",
    children: [
      {
        element: <MyActivity />,
        path: "/profile",
      },
      {
        element: <MyTransactions />,
        path: "/profile/properties",
      },
      {
        element: <EditProfile />,
        path: "/profile/edit-profile",
      },
    ],
  },
  {
    element: <AdminLogin />,
    path: "/login/admin",
  },
  {
    element: <AdminDashboard />,
    path: "/",
    children: [
      {
        element: <AdminDashHome />,
        path: "/admin/dashboard/home",
      },
      {
        element: <AdminDashMange />,
        path: "/admin/dashboard/manage-requests",
      },
      {
        element: <AdminDashProperty />,
        path: "/admin/dashboard/property-requests",
      },
      {
        element: <AdminDashUserList />,
        path: "/admin/dashboard/property-list",
      },
      {
        element: <AdminDashUserList />,
        path: "/admin/dashboard/user-list",
      },
      {
        element: <AdminDashUserList />,
        path: "/admin/dashboard/surveyor-list",
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={Routes} />;
};

export default App;
