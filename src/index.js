import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Mainpage.js";
import App from "./App";
import NotFound from "./pages/NotFound";
import News from "./pages/News/News.js";
import Profile from "./pages/Profile/Profile.js";
import Stats from "./pages/Stats/Stats.js";
import NewsEditor from "./pages/NewsEditor/NewsEditor.js";
import NewsList from "./pages/NewsList/NewsList.js";
import PayServices from "./pages/PayServices/PayServices.js";

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
        path: "/get-stats",
        element: <Stats />,
      },
      {
        path: "/news-list",
        element: <NewsList />,
      },
      {
        path: "/news-editor",
        element: <NewsEditor />,
      },
      {
        path: "/payment-services",
        element: <PayServices />,
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
