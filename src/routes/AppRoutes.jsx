import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../layout/AppLayout";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Dashboard from "../screens/Dashboard";
import ProtectedLayout from "../layout/ProtectedLayout";
import NewPost from "../screens/NewPost";
import Post from "../screens/Post";

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
        path: "blog/:id",
        element: <Post/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedLayout/>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: "posts/new",
        element: <NewPost/>
      },
      {
        path: "posts/:id/edit",
        element: <NewPost/>
      }
    ]
  }
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
