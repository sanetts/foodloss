import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserId } from "../hooks/useUserId";

const ViewProfile = () => {
  const { uid } = useParams(); // Get the uid parameter from the URL
  const [userDetails, setUserDetails] = useState(null);
  const { userId } = useUserId() || {}; // Using custom hook to access userId

  useEffect(() => {
    // Fetch user details from the backend when the component mounts
    fetchUserDetails(uid); // Pass the uid parameter to fetchUserDetails
  }, [uid]);

  const fetchUserDetails = async (uid) => {
    try {
      // Make a GET request to fetch user details with the specific uid
      const response = await fetch(
        `http://localhost/api/getuserdetails.php?uid=${uid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <p>userId: {userId}</p>
      <p>uid: {uid}</p>
      {userDetails ? (
        <>
          <h2 className="text-3xl font-semibold mb-4">User Details</h2>
          <div className="border p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">First Name:</p>
            <p className="text-gray-700 mb-4">{userDetails.fname}</p>
            <p className="text-lg font-semibold mb-2">Last Name:</p>
            <p className="text-gray-700 mb-4">{userDetails.lname}</p>
            <p className="text-lg font-semibold mb-2">Gender:</p>
            <p className="text-gray-700 mb-4">{userDetails.gender}</p>
            <p className="text-lg font-semibold mb-2">Email:</p>
            <p className="text-gray-700 mb-4">{userDetails.email}</p>
          </div>
          {userId !== uid && (
            <Link to={`/message/${uid}`}>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send Message
              </button>
            </Link>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewProfile;
