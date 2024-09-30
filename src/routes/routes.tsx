import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import ProtectRoutes from "./ProtectRoutes";

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
]);
