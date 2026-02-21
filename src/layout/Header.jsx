import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Header({ toggleSidebar }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Successfully!");
        setTimeout(() => {
            navigate("/adminlogin");
        }, 1000);
    };

    return (
        <>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>

                        <div className="dropdown">
                            <button
                                className="btn btn-dark dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <RiAdminFill /> admin
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>


                        <button
                            className="navbar-toggler"
                            id="menu-btn"
                            onClick={toggleSidebar}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </div>


        </>
    )
}

export default Header