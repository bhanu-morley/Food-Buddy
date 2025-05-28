import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PlaceOrder.css'
import { StoreContext } from '../../../context/StoreContext.jsx'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()

    let orderItems = []
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] }
        orderItems.push(itemInfo)
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
      userId: localStorage.getItem("userId"),
    }

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      })

      if (response.data.success) {
        const { razorpayOrderId, key, orderId, amount, currency } = response.data

        const options = {
          key,
          amount,
          currency,
          name: "Food Buddy",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await axios.post(`${url}/api/order/verify`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderId,
                success: "true",
              })

              if (verifyRes.data.success) {
                alert("Payment Successful")
                window.location.href = "/myorders"
              } else {
                alert("Payment Verification Failed")
              }
            } catch (error) {
              console.error(error)
              alert("Verification Error")
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#3399cc",
          },
        }

        const razor = new window.Razorpay(options)
        razor.open()
      } else {
        alert("Error placing order")
      }
    } catch (error) {
      console.error(error)
      alert("Server error")
    }
  }

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token, cartItems, getTotalCartAmount, navigate])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        </div>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='ZIP code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p><b>₹</b>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p><b>₹</b>{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b><b>₹</b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
