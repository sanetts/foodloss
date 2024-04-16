import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useUserId } from "../hooks/useUserId";

const RequestFoodStuff = () => {
  const { userId } = useUserId() || {};
  const { id } = useParams();
  const [contact, setContact] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [location, setlocation] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {}, [userId]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=VITE_APP_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setlocation(address);
        setError(null);
      } else {
        setError(
          "No address found for the provided coordinates. Please enter a location."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const displayError = (errorMessage) => {
    // Display error message using a modal or a custom alert dialog
    alert(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      displayError(
        "No address found using live location. Type a location instead."
      );
      return;
    }
    try {
      const response = await fetch("http://localhost/api/submit_request.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: userId,
          item_id: id,
          contact,
          preferredTime,
          location,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok && data.message === "Request submitted successfully") {
        navigate("/profile/uid"); // Pass userId as state
        toast.success("Failed Request Submission");
      } else {
        // Login failed, display error message
        toast.error(data.message || "Login failed");
      }
      // Handle response here (e.g., show success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error here (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border border-gray-300 shadow-sm rounded-md bg-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Request Food Stuff
        </h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700">
              Enter Phone Number
            </label>
            <input
              type="text"
              id="contact"
              placeholder="Enter a callable contact"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preferredTime" className="block text-gray-700">
              Preferred Pickup Time
            </label>
            <input
              type="time"
              id="preferredTime"
              placeholder="Select preferred pickup time"
              className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">
              Pickup Location
            </label>
            <div className="flex items-center">
              <Autocomplete
                onLoad={(autocomplete) => {
                  console.log("Autocomplete loaded:", autocomplete);
                  setAutocomplete(autocomplete); // Save autocomplete instance
                }}
                onPlaceChanged={() => {
                  if (autocomplete) {
                    const place = autocomplete.getPlace();
                    console.log("Selected place:", place);
                    // Update the pickup location state with the selected place
                    setlocation(place.formatted_address);
                    setError(null);
                  }
                }}
              >
                <input
                  type="text"
                  id="location"
                  placeholder="Enter pickup location or use current location"
                  className="form-input mt-1 block w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  required
                />
              </Autocomplete>
              <button
                className="ml-2 p-2 rounded-full bg-blue-500 text-white"
                onClick={getCurrentLocation}
              >
                📍
              </button>
            </div>
            {/* {error && <p className="text-red-500">{error}</p>} */}
          </div>
          <div className="mb-4 text-center">
            <Link to={`/maps/${id}`} className="text-blue-500">
              Check Distance
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestFoodStuff;
