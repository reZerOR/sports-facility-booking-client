import { ComprehensiveFooter } from "@/components/comprehensive-footer";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ComprehensiveFooter />
    </div>
  );
};

export default MainLayout;
