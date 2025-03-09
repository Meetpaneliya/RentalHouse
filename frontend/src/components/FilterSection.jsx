import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdApartment, MdHotel } from "react-icons/md";

const amenitiesList = ["WiFi", "AC", "Geyser", "More"];
const sortByOptions = [
  "Highest to Lowest Price",
  "Lowest to Highest Price",
  "Newest to Oldest",
  "Oldest to Newest",
];

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: "500",
    maxPrice: "5000+",
    bedrooms: 1,
    bathrooms: 1,
    listingId: "",
    sortBy: "Newest to Oldest",
    availableOnly: false,
    amenities: [],
  });
  const [isResetChecked, setIsResetChecked] = useState(false); // ✅ Moved inside component


  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showNearbyFilter, setShowNearbyFilter] = useState(false);
  const [showBedroomsFilter, setShowBedroomsFilter] = useState(false);
  const [showBedBathFilter, setShowBedBathFilter] = useState(false);
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(false);
  const [showListingIdFilter, setShowListingIdFilter] = useState(false);
  const [showResetFilter, setShowResetFilter] = useState(false);
  const [showSortByFilter, setShowSortByFilter] = useState(false);
  const [showAvailableFilter, setShowAvailableFilter] = useState(false);

  const priceFilterRef = useRef(null);
  const nearbyFilterRef = useRef(null);
  const bedroomsFilterRef = useRef(null);
  const bedBathFilterRef = useRef(null);
  const amenitiesFilterRef = useRef(null);
  const listingIdFilterRef = useRef(null);
  const resetFilterRef = useRef(null);
  const sortByFilterRef = useRef(null);
  const availableFilterRef = useRef(null);

  // Reset all filters
  const handleResetFilters = () => {
    const resetFilters = {
      minPrice: "500",
      maxPrice: "5000+",
      bedrooms: 1,
      bathrooms: 1,
      listingId: "",
      sortBy: "Newest to Oldest",
      availableOnly: false,
      amenities: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    setIsResetChecked(false); 
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle property type selection
  const handlePropertyTypeSelect = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      propertyType: type,
    }));
    onFilterChange({ ...filters, propertyType: type });
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

  // Handle sort by selection
  const handleSortByChange = (option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: option,
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
        listingIdFilterRef,
        resetFilterRef,
        sortByFilterRef,
        availableFilterRef,
      ];
      const states = [
        setShowPriceFilter,
        setShowNearbyFilter,
        setShowBedroomsFilter,
        setShowBedBathFilter,
        setShowAmenitiesFilter,
        setShowListingIdFilter,
        setShowResetFilter,
        setShowSortByFilter,
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

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 bg-white shadow-md rounded-lg flex flex-wrap gap-4 items-center justify-start overflow-visible relative">
      {/* Price Filter */}
      <div className="relative" ref={priceFilterRef}>
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
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
                value={`$${filters.minPrice}`}
                readOnly
                className="w-1/2 px-4 py-2 border rounded-lg text-gray-500 text-center mr-2"
              />
              <input
                type="text"
                value={`$${filters.maxPrice}`}
                readOnly
                className="w-1/2 px-4 py-2 border rounded-lg text-gray-500 text-center"
              />
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              value={filters.minPrice.replace("$", "")}
              name="minPrice"
              onChange={handleChange}
              className="w-full mb-4 bg-indigo-900 h-2 rounded-lg outline-none"
            />
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
          className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
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
              className="w-full px-4 py-2 border rounded-lg text-gray-500 mb-4"
            />
            <div className="space-y-2">
              {["Brooklyn", "Bedford-Stuyvesant, Brooklyn", "Bushwick, Brooklyn", "Clinton Hill, Brooklyn", "Crown Heights, Brooklyn"].map((neighborhood, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-800" />
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
                className={`w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer ${
                  filters.propertyType === "Apartment" ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handlePropertyTypeSelect("Apartment")}
              >
                <MdApartment className="text-3xl text-indigo-800" />
                <span className="mt-2 font-medium">Apartment</span>
              </div>
              <div
                className={`w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer ${
                  filters.propertyType === "Bedroom" ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onClick={() => handlePropertyTypeSelect("Bedroom")}
              >
                <MdHotel className="text-3xl text-indigo-800" />
                <span className="mt-2 font-medium">Bedroom</span>
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
                    onClick={() => updateCount("bedrooms", 1)}
                    className="bg-indigo-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-900"
                  >
                    +
                  </button>
                  <span className="text-indigo-700 font-bold text-lg">{filters.bedrooms}</span>
                  <button
                    onClick={() => updateCount("bedrooms", -1)}
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
      <div className="relative" ref={listingIdFilterRef}>
        <button
          onClick={() => setShowListingIdFilter(!showListingIdFilter)}
          className="px-4 py-2 border rounded-full shadow  text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <span>Listing ID</span>
          <FaChevronDown className="text-black" />
        </button>
        {showListingIdFilter && (
          <div className="absolute left-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
            <h3 className="text-lg font-semibold mb-4 text-center">Listing ID</h3>
            <input
              type="text"
              value={filters.listingId}
              onChange={handleChange}
              placeholder="Enter Listing ID"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
              onClick={() => setShowListingIdFilter(false)}
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
    className="px-4 py-2 border rounded-full shadow text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
  >
    <span>Reset</span>
    <FaChevronDown className="text-black" />
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
        onClick={handleResetFilters} // Reset filters on click
      >
        Apply
      </button>
    </div>
  )}
</div>


      {/* Sort By Filter */}
      <div className="relative" ref={sortByFilterRef}>
        <button
          onClick={() => setShowSortByFilter(!showSortByFilter)}
          className="px-4 py-2 border rounded-full shadow text-black flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
        >
          <span>Sort By</span>
          <FaChevronDown className="text-black" />
        </button>
        {showSortByFilter && (
          <div className="absolute left-0 mt-3 w-72 bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-300">
            <div className="space-y-3">
              {sortByOptions.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option}
                    checked={filters.sortBy === option}
                    onChange={() => handleSortByChange(option)}
                    className="form-radio h-5 w-5 text-indigo-800"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            <button
              className="w-full mt-4 bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900"
              onClick={() => setShowSortByFilter(false)}
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
    </div>
  );
};

export default FilterSection;


























