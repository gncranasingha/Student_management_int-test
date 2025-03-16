
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Aboutus from "./pages/Aboutus";


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>} />
        <Route path="dashboard" element={<AdminDashboard/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
