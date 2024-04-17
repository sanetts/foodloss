import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Logout from "../src/pages/Logout";
import DonateFoodstuff from "../src/pages/DonateFoodstuff";
import Map from "../src/pages/Map";
import Maps from "../src/pages/Maps";
import ReceiveFoodstuff from "../src/pages/ReceiveFoodstuff";
import RequestFoodstuff from "../src/pages/RequestFoodstuff";
import FoodItemDetails from "../src/pages/FoodItemDetails";

import ViewProfile from "../src/pages/ViewProfile";
import { useAuth } from "./hooks/AuthContext";
import { UserIdProvider } from "./hooks/useUserId";
import { ModalProvider } from "./hooks/ModalContext";
import { useModal } from "./hooks/ModalContext";
import "./App.css";
import CommunityEngagement from "./pages/CommunityEngagement";

function App() {
  return (
    <UserIdProvider>
      <ModalProvider>
        <Router>
          <AppContent />
        </Router>
      </ModalProvider>
    </UserIdProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();
  const { openModal } = useModal();

  console.log("Current location:", location.pathname);
  console.log("Authenticated user:", user);

  useEffect(() => {
    // Redirect to login page if the user tries to access a protected page without being authenticated
    if (!user && isProtectedPage(location.pathname)) {
      console.log("Redirecting to login page");
      openModal();
    }
  }, [user, location.pathname, openModal]);

  // Function to check if a page is protected
  const isProtectedPage = (pathname) => {
    // Define your protected routes here
    const protectedRoutes = [];
    return protectedRoutes.some((route) => pathname.startsWith(route));
  };

  return (
    <div className="app">
      <Header />
      <ToastContainer />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/receive" element={<ReceiveFoodstuff />} />
          <Route path="/request-foodstuff/:id" element={<RequestFoodstuff />} />
          <Route path="/food/:id" element={<FoodItemDetails />} />
          <Route path="/map" element={<Map />} />
          <Route path="/maps/:id" element={<Maps />} />
          <Route path="/cummunity" element={<CommunityEngagement />} />
          {/* Add the Logout route */}

          <Route path="/donate" element={<DonateFoodstuff />} />
          <Route path="/profile/:uid" element={<ViewProfile />} />
          
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
