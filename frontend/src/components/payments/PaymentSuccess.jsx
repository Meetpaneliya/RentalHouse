import React from "react";
import { CheckCircle, ArrowLeft, Home, Receipt, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const state = location.state;
  const amount = state ? state : localStorage.getItem("amount");
  const orderId = localStorage.getItem("orderId");
  const paymentMethod = "card";
  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case "stripe":
        return "https://b.stripecdn.com/site-srv/assets/img/v3/home/stripe-logo-slate-a3dc36e905.svg";
      case "razorpay":
        return "https://razorpay.com/build/browser/static/razorpay-logo.7d8c9c37.svg";
      case "paypal":
        return "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg";
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-center text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-center text-green-100">
            Your transaction has been completed
          </p>
        </div>

        <div className="p-8">
          {/* Payment Details */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-3xl font-bold text-gray-900">
                ${amount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID</span>
              <span className="text-sm font-medium text-gray-900">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <div className="flex items-center space-x-2">
                {getPaymentIcon() && (
                  <img
                    src={getPaymentIcon()}
                    alt={paymentMethod}
                    className="h-6"
                  />
                )}
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {paymentMethod}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Payment Secured & Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Notice */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Receipt className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-blue-700">
                A receipt has been sent to your email
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
