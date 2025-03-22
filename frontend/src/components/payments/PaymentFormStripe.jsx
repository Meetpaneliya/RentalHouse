import { useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { server } from "../../lib/config";

const PaymentForm = ({ amount, currency = "usd", room }) => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe) {
      setMessage("Stripe is not ready yet. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${server}/api/v1/payments/stripe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          room: room._id,
          gateway: "stripe",
        }),
        credentials: "include",
      });

      const sessionData = await response.json();

      // Redirect to Stripe Checkout using the sessionId from your backend.
      const result = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (result.error) {
        setMessage(result.error.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Secure Payment
              </h2>
              <p className="text-sm text-gray-500">
                Protected by Stripe Checkout
              </p>
            </div>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
            alt="Stripe"
            className="h-8"
          />
        </div>

        {/* Amount Display */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Amount to Pay</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-indigo-600">
                ${amount}
              </span>
              <span className="text-gray-500 uppercase">{currency}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-6">
          {/* Since Stripe Checkout handles card collection, no card fields are needed here */}

          <button
            type="submit"
            disabled={loading || !stripe}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
              loading || !stripe
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200"
            }`}
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
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Pay Securely</span>
              </div>
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("successful")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="text-sm font-medium text-center">{message}</p>
          </div>
        )}

        {/* Security Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
            <Shield className="h-6 w-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Secure SSL
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
            <Lock className="h-6 w-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Encrypted</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-50">
            <Clock className="h-6 w-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              24/7 Support
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 flex bg-transparent items-center justify-center space-x-4">
          <img
            src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg"
            alt="Mastercard"
            className="h-8"
          />
          <img
            src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg"
            alt="American Express"
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
