import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";

const AllDonatedItems = () => {
  const { user } = useAuth();
  const [donatedItems, setDonatedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donated items from the backend when the component mounts
    const fetchDonatedItems = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/donateditems.php?userId=${user.userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDonatedItems(data);
        } else {
          throw new Error("Failed to fetch donated items");
        }
      } catch (error) {
        console.error("Error fetching donated items:", error);
        toast.error("Failed to fetch donated items");
      }
    };

    fetchDonatedItems();
  }, [user]);

  const handleEdit = (itemId) => {
    // Navigate to the edit page/component with the itemId as a parameter
    navigate(`/edit/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost/api/deleteitem.php?itemId=${itemId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Item deleted successfully, remove it from the UI
          setDonatedItems(
            donatedItems.filter((item) => item.item_id !== itemId)
          );
          toast.success("Item deleted successfully");
        } else {
          // Handle HTTP error
          toast.error("Failed to delete item");
        }
      } catch (error) {
        // Handle other errors
        console.error("Error deleting item:", error);
        toast.error("An error occurred while deleting the item");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Donated Items</h2>
        <ul>
          {donatedItems.map((item) => (
            <li key={item.item_id} className="mb-4">
              <p>
                <strong>Item Name:</strong> {item.itemName}
              </p>
              {/* Display other details of the donated item */}
              <button
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => handleEdit(item.item_id)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(item.item_id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllDonatedItems;
