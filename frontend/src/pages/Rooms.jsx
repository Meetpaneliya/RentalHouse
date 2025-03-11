import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { SlShare, SlCalender } from "react-icons/sl"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { VscHome } from "react-icons/vsc";
import { FaWifi } from "react-icons/fa";
import { MdTv } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { GiHeatHaze } from "react-icons/gi";
import { GrElevator } from "react-icons/gr";
import Ratings from '../components/Ratings'
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer'

const Rooms = () => {

  const amenitiesIcons = {
    Elevator: <GrElevator />,
    WiFi: <FaWifi />,
    TV: <MdTv />,
    "Air Conditioning": <TbAirConditioning />,
    Geyser: <GiHeatHaze />,
  };

  const location = useLocation();
  const { listing } = location.state || {};

  const [isFavorite, setIsFavorite] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const description = listing?.description || "No description available.";

  const shortenedText = description.split(' ').slice(0, 60).join(' ') // Show first 30 words

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl flex items-center justify-between mx-auto mt-10 mb-5">
        <div className=" text-blue-900">
          <h1 className='text-3xl font-bold '>{listing.title} - {listing.code}</h1>
          <p className='text-xl font-bold'>{listing.propertyType}</p>
        </div>

        <div className="flex items-center justify-end text-blue-900 gap-3">
          <SlShare size={24} />
          <button
            onClick={toggleFavorite}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isFavorite ? <GoHeartFill size={24} className="text-red-500" /> : <GoHeart size={24} />}
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="px-2 mx-auto max-w-7xl rounded-full"> {/* Reduced max width further */}
        <div className="grid grid-cols-3 gap-3 "> {/* Reduced height and gap further */}
          <div className="col-span-2 relative">
            <img
              src="/assets/room3.jpg"
              alt="Room"
              className="w-full h-full object-cover rounded-3xl shadow-sm" /* Smaller radius */
            />
          </div>
          <div className="flex flex-col gap-3"> {/* Reduced gap between images */}
            <img
              src="/assets/room2.jpg"
              alt="Room"
              className="w-full h-[32%] object-cover rounded-2xl shadow-sm"
            />
            <img
              src="/assets/room3.jpg"
              alt="Room"
              className="w-full h-[32%] object-cover rounded-2xl shadow-sm"
            />
            <img
              src="/assets/room4.jpg"
              alt="Room"
              className="w-full h-[32%] object-cover rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto mt-5 space-y-5 flex ">
        <div className="flex flex-col gap-5">
          {/* Room Details */}
          <div>
            <div className='max-w-7xl mx-auto mt-5 space-y-5'>
              <h1 className='text-3xl font-bold'>Overview</h1>
              <h2 className='flex text-xl gap-2 font-semibold'><span><VscHome size={30} /></span>{listing.area} ft | {listing.floor}th Floor | {listing.beds} Beds | {listing.bathrooms} Bathroom</h2>
              <h2 className='flex text-xl gap-2 items-center font-semibold'><span><SlCalender size={20} /></span>Available from {listing.date}</h2>
            </div>

            <div className='max-w-3xl mt-5'>
              <p className='text-sm text-gray-600 font-semibold'>
                {isExpanded ? description : shortenedText}
                {description.length > shortenedText.length && (
                  <button
                    onClick={toggleDescription}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isExpanded ? 'Show Less' : '...Show More'}
                  </button>
                )}
              </p>
            </div>

          </div>

          <div>
            <hr className="border-t-2 border-blue-500 w-9/12" /> {/* Single blue border for partition */}
          </div>

          {/* Amenities */}
          <div>
            <h1 className="text-3xl font-bold">Amenities</h1>
            <div className="flex flex-wrap gap-3 mt-4">
              {listing.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-gray-800 text-white px-4 py-1 rounded-full flex items-center gap-1"
                >
                  <span>{amenitiesIcons[amenity] || "🔹"}</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div>
            <hr className="border-t-2 border-blue-500 w-9/12 mt-3" /> {/* Single blue border for partition */}
          </div>
        </div>

        {/* Payment Section */}
        <div className="max-w-sm w-full mx-auto bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 transition-transform hover:scale-105 duration-300">
          {/* Header */}
          <h3 className="text-xl font-bold text-gray-200 text-center">Premium Plan</h3>
          <p className="text-gray-300 text-center mt-1">Best for professionals</p>

          {/* Price */}
          <div className="flex justify-center items-center mt-4">
            <span className="text-3xl font-bold text-blue-600">${listing.price}</span>
            <span className="text-blue-600 ml-1 text-3xl font-semibold">/-</span>
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-3 text-gray-300">
            <li className="flex items-center">
              ✅ Full Access to Features
            </li>
            <li className="flex items-center">
              ✅ 24/7 Customer Support
            </li>
            <li className="flex items-center">
              ✅ Secure Payment Processing
            </li>
            <li className="flex items-center">
              ✅ Cancel Anytime
            </li>
          </ul>

          {/* Call-to-Action Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
              Subscribe Now
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-300 text-center mt-4">No hidden fees. Cancel anytime.</p>
        </div>

      </div>


      <div>
        <Ratings listing={listing} />
      </div>

      {/* Search CTA Section (with rounded corners and card effect) */}
      <div
        className="relative -mb-40 bg-cover bg-center text-white py-10 px-6 w-full max-w-5xl mx-auto rounded-3xl shadow-lg overflow-hidden"
        style={{
          backgroundImage: "url('/assets/girlroom.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px', // Reduced height
          maxHeight: '300px' // Added max-height constraint
        }}
      >

        <div className="z-10 flex justify-between items-center max-w-5xl mx-auto">
          <div className="gap-3 p-5 w-2/6  bg-white/70 rounded-3xl">
            <h2 className="text-4xl font-bold text-blue-800 text-center">Start your search today</h2>
            <p className="mt-3 text-sm text-blue-800">
              Get ready for the easiest rental experience of your life. Browse homes, take a tour,
              submit an application, and get your key in a few clicks!
            </p>
          </div>


          <div className="flex flex-col space-y-10">
            <button className="">
              <a href="/search" className="bg-blue-500/50 hover:bg-blue-600 text-white px-10 py-3 rounded-full">Search Apartments</a>
            </button>

            <button>
              <a href="/signup" className="bg-blue-500/50 hover:bg-blue-600 text-white px-10 py-3 rounded-full">Speak to a Human</a>
            </button>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Rooms