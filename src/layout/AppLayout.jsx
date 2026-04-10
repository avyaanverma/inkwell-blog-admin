import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
