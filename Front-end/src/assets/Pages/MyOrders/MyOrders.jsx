import { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../../context/StoreContext';
import { files } from '../../files/files';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (response.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={files.parcel_icon} alt="parcel" />
                            <p>
                                {Array.isArray(order.items) && order.items.map((item, idx) => (
                                    idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}
                            </p>
                            <p><b>₹</b>{order.amount}.00</p>
                            <p>Items: {order.items?.length || 0}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
