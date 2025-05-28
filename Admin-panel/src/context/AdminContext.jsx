import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const url = 'https://back-end-p345.onrender.com';

  useEffect(() => {
    localStorage.setItem('adminToken', token);
  }, [token]);

  return (
    <AdminContext.Provider value={{ url, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
