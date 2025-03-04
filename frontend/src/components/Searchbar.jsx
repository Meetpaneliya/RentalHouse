import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';

const Searchbar = () => {
    return (
        <div className="w-11/12 md:w-3/4 lg:w-1/3 bg-gray-300 rounded-full shadow-lg p-2 flex items-center justify-between">
            <div className="flex items-center space-x-7 ml-5">
                <div className="flex relative">
                    <label className="text-gray-700 font-semibold">City</label>
                    <div className="inset-y-0 right-0 flex items-center w-5 cursor-pointer">
                        <IoMdArrowDropdown />
                    </div>
                </div>
                <div className="flex gap-1">
                    <label className="text-gray-700 font-semibold">Dates</label>
                    <div className="inset-y-0 right-0 flex items-center w-5 cursor-pointer">
                        <SlCalender />
                    </div>
                </div>
                <div className="flex">
                    <label className="text-gray-700 font-semibold">Price</label>
                    <div className="inset-y-0 right-0 flex items-center w-5 cursor-pointer">
                        <IoMdArrowDropdown />
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