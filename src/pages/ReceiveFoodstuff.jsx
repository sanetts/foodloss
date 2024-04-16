import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FoodItemDetails from "./FoodItemDetails";
import Map from "./Map";
import geocodeAddress from "../components/Geocode";
const ReceiveFoodstuff = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("interaction_time");
  const [showMap, setShowMap] = useState(false);
  const [geocodedMarkers, setGeocodedMarkers] = useState([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  useEffect(() => {
    sortItems();
  }, [sortBy, foodItems]);

  useEffect(() => {
    handleFilterChange({ target: { value: "all" } });
  }, [foodItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch(
        "http://localhost/api/retrievefoodstuff.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch food items");
      }
      const data = await response.json();
      const updatedFoodItems = data.map((item) => ({
        ...item,
        location: constructLocation(item),
      }));
      setFoodItems(updatedFoodItems);
      geocodeMarkers(updatedFoodItems);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const constructLocation = (item) => {
    return `${item.location}`;
  };

  const geocodeMarkers = async (items) => {
    try {
      const geocodedMarkers = await Promise.all(
        items.map(async (item) => {
          const { location } = item;
          const response = await geocodeAddress(location);
          if (response && response.lat && response.lng) {
            const { lat, lng } = response;
            return { position: { lat, lng } };
          } else {
            // console.error("Error geocoding address:", location);
            return null;
          }
        })
      );
      const validGeocodedMarkers = geocodedMarkers.filter(
        (marker) => marker !== null && marker.position
      );
      setGeocodedMarkers(validGeocodedMarkers);
      console.log("List of Geocoded Markers:", validGeocodedMarkers);
    } catch (error) {
      console.error("Error geocoding markers:", error);
    }
  };

  const sortItems = () => {
    let sorted = [...foodItems];
    if (sortBy === "time_asc") {
      sorted = sorted.sort((a, b) =>
        a.interaction_time > b.interaction_time ? 1 : -1
      );
    } else if (sortBy === "time_desc") {
      sorted = sorted.sort((a, b) =>
        a.interaction_time < b.interaction_time ? 1 : -1
      );
    } else if (sortBy === "name_asc") {
      sorted = sorted.sort((a, b) => (a.item_name > b.item_name ? 1 : -1));
    } else if (sortBy === "name_desc") {
      sorted = sorted.sort((a, b) => (a.item_name < b.item_name ? 1 : -1));
    }
    setFilteredItems(sorted);
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    if (category === "all") {
      setFilteredItems(foodItems);
    } else {
      const filtered = foodItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const hasNextPage = indexOfLastItem < filteredItems.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Receive Foodstuff</h2>
      <div className="flex mb-4">
        <select
          className="mr-4 p-2 border rounded-md"
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Cooking Oils">Cooking Oils</option>
          <option value="Carbohydrates">Carbohydrates</option>
          <option value="Proteins">Proteins</option>
          <option value="Others">Others</option>
        </select>
        <select
          className="p-2 border rounded-md"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="">None</option>
          <option value="time_asc">Time Ascending</option>
          <option value="time_desc">Time Descending</option>
          <option value="name_asc">Name Ascending</option>
          <option value="name_desc">Name Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <Link to={`/food/${item.itemid}`} key={item.itemid}>
            <div className="border p-4 rounded-lg shadow-md cursor-pointer">
              <img
                src={item.file_name}
                alt={item.item_name}
                className="h-32 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{item.item_name}</h3>
              <p>Quantity: {item.item_qty}</p>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
      <button
        onClick={() => setShowMap(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Food Near Me
      </button>
      {showMap && <Map markers={geocodedMarkers} />}
    </div>
  );
};

export default ReceiveFoodstuff;
