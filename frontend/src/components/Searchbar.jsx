import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CityCombobox } from "./combobox-demo";
import { useSearchQuery } from "../redux/APi/listingApi"; // Correct import

const Searchbar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchParams, setSearchParams] = useState({}); // Keep it an object

  // Fetch data only when searchParams is valid
  const { data, isLoading, error } = useSearchQuery(searchParams, {
    skip: !searchParams.city, // Skip API call if city is empty
  });

  const handleSearch = () => {
    if (!selectedCity) return;

    setSearchParams({
      city: selectedCity,
      date: startDate ? startDate.toISOString().split("T")[0] : undefined,
    });
  };
  console.log(selectedCity);
  return (
    <div className="w-11/12 md:w-3/4 lg:w-1/3 bg-gray-300 rounded-full shadow-lg p-2 flex items-center justify-between">
      <div className="flex items-center space-x-7 ml-5">
        {/* City Selection */}
        <div className="flex items-center">
          <CityCombobox onSelect={(city) => setSelectedCity(city)} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Date</label>
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
        className="bg-slate-950 text-white rounded-full px-6 py-2 font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>

      {/* Display search results */}
      {error && <p className="text-red-500">Error fetching listings.</p>}
      {data?.data?.length > 0 ? (
        <div className="bg-yellow-400 p-3 mt-4">
          <h2 className="text-lg font-semibold">Results:</h2>
          <ul>
            {data.data.map((listing) => (
              <li key={listing._id}>{listing.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        searchParams.city && (
          <p className="mt-4 text-gray-700">No listings found.</p>
        )
      )}
    </div>
  );
};

export default Searchbar;
