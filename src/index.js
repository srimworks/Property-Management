import React from "react";
import ReactDOM from 'react-dom/client'
import App ,{Routes}from "./App";
import { RouterProvider } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
    <RouterProvider router={Routes}>
    <App />
    </RouterProvider>
  </React.StrictMode>
)