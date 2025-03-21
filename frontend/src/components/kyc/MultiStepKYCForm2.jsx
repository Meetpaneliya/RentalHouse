import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar2";
import axios from "axios";
import { server } from "../../lib/config";
import { toast } from "react-hot-toast";

const MultiStepKYCForm2 = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const {
    firstName,
    lastName,
    middleName,
    phoneNumber,
    address,
    city,
    zipCode,
  } = location.state || {};
  const [currentStep, setCurrentStep] = useState(2); // Track the current step
  const [formData, setFormData] = useState({
    ssn: "", // Step 1: Social Security Number
    passport: null, // Step 2: Passport
    visa: null, // Step 2: Visa
  });
  const [error, setError] = useState(""); // Error messages

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear errors when user types
  };

  // Handle file input changes
  const handleFileChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleSSN = () => {
    setCurrentStep(3);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentStep === 2) {
      // Validate Step 1
      if (!formData.ssn.trim()) {
        setError("Social Security Number is required.");
        return;
      }

      try {
        const response = await axios.post(
          `${server}/api/v1/kyc/application`,
          {
            ssn: formData.ssn.trim().toString(),
            verificationType: "ssn",
            firstName,
            lastName,
            middleName,
            phoneNumber,
            address,
            city,
            zipCode,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      }
    } else if (currentStep === 3) {
      // Validate Step 2
      if (!formData.passport) {
        setError("Passport is required.");
        return;
      }
      if (!formData.visa) {
        setError("Visa is required.");
        return;
      }
      // Final submission
      try {
        const response = await axios.post(
          `${server}/api/v1/kyc/application`,
          {
            ssn: formData.ssn.trim().toString(),
            verificationType: "passport",
            firstName,
            lastName,
            middleName,
            phoneNumber,
            address,
            city,
            zipCode,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response.data.message);
        Navigate("/KYC");
        toast.success("Please wait for KYC approval.");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <form
        className="max-w-lg mx-auto p-6 mt-20 justify-center items-center border border-gray-300 rounded-lg shadow-md bg-white space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="border border-gray-400 rounded-lg p-4">
          <div className="flex justify-between">
            <button className="rounded-full p-3 bg-black text-slate-100">
              Section {currentStep} of 3
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-center text-slate-700">
                Personal Information
              </h1>
              <p className="text-xs text-slate-600">
                {currentStep === 2
                  ? "1 more Questions left in this section"
                  : "Not more Question left in this section"}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Social Security Number */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800">
              Please enter your U.S. social security number:
            </h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                S.S.N.
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                placeholder="XXX XXX XXXX"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="button"
                onClick={handleSSN}
                className="flex items-center justify-between w-full p-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Don't have an S.S.N?
                <span className="ml-2 text-lg">&rarr;</span>
              </button>
            </div>

            {/* Privacy Policy */}
            <div className="text-sm text-gray-500">
              JuneHomes will never sell, rent, or trade your Personal
              Information. Read more on our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                privacy policy
              </a>
              .
            </div>
          </div>
        )}

        {/* Step 2: Passport and Visa Upload */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800">
              Please provide your Passport and Visa
            </h2>
            {/* Passport Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                Passport
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {formData.passport ? (
                  <span className="text-gray-500">
                    {formData.passport.name}
                  </span>
                ) : (
                  <span className="text-gray-500">Upload</span>
                )}
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                  REQUIRED
                </span>
              </div>
            </div>
            {/* Visa Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                U.S. Visa
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="file"
                  name="visa"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {formData.visa ? (
                  <span className="text-gray-500">{formData.visa.name}</span>
                ) : (
                  <span className="text-gray-500">Upload</span>
                )}
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          {currentStep === 3 && (
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
              onClick={() => setCurrentStep(2)}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {"Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default MultiStepKYCForm2;
