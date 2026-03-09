import axios from "axios";

// Base URL
const BASE_URL = "https://demo-ecommerce-api.vironixsolutions.com/";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add token automatically in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// All API Functions Here

// Login API
export const loginUser = (data) => {
  return api.post("api/login", data);
};



// Add category group
export const addCategoryGroup = (data) => {
  return api.post("api/admin/category/group", data);
};

// View all category groups
export const viewCategoryGroup = () => {
  // return api.get("api/admin/category/group");
  return api.get("api/admin/category/group");


};

// View by ID
export const viewCategoryGroupById = (id) => {
  return api.get(`api/admin/category/group/${id}`);
};

// Editssss
export const editCategoryGroup = (id, data) => {
  return api.put(`api/admin/category/group/${id}`, data);
};

// Delete
export const deleteCategoryGroup = (id) => {
  return api.delete(`api/admin/category/group/${id}`);
};

//Category Groups

// Add Category
export const addCategory = (data) => {
  return api.post("api/admin/category/", data);
};

// View All Categories
export const viewCategory = () => {
  // return api.get("api/admin/category/");
  return api.get("api/admin/category/");

};

// View Category By ID
export const viewCategoryById = (id) => {
  return api.get(`api/admin/category/${id}`);
};

// Update Category
export const editCategory = (id, data) => {
  return api.put(`api/admin/category/${id}`, data);
};

// Delete Category
export const deleteCategory = (id) => {
  return api.delete(`api/admin/category/${id}`);
};




export const addProduct = (data) => {
    return api.post("api/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const editProduct = (id, data) => {
    return api.put(`api/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const viewProductById = (id) => {
    return api.get(`api/products/${id}`);
};

// View all Subcategories
export const viewSubCategory = () => {
  return api.get("api/admin/category/sub/");
};

export const viewAllProducts = () => {
  return api.get("api/products");
};

export const deleteProduct = (id) => {
  return api.delete(`api/products/${id}`);
};