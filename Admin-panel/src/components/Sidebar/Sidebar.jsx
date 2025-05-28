import React from 'react'
import './Sidebar.css/'
import { NavLink } from 'react-router-dom'
import { files } from '../../assets/files/files'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={files.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={files.list} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={files.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar
