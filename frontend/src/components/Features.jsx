import React from "react";


export default function FeaturesSection() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row items-center gap-10">
      {/* Left Side: Image with Overlay */}
      <div className="relative w-full md:w-1/2">
        {/* Image */}
        <img src="/assets/family.jpg" alt="Trust and Safety" className="w-full rounded-lg shadow-lg" />
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          June Approved
        </div>
        {/* Overlay Text */}
        <div className="absolute bottom-0 w-full bg-white bg-opacity-50 p-4 text-center">
          <p className="text-black-700 text-xl font-bold">Your trust and safety is our priority.</p>
        </div>
      </div>

      {/* Right Side: Features */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Feature 1 */}
        <div className="flex items-center p-5 bg-white shadow-lg rounded-xl">
          {/* Feature Image */}
          <img src="/assets/shield.png" alt="Risk-free trial" className="w-16 h-16 rounded-lg" />
          <div className="ml-4">
            <h3 className="text-black-700 font-bold text-lg">Risk-free trial</h3>
            <p className="text-gray-600 text-sm">
              If you’re not happy with your home or roommate(s) within the first week, move to a new home at no additional cost.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center p-5 bg-white shadow-lg rounded-xl">
          {/* Feature Image */}
          <img src="/assets/agent.png"alt="Vetted Residents" className="w-16 h-16 rounded-lg" />
          <div className="ml-4">
            <h3 className="text-black-700 font-bold text-lg">Vetted Residents</h3>
            <p className="text-gray-600 text-sm">
              June residents are generally professionals and students, and all our renters go through background checks.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center p-5 bg-white shadow-lg rounded-xl">
          {/* Feature Image */}
          <img src="/assets/customer-service.png" alt="June Care" className="w-16 h-16 rounded-lg" />
          <div className="ml-4">
            <h3 className="text-black-700 font-bold text-lg">June Care</h3>
            <p className="text-gray-600 text-sm">
              Our team is available 24/7 to assist with anything you need, from maintenance requests to move-in help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
