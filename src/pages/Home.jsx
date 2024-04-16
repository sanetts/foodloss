import React from "react";
import { Link } from "react-router-dom";
import foodImage1 from "../photos/food.jpeg";
import foodImage2 from "../photos/food2.jpeg";
import foodImage3 from "../photos/food3.jpeg";
import foodImage4 from "../photos/food4.jpeg";
import foodImage5 from "../photos/food6.png";

const Home = () => {
  const headerStyle = {
    backgroundImage: `url(${foodImage5})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "100px 0",
    textAlign: "center",
    color: "white",
  };

  return (
    <div>
      <div className="flex justify-center" style={headerStyle}>
        <div className="flex justify-center z-0 bg-green-900 p-10 w-7/12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Free Foodstuff Hub!
            </h1>
            <p className="text-lg mb-8">
              Better Donated than Wasted <br /> Don't wait till your foodstuffs
              completely goes bad, donate it and feed somebody
            </p>
            <div className="flex justify-center">
              <Link
                to="/donate"
                className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg mr-4"
              >
                Donate Now
              </Link>
              <Link
                to="/receive"
                className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Receive Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <img
              src={foodImage1}
              alt="Food Donation"
              className="w-full mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold mb-4">Why Donate?</h2>
            <p className="text-sm text-gray-600">
              Learn about the impact of food donation and how you can make a
              difference in your community.
            </p>
            <Link
              to="/why-donate"
              className="block mt-4 text-blue-500 font-semibold hover:underline"
            >
              Learn More
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img
              src={foodImage2}
              alt="Food Donation"
              className="w-full mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold mb-4">Our Mission</h2>
            <p className="text-sm text-gray-600">
              Discover our vision and values, and see how we're striving to
              create a world without hunger.
            </p>
            <Link
              to="/mission"
              className="block mt-4 text-blue-500 font-semibold hover:underline"
            >
              Explore
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <img
              src={foodImage4}
              alt="Food Donation"
              className="w-full mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold mb-4">Get Involved</h2>
            <p className="text-sm text-gray-600">
              Find out how you can volunteer, partner with us, or organize a
              food drive in your area.
            </p>
            <Link
              to="/get-involved"
              className="block mt-4 text-blue-500 font-semibold hover:underline"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
