// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";
import Header from "../components/Header";
import { useUserId } from "../hooks/useUserId";
import { useAuth } from "../hooks/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useUserId(); // Using custom hook to access setUserId
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to backend
      const response = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        // Login successful, set userId in context and navigate

        const userId = data.user_id;
        login(userId);
        setUserId(userId); // Set userId using context
        console.log("UserId after successful login:", userId);
        navigate("/", { state: { userId } }); // Pass userId as state
        toast.success("Login successful");
      } else {
        // Login failed, display error message
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 bg-dark p-10">
          <div className="p-10 w-full md:w-full md:max-w-md">
            {/* Left side - Form */}
            <form className="flex-1" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Email
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 p-10">
          <h1 className="text-2xl font-semibold mb-4">Free Foodstuff Hub </h1>
          <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-4">Please log in to continue.</p>
          <p className="text-sm text-gray-600">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
