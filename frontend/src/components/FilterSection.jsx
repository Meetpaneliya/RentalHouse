import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Listings from "../pages/Listings";
import { FaChevronDown } from "react-icons/fa";
import { MdApartment, MdHotel } from "react-icons/md";
import { Link } from "react-router-dom";

const FilterSection = () => {

  const amenitiesList = ["WiFi", "AC", "Geyser", "More"];

  const [filters, setFilters] = useState({
    price: [500, 5000],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [],
    location: "",
    rentalRoomName: ""
  });

  const [isResetChecked, setIsResetChecked] = useState(false); // ✅ Moved inside component
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showNearbyFilter, setShowNearbyFilter] = useState(false);
  const [showBedroomsFilter, setShowBedroomsFilter] = useState(false);
  const [showBedBathFilter, setShowBedBathFilter] = useState(false);
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(false);
  const [showRoomNameFilter, setshowRoomNameFilter] = useState(false);
  const [showResetFilter, setShowResetFilter] = useState(false);
  const [showAvailableFilter, setShowAvailableFilter] = useState(false);

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const priceFilterRef = useRef(null);
  const nearbyFilterRef = useRef(null);
  const bedroomsFilterRef = useRef(null);
  const bedBathFilterRef = useRef(null);
  const amenitiesFilterRef = useRef(null);
  const RoomNameFilterRef = useRef(null);
  const resetFilterRef = useRef(null);
  const availableFilterRef = useRef(null);

  // Handle property type selection
  const handlePropertyTypeSelect = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      propertyType: type,
    }));
    //onFilterChange({ ...filters, propertyType: type });
    setShowBedroomsFilter(false);
  };

  // Update bedroom/bathroom count
  const updateCount = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: Math.max(1, prevFilters[type] + value),
    }));
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity) => {
    setFilters((prevFilters) => {
      const updatedAmenities = prevFilters.amenities.includes(amenity)
        ? prevFilters.amenities.filter((item) => item !== amenity)
        : [...prevFilters.amenities, amenity];
      return { ...prevFilters, amenities: updatedAmenities };
    });
  };

   // Filter listings by Room Title
   const handleRoomTitleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rentalRoomName: e.target.value,
    }));
  };

  // Handle available only toggle
  const handleAvailableChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      availableOnly: !prevFilters.availableOnly,
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        priceFilterRef,
        nearbyFilterRef,
        bedroomsFilterRef,
        bedBathFilterRef,
        amenitiesFilterRef,
        RoomNameFilterRef,
        resetFilterRef,
        availableFilterRef,
      ];
      const states = [
        setShowPriceFilter,
        setShowNearbyFilter,
        setShowBedroomsFilter,
        setShowBedBathFilter,
        setShowAmenitiesFilter,
        setshowRoomNameFilter,
        setShowResetFilter,
        setShowAvailableFilter,
      ];

      refs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target)) {
          states[index](false);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  // Fetch listings from the API
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


  // Apply filtering only when filters change
 useEffect(() => {
  if (
    filters &&
    (
      filters.rentalRoomName || 
      filters.location || 
      filters.propertyType || 
      filters.amenities.length > 0 || 
      filters.rooms !== 1 || 
      filters.beds !== 1 || 
      filters.bathrooms !== 1 || 
      filters.price[0] !== 500 || 
      filters.price[1] !== 5000
    )
  ) { 
    // If filters exist, apply filtering on all listings
    const filtered = listings.filter((listing) => {
      const withinPriceRange =
        listing.price >= filters.price[0] && listing.price <= filters.price[1];
      const matchesRooms = listing.rooms >= filters.rooms;
      const matchesBeds = listing.beds >= filters.beds;
      const matchesBathrooms = listing.bathrooms >= filters.bathrooms;
      const matchesLocation = filters.location
        ? listing.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesAmenities = filters.amenities.every((amenity) =>
        listing.amenities.includes(amenity)
      );
      const matchesPropertyType = filters.propertyType
        ? listing.propertyType === filters.propertyType
        : true;
      const matchesRentalRoomName = filters.rentalRoomName
        ? listing.title.toLowerCase().includes(filters.rentalRoomName.toLowerCase())
        : true;  

      return (
        withinPriceRange &&
        matchesRooms &&
        matchesBeds &&
        matchesBathrooms &&
        matchesLocation &&
        matchesAmenities &&
        matchesPropertyType &&
        matchesRentalRoomName
      );
    });

    setFilteredListings(filtered);
  } else {
    setFilteredListings([...listings]); 
  }
}, [filters, listings]);

// ✅ Proper Reset Filters Function
const handleResetFilters = () => {
  setFilters({
    price: [500, 5000],
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [],
    location: "",
    propertyType: "",
    availableOnly: false,
    rentalRoomName: ""
  });
};

  return (
    <div>

      {/* All Filter */}
      <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg flex flex-wrap items-center justify-between overflow-visible relative">
        <h1 className="text-slate-900 font-semibold text-3xl"> June </h1>

        <div className="flex gap-4">
          {/* Price Filter */}
          <div className="relative" ref={priceFilterRef}>
            <button
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className="px-4 py-2 border rounded-full shadow text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Price</span>
              <FaChevronDown className="text-black" />
            </button>
            {showPriceFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <h3 className="text-lg font-semibold mb-4 text-center">Price Range</h3>
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={`$${filters.price[0]}`}
                    readOnly
                    className="w-1/2 px-4 py-2 border rounded-lg text-gray-500 text-center mr-2"
                  />
                  <input
                    type="text"
                    value={`$${filters.price[1]}`}
                    readOnly
                    className="w-1/2 px-4 py-2 border rounded-lg text-gray-500 text-center"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    value={filters.price[0]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        price: [Number(e.target.value), prev.price[1]],
                      }))
                    }
                    className="w-full bg-indigo-900 h-2 rounded-lg outline-none"
                  />
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    value={filters.price[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        price: [prev.price[0], Number(e.target.value)],
                      }))
                    }
                    className="w-full bg-indigo-900 h-2 rounded-lg outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Unsure of your price range?{" "}
                  <a href="#" className="text-indigo-800 underline">
                    Get pre-approved.
                  </a>
                </p>
                <button
                  className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowPriceFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Nearby Filter */}
          <div className="relative" ref={nearbyFilterRef}>
            <button
              onClick={() => setShowNearbyFilter(!showNearbyFilter)}
              className="px-4 py-2 border rounded-full shadow text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Nearby</span>
              <FaChevronDown className="text-black" />
            </button>
            {showNearbyFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <h3 className="text-lg font-semibold mb-4">Search by Neighborhood</h3>
                <input
                  type="text"
                  placeholder="Search by Neighborhood"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg text-gray-500 mb-4"
                />
                <div className="space-y-2">
                  {["Brooklyn", "Bedford-Stuyvesant, Brooklyn", "Bushwick, Brooklyn", "Clinton Hill, Brooklyn", "Crown Heights, Brooklyn"]
                    .filter((neighborhood) =>
                      neighborhood.toLowerCase().includes(filters.location.toLowerCase())
                    )
                    .map((neighborhood, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.location === neighborhood}
                          onChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              location: neighborhood,
                            }))
                          }
                          className="form-checkbox h-4 w-4 text-indigo-800"
                        />
                        <span>{neighborhood}</span>
                      </label>
                    ))}
                </div>
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowNearbyFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Property Type Filter */}
          <div className="relative" ref={bedroomsFilterRef}>
            <button
              onClick={() => setShowBedroomsFilter(!showBedroomsFilter)}
              className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>{filters.propertyType || "Property Type"}</span>
              <FaChevronDown className="text-black" />
            </button>
            {showBedroomsFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer ${filters.propertyType === "Apartment" ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handlePropertyTypeSelect("apartment")}
                  >
                    <MdApartment className="text-3xl text-indigo-800" />
                    <span className="mt-2 font-medium">Apartment</span>
                  </div>
                  <div
                    className={`w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer ${filters.propertyType === "Bedroom" ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handlePropertyTypeSelect("hotel")}
                  >
                    <MdHotel className="text-3xl text-indigo-800" />
                    <span className="mt-2 font-medium">Hotel</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  This is a shared apartment that you will rent with other roommates. June will help you find them.
                </p>
                <button
                  className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowBedroomsFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Bed/Bath Filter */}
          <div className="relative" ref={bedBathFilterRef}>
            <button
              onClick={() => setShowBedBathFilter(!showBedBathFilter)}
              className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Bed/Bath</span>
              <FaChevronDown className="text-black" />
            </button>
            {showBedBathFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <div className="grid grid-cols-2 divide-x">
                  <div className="flex flex-col items-center px-4">
                    <span className="text-indigo-700 font-semibold text-lg">Bed</span>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateCount("beds", 1)}
                        className="bg-indigo-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-900"
                      >
                        +
                      </button>
                      <span className="text-indigo-700 font-bold text-lg">{filters.beds}</span>
                      <button
                        onClick={() => updateCount("beds", -1)}
                        className="bg-indigo-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-900"
                      >
                        −
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-indigo-700 font-semibold text-lg">Bath</span>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateCount("bathrooms", 1)}
                        className="bg-indigo-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-900"
                      >
                        +
                      </button>
                      <span className="text-indigo-700 font-bold text-lg">{filters.bathrooms}</span>
                      <button
                        onClick={() => updateCount("bathrooms", -1)}
                        className="bg-indigo-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-900"
                      >
                        −
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowBedBathFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Amenities Filter */}
          <div className="relative" ref={amenitiesFilterRef}>
            <button
              onClick={() => setShowAmenitiesFilter(!showAmenitiesFilter)}
              className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Amenities</span>
              <FaChevronDown className="text-black" />
            </button>
            {showAmenitiesFilter && (
              <div className="absolute left-0 mt-3 w-72 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <div className="space-y-3">
                  {amenitiesList.map((amenity, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="form-checkbox h-5 w-5 text-indigo-800 rounded bg-indigo-800"
                      />
                      <span className="text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowAmenitiesFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Listing ID Filter */}
          <div className="relative" ref={RoomNameFilterRef}>
            <button
              onClick={() => setshowRoomNameFilter(!showRoomNameFilter)}
              className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Listing Room</span>
              <FaChevronDown className="text-black" />
            </button>
            {showRoomNameFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <h3 className="text-lg font-semibold mb-4 text-center">Listing Room</h3>
                <input
                  type="text"
                  value={filters.rentalRoomName}
                  onChange={handleRoomTitleFilterChange}
                  placeholder="Enter the Rental Room Name"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setshowRoomNameFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Available Filter */}
          <div className="relative" ref={availableFilterRef}>
            <button
              onClick={() => setShowAvailableFilter(!showAvailableFilter)}
              className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
            >
              <span>Available</span>
              <FaChevronDown className="text-black" />
            </button>
            {showAvailableFilter && (
              <div className="absolute left-0 mt-3 w-72 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.availableOnly}
                    onChange={handleAvailableChange}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-indigo-700 font-semibold text-lg">Show only Available</span>
                </label>
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => setShowAvailableFilter(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Reset Filter */}
          <div className="relative" ref={resetFilterRef}>
            <button
              onClick={() => setShowResetFilter(!showResetFilter)}
              className="px-5 py-2 bg-red-600 text-white rounded-full shadow cursor-pointer hover:bg-red-700"
            >
              Reset
            </button>
            {showResetFilter && (
              <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isResetChecked}
                    onChange={() => setIsResetChecked(!isResetChecked)} // Toggle checkbox state
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="text-indigo-700 font-semibold text-lg">Reset Filters</span>
                </label>
                <button
                  className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
                  onClick={() => {
                    handleResetFilters(); // Reset filters
                    setShowResetFilter(false); // Close dropdown
                  }}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Add Listing btn */}
        <Link to={"/ListingForm"}>
          <button className="px-5 py-2 ml-5 bg-slate-700 text-white rounded-full shadow cursor-pointer hover:bg-slate-900">Add Room</button>
        </Link>

      </div>

      {/* Listings + Map section */}
      <div>
        <Listings listings={filteredListings} />
      </div>

    </div>

  );
};

export default FilterSection;


























