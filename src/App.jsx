import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000}/>
        </PostProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
