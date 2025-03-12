import React from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "New York", image: "/assets/city1.jpg" },
  { name: "Boston", image: "/assets/city2.jpg" },
  { name: "Washington DC", image: "/assets/city3.jpg" },
  { name: "Austin", image: "/assets/city4.jpg" },
  { name: "Chicago", image: "/assets/city5.jpg" },
  { name: "Los Angeles", image: "/assets/city6.jpg" },
  { name: "San Francisco", image: "/assets/city7.jpg" },
  { name: "San Diego", image: "/assets/city8.jpg" },
  { name: "Dallas", image: "/assets/city9.jpg" },
  { name: "Jersey City", image: "/assets/city10.jpg" },
];

export default function CitySearch() {
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    navigate(`/listings?city=${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="max-w-6xl mx-auto text-center py-10">
      <h2 className="text-3xl font-bold text-black-700">Search by City</h2>
      <p className="text-black-600 text-lg mt-2">
        Explore thousands of listings across 10 major cities.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10 px-4">
        {cities.map((city, index) => (
          <div
            key={index}
            className="relative group cursor-pointer shadow-lg custom-rounded overflow-hidden"
            onClick={() => handleCityClick(city.name)}
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <p className="text-white text-lg font-bold text-center bg-opacity-50 px-3 py-1 rounded-md">
                {city.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
