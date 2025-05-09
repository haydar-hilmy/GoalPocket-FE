import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './styles/main.css'

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
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
