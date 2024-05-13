import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Mainpage.js";
import App from "./App";
import NotFound from "./pages/NotFound";
import News from "./pages/News/News.js";
import Profile from "./pages/Profile/Profile.js";

// Offline plugin is only necessary in production
if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install()
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/About",
        element: <Main />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
