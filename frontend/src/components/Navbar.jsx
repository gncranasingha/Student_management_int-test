import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-green-300 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="text-white text-2xl font-bold">
            StudentManager
          </Link>

          {/*  Center Links */}
          <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="text-white hover:text-blue-200 transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/*  Right Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn && (
              <>
                <Link
                  to="/register"
                  className="text-black hover:text-blue-200 transition duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-black hover:text-blue-200 transition duration-300"
                >
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-black hover:text-red-500 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 w-64 bg-gradient-to-b from-blue-900 to-green-300 shadow-lg transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="block text-white hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/register"
                  className="block text-white hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block text-white hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block text-white hover:text-red-500 px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
