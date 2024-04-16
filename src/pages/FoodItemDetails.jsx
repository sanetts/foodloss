import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const FoodItemDetails = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    // Fetch food item details from the backend when the component mounts
    fetchFoodItem(id); // Pass the id parameter to fetchFoodItem
  }, [id]);

  const fetchFoodItem = async (id) => {
    try {
      // Make a GET request to fetch food item details with the specific id
      const response = await fetch(
        `http://localhost/api/getfooditem.php?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch food item details");
      }
      const data = await response.json();
      setFoodItem(data);
    } catch (error) {
      console.error("Error fetching food item details:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {foodItem ? (
        <>
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              {foodItem.item_name} Details
            </h2>
            <div className="border p-4 rounded-lg shadow-md">
              <img
                src={foodItem.file_name}
                alt={foodItem.item_name}
                className="h-64 object-cover mb-4"
              />
              <p className="text-lg font-semibold mb-2">Description:</p>
              <p className="text-gray-700 mb-4">{foodItem.description}</p>
              <p className="text-lg font-semibold mb-2">Quantity:</p>
              <p className="text-gray-700 mb-4">{foodItem.item_qty}</p>
              <p className="text-lg font-semibold mb-2">Location:</p>
              <p className="text-gray-700 mb-4">{foodItem.location}</p>

              <Link
                className="text-lg font-semibold"
                to={`/profile/${foodItem.uid}`}
              >
                {" "}
                Username:{" "}
              </Link>
              {/* <p className="text-lg font-semibold mb-2">Username:</p> */}
              {/* <p className="text-gray-700 mb-4">{foodItem.user_name}</p> */}
              <Link to={`/profile/${foodItem.uid}`}>{foodItem.user_name}</Link>
              {/* You can add more details here if needed */}
            </div>
            <Link to={`/request-foodstuff/${foodItem.itemid}`}>
              <button
                type="submit"
                className="transition duration-200 bg-green-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                Make a Request
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* <Link to={`/request-foodstuff/${foodItem.item_id}`}></Link> */}
    </div>
  );
};

export default FoodItemDetails;
