import React, { useState } from 'react'
import Navbar from './assets/Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/Pages/Home/Home'
import Cart from './assets/Pages/Cart/Cart'
import PlaceOrder from './assets/Pages/PlaceOrder/PlaceOrder'
import Verify from './assets/Pages/Verify/Verify.jsx'
import MyOrders from './assets/Pages/MyOrders/MyOrders.jsx'
import Footer from './assets/Components/Footer/Footer'
import LoginPopup from './assets/Components/LoginPopup/LoginPopup'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
