import './Orders.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import { files } from '../../assets/files/files';

const Orders = () => {
  const { url, token } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    } else {
      toast.error("Unauthorized. Please login.");
    }
  }, [token]);

  return (
    <div className="order add">
      <h3>Orders Page</h3> 
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={files.food_parcel} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p><b>₹</b>{order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
