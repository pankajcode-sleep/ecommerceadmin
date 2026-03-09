import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import Pagination from "../utils/pagination";
import { viewCategoryGroup , deleteCategoryGroup } from "../services/api";


function ViewItems({}) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
  try {
    const response = await viewCategoryGroup();
    setItems(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch items");
  }
};

    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCategoryGroup(id);

    setItems(items.filter((item) => item.id !== id));

    toast.success("Delete Successful!");
  } catch (error) {
    console.error("Delete error", error);
    toast.error("Delete Failed");
  }
};
  

  return (
     <div className="card">
        <div className="card-header text-center">
          Add Category
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Item list</th>
            <th>Item list</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/add-items/${item.id}`}>
                    <FaPen className="me-3" />
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>
                    <MdOutlineDelete className="text-primary" />
                   </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" classNameName="text-center">
                No Items Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
       <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
          </div>
        </div>
              <ToastContainer />
        </div>
  );
}

export default ViewItems;
