import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { FaHome } from "react-icons/fa";
import axios from "axios";

const Listings = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: "5000+",
    availableOnly: false,
    sortBy: "Newest to Oldest",
  });

  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCity = searchParams.get("city");
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log("Fetching listings...");
        const response = await axios.get("http://localhost:4000/api/v1/listings/all-listings", {
          withCredentials: true,
        });

        if (!response.data.success) {
          console.error("Error fetching listings:", response.data.message);
          setListings([]);
          return;
        }

        const allListings = response.data.data || [];

        const filteredByCity = selectedCity
          ? allListings.filter((listing) => listing.location?.toLowerCase() === selectedCity.toLowerCase())
          : allListings;

        console.log("Filtered Listings:", filteredByCity);
        setListings(filteredByCity);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, [selectedCity]);

  // Apply additional filters
  const filteredListings = listings
    .filter((listing) =>
      listing.price >= filters.minPrice &&
      listing.price <= (filters.maxPrice === "5000+" ? Infinity : filters.maxPrice)
    )
    .filter((listing) => (filters.availableOnly ? listing.status === "available" : true))
    .sort((a, b) => {
      if (filters.sortBy === "Highest to Lowest Price") return b.price - a.price;
      if (filters.sortBy === "Lowest to Highest Price") return a.price - b.price;
      return 0;
    });

  // Handle Room Click
  const handleRoomClick = (listing) => {
    navigate(`/room/${listing._id}`, { state: { listing } });
  };

  return (
    <div>
      <FilterSection onFilterChange={setFilters} />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Listings in {selectedCity || "All Cities"}
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div
                key={listing._id}
                className="relative rounded-lg overflow-hidden shadow-md bg-white cursor-pointer"
                onClick={() => handleRoomClick(listing)} // Click event added
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

                <div className="absolute top-4 left-4 text-white font-semibold text-lg">
                  {listing.title}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex items-center justify-center space-x-2">
                  <FaHome />
                  <span> {listing.beds} Beds | {listing.bathrooms} Bathroom | ${listing.price} </span>
                </div>

                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    listing.status === "available" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {listing.status === "available" ? "Available" : "Not Available"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No listings match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
