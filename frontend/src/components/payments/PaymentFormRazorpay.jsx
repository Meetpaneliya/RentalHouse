import React, { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

const PaymentFormRazorpay = ({ amount, room }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/payments/razorpay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount * 86.35 }),
          credentials: "include",
        }
      );

      const { payment } = await response.json();
      if (!payment) {
        setMessage("Failed to initiate Razorpay payment.");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: payment.amount * 84,
        currency: payment.currency,
        order_id: payment.id,
        name: room.title,
        description: room.description,
        image: "https://example.com/your_logo.png",
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_SERVER}/api/v1/payments/razorpay/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
                credentials: "include",
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setMessage("🎉 Payment successful!");
            } else {
              setMessage("Payment verification failed.");
            }
          } catch (error) {
            setMessage("Error verifying payment.");
          }
        },
        modal: {
          ondismiss: function () {
            setMessage("Payment cancelled by user");
          },
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setMessage("Error initializing Razorpay.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp&w=256"
            alt="Razorpay"
            className="h-8"
          />
          <div className="text-sm text-gray-600">
            Secure payment powered by Razorpay
          </div>
        </div>
        <button
          onClick={handleRazorpayPayment}
          disabled={loading}
          className="flex items-center px-6 py-2 bg-[#2D88FF] text-white rounded-md hover:bg-[#1F5EFF] transition-colors duration-200"
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
              <CreditCard className="w-5 h-5 mr-2" />
              Pay ₹{amount * 86.35}
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
            className="w-5 h-5 text-[#2D88FF]"
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
          <span>100% Secure Payments</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-[#2D88FF]"
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
          <span>End-to-end Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormRazorpay;
