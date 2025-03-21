import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar2";

const MultiStepKYCForm1 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [error, setError] = useState(""); // State to manage error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({ ...prevData, phoneNumber: phone }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    const { firstName, lastName, phoneNumber, address, city, zipCode } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !city ||
      !zipCode
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Navigate to the next form
    console.log("Form submitted:", formData);
    navigate("/MultiStepKYCForm2", { state: formData });
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Section */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <button className="rounded-full px-3 py-2 bg-black text-white">
                  Section 1 of 3
                </button>
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-700">
                    Personal Information
                  </h1>
                  <p className="text-xs text-gray-500">
                    2 more questions left in this section
                  </p>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700">
                  Middle Name (Optional)
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                country="in"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                }}
                containerClass="w-full"
                inputClass="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City and Zip Code */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4">
              <Link to="/KYC">
                <button
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="w-1/3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MultiStepKYCForm1;
