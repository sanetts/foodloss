import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) {
      isProceed = false;
      errorMessage = "Please enter your name";
    } else if (lastname.length === 0) {
      isProceed = false;
      errorMessage = "Please enter your last name";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter your email";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Please enter a valid phone number";
    } else if (!["male", "female"].includes(gender.toLowerCase())) {
      isProceed = false;
      errorMessage = "Please select a valid gender";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Password must be at least 6 characters long";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please confirm your password";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords do not match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) {
      return;
    }

    try {
      // Send registration data to backend
      const response = await fetch("http://localhost/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
          phone,
          gender,
          status,
        }),
      });

      // const data = await response.json();
      // console.log(data);
      // console.log(response);
      // const responseBodyText = await response.text();
      // console.log(responseBodyText);

      // // Get the response body as JSON
      // const responseBodyJSON = await response.json();
      // console.log(responseBodyJSON);
      // const data = await response.json();
      // console.log(data);
      if (response.ok) {
        // Registration successful, navigate to login page
        navigate("/login");
        toast.success("Registration successful. Please login.");
      } else {
        // Registration failed, display error message
        const data = await response.json();
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-dark p-10">
        <div className="p-10 w-full md:w-full md:max-w-md">
          {/* Left side - Form */}
          <form className="flex-1" onSubmit={handleSubmit}>
            <label className="font-semibold text-sm pb-1 block text-accent-content">
             First Name
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="font-semibold text-sm pb-1 block text-accent-content">
              Last Name
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
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
              Phone
            </label>
            <input
              type="tel"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label className="font-semibold text-sm pb-1 block text-accent-content">
              Gender
            </label>
            <select
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <label className="font-semibold text-sm pb-1 block text-accent-content">
              Confirm Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-gray-200 p-10">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to our Food Donation Platform!
        </h2>
        <p className="text-lg mb-4">
          Join our community and make a difference. Whether you want to donate
          food or receive assistance, we're here to help.
        </p>
        <p className="text-lg mb-4">
          By registering, you're helping us fight food waste and hunger in your
          community.
        </p>
        <p className="text-lg mb-4">
          Why would you mostly be interacting with the platform
        </p>
        <div className="mb-4">
          <label className="font-semibold text-sm block text-accent-content">
            Select your most likely usage purpose:
          </label>
          <select
            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="sender">I want to donate food</option>
            <option value="receiver">I need assistance</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
