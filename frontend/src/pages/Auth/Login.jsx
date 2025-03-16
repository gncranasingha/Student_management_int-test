import { useState } from "react";
import { api, setAuthToken } from "../../services/api";
import { useNavigate } from "react-router-dom";


const AdminSignin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/adminauth/adminlogin", formData);
      const token = res.data.token;

      const expirationTime = new Date().getTime() + 5 * 60 * 60 * 1000; // 5 hours from now
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);
    
    setAuthToken(token);
    navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminSignin;
