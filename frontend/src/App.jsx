import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Aboutus from "./pages/Aboutus";
import { setAuthToken } from "./services/api";

const checkTokenExpiration = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  if (expirationTime && new Date().getTime() > expirationTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setAuthToken(null);
    window.location.href = "/login"; // Redirect to login if expired
  }
};

function App() {
  useEffect(() => {
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
