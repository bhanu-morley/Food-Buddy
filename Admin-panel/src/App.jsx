import React from 'react';
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const url = "http://localhost:4000"
  return (
    <AdminContextProvider>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={
            <ProtectedRoute>
            <List />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<Navigate to="/orders" replace />} />
        </Routes>
      </div>
    </AdminContextProvider>
  );
};

export default App;
