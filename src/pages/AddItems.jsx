import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddItem() {
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first ❌");
      navigate("/login");
      console.log(success)
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if(id){
             const response = await axios.put(
        `https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/group/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item Updated Successfully");

      }else{
             const response = await axios.post(
        "https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/group",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({
        name: "",
        description: "",
      });
      toast.success("Item Added Successfully");
      }

      

    } catch (error) {
      toast.error("Error adding item ❌");
      console.error(error);
    }
  };



  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first ❌");
    navigate("/login");
    return;
  }
  if (id) {
    axios
      .get(
        `https://demo-ecommerce-api.vironixsolutions.com/api/admin/category/group/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setFormData({
          name: res.data.name,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [id]);

  return (
    <>
      <div class="card">
        <div class="card-header">
          Add Category
        </div>
        <div class="card-body">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-6 mb-4">
              <label class="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              
            </div>
            <div className="col-md-6 mb-4">
              <label class="form-label">Discription</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
            <div className="col-md-6 ">
              <button type="submit" className="btn btn-sm btn-primary">{id ? "Update" : "Add"  }</button>
            </div>
    </form >        
        </div>

      </div>
    
    <ToastContainer />
    </>
  );
}

export default AddItem;
