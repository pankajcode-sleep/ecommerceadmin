import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addCategoryGroup,
  editCategoryGroup,
  viewCategoryGroupById,
  
} from "../services/api";

function AddItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      const res = await viewCategoryGroupById(id);

      setFormData({
        name: res.data.name,
        description: res.data.description,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await editCategoryGroup(id, formData);
        toast.success("Item Updated Successfully");
      } else {
        await addCategoryGroup(formData);
        toast.success("Item Added Successfully");

        setFormData({
          name: "",
          description: "",
        });
      }

      setTimeout(() => {
        navigate("/view-items");
      }, 1000);

    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          {id ? "Edit Category" : "Add Category"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>

            <div className="col-md-6">
              <button type="submit" className="btn btn-sm btn-primary">
                {id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default AddItem;