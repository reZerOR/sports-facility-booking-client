import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import ProtectRoutes from "./ProtectRoutes";
import { DashboardLayout } from "@/layout/DashboardLayout";

import Facility from "@/pages/Facility";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "facility",
        element: <Facility />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectRoutes>
        <Login />
      </ProtectRoutes>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectRoutes>
        <DashboardLayout />
      </ProtectRoutes>
    ),
  },
]);
