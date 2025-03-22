import React, { useState } from "react";
import { CreditCard, DollarSign } from "lucide-react";

const PaymentFormPaypal = ({ room }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePaypalPayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/payments/stripe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: room.price,
            currency: "USD",
            room: room._id,
            gateway: "paypal",
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMessage("Failed to initiate PayPal payment.");
      }
    } catch (error) {
      setMessage("Error processing PayPal payment.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png"
            alt="PayPal"
            className="h-8"
          />
          <div className="text-sm text-gray-600">
            Secure payment powered by PayPal
          </div>
        </div>
        <button
          onClick={handlePaypalPayment}
          disabled={loading}
          className="flex items-center px-6 py-2 bg-[#0070ba] text-white rounded-md hover:bg-[#003087] transition-colors duration-200"
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            <>
              <DollarSign className="w-5 h-5 mr-2" />
              Pay ${room.price}
            </>
          )}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.includes("successful")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-[#0070ba]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Buyer Protection</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-[#0070ba]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Secure Payments</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-[#0070ba]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span>Easy Refunds</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-[#0070ba]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormPaypal;
