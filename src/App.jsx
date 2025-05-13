import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './styles/main.css'
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RecoveryPage from "./pages/RecoveryPage";
import DashboardPage from "./pages/App/DashboardPage";

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
      element: <DashboardPage />,
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
