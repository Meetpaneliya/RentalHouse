import React, { useState } from "react";
import FilterSection from "../components/FilterSection";
import { FaHome } from "react-icons/fa";

// Sample listings data (replace with API data if needed)
const listingsData = [
  {
    id: 1,
    title: "Upper West Side - Bedroom",
    code: "#363-A",
    price: 1200,
    beds: 4,
    baths: 1,
    available: true,
    image: "/assets/room3.jpg",
  },
  {
    id: 2,
    title: "Downtown Apartment",
    code: "#872-B",
    price: 2500,
    beds: 2,
    baths: 2,
    available: false,
    image: "/assets/room1.jpg",
  },
  {
    id: 3,
    title: "Luxury Studio",
    code: "#210-C",
    price: 3000,
    beds: 1,
    baths: 1,
    available: true,
    image: "/assets/room2.jpg",
  },
  {
    id: 4,
    title: "Cozy Loft",
    code: "#405-D",
    price: 1800,
    beds: 3,
    baths: 2,
    available: true,
    image: "/assets/room5.jpg",
  },
];

const Listings = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: "5000+",
    bedrooms: 1,
    bathrooms: 1,
    availableOnly: false,
    sortBy: "Newest to Oldest",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters
  const filteredListings = listingsData
    .filter((listing) => listing.price >= filters.minPrice && listing.price <= (filters.maxPrice === "5000+" ? Infinity : filters.maxPrice))
    .filter((listing) => listing.beds >= filters.bedrooms && listing.baths >= filters.bathrooms)
    .filter((listing) => (filters.availableOnly ? listing.available : true))
    .sort((a, b) => {
      if (filters.sortBy === "Highest to Lowest Price") return b.price - a.price;
      if (filters.sortBy === "Lowest to Highest Price") return a.price - b.price;
      return 0;
    });

  return (
    <div>
    <FilterSection onFilterChange={handleFilterChange} />
    <div className="max-w-6xl mx-auto p-6">
      {/* Filter Section */}
      


      {/* Listings Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div key={listing.id} className="relative rounded-lg overflow-hidden shadow-md bg-white">
              <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

              {/* Listing Title */}
              <div className="absolute top-4 left-4 text-white font-semibold text-lg">
                {listing.title}
              </div>

              {/* Listing Code */}
              <div className="absolute top-10 left-4 text-white text-sm">
                {listing.code}
              </div>

              {/* Listing Details */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex items-center justify-center space-x-2">
                <FaHome />
                <span>{listing.beds} Beds | {listing.baths} Baths | ${listing.price}</span>
              </div>

              {/* Availability Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${listing.available ? "bg-green-500" : "bg-red-500"} text-white`}>
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



