import React from "react";
import {
  XCircle,
  ArrowLeft,
  Home,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentCancel = () => {
  const location = useLocation();
  const { reason = "The payment was cancelled.", returnUrl = "/checkout" } =
    location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cancel Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-3">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-center text-white">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-center text-red-100">
            No charges have been made to your account
          </p>
        </div>

        <div className="p-8">
          {/* Status Message */}
          <div className="bg-red-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Payment Not Completed
                </h3>
                <div className="mt-2 text-sm text-red-700">{reason}</div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              What happens next?
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="bg-gray-200 rounded-full p-1 mr-3">
                  <span className="block h-2 w-2 rounded-full bg-gray-600"></span>
                </div>
                Your order has been saved but not confirmed
              </li>
              <li className="flex items-center">
                <div className="bg-gray-200 rounded-full p-1 mr-3">
                  <span className="block h-2 w-2 rounded-full bg-gray-600"></span>
                </div>
                No payment has been processed
              </li>
              <li className="flex items-center">
                <div className="bg-gray-200 rounded-full p-1 mr-3">
                  <span className="block h-2 w-2 rounded-full bg-gray-600"></span>
                </div>
                You can try again with the same or a different payment method
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              to={returnUrl}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Try Payment Again
            </Link>

            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <Link
              to="/support"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Need help? Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
