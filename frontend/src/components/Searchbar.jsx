import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CityCombobox } from "./combobox-demo";
import { useSearchQuery } from "../redux/APi/listingApi"; // Correct import
import { Link, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchParams, setSearchParams] = useState({}); // Keep it an object
  const navigate = useNavigate();
  // Fetch data only when searchParams is valid
  const { isLoading } = useSearchQuery(searchParams, {
    skip: !searchParams.city, // Skip API call if city is empty
  });

  const handleSearch = () => {
    if (!selectedCity) return;

    setSearchParams({
      city: selectedCity,
      date: startDate ? startDate.toISOString().split("T")[0] : undefined,
    });
    navigate(
      `/listings?city=${selectedCity}&startDate=${startDate?.toISOString().split("T")[0]
      }`
    );
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/3 bg-gray-300 rounded-full shadow-lg p-3 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">

      {/* Left Section (City & Date) */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 w-full">

        {/* City Selection */}
        <div className="w-full sm:w-auto flex items-center">
          <CityCombobox onSelect={(city) => setSelectedCity(city)} />
        </div>

        {/* Date Picker */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 font-semibold text-sm">Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select a date"
            className="w-[120px] px-2 py-1 border border-gray-300  bg-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

      </div>

      {/* Search Button */}
      <Link to={"/filtered-listings"}>
        <button
          onClick={handleSearch}
          className="relative group px-6 py-2 bg-black rounded-full flex items-center justify-center w-full sm:w-auto"
        >
          <div className="absolute -inset-0.5 bg-black rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <span className="relative flex items-center text-white font-semibold">
            {isLoading ? "Searching..." : "Search"}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </button>
      </Link>

    </div>

  );
};

export default Searchbar;
