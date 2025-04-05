import React, { useState } from 'react'
import "../../assets/css/adminsidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { TbUserSquareRounded } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { BsHousesFill } from "react-icons/bs";
import { TbSquareRounded } from "react-icons/tb";



export const AdminSidebar = () => {

  const [hide, setHide] = useState(false);

  const toggle = () => {
    console.log(hide)
    setHide(!hide);
  };

  return (
    <div className={`admin-sidebar-cont ${hide?"":"close"}`}>

      <div className="admin-sidebar-section">
        <div className='admin-sidebar-bt'>
          <label  onClick={toggle}><TbSquareRounded size={30} /></label>
        </div>
        <div className='admin-sidebar-trip'>
          <div className='admin-sidebar-trip-item'><RiDashboardFill /></div>
          <div className='admin-sidebar-trip-item'><TbUserSquareRounded size={30} /></div>
          <div className='admin-sidebar-trip-item'><BiSupport size={30} /></div>
          <div className='admin-sidebar-trip-item'><IoSettingsOutline size={30} /></div>
          <div className='admin-sidebar-trip-item'><BsHousesFill size={30} /></div>
          <div className='admin-sidebar-trip-item'><TbLogout2 size={30} /></div>
        </div>
      </div>

      <div className="admin-sidebar-section">
      <div className='admin-sidebar-list-title'>
          <label>UserName</label>
        </div>
        <div className='admin-sidebar-list'>
          <ul className="admin-sidebar-ul">
            <li className="admin-sidebar-list-item">DashBoard</li>
            <li className="admin-sidebar-list-item">Users</li>
            <li className="admin-sidebar-list-item">Support team</li>
            <li className="admin-sidebar-list-item">Setting</li>
            <li className="admin-sidebar-list-item">Property</li>
            <li className="admin-sidebar-list-item">Logout</li>
          </ul>
        </div>
      </div>

    </div>
  )
}
