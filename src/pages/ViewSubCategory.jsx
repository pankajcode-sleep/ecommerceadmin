// import React, { useEffect, useState } from "react";
// import { MdOutlineDelete } from "react-icons/md";
// import { FaPen } from "react-icons/fa";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from 'react-router-dom';
// import Pagination from "../utils/pagination";



// function ViewSubCategory({}) {

//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch("https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/sub", 
//          {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       setItems(data);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//     const handleDelete = async (id) => {
//        const token = localStorage.getItem("token");
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(`https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/sub/${id}`,{
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },      
//       });
        
//       setItems(items.filter((item) => item.id !== id));
//      toast.success("Delete Successful!");
//     } catch (error) {
//       console.error("Delete error", error);
//     }
//   };
  

//   return (
//      <div className="card">
//         <div className="card-header text-center">
//           Add Category
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Item list</th>
//             <th>Item list</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.length > 0 ? (
//             currentItems.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{index + 1}</td>
//                 <td>{item.name}</td>
//                 <td>{item.description}</td>
//                 <td>
//                   <Link to={`/add-items/${item.id}`}>
//                     <FaPen className="me-3" />
//                   </Link>
//                   <button onClick={() => handleDelete(item.id)}>
//                     <MdOutlineDelete className="text-primary" />
//                    </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" classNameName="text-center">
//                 No Items Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div>
//        <Pagination
//         totalItems={items.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//           </div>
//         </div>
//               <ToastContainer />
//         </div>
//   );
// }

// export default ViewSubCategory;


import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../utils/pagination";
import axios from "axios";

const BASE_URL = "https://demo-ecommerce-api.vironixsolutions.com";

function ViewSubCategory() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetchItems(token);
  }, [navigate]);


  const fetchItems = async (token) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/admin/category/sub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const subcategories =
        res.data?.data ||
        res.data?.subcategories ||
        res.data ||
        [];

      setItems(Array.isArray(subcategories) ? subcategories : []);
    } catch (error) {
      toast.error("Failed to fetch subcategories");
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BASE_URL}/api/admin/category/sub/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems((prev) =>
        prev.filter((item) => (item.id ?? item._id) !== id)
      );

      toast.success("Delete Successful!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  if (loading) return 
  <div className="text-center mt-3">Loading...</div>;

  return (
    <div className="card">
      <div className="card-header text-center">
        SubCategory List
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => {
                  const itemId = item.id ?? item._id;

                  return (
                    <tr key={itemId}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>

                        <Link to={`/add-subcategory/${itemId}`}>
                          <FaPen className="me-3 text-primary" />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => handleDelete(itemId)}
                        >
                          <MdOutlineDelete className="text-primary" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Items Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            totalItems={items.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ViewSubCategory;
