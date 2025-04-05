import React from 'react'
import "../../assets/css/admindashboard.css";
import { AdminSidebar } from './AdminSidebar'

export const AdminDashboard = () => {
  return (
    <div className='admin-dashboard-cont'>
      <div className='admin-sidebar-path'></div>
      <div className='admin-sidebar'>
          <AdminSidebar />
      </div>
      <div className='admin-dashboard'>
        <div></div>
      </div>
    </div>
  )
}
