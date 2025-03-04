import Navbar from "../components/Navbar";
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Searchbar from "../components/Searchbar";
import CitySearch from "../components/citysearch";
import FeaturesSection from "../components/Features";

export const Home = () => {
    return (
        <div className="w-full h-screen overflow-y-auto">
            {/* Hero Section */}
            <div
                className="relative w-full h-screen bg-opacity-80 bg-cover"
                style={{
                    backgroundImage: `url('/assets/blueroom.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Navbar - positioned at top */}
                <div className="absolute top-0 left-0 right-0 z-20">
                    <Navbar />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

                {/* bg content-1 */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6">
                    <div className=" text-gray-300 text-center">
                        <h2 className="text-4xl font-bold">Ready, Set, Rent.</h2>
                        <p className="mt-4 text-lg">
                            Furnished and unfurnished apartments
                            <br />
                            and rooms on flexible lease terms
                        </p>
                    </div>

                    {/* Searchbar */}
                    <Searchbar />

                </div>

            </div>

            {/* section-2 */}
            <div className="flex flex-col justify-center w-10/12 m-auto mt-7">
                <div className="flex items-center justify-center text-blue-950 font-semibold text-2xl w-full h-32 gap-3 ">
                    <h1> New York City Rooms for Rent </h1>
                    <FaArrowRightLong />
                </div>

                {/* Cards */}
                <div className="flex justify-center gap-6 p-6">
                    <div className="border rounded-3xl p-4 w-1/3 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform">
                        <img src="/assets/room1.jpg" alt="Room 1" className="w-full h-48 object-cover rounded-t-3xl" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Cozy Room in Manhattan</h3>
                            <p className="mt-2 text-gray-600">A beautiful room in the heart of the city.</p>
                        </div>
                    </div>
                    <div className="border rounded-3xl p-4 w-1/3 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform">
                        <img src="/assets/room2.jpg" alt="Room 2" className="w-full h-48 object-cover rounded-t-3xl" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Spacious Apartment in Brooklyn</h3>
                            <p className="mt-2 text-gray-600">A spacious apartment with modern amenities.</p>
                        </div>
                    </div>
                    <div className="border rounded-3xl p-4 w-1/3 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform">
                        <img src="/assets/room3.jpg" alt="Room 3" className="w-full h-48 object-cover rounded-t-3xl" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Charming Studio in Queens</h3>
                            <p className="mt-2 text-gray-600">A charming studio with a great view.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* section-3 */}

            <div className="flex justify-between w-10/12 m-auto border rounded-xl bg-blue-950 text-slate-200 p-8 mt-14">
                <div className="flex w-11/12 gap-10 m-auto">
                    <div className="w-3/6 space-y-3 mt-9">
                        <h1 className="text-2xl">Get Pre-Approved and Book Instantly</h1>
                        <h4 className="text-lg">Skip the line and get approved to instantly book
                            a home with June.</h4>
                    </div>

                    <div className="flex flex-col w-3/6 space-y-5 mt-3 items-center m-auto">
                        <button className="bg-slate-200 text-black rounded-3xl w-3/6 p-2"> Get pre-approved now </button>
                        <p className="text-sm">June Homes uses iDenfy and Plaid to provide a streamlined, quick, and secure way to
                            verify your identity and income to calculate a range of homes you can instantly book</p>
                    </div>
                </div>
            </div>

            {/* section-4 */}
            <div className="w-10/12 m-auto mt-14 mb-14">
                <h1 className="text-3xl font-semibold text-center text-blue-950 mb-10"> Here's why renters are choosing June </h1>
                <div className="flex flex-row justify-between">
                    <div className="bg-slate-200 p-6 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform w-1/5">
                        <h1 className="text-xl font-semibold mb-3 text-blue-950">Flexible Lease Terms</h1>
                        <p className="text-gray-700">Check housing off your to-do list, and find your footing in a new place ASAP.</p>
                    </div>

                    <div className="bg-slate-200 p-6 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform w-1/5">
                        <h1 className="text-xl font-semibold mb-3 text-blue-950">We're Flexible</h1>
                        <p className="text-gray-700">Rent from 1-18 months and easily extend your lease as you go</p>
                    </div>

                    <div className="bg-slate-200 p-6 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform w-1/5">
                        <h1 className="text-xl font-semibold mb-3 text-blue-950">We're Customizable</h1>
                        <p className="text-gray-700">Rent furnished or unfurnished, you can enjoy our furniture and decor or bring your own</p>
                    </div>

                    <div className="bg-slate-200 p-6 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform hover:scale-105 transition-transform w-1/5">
                        <h1 className="text-xl font-semibold mb-3 text-blue-950">We're Fair</h1>
                        <p className="text-gray-700">Pay fair market rates from Hell's Kitchen to Hollywood</p>
                    </div>
                </div>
            
            </div>
            <CitySearch/>
            <FeaturesSection/>
    

        </div>


    )
}