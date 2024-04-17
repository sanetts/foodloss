import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";

const EditDonatedItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [itemDetails, setItemDetails] = useState({
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    expirationDate: "",
    pickupLocation: "",
    startTime: "",
    endTime: "",
    description: "",
    pickupDate: "",
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/getitemdetails.php?itemId=${itemId}`
        );
        if (response.ok) {
          const data = await response.json();
          setItemDetails(data);
        } else {
          throw new Error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        toast.error("Failed to fetch item details");
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({
      ...itemDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/api/edititem.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...itemDetails,
          userId: user.userId,
          itemId: itemId,
        }),
      });

      if (response.ok) {
        toast.success("Item details updated successfully");
        navigate("/all-donated-items");
      } else {
        throw new Error("Failed to update item details");
      }
    } catch (error) {
      console.error("Error updating item details:", error);
      toast.error("Failed to update item details");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Donated Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="itemName" className="block text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemDetails.itemName}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemCategory" className="block text-gray-700">
            Item Category
          </label>
          <input
            type="text"
            id="itemCategory"
            name="itemCategory"
            value={itemDetails.itemCategory}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemQuantity" className="block text-gray-700">
            Item Quantity
          </label>
          <input
            type="number"
            id="itemQuantity"
            name="itemQuantity"
            value={itemDetails.itemQuantity}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditDonatedItem;
