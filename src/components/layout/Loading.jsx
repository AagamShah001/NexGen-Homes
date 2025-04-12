import React from 'react';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import { useAuth } from '../authentication/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const Loading = ({ allowedRoles }) => {
  const { isLoggedin, role, loading } = useAuth();

  // Show loader while loading
  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Ring size="60" stroke="5" bgOpacity="0" speed="2" color="black" />
      </div>
    );
  }

  // Redirect to login if not logged in
  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is in allowedRoles
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Show the children routes if authorized
  return <Outlet />;
};
