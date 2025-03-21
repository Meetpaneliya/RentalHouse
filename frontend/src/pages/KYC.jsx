import React, { useState } from "react";
import { FaIdCard, FaMoneyCheckAlt } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Navbar from "../components/Navbar2";
import { useNavigate } from "react-router-dom";

const KYCApplication = () => {
  const [requiredOpen, setRequiredOpen] = useState(true);
  const [applicableOpen, setApplicableOpen] = useState(false);

  const Navigate = useNavigate();

  const handleNext = () => {
    Navigate('/MultiStepKYCForm1');
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-2">Application</h1>
      <p className="text-center text-gray-500 mb-6">Takes just 4-8 minutes to complete</p>
      
      <h2 className="text-xl font-semibold mb-4">Documents needed:</h2>

      {/* Required Section */}
      <div className="mb-4 border border-gray-300 rounded-2xl overflow-hidden">
        <button
          onClick={() => setRequiredOpen(!requiredOpen)}
          className="w-full flex justify-between items-center p-4 bg-blue-600 text-white"
        >
          <span className="text-lg font-medium">Required</span>
          {requiredOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
        </button>
        {requiredOpen && (
          <div className="space-y-5 p-4 bg-white animate-fade-in">
            <div className="flex items-start gap-3">
              <FaIdCard className="text-blue-600 mt-1" size={22} />
              <div>
                <p className="font-semibold">Personal Information</p>
                <p className="text-gray-500 text-sm">User Personal Information match with Government issued ID</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMoneyCheckAlt className="text-blue-600 mt-1" size={22} />
              <div>
                <p className="font-semibold">Passport or SSN Key</p>
                <p className="text-gray-500 text-sm">Either Passport or SSN key is needed for verification</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl text-blue-600">$</span>
              <p className="font-semibold">$20 Fee</p>
            </div>
          </div>
        )}
      </div>

      {/* If Applicable Section */}
      <div className="border border-gray-300 rounded-2xl overflow-hidden">
        <button
          onClick={() => setApplicableOpen(!applicableOpen)}
          className="w-full flex justify-between items-center p-4 bg-gray-100 text-black"
        >
          <span className="text-lg font-medium">If Applicable</span>
          {applicableOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
        </button>
        {applicableOpen && (
          <div className="p-4 bg-white animate-fade-in">
            <p className="text-gray-500 text-sm">Additional documents may be requested based on your application.</p>
          </div>
        )}
      </div>

      {/* Terms */}
      <p className="text-sm text-gray-500 mt-6 text-justify leading-5">
        By clicking <strong>Begin</strong>, I authorize June to use any third-party services to verify my credit history and income. I have been advised that I have the right under section 606(b) of the Fair Credit Reporting Act to make a written request for a complete and accurate disclosure of the nature and scope of any investigation.
      </p>

      {/* Button */}
      <button onClick = {handleNext}className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-lg transition-all duration-300">
        Begin
      </button>
    </div>
    </>
  );
};

export default KYCApplication;
