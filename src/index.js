import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Mainpage.js";
import App from "./App";
import About from "./pages/About/About";
import EditUser from "./pages/EditUser/EditUser";
import AddUser from "./pages/AddUser/AddUser";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Main />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/EditUser",
        element: <EditUser />,
      },
      {
        path: "/AddUser",
        element: <AddUser />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
