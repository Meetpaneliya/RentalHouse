import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn, MdOutlineSquareFoot } from "react-icons/md";

const Listings = ({ listings = [] }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Listings</h2>
      {listings.length === 0 ? (
        <p>No listings match your filters.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <li
              key={listing._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300 hover:shadow-4xl transition-shadow duration-300"
            >
              <Link to={`/Room/${listing._id}`} className="block group">
                {/* Image Section */}
                <div className="relative w-full h-60">
                  <img
                    src={listing.images?.[0]?.url || "https://via.placeholder.com/300"}
                    alt={listing.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Top-left: Title */}
                <h3 className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-base font-semibold px-3 py-1 rounded-lg shadow-md">
                  {listing.title}
                </h3>

                {/* Top-right: Status */}
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {listing.status || "Available"}
                </span>

                {/* Bottom Section: Details */}
                <div className="absolute bottom-0 w-full bg-black bg-opacity-15 text-white text-sm p-4 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <MdOutlineSquareFoot className="text-white" /> {listing.size} ft²
                  </span>
                  <span className="flex items-center gap-2">
                    <FaBed className="text-white" /> {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-2">
                    <FaBath className="text-white" /> {listing.bathrooms} Baths
                  </span>
                  <span className="flex items-center gap-2">
                    <MdLocationOn className="text-white" /> {listing.floor} Floor
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listings;