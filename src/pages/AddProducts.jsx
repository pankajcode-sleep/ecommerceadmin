import { useEffect, useState } from "react";
import {
  viewAllProducts,
  viewCategoryGroup,
  viewCategory,
  viewSubCategory,
} from "../services/api";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [productRes, groupRes, categoryRes, subRes] =
        await Promise.all([
          viewAllProducts(),
          viewCategoryGroup(),
          viewCategory(),
          viewSubCategory(),
        ]);

      setProducts(productRes.data.data || productRes.data || []);
      setGroups(groupRes.data.data || groupRes.data || []);
      setCategories(categoryRes.data.data || categoryRes.data || []);
      setSubcategories(subRes.data.data || subRes.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupName = (id) => {
    const group = groups.find((gn) => gn.id == id);
    return group ? group.name : "*****";
  };

  const getCategoryName = (id) => {
    const category = categories.find((cn) => cn.id == id);
    return category ? category.name : "******";
  };

  const getSubcategoryName = (id) => {
    const sub = subcategories.find((sn) => sn.id == id);
    return sub ? sub.name : "******";
  };

  return (
    <div className="card">
      <div className="card-header">Product List</div>

      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category-Group</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>

                <td>{getGroupName(product.category_group_id)}</td>
                <td>{getCategoryName(product.category_id)}</td>
                <td>{getSubcategoryName(product.subcategory_id)}</td>

                <td>{product.price}</td>
                <td>{product.stock}</td>

                <td>
                  {product.image && (
                    <img
                      src={product.image}
                      alt=""
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProducts;