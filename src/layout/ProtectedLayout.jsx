import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ProtectedLayout = () => {
  let { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#171717] dark:bg-[#0a0a0a] dark:text-[#f5f5f5]">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedLayout
