// App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminContextProvider, { AdminContext } from './context/AdminContext';

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AdminContext);
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AdminContextProvider>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<Navigate to="/orders" replace />} />
        </Routes>
      </div>
    </AdminContextProvider>
  );
};

export default App;
