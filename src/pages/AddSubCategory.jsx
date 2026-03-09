import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BASE_URL = "https://demo-ecommerce-api.vironixsolutions.com";

function AddSubCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        category_id: "",
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

        fetchCategories(token);

        if (id) {
            fetchSubCategory(token);
        }
    }, [id]);

  
    const fetchCategories = async (token) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/admin/category`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const categories =
                res.data?.data ||
                res.data?.categories ||
                res.data ||
                [];

            setItems(Array.isArray(categories) ? categories : []);
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };

  
    const fetchSubCategory = async (token) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${BASE_URL}/api/admin/category/sub/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const sub = res.data?.data || res.data;

            setFormData({
                category_id: sub?.category_id || "",
                name: sub?.name || "",
                description: sub?.description || "",
            });
        } catch (error) {
            toast.error("Failed to fetch subcategory");
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            if (id) {
                await axios.put(
                    `${BASE_URL}/api/admin/category/sub/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("SubCategory Updated Successfully");
            } else {
                await axios.post(
                    `${BASE_URL}/api/admin/category/sub`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("SubCategory Added Successfully");
            }

            navigate("/view-sub-category");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="card">
                <div className="card-header">
                    {id ? "Update SubCategory" : "Add SubCategory"}
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row">

                        <div className="col-md-6 mb-4">
                            <label className="form-label">Category</label>
                            <select
                                name="category_id"
                                className="form-control"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>

                                {items.map((item) => (
                                    <option
                                        key={item.id || item._id}
                                        value={item.id || item._id}
                                    >
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
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-4">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mt-2">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                            >
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

export default AddSubCategory;