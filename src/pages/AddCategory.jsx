import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        category_group_id: "",
        name: "",
        description: "",
    });
    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/group",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch category groups");
            }
        };

        fetchItems();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        if (id) {
            axios
                .get(
                    `https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    setFormData({
                        category_group_id: res.data.category_group_id || "",
                        name: res.data.name || "",
                        description: res.data.description || "",
                    });
                })
                .catch((err) => {
                    toast.error("Failed to fetch category ❌");
                    console.log(err);
                });
        }
    }, [id, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            if (id) {
                await axios.put(
                    `https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Category Updated Successfully");
            } else {
                await axios.post(
                    "https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Category Added Successfully");
                setFormData({
                    category_group_id: "",
                    name: "",
                    description: "",
                });
            }

        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
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
                        <div className="col-md-6 m-2">
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