import "./Sidebar.css";
import { useState } from "react";
import { FaChartBar, FaChevronRight } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <RxDashboard className="icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("products")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Group
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "products" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "products" ? "open" : ""}`}>
            <li>
              <NavLink to="/add-items" className="sub-link">
                Add Items
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-items" className="sub-link">
                View Items
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("admission")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Category
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "admission" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "admission" ? "open" : ""}`}>
            <li>
              <NavLink to="/add-category" className="sub-link">
                Add Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-category" className="sub-link">
                View Category
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("ownid")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Sub category
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "ownid" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "ownid" ? "open" : ""}`}>
            <li>
              <NavLink to="/add-sub-category" className="sub-link">
                Add Sub category
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-sub-category" className="sub-link">
                View Sub category
              </NavLink>
            </li>
          </ul>
        </li>
         <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("ownids")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Product
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "ownids" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "ownids" ? "open" : ""}`}>
            <li>
              <NavLink to="/add-product" className="sub-link">
                Add product
              </NavLink>
            </li>
            <li>
              <NavLink to="/view-product" className="sub-link">
                View Product
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("idpages")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "idpages" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "idpages" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("idsend")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "idsend" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "idsend" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("idsends")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "idsends" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "idsends" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("related")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "related" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "related" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("everyid")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "everyid" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "everyid" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("#")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "#" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "#" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("#ss")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "#ss" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "#ss" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div
            className="menu-title"
            onClick={() => toggleMenu("#dd")}
          >
            <span>
              <FaChartBar className="icon" />
              Manage Admission
            </span>
            <FaChevronRight
              className={`chevron ${
                openMenu === "#dd" ? "rotate" : ""
              }`}
            />
          </div>

          <ul className={`submenu ${openMenu === "#dd" ? "open" : ""}`}>
            <li>
              <NavLink to="/admission-process" className="sub-link">
                Admission Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-admission" className="sub-link">
                Add Admission
              </NavLink>
            </li>
            <li>
              <NavLink to="/enrolled-student" className="sub-link">
                Enrolled Student
              </NavLink>
            </li>
          </ul>
        </li>

        

      </ul>
    
  );
};

export default Sidebar;
