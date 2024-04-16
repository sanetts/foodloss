import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Autocomplete } from "@react-google-maps/api";
import { useUserId } from "../hooks/useUserId";


const DonateFoodstuff = () => {

  const { userId } = useUserId() || {};

  useEffect(() => {}, [userId]);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = [];

    // Validate itemName
    if (itemName.length === 0) {
      isProceed = false;
      errorMessage.push("Please enter item name");
    }

    // Validate itemCategory
    // Assuming itemCategory is required and has a predefined list of options
    if (
      itemCategory.length === 0 ||
      ![
        "Fruits",
        "Vegetables",
        "Cooking Oils",
        "Carbohydrates",
        "Proteins",
        "Others",
      ].includes(itemCategory)
    ) {
      isProceed = false;
      errorMessage.push("Please select a valid item category");
    }

    // Validate itemQuantity
    if (
      itemQuantity.length === 0 ||
      isNaN(itemQuantity) ||
      parseInt(itemQuantity) <= 0
    ) {
      isProceed = false;
      errorMessage.push("Please enter a valid item quantity");
    }

    const currentDate = new Date();
    const selectedExpirationDate = new Date(expirationDate);
    selectedExpirationDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (!expirationDate || selectedExpirationDate < currentDate) {
      isProceed = false;
      errorMessage.push("Please select a valid expiration date");
    }

    // Validate pickupLocation
    if (pickupLocation.length === 0) {
      isProceed = false;
      errorMessage.push("Please enter pickup location");
    }

    if (
      startTime.length === 0 ||
      endTime.length === 0 ||
      startTime >= endTime
    ) {
      isProceed = false;
      errorMessage.push("Please select valid pickup time range");
    }

    if (description.length === 0) {
      isProceed = false;
      errorMessage.push("Please enter description");
    }

    const selectedPickupDate = new Date(pickupDate);
    if (!pickupDate || selectedPickupDate < currentDate) {
      isProceed = false;
      errorMessage.push("Please select a valid pickup date in the future");
    }

    if (!image) {
      isProceed = false;
      errorMessage.push("Please upload an image");
    }

    if (!isProceed) {
      errorMessage.forEach((errorMessage) => toast.warn(errorMessage));
      console.log(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) {
      console.log("Invalid");
      return;
    }

  
    try {
      const formData = new FormData();
      formData.append("uid", userId);
      formData.append("itemName", itemName);
      formData.append("itemCategory", itemCategory);
      formData.append("itemQuantity", itemQuantity);
      formData.append("expirationDate", expirationDate);
      formData.append("pickupLocation", pickupLocation);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("description", description);
      formData.append("pickupDate", pickupDate);
      formData.append("image", image);

      // Send the form data to the backend
      const responseUpload = await fetch(
        "http://localhost/api/imageupload.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (responseUpload.ok) {
        const dataUpload = await responseUpload.json();
        console.log(dataUpload);
        if (
          dataUpload.message.includes(
            "Image uploaded and inserted into database successfully"
          )
        ) {
          // Image uploaded successfully, extract image_id
          const imageId = dataUpload.image_id;

          // Now include image_id in form data and submit the entire form
          formData.append("image_id", imageId);

          const responseDonate = await fetch(
            "http://localhost/api/donatefoodstuff.php",
            {
              method: "POST",
              body: formData,
            }
          );

          if (responseDonate.ok) {
            const dataDonate = await responseDonate.json();
            if (dataDonate.message === "Donation submitted successfully") {
              // Donation successful, navigate to receive page
              navigate("/receive");
            } else {
              // Donation failed, display error message
              toast.error(dataDonate.error || "Donation failed");
            }
          } else {
            // HTTP error handling
            console.error("HTTP error:", responseDonate.status);
            toast.error("An error occurred during form submission");
          }
        } else {
          // Image upload failed, display error message
          toast.error(dataUpload.error || "Image upload failed");
        }
      } else {
        // HTTP error handling
        console.error("HTTP error:", responseUpload.status);
        toast.error("An error occurred during form submission");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred during form submission");
    }

    // Reset form fields after submission
    // setItemName("");
    // setItemCategory("");
    // setItemQuantity("");
    // setExpirationDate("");
    // setPickupLocation("");
    // setStartTime("");
    // setEndTime("");
    // setDescription("");
    // setPickupDate("");
    // setImage(null);
    // setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border border-gray-300 shadow-sm rounded-md bg-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Donate Foodstuff
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              placeholder="Enter item name"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemCategory" className="block text-gray-700">
              Item Category
            </label>
            <select
              id="itemCategory"
              className="form-select mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            >
              <option value="">Select category...</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Cooking Oils">Cooking Oils</option>
              <option value="Carbohydrates">Carbohydrates</option>
              <option value="Proteins">Proteins</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="itemQuantity" className="block text-gray-700">
              Item Quantity
            </label>
            <input
              type="number"
              id="itemQuantity"
              placeholder="Enter item quantity"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={itemQuantity}
              onChange={(e) => {
                const newValue = Math.max(0, parseInt(e.target.value)); // Ensure positive number
                setItemQuantity(newValue);
              }}
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-gray-700">
              Expiration Date
            </label>
            <input
              type="date"
              id="expirationDate"
              placeholder="Select expiration date"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pickupLocation" className="block text-gray-700">
              Item Location
            </label>
            <Autocomplete
              onLoad={(autocomplete) => {
                console.log("Autocomplete loaded:", autocomplete);
                setAutocompleteInstance(autocomplete);
              }}
              onPlaceChanged={() => {
                if (autocompleteInstance !== null) {
                  const place = autocompleteInstance.getPlace();
                  console.log("Selected place:", place);
                  setPickupLocation(place.formatted_address);
                } else {
                  console.error("Autocomplete instance is not available.");
                }
              }}
            >
              <input
                type="text"
                id="pickupLocation"
                placeholder="Enter pickup location"
                className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              />
            </Autocomplete>
          </div>
          <div className="mb-4">
            <label htmlFor="pickupDate" className="block text-gray-700">
              Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              placeholder="Select pickup date"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-gray-700">
              Pickup Start Time
            </label>
            <input
              type="time"
              id="startTime"
              placeholder="Select pickup start time"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700">
              Pickup End Time
            </label>
            <input
              type="time"
              id="endTime"
              placeholder="Select pickup end time"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {submitted ? "Donation Submitted!" : "Submit Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateFoodstuff;
