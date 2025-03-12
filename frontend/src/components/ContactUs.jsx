import React from "react";
import Footer from "../components/Footer"; 
import Navbar2 from "./Navbar2";

const ContactUs = () => {
  return (
    <div>
<Navbar2/>
    
    <div className="min-h-screen flex flex-col justify-between">

      {/* Contact Form Section */}
      <div className="flex-grow">
        <h1 className="text-5xl font-bold text-indigo-900 text-center mt-10">Contact</h1>
        <h2 className="text-lg font-semibold text-gray-900 text-center">
          Why landlords choose <span className="text-black">June Homes</span>
        </h2>
        <p className="text-gray-600 text-center max-w-lg mx-auto mt-2">
          June Homes is a national housing brand and operator that specializes in flexible furnished rentals for the new generation of renters.
        </p>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 mx-auto max-w-2xl">
          <h3 className="text-xl font-bold text-indigo-900 text-center">Schedule a call</h3>
          <p className="text-gray-500 text-center text-sm mb-6">
            Fill this form to learn more about June
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm ">First Name</label>
              <input type="text" className="w-full border border-indigo-700 rounded-full px-4 py-3 mt-2" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Last Name</label>
              <input type="text" className="w-full border border-indigo-700 rounded-full px-4 py-3 mt-2" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Email</label>
              <input type="email" className="w-full border border-indigo-700 rounded-full px-4 py-3 mt-2" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Phone</label>
              <input type="text" className="w-full border border-indigo-700 rounded-full px-4 py-3 mt-2" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">City</label>
              <input type="text" className="w-full border border-indigo-700 rounded-full px-4 py-3 mt-2" />
            </div>

            <button type="submit" className="w-full bg-indigo-800 text-white py-3 rounded-full hover:bg-indigo-900">
              Get In Touch
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
    </div>
  );
};

export default ContactUs;
