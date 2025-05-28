import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles/main.css";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RecoveryPage from "./pages/RecoveryPage";
import DashboardPage from "./pages/App/DashboardPage";
import AddTransactionPage from "./pages/App/AddTransactionPage";
import RequireAuth from "./utils/auth/RequireAuth";
import RedirectIfLoggedIn from "./utils/auth/RedirectIfLoggedIn";
import { LogoutPage } from "./pages/LogoutPage";
import { ProfilePage } from "./pages/App/ProfilePage";
import ChangePasswordPage from "./pages/App/ChangePassswordPage";
import RencanaPage from "./pages/App/RencanaPage";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/login",
      element: (
        <RedirectIfLoggedIn>
          <LoginPage />
        </RedirectIfLoggedIn>
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forgot",
      element: <RecoveryPage />,
    },
    {
      path: "/logout",
      element: <LogoutPage />,
    },
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "/add",
          element: <AddTransactionPage />,
        },
        {
          path: "/profile",
          element: (
            <ProfilePage />
          ),
        },
        {
          path: "/pass",
          element: <ChangePasswordPage />
        },
        {
          path: "/rencana",
          element: <RencanaPage />
        },
      ],
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
