import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import Login from './pages/Login';
import AddItems from './pages/AddItems';
import ViewItems from './pages/ViewItems';
import ProtectedRoute from './utils/protectedRoute';
import AddCategory from './pages/AddCategory';
import ViewCategory from './pages/ViewCategory';
import AddSubCategory from './pages/AddSubCategory';
import ViewSubCategory from './pages/ViewSubCategory';
import AddProducts from './pages/AddProducts';
import ViewProducts from './pages/ViewProducts';


function App() {
 const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/adminlogin" element={<Login />} />
      <Route path="/" element={
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-items" element={<AddItems />} />
        <Route path="add-items" element={<AddItems/>} />
        <Route path="add-items/:id" element={<AddItems />} />
        <Route path="add-items/:id" element={<AddItems />} />
        <Route path="view-items" element={<ViewItems />} />
        <Route path="add-category" element={<AddCategory/>} />
        <Route path="view-category" element={<ViewCategory/>} />
        <Route path="add-sub-category" element={<AddSubCategory/>} />
        <Route path="view-sub-category" element={<ViewSubCategory/>} />
        <Route path="add-product" element={<AddProducts/>} />
        <Route path="view-product" element={<ViewProducts/>} />
        <Route path="/add-subcategory/:id" element={<AddSubCategory />} />
        <Route path="add-product/:id" element={<AddProducts/>} />

        
      </Route>

      </>
    )
  );

  
  return <RouterProvider router={router} />;

 
}

export default App
