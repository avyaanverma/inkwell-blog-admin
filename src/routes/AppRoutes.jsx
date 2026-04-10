import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../layout/AppLayout";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Dashboard from "../screens/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
