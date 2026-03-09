import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    addCategory,
    editCategory,
    viewCategoryGroup,
    viewCategoryById
} from "../services/api";
function AddCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        category_group_id: "",
        name: "",
        description: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }
        viewCategoryGroup()
            .then((res) => {
                setItems(res.data || []);
            })
            .catch((err) => {
                toast.error("Failed to load category groups");
            });
        if (id) {
            viewCategoryById(id)
                .then((res) => {
                    const category = res.data.data;

                    setFormData({
                        category_group_id: category.category_group_id || "",
                        name: category.name || "",
                        description: category.description || "",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to fetch category");
                });
        }
    }, [id, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await editCategory(id, formData);
                toast.success("Category Updated Successfully");
            } else {
                await addCategory(formData);
                toast.success("Category Added Successfully");

                setFormData({
                    category_group_id: "",
                    name: "",
                    description: "",
                });
            }

            setTimeout(() => {
                navigate("/view-category");
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    {id ? "Update Category" : "Add Category"}
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-md-6 mb-4">
                            <label className="form-label">Category Group</label>
                            <select
                                name="category_group_id"
                                className="form-control"
                                value={formData.category_group_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category Group</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6 mb-4">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
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
                                placeholder="Enter Description"
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-2">
                            <button type="submit" className="btn btn-primary btn-sm">
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
export default AddCategory;