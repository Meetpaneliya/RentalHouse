import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn, MdOutlineSquareFoot } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({
    price: [500, 5000],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [],
    location: "",
  });

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/listings/all");
        setListings(response.data);
        setFilteredListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const updatedListings = listings.filter((listing) => {
      return (
        listing.price >= filters.price[0] &&
        listing.price <= filters.price[1] &&
        listing.rooms >= filters.rooms &&
        listing.beds >= filters.beds &&
        listing.bathrooms >= filters.bathrooms &&
        (filters.amenities.length === 0 || filters.amenities.every(amenity => listing.amenities.includes(amenity))) &&
        (filters.location === "" || listing.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });

    setFilteredListings(updatedListings);
  }, [filters, listings]);

  const applyFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActiveFilter(null);
  };
  const navigate = useNavigate();

  return (
    <div className="relative p-4">
      <nav className="flex justify-between items-center bg-white shadow-md p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold text-indigo-800">StaySafe</h1>
        <div className="flex gap-2">
          {["Price", "Nearby", "Bedrooms", "Bed/Bath", "Location", "Amenities"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase())}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 text-gray-700"
            >
              {filter} ▼
            </button>

          ))}
          <button
            onClick={() => {
              setFilters({
                price: [500, 5000],
                rooms: 1,
                beds: 1,
                bathrooms: 1,
                amenities: [],
                location: "",
              });
              setFilteredListings(listings); // Reset to all listings
              setActiveFilter(null);
            }}
            className="px-4 py-2 bg-red-500 text-white border border-red-600 rounded-full shadow-sm hover:bg-red-600"
          >
            Reset
          </button>

        </div>
        <button
          onClick={() => navigate("/ListingForm")}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-900 transition"
        >
          Add Home
        </button>

      </nav>

      {activeFilter && (
        <Dialog open={!!activeFilter} onClose={() => setActiveFilter(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</h2>
            {activeFilter === "price" && (
              <>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={filters.price[0]}
                  onChange={(e) =>
                    setFilters({ ...filters, price: [Number(e.target.value), filters.price[1]] })
                  }
                  className="w-full"
                />
                <p>Min Price: ${filters.price[0]}</p>

                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={filters.price[1]}
                  onChange={(e) =>
                    setFilters({ ...filters, price: [filters.price[0], Number(e.target.value)] })
                  }
                  className="w-full"
                />
                <p>Max Price: ${filters.price[1]}</p>
              </>
            )}

            {/* Number Filters (Rooms, Beds, Bathrooms) */}
            {["bedrooms", "bed/bath", "bathrooms"].includes(activeFilter) && (
              <select
                value={filters[activeFilter]}
                onChange={(e) => setFilters({ ...filters, [activeFilter]: Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            )}

            {/* Location Filter */}
            {activeFilter === "location" && (
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            )}



            {activeFilter === "amenities" && (
              <div className="space-y-2">
                {["WiFi", "AC", "Geyser"].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        const updatedAmenities = e.target.checked
                          ? [...filters.amenities, amenity]
                          : filters.amenities.filter(a => a !== amenity);
                        setFilters({ ...filters, amenities: updatedAmenities });
                      }}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={() => setActiveFilter(null)} className="px-4 py-2 bg-gray-300 rounded-md">Reset</button>
              <button onClick={() => applyFilter(activeFilter, filters[activeFilter])} className="px-4 py-2 bg-indigo-800 text-white rounded-md">Apply</button>
            </div>
          </div>
        </Dialog>
      )}

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Filtered Listings</h2>
        {filteredListings.length === 0 ? (
          <p>No listings match your filters.</p>
        ) : (

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((listing) => (
              <li key={listing._id} className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">
                <Link to={`/Room/${listing._id}`} key={listing._id} >
                  <img src={listing.images?.[0]?.url || "https://via.placeholder.com/300"} alt={listing.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <p className="text-gray-500 text-sm">#{listing.id}</p>
                    <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                      <MdOutlineSquareFoot /> {listing.size} ft | {listing.floor} Floor | <FaBed /> {listing.beds} Beds | <FaBath /> {listing.bathrooms} Bath
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

        )}
      </div>
    </div>
  );
};

export default Listings;
