import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './styles/main.css'
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RecoveryPage from "./pages/RecoveryPage";

function App() {

  const { isLoggedIn } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />
  }

  const myRouter = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/forgot",
      element: <RecoveryPage />
    },
    {
      path: "/",
      element: <RequireAuth><h1>Halaman Utama</h1></RequireAuth>,
    },
  ]);

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={myRouter} />
      </HelmetProvider>
    </>
  );
}

export default App;
