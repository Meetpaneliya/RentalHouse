import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar2 />

      {/* Hero Section with Background */}
      <div className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/about4.jpg')",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent opacity-100"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            About <span className="text-gray-200">Us</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mt-4 px-4">
            To reinvent the antiquated housing experience for the new generation of renters and mom & pop landlords.
          </p>
        </div>
      </div>

      {/* Add Gap Below Hero Section */}
      <div className="mt-20"></div>

      {/* Two-Column Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Text on the left */}
          <div className="text-left px-4 md:pr-8">
            <h2 className="text-2xl font-bold text-gray-800">Simplicity at every step.</h2>
            <p className="text-gray-600 mt-4">
              We believe that renting a home should be easy, but it’s historically been an overly complicated 
              process with too many hoops to jump through. At June, we’re trying to bring a fresher look to an 
              outdated system. As a mobile-first company, our teams are working tirelessly to challenge the 
              status quo and provide our residents and owners with a clearer, simpler, more straightforward rental experience.
            </p>
          </div>
          {/* Image on the right */}
          <div className="relative flex justify-center">
            <img
              src="/assets/about2.jpg"
              alt="Houses"
              className="w-full max-w-[530px] h-auto object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Second Row (Reversed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
          {/* Image on the left */}
          <div className="relative flex justify-center">
            <img
              src="/assets/about1.jpg"
              alt="Customer Service"
              className="w-full max-w-[530px] h-auto object-cover shadow-lg"
            />
          </div>

          {/* Text on the right */}
          <div className="text-left px-4 md:pl-8 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-800">Best customer service</h2>
            <p className="text-gray-600 mt-4">
              At June, we take care of our residents and owners. Whether you’re a resident working with our 
              24/7 support team to solve a maintenance issue or an owner discussing ways to optimize your NOI 
              with your personal relationship manager, we strive to provide a level of service unmatched in 
              the residential rental industry.
            </p>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
          {/* Text on the left */}
          <div className="text-left px-4 md:pr-8">
            <h2 className="text-2xl font-bold text-gray-800">Transparency in the rental</h2>
            <p className="text-gray-600 mt-4">
              We never gatekeep information and are always upfront and honest when it comes to 
              requirements and fees, listings and locations, and what you can expect as a June resident or owner. 
              In an industry peppered with shady characters and scams galore, we pride ourselves on maintaining 
              transparent and professional communication with our customers throughout the process.
            </p>
          </div>

          {/* Image on the right */}
          <div className="relative flex justify-center">
            <img
              src="/assets/about3.jpg"
              alt="Glass Building"
              className="w-full max-w-[530px] h-auto object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-20"></div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
