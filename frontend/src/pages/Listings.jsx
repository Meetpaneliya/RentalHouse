import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn, MdOutlineSquareFoot } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Listings = ({ listings = [] }) => {
  // Define a custom icon for map markers
  const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="flex flex-col md:flex-row h-screen p-3">
      {/* Left Side: Listings */}
      <div className="w-full md:w-[60%] p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">All Listings</h2>
        {listings.length === 0 ? (
          <p>No listings match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="relative bg-white shadow-md rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/Room/${listing._id}`} className="block group">
                  {/* Background Image */}
                  <div className="relative w-full h-52">
                    <img
                      src={listing.images?.[0]?.url || "https://via.placeholder.com/300"}
                      alt={listing.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                    {/* Title & Status */}
                    <div className="absolute top-3 left-3">
                      <h3 className="text-slate-300 bg-black opacity-55 rounded-2xl p-2 text-sm font-semibold">{listing.title}</h3>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {listing.status || "Available"}
                      </span>
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-3 flex justify-between text-gray-300 text-sm">
                    <span className="flex items-center gap-1">
                      <MdOutlineSquareFoot /> {listing.size} ft²
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBed /> {listing.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {listing.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <MdLocationOn /> {listing.floor} Floor
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Map */}
      <div className="w-full md:w-[40%] h-screen md:h-auto mt-4 md:mt-0">
        <MapContainer
          center={[40.7128, -74.006]} // Default center (New York)
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {listings.map(
            (listing, index) =>
              listing.locationGeo?.coordinates && (
                <Marker
                  key={index}
                  position={[
                    listing.locationGeo.coordinates[1],
                    listing.locationGeo.coordinates[0],
                  ]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p>${listing.price} / month</p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Listings;
