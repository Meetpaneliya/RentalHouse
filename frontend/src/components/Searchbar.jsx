import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CityCombobox } from "./combobox-demo";
import { useSearchQuery } from "../redux/APi/listingApi"; // Correct import
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useSearchQuery(searchParams, {
    skip: !searchParams.city,
  });

  const handleSearch = () => {
    if (!selectedCity) return;

    setSearchParams({
      city: selectedCity,
      date: startDate ? startDate.toISOString().split("T")[0] : undefined,
    });
    navigate(
      `/listings?city=${selectedCity}&startDate=${
        startDate?.toISOString().split("T")[0]
      }`
    );
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/3 bg-gray-300 rounded-full shadow-lg p-2 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-3">
      <div className="flex flex-wrap md:flex-nowrap items-center space-x-4 md:space-x-7 ml-2 md:ml-5">
        
        {/* City Selection */}
        <div className="flex items-center w-full md:w-auto">
          <CityCombobox onSelect={(city) => setSelectedCity(city)} />
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold text-sm sm:text-base">
            Date
          </label>
          <div className="flex items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select a date"
              className="bg-transparent border-none text-sm text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="relative group px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-full md:w-auto"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <span className="relative flex items-center justify-center text-white font-semibold text-sm">
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
    </div>
  );
};

export default Searchbar;


