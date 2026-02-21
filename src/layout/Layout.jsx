import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import React, { useState } from "react";




const Layout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="main-container">
        <div className={`sidebar ${isOpen ? "show" : ""}`}>
          <Sidebar />
        </div>
        <div className="main">
          <nav className="nav-bar" >
            <Header toggleSidebar={toggleSidebar} />
          </nav>
          <Outlet />
        </div>
      </div>

    </>
  );
};

export default Layout;
