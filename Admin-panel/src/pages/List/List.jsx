import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from '../../context/AdminContext';
import './List.css';
import {files} from '../../assets/files/files'

const List = () => {
  const { url, token } = useContext(AdminContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Failed to remove food");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p><b>₹</b>{item.price}</p>
            <img src={files.delete_food} alt="Remove" className='cross' onClick={() => removeFood(item._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
