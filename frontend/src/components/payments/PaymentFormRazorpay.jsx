import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { server } from "../../lib/config";

const PaymentFormRazorpay = ({
  amount,
  room,
  currency = "INR",
  description = "Room Booking Payment",
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
      const response = await fetch(`${server}/api/v1/payments/stripe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          room: room._id,
          gateway: "razorpay",
        }),
        credentials: "include",
      });

      const payment = await response.json();
      console.log(payment);
      if (!payment) {
        setMessage("Failed to initiate payment.");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency || "INR",
        name: room.title,
        description: room.description,
        order_id: payment.orderId,
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
              navigate("/success", {
                state: {
                  amount: amount,
                  orderId: payment.id,
                  paymentMethod: "razorpay",
                },
              });
            } else {
              setMessage("Payment verification failed.");
            }
          } catch (error) {
            setMessage("Error verifying payment.");
          }
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "",
        },
        notes: {
          address: "StayHub Corporate Office",
        },
        theme: {
          color: "#2D88FF",
        },
        modal: {
          ondismiss: function () {
            navigate("/cancel", {
              state: {
                reason: "Payment was cancelled",
                returnUrl: window.location.pathname,
              },
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setMessage("Error initializing payment.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Payment Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D88FF] to-[#1F5EFF] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://razorpay.com/build/browser/static/razorpay-logo-white.svg"
                alt="Razorpay"
                className="h-8"
              />
              <div className="text-white">
                <h3 className="text-lg font-semibold">Secure Payment</h3>
                <p className="text-sm opacity-90">via Razorpay</p>
              </div>
            </div>
            <Shield className="h-8 w-8 text-white opacity-80" />
          </div>
        </div>

        {/* Amount Display */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Amount to Pay</span>
            <div className="text-3xl font-bold text-gray-900">
              ₹{amount.toFixed(2)}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-[#2D88FF] text-white hover:bg-[#1F5EFF] transition-colors duration-200 disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay Securely
              </>
            )}
          </button>

          {/* Error Message */}
          {message && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{message}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-5 w-5 text-[#2D88FF]" />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-[#2D88FF]" />
                <span className="text-sm">Instant Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-3">Supported Payment Methods:</p>
        <div className="grid grid-cols-3 gap-4">
          <img
            src="https://razorpay.com/build/browser/static/upi.c18bc46b.svg"
            alt="UPI"
            className="h-8"
          />
          <img
            src="https://razorpay.com/build/browser/static/cards.c64bc5d8.svg"
            alt="Cards"
            className="h-8"
          />
          <img
            src="https://razorpay.com/build/browser/static/netbanking.5b413f11.svg"
            alt="Net Banking"
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentFormRazorpay;
