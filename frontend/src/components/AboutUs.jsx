import React from "react";
import Navbar2 from "./Navbar2";
import Footer from './Footer';

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
          <h1 className="text-white text-6xl font-bold">
            About <span className="text-gray-200">Us</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mt-4">
            To reinvent the antiquated housing experience for the new generation of renters and mom & pop landlords.
          </p>
        </div>
      </div>

      {/* Add Gap Below Hero Section */}
      <div className="mt-20"></div> {/* ✅ Creates proper spacing before next section */}

      {/* Two-Column Section */}
      <div className="max-w-6xl mx-auto px-8">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center ml-2">
          {/* Text on the left */}
          <div className="pr-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Simplicity at every step.</h2>
            <p className="text-gray-600 mt-4">
              We believe that renting a home should be easy, but it’s historically been an overly complicated 
              process with too many hoops to jump through. At June, we’re trying to bring a fresher look to an 
              outdated system. As a mobile-first company, our teams are working tirelessly to challenge the 
              status quo and provide our residents and owners with a clearer, simpler, more straightforward rental experience.
            </p>
          </div>
          {/* Image on the right */}
          <div className="relative">
            <img
              src="/assets/about2.jpg"
              alt="Houses"
              className="w-[530px] h-[400px] object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Second Row (Reversed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-[-5px] ml-4">
          {/* Image on the left (Increase Size & Square) */}
          <div className="relative">
            <img
              src="/assets/about1.jpg"
              alt="Customer Service"
              className="w-[530px] h-[400px] object-cover shadow-lg"
            />
          </div>

          {/* Text on the right */}
          <div className="pl-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Best customer service</h2>
            <p className="text-gray-600 mt-4">
              At June, we take care of our residents and owners. Whether you’re a resident working with our 
              24/7 support team to solve a maintenance issue or an owner discussing ways to optimize your NOI 
              with your personal relationship manager, we strive to provide a level of service unmatched in 
              the residential rental industry.
            </p>
          </div>
        </div>

        {/* Third Row (Reversed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-[30px]">
          {/* Text on the left */}
          <div className="pr-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Transparency in the rental</h2>
            <p className="text-gray-600 mt-4">
              We never gate keep information and are always upfront and honest when it comes to 
              requirements and fees, listings and locations, and what you can expect as a June resident or owner. 
              In an industry peppered with shady characters and scams galore, we pride ourselves on maintaining 
              transparent and professional communication with our customers throughout the process.
            </p>
          </div>

          {/* Image on the right (Slightly touching the above image) */}
          <div className="relative -mt-[40px]">
            <img
              src="/assets/about3.jpg"
              alt="Glass Building"
              className="w-[530px] h-[400px] object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
      <br></br><br></br>
      <Footer/>
    </div>
  );
};

export default AboutUs;
