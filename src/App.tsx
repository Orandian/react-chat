import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import Home from "./screens/Home";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;

    if (isAuthenticated && location.pathname !== "/home") {
      navigate("/home");
    } else if (isAuthenticated === false && location.pathname !== "/signin" && location.pathname !== "/signup") {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

const RootLayout = () => {
  return (
      <AuthContextProvider>
        <Router>
          <MainLayout />
        </Router>
      </AuthContextProvider>
  );
};

export default RootLayout;
