import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { FaHome } from "react-icons/fa";
import axios from "axios";

const Listings = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: "5000+",
    bedrooms: 1,
    bathrooms: 1,
    availableOnly: false,
    sortBy: "Newest to Oldest",
  });

  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCity = searchParams.get("city");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log("Fetching listings...");
        const response = await axios.get("http://localhost:4000/api/v1/listings/get", {
          withCredentials: true,
        });

        if(!response.data.success) {
          console.error("Error fetching listings:", response.data.message);
          return;
        }
        const allListings = response.data.listings;
    
        const filteredByCity = selectedCity
          ? allListings.filter((listing) => listing.location === selectedCity)
          : allListings;

        setListings(filteredByCity);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchListings();
  }, [selectedCity]);

  // Apply additional filters
  const filteredListings = listings
    .filter(
      (listing) =>
        listing.price >= filters.minPrice &&
        listing.price <= (filters.maxPrice === "5000+" ? Infinity : filters.maxPrice)
    )
    .filter((listing) => listing.beds >= filters.bedrooms && listing.baths >= filters.bathrooms)
    .filter((listing) => (filters.availableOnly ? listing.available : true))
    .sort((a, b) => {
      if (filters.sortBy === "Highest to Lowest Price") return b.price - a.price;
      if (filters.sortBy === "Lowest to Highest Price") return a.price - b.price;
      return 0;
    });

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
              <div key={listing.id} className="relative rounded-lg overflow-hidden shadow-md bg-white">
                <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

                <div className="absolute top-4 left-4 text-white font-semibold text-lg">
                  {listing.title}
                </div>
                <div className="absolute top-10 left-4 text-white text-sm">{listing.code}</div>

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex items-center justify-center space-x-2">
                  <FaHome />
                  <span>
                    {listing.beds} Beds | {listing.baths} Baths | ${listing.price}
                  </span>
                </div>

                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    listing.available ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {listing.available ? "Available" : "Not Available"}
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
