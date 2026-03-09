import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Pagination from "../utils/pagination";
import { viewAllProducts, deleteProduct } from "../services/api";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await viewAllProducts();
      setProducts(response.data.data || response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts(products.filter((item) => item.id !== id));

      toast.success("Delete Successful!");
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        View Products
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + index + 1}</td>

                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt="Product"
                          width="50"
                          height="50"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <Link to={`/add-product/${item.id}`}>
                        <FaPen className="me-3 text-primary" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-sm"
                      >
                        <MdOutlineDelete className="text-primary" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            totalItems={products.length}
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

export default ViewProducts;