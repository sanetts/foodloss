import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Link } from "react-router-dom";


const DonorReceivedRequest = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const userId = user;
  console.log(user);
  const fileBaseUrl = "http://localhost/api/apis/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/api/apis/donatedfooditems.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("API response is not an array:", data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="h-full bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Received Requests Food Items
      </h2>
      <div className="overflow-auto w-full">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.rfid} className="py-4 border-b border-gray-200">
              <Link to={`/food/${item.item_id}`}>
                <img
                  src={fileBaseUrl + item.file_name}
                  alt={item.item_name}
                  className="w-20 h-20 mr-4 rounded-full cursor-pointer float-left"
                />
              </Link>
              <div className="ml-24">
                <Link to={`/food/${item.item_id}`}>
                  <h3 className="text-xl font-semibold mb-2 cursor-pointer">
                    {item.item_name}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-1">
                  <strong>Description:</strong> {item.description}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Contact:</strong> {item.contact}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Preferred Time:</strong> {item.preferredTime}
                </p>
                <Link to={`/profile/${item.food_item_uid}`}>
                  <p className="text-gray-600">
                    <strong>Requested:</strong>
                    {item.requested_user_name}
                  </p>
                </Link>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="py-4 text-gray-500">
              No requested food items received.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DonorReceivedRequest;
