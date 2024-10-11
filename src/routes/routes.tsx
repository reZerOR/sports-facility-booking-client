import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import ProtectRoutes from "./ProtectRoutes";
import { DashboardLayout } from "@/layout/DashboardLayout";

import Facility from "@/pages/Facility";
import FacilityDetails from "@/pages/FacilityDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Success";
import Failed from "@/pages/Failed";
import Cancel from "@/pages/Cancel";
import Dashboard from "@/pages/Dashboard";
import ContactUs from "@/pages/ContactUs";
import ErrorPage from "@/pages/ErrorPage";
import Bookings from "@/pages/Bookings";
import AddAdmin from "@/pages/AddAdmin";
import AllFacility from "@/pages/AllFacility";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "facility",
        element: <Facility />,
      },
      {
        path: "facility/:id",
        element: <FacilityDetails />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "failed",
        element: <Failed />,
      },
      {
        path: "cancel",
        element: <Cancel />,
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
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "add-admin",
        element: <AddAdmin />,
      },
      {
        path: "facilities",
        element: <AllFacility />,
      },  
    ],
  },
  
]);
