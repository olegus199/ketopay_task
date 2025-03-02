import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.tsx";

const MainLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;