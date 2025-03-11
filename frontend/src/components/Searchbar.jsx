import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CityCombobox } from './combobox-demo';

const Searchbar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="relative w-11/12 md:w-3/5 lg:w-2/5">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75"></div>

      <div className="relative w-full bg-gray-900 rounded-full shadow-2xl p-3 flex items-center justify-between border border-gray-700">
        <div className="flex items-center space-x-6 ml-4">
          <div className="flex items-center">
            <CityCombobox />
          </div>

          <div className="h-8 w-px bg-gray-700"></div>

          <div className="flex items-center gap-2">
            <label className="text-gray-400 font-medium">Dates</label>
            <div className="flex items-center">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                }}
                placeholderText="Select dates"
                className="w-40 bg-transparent border-none text-sm text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button className="relative group px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <span className="relative flex items-center text-white font-semibold">
            Search
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;