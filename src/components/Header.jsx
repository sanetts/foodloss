// Header.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserId } from "../hooks/useUserId"; 

const Header = () => {
  const { userId } = useUserId() || {}; 

  useEffect(() => {
    console.log("Header userId:", userId);
  }, [userId]); 

  return (
    <header className="bg-green-900 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-xl font-semibold">
        Free Foodstuff Hub
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/donate" className="hover:text-gray-200">
              Donate
            </Link>
          </li>
          <li>
            <Link to="/receive" className="hover:text-gray-200">
              Receive
            </Link>
          </li>

          {userId && ( // Check if userId is not null
            <li>
              <Link to={`/profile/${userId}`} className="hover:text-gray-200">
                Profile
              </Link>
            </li>
          )}
          <li>
            <Link to="/logout" className="hover:text-gray-200">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
