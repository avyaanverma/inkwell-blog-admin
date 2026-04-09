import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
