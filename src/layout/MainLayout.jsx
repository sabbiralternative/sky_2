import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import MainNavbar from "../components/shared/MainNavbar/MainNavbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <MainNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
