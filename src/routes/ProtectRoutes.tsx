import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { ReactNode } from "react";

interface ProtectRoutesProps {
  children: ReactNode;
}

const ProtectRoutes = ({ children }: ProtectRoutesProps) => {
  const user = useAppSelector(useCurrentUser);
  const location = useLocation();
  console.log("Current Route:", location.pathname);
  const userNotAllowed = ["/login"];

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }else{
    if(userNotAllowed.includes(location.pathname)){
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default ProtectRoutes;

