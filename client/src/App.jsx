import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Header from "./components/shared/Header";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import NotFound from "./components/NotFound";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();
  // useLoadData();
  const { user } = useSelector((state) => state.user);
  const hideHeaderRoutes = ["/auth"];

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
