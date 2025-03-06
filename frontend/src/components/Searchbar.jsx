import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CityCombobox} from './combobox-demo';

const Searchbar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="w-11/12 md:w-3/4 lg:w-1/3 bg-gray-300 rounded-full shadow-lg p-2 flex items-center justify-between">
      <div className="flex items-center space-x-7 ml-5">
        <div className="flex items-center">
          <CityCombobox />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Dates</label>
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
              className="bg-transparent border-none text-sm text-gray-700 focus:outline-none"
            />
            
          </div>
        </div>
      </div>
      <button className="bg-slate-950 text-white rounded-full px-6 py-2 font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </div>
  );
};

export default Searchbar;